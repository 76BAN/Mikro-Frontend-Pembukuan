# Aturan Monorepo Micro-Frontend (pembukuan-v2)

Wajib dipatuhi oleh setiap developer maupun AI agent/harness sebelum dan selama melakukan pengembangan.

## 1. Konsistensi Arsitektur & Clean Code
- **Host App**: Lokasi `apps/host-layout` (port default development: `3000`).
- **Remote App**: Lokasi `apps/remote-[nama-modul]` (port sequence: `3001`, `3002`, `3003`, dst). Contoh: `apps/remote-login` (3001), `apps/remote-dashboard` (3002), `apps/remote-design-system` (3003).
- **Shared Library**: Lokasi `packages/ui` (komponen atomik dengan pola colocation per folder).
- **Clean Architecture**: Pisahkan layer komponen (`features/`), routing tipis (`routes/`), dan state store (`store/`). Jangan campuradukkan presentasi UI di dalam route controller.

## 2. Kepatuhan Design System & Semantic Color Tokens (Wajib)
- **Wajib Menggunakan Semantic Tokens**: Seluruh styling pada `packages/ui`, `apps/host-layout`, dan remote modules DILARANG menggunakan hardcoded arbitrary hex color (seperti `#1A202C`, `#2D3748`, `#4A5568`, `#94A3B8`, dsb.).
- **Daftar Token Utilitas Wajib**:
  - `bg-canvas`: Background kanvas root aplikasi (adaptif Light `#E2E8F0` / Dark `#1A202C`).
  - `bg-surface`: Background kontainer card, modal, dropdown, panel (adaptif Light `#FFFFFF` / Dark `#2D3748`).
  - `bg-surface-hover`: State hover interaktif untuk baris atau item (adaptif Light `#F1F5F9` / Dark `#374151`).
  - `border-border`: Garis pembatas, divider, dan border input (adaptif Light `#CBD5E1` / Dark `#4A5568`).
  - `text-muted`: Tipografi sekunder, deskripsi, dan helper text (adaptif Light `#64748B` / Dark `#94A3B8`).
- **Konsistensi Stylesheet MFE**: Setiap remote module baru WAJIB mengimpor stylesheet tema bersama `@import "../../../packages/ui/src/styles/theme.css";` di dalam `src/index.css`.

## 3. Pencatatan Artifact Log
- Setiap penambahan/perubahan fitur WAJIB dicatat dalam file `artifacts/log-[feature].md`.
- Ikuti template baku di `artifacts/TEMPLATE-log.md`.
- Setiap log wajib mencatat: tujuan fitur, kepatuhan arsitektur/token semantic, siklus TDD (red-green-refactor), perubahan file, dan bukti validasi.

## 4. Clean Code & TDD (Test-Driven Development)
- Tulis unit test terlebih dahulu (`*.test.tsx` / `*.spec.ts`) sebelum menulis implementasi fitur.
- Jalankan test dan amati kegagalan (Red).
- Tulis implementasi minimal untuk membuat test berhasil (Green).
- Refactor kode untuk menjaga kualitas, keterbacaan, dan performa (Refactor).

## 5. Validasi Mutlak
Sebelum pekerjaan dianggap selesai atau dicommit, seluruh perintah berikut WAJIB lolos tanpa error:
1. `npm run lint:fix` (atau `npm run lint`)
2. `npm run typecheck`
3. `npm run test`

## 6. Standar Git Flow
- **`main`**: Branch produksi (rilis stabil). Tidak boleh commit langsung kecuali via merge release/hotfix.
- **`develop`**: Branch integrasi harian. Seluruh pekerjaan fitur digabungkan ke sini.
- **`feature/[nama-fitur]`**: Dibuat dari `develop`, di-merge kembali ke `develop`.
- **`release/[versi]`**: Dibuat dari `develop`, di-merge ke `main` dan `develop`.
- **`hotfix/[nama-perbaikan]`**: Dibuat dari `main`, di-merge ke `main` dan `develop`.
- Gunakan pesan commit deskriptif (Conventional Commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`).
