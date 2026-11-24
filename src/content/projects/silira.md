---
title: SILIRA - Faculty Aspiration & Response Portal
description: A student aspiration and complaint portal for DPM Fakultas Dakwah dan Ilmu Komunikasi, featuring no-login ticket tracking, three-tier privacy controls, and a response dashboard for student council administrators.
description_id: Portal layanan aspirasi dan pengaduan mahasiswa untuk DPM Fakultas Dakwah dan Ilmu Komunikasi dengan pelacakan kode tiket tanpa login, opsi privasi tiga tingkat, dan dashboard tindak lanjut pengurus.
date: 2024-11-09
category: Website
tags: Civic Tech, Public Service, Student Government, Laravel, Full-Stack
projectType: Personal
team: M. Kaspul Anwar | https://github.com/anwarpage
institution: DPM Fakultas Dakwah dan Ilmu Komunikasi
image: /projects/silira.png
githubUrl: https://github.com/anwarpage/silira
techStack: PHP, Laravel, Blade, Tailwind CSS, SQLite, MySQL, JavaScript, PHPUnit
---

SILIRA (*Sistem Integrasi Layanan Interaksi dan Respon Aspirasi*) is a faculty-level aspiration and complaint portal built for the work program of Dewan Perwakilan Mahasiswa (DPM) Fakultas Dakwah dan Ilmu Komunikasi. Inspired by Indonesia's national public complaint platform `lapor.go.id`, it gives students a direct way to submit aspirations, complaints, or information requests without needing to create an account.

## Why Not a Plain Form

A standard Google Form only collects one-way entries into a spreadsheet. For a student council handling real faculty issues, three practical gaps show up quickly:

- **No Status Visibility**: Once a student clicks submit on a plain form, they have no way of knowing whether their report was read, forwarded to faculty leadership, or resolved.
- **One-Way Communication**: Follow-up questions or extra evidence end up scattered across personal chats instead of staying attached to the report.
- **No Structured Privacy**: Sensitive complaints need to stay confidential, while general campus suggestions benefit from public transparency.

## Key Features

### Public Portal (No Login Required)
- **Report Submission**: Supports three classifications (`Aspirasi`, `Pengaduan`, `Permintaan Informasi`), searchable faculty categories, optional incident date/location, and file attachments (images or PDF up to 5 MB).
- **Unique Ticket Code**: Every submission generates a trackable code (`SLR-YYYY-XXXXXX`) with one-click copy and a printable receipt.
- **Status Tracking & Two-Way Replies**: Students enter their ticket code to view progress (`Menunggu` → `Diverifikasi` → `Diproses` → `Selesai` / `Ditolak`), read official DPM responses, and send follow-up clarifications or evidence directly on the ticket page.
- **Three Privacy Modes**: Reporters choose between **Publik** (shown on the public feed with name), **Anonim** (shown on the feed without identity), or **Rahasia** (hidden from the public feed, accessible only via ticket code and DPM admins).

### DPM Admin Portal
- **Operational Dashboard**: Tracks report totals, completion rate, category distribution, and pending verification queues.
- **Report Management & Responses**: Search and filter by status, category, or month; update ticket statuses; post official public replies or private internal DPM notes; contact reporters directly via WhatsApp; and edit or delete records.
- **Filtered CSV Export & Master Data**: Exports report summaries matching active filters (UTF-8 BOM for Excel) alongside management pages for categories and admin accounts.

## Project History

SILIRA started in November 2024 as a lightweight native PHP and MySQLi prototype (preserved under the `v1-php-native` Git tag). It was later refactored into Laravel with Blade, Tailwind CSS, SQLite/MySQL migrations, and PHPUnit feature tests to properly handle authentication, privacy isolation, and ticket workflows.
