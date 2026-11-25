# Brand Guidelines — M. Kaspul Anwar (`@mkaspulanwar`)

Panduan identitas visual (tipografi dan warna) untuk website personal dan karya digital **M. Kaspul Anwar**.

---

## 1. Karakter Visual

- **Arah desain:** *Scandinavian Minimalist / Builder* — jujur, tajam, fokus pada keterbacaan tulisan panjang, dengan sentuhan manusiawi melalui aksen tulisan tangan dan tekstur ilustrasi gouache.
- **Prinsip utama:** Disiplin menggunakan **3 font utama** yang punya peran jelas tanpa font generik/template.

---

## 2. Tipografi (Final)

Konfigurasi font dimuat melalui `next/font/google` di `src/app/layout.tsx` dan dipetakan ke CSS token di `src/app/globals.css`.

### Daftar Font Utama

| Peran | Font | Weight & Style | Token CSS / Tailwind | Penggunaan |
| :--- | :--- | :--- | :--- | :--- |
| **Heading** | **Schibsted Grotesk** | `500, 600, 700` (normal & italic) | `--font-heading` / `font-heading` | Judul situs (`.site-title`), judul halaman (`h1`), heading section (`.section-heading`), dan `h2` artikel |
| **Body & UI** | **Atkinson Hyperlegible Next** | `400, 500, 600, 700` (normal & italic) | `--font-body` / `font-body` | Teks paragraf utama (`body`), artikel markdown, navigasi, metadata, sub-heading (`h3`), dan tabel |
| **Accent / Script** | **La Belle Aurore** | `400` (normal) | `--font-accent` / `font-script` | Kutipan (`blockquote`), nama di hero, tagline footer, dan highlight personal yang unik |

### Type Scale (Skala Ukuran)

| Elemen | Ukuran | Weight | Line Height / Tracking |
| :--- | :--- | :--- | :--- |
| **Page Heading (`h1`)** | `34px` (mobile) / `38px` (desktop) | `700` | `1.15` / `-0.03em` |
| **Site Title (`.site-title`)** | `28px`–`30px` (`clamp`) | `700` | `1.15` / `-0.03em` |
| **Section Heading (`h2`, `.section-heading`)** | `22px` (`1.375rem`) | `600` | `1.3` / `-0.025em` |
| **Sub-heading (`h3`)** | `16.5px` | `600` | `1.4` |
| **Body / Isi Konten** | `15.5px` | `400` | `1.7`–`1.74` |
| **Metadata / Nav** | `12px`–`13.5px` | `400`–`500` | `1.5` |

### Fallback & Code Stack

- **Heading fallback:** `ui-sans-serif, system-ui, sans-serif`
- **Body fallback:** `ui-sans-serif, system-ui, sans-serif`
- **Accent fallback:** `cursive`
- **Code snippet (khusus `<code>` & `<pre>` di artikel):** `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace` (`--font-code` — bawaan sistem, tanpa memuat Google Font tambahan).

### Aturan Penggunaan Tipografi

1. **Jangan** mencampur `font-heading` untuk paragraf panjang; gunakan khusus untuk judul dan penanda struktur utama.
2. **Jangan** memakai `font-script` (La Belle Aurore) pada ukuran kecil (`< 18px`) atau untuk teks navigasi/UI agar keterbacaan tetap terjaga.
3. Gunakan `tabular-nums` pada tahun dan angka di daftar proyek/tulisan atau tabel agar sejajar rapi.

---

## 3. Color Palette — Pure Monochrome (Final)

Skema warna **Pure Monochrome** yang tajam dan netral agar teks menjadi fokus utama dan ilustrasi banner gouache tampil menonjol tanpa gangguan warna lain.

### 5 Warna Inti

| Peran | Light Mode | Dark Mode | Kegunaan |
| :--- | :--- | :--- | :--- |
| **Background** (`--bg`) | `#FFFFFF` | `#000000` | Latar belakang utama halaman |
| **Surface** (`--surface-subtle`) | `#FAFAFA` | `#0A0A0A` | Card, kotak kutipan, latar gambar, header tabel, blok kode |
| **Text Utama** (`--text-heading`) | `#171717` | `#EDEDED` | Judul, teks bold, hover link, dan aksen utama |
| **Text Bacaan** (`--text-copy`) | `#262626` | `#D4D4D4` | Paragraf utama dan isi artikel |
| **Muted & Border** (`--text-nav` / `--line-subtle`) | `#666666` / `#EAEAEA` | `#888888` / `rgba(255,255,255,0.12)` | Navigasi, metadata, tahun, dan garis pemisah halus |

### Arti Istilah Warna

- **Background:** Latar belakang utama seluruh halaman (`#FFFFFF` di Light / `#000000` di Dark).
- **Surface (Permukaan):** Warna latar untuk kotak atau wadah yang duduk di atas Background utama supaya batasnya terasa halus tanpa bayangan tebal. *Contoh:* kotak kutipan, latar blok kode, header tabel, dan bingkai gambar (`#FAFAFA` / `#0A0A0A`).
- **Text Utama & Text Bacaan:** Warna teks dengan kontras tinggi untuk judul (`#171717` / `#EDEDED`) dan sedikit lebih lembut untuk paragraf panjang agar nyaman dibaca (`#262626` / `#D4D4D4`).
- **Muted (Redup / Pelengkap):** Warna abu-abu yang sengaja dibuat lebih lembut untuk informasi sekunder agar tidak berebut perhatian dengan konten utama. *Contoh:* tahun proyek, metadata lokasi/tanggal, panah `↗`, dan link navigasi sebelum di-hover (`#666666` / `#888888`).
- **Accent (Aksen / Penekanan):** Warna sorotan untuk menandai elemen penting atau interaksi (link aktif, hover, status terpilih). Karena brand ini memakai **Pure Monochrome**, aksennya tidak menggunakan warna cerah melainkan kontras paling tegas (`#171717` / `#EDEDED`).

### Aturan Penggunaan Warna

1. **Tanpa warna aksen mencolok di UI:** Interaksi (hover, link aktif, tombol) ditandai dengan perubahan kontras monokrom (dari *Muted* ke *Text Utama*) dan garis bawah tipis (`--line-strong`: `#D4D4D4` di Light / `rgba(255,255,255,0.28)` di Dark).
2. **Ilustrasi sebagai satu-satunya pusat warna:** Warna penuh hanya hadir pada elemen visual/ilustrasi (banner mercusuar, foto, dan tangkapan layar proyek) serta syntax highlighting kode di artikel.
3. **Konsistensi Light & Dark Mode:** Selalu gunakan CSS variable (`var(--bg)`, `var(--text-heading)`, dll.) di komponen agar transisi tema tetap otomatis dan konsisten.

---

## 4. Aturan Layout & Elemen yang Dihindari

1. **Dilarang menggunakan line divider:** Jangan pernah menambahkan garis pemisah horizontal (`<hr>`, `border-b`, atau `border-t`) untuk memisahkan header, navigasi, atau antar-section. Pemisahan antar-bagian harus mengandalkan **whitespace (ruang kosong)** dan hierarki tipografi.
2. **Border hanya untuk wadah tertutup:** Garis tipis (`--line-subtle`) hanya boleh dipakai sebagai bingkai wadah tertutup (seperti kartu hero, kotak kutipan, bingkai gambar, tombol pill, tabel, dan blok kode)—bukan sebagai garis pemisah bebas.
