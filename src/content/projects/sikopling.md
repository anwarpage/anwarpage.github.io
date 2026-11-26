---
title: SIKOPLING - Saluran Interaktif Persetujuan Lingkungan
shortTitle: Sikopling
description: A SvelteKit and Supabase public service portal where citizens track environmental approval applications and agency officers manage the queue through a role-protected admin console.
date: 2026-04-01
projectType: Freelance
category: Website
tags: Civic Tech, Public Service, Environmental Approval, Full-Stack
image: /projects/sikopling/cover.avif
liveUrl: https://sikopling.vercel.app/
githubUrl: https://github.com/anwarpage/sikopling
team: Adhi Maulana, SP, MT., M. Kaspul Anwar | https://github.com/anwarpage, Akhmad Hafidz Ardianto | https://github.com/Hzkun001
institution: Dinas Lingkungan Hidup Provinsi Kalimantan Selatan
techStack: SvelteKit 2, Svelte 5, TypeScript, Tailwind CSS 4, Supabase (Postgres, Auth, RLS), GSAP & Lenis, Vitest & Playwright, Vercel
---

SIKOPLING is the environmental approval consultation portal of Dinas Lingkungan Hidup Provinsi Kalimantan Selatan. Citizens and companies use it to follow where their AMDAL, UKL-UPL, DELH/DPLH, addendum, and technical approval (Pertek) applications stand, while agency officers update that same queue from a role-protected admin console. It is built with **SvelteKit 2 / Svelte 5** on top of **Supabase** and deployed on **Vercel**.

## Problem to Solve

Environmental approvals move through many review stages, and applicants usually had to call or visit the office to learn their status. Putting that queue online raised three practical problems:

- **Transparency Without Leaking Internal Data**: The public needs to see their application's stage, but the monitoring tables also hold internal fields that must never reach a browser.
- **Two Different Status Vocabularies**: AMDAL applications follow a longer FKA → Andal RKL-RPL flow, while UKL-UPL and DELH follow a shorter one. Officers' legacy labels such as `Masuk`, `Verifikasi`, or `Selesai` had to land on the correct public stage for each type.
- **Trustworthy Admin Access**: Officers bulk-edit records and import spreadsheets, so every write must be limited to real, active admins and remain traceable afterwards.

## Solution Approach

The system is split into a public portal and an admin console that share the same three Supabase tables (`monitoring_perling`, `monitoring_pertek`, `monitoring_integrasi`):

- **Public Queue Pages (`/layanan/perling`, `/layanan/pertek`)**: Search, filters, sorting, pagination, mobile expandable rows, and client-side CSV export. Data is loaded on the server with a service-role client that selects only **8 public columns** (registration number, dates, agency, activity, document type, position, status). Each status is normalized per document type, so an AMDAL record always shows an AMDAL-flow stage.
- **Role-Protected Admin Console (`/admin`)**: Two roles, `admin` for day-to-day queue work and `super_admin` for accounts and the audit log. It provides dashboard metrics (total, finished, in progress, returned), modal-based create and edit, single and bulk delete, server-side filtering and sorting, plus **CSV import and export** per service. The importer auto-detects `,` or `;` delimiters, handles quoted cells, validates every row (required registration number, `YYYY-MM-DD` dates, status allowed for that document type), and reports failures line by line instead of rejecting the whole file.
- **Database-Enforced Security**: Row Level Security on every table, a `current_app_role()` function that trusts only server-controlled `app_metadata` **and** an active `admin_profiles` row, and a trigger that writes an `admin_audit_logs` entry (actor, action, changed fields, before and after data) for every admin insert, update, or delete. Browsers cannot insert audit rows themselves.
- **Verified Sessions in SSR Hooks**: `hooks.server.ts` re-verifies the user with `auth.getUser()` instead of trusting cookie payloads, refreshes stale sessions once, and adds long-lived cache headers to static assets.
- **Public Experience**: A landing page with hero video, GSAP and Lenis motion, a service showcase, FAQ, a WhatsApp chatbot widget, and a **Universal Search** (`Ctrl/Cmd + K`) that highlights matches on public pages and is blocked on `/admin`.

![SIKOPLING Admin-to-Public Data Flow](/projects/sikopling/data-flow.svg)

### Sanitized Public Queue

Below is the server-side query from `src/lib/server/public-queue.ts` that feeds the public queue. Only whitelisted columns are selected, and statuses are mapped per document type:

```typescript
const { data, error } = await supabase
	.from(tableName as 'monitoring_perling')
	.select(
		`no_registrasi, tanggal_masuk, instansi, kegiatan, jenis_layanan:${jenisColumn}, posisi, status, tanggal_update`
	)
	.order('tanggal_update', { ascending: false, nullsFirst: false })
	.limit(300)

return (data ?? []).map((row) => ({
	registrationNo: row.no_registrasi ?? '-',
	agency: row.instansi ?? '-',
	activity: row.kegiatan ?? '-',
	documentType: row.jenis_layanan ?? '-',
	position: asQueuePosition(row.posisi),
	progressStatus:
		layanan === 'perling'
			? mapPerlingStatus(row.status, row.jenis_layanan) // AMDAL vs non-AMDAL flow
			: mapPertekStatus(row.status),
	progressUpdatedDate: row.tanggal_update ?? row.tanggal_masuk
}))
```

### Admin Role From a Trusted Source

Below is the role check from `supabase/migrations/20260824090000_harden_admin_role_source.sql`. A role in user-editable metadata is ignored; the account must also have an active admin profile:

```sql
create or replace function public.current_app_role()
returns text
language sql
stable
security definer
set search_path = public, auth
as $$
  select case
    when exists (
      select 1
      from public.admin_profiles p
      where p.id = auth.uid()
        and p.is_active = true
        and p.role = role_data.role
    ) then role_data.role
    else 'anonymous'
  end
  from (
    select coalesce(
      nullif(lower(trim(auth.jwt() -> 'app_metadata' ->> 'role')), ''),
      nullif(lower(trim(auth.jwt() -> 'app_metadata' ->> 'user_role')), '')
    ) as role
  ) role_data;
$$;
```

### Public and Admin Surfaces

| Area                   | Routes                                             | Access                  | Key Capabilities                                         |
| ---------------------- | -------------------------------------------------- | ----------------------- | -------------------------------------------------------- |
| **Public queue**       | `/layanan/perling`, `/layanan/pertek`              | Anyone                  | Search, filter, sort, paginate, CSV export               |
| **Announcements**      | `/pengumuman/perling`, `/pertek`, `/integrasi`     | Anyone                  | Published notices per service                            |
| **Admin console**      | `/admin/dashboard`, `/admin/layanan/*`             | Active `admin` role     | Metrics, CRUD, bulk delete, status and position updates  |
| **Bulk data**          | `/admin/api/[layanan]/import`, `/export`           | Active `admin` role     | Validated CSV import with per-row errors, CSV export     |
| **Governance**         | `/admin/audit-log`, `/admin/akun`                  | `super_admin` only      | Trigger-written audit trail, admin account management    |

## Impact

Delivered a working public service portal for the provincial environmental agency: applicants can check their application stage online at any time, and officers maintain the queue from one console with bulk CSV tools instead of updating records one by one. Access control and audit logging are enforced in the database itself, so the public view stays limited to safe fields and every admin change remains traceable.
