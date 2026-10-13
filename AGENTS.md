# Aturan Monorepo Micro-Frontend (pembukuan-v2)

Wajib dipatuhi oleh setiap developer maupun AI agent/harness sebelum dan selama melakukan pengembangan.

## 1. Konsistensi Arsitektur
- **Host App**: Lokasi `apps/host-layout` (port default development: `3000`).
- **Remote App**: Lokasi `apps/remote-[nama-modul]` (port sequence: `3001`, `3002`, dst). Contoh: `apps/remote-login` di port `3001`.
- **Shared Library**: Lokasi `packages/ui` (komponen atomik dengan pola colocation per folder).
- **Clean Architecture**: Pisahkan layer komponen (`features/`), routing tipis (`routes/`), dan state store (`store/`). Jangan campuradukkan presentasi UI di dalam route controller.

## 2. Pencatatan Artifact Log
- Setiap penambahan/perubahan fitur WAJIB dicatat dalam file `artifacts/log-[feature].md`.
- Ikuti template baku di `artifacts/TEMPLATE-log.md`.
- Setiap log wajib mencatat: tujuan fitur, siklus TDD (red-green-refactor), perubahan file, dan bukti validasi.

## 3. Clean Code & TDD (Test-Driven Development)
- Tulis unit test terlebih dahulu (`*.test.tsx` / `*.spec.ts`) sebelum menulis implementasi fitur.
- Jalankan test dan amati kegagalan (Red).
- Tulis implementasi minimal untuk membuat test berhasil (Green).
- Refactor kode untuk menjaga kualitas, keterbacaan, dan performa (Refactor).

## 4. Validasi Mutlak
Sebelum pekerjaan dianggap selesai atau dicommit, seluruh perintah berikut WAJIB lolos tanpa error:
1. `npm run lint:fix` (atau `npm run lint`)
2. `npm run typecheck`
3. `npm run test`

## 5. Standar Git Flow
- **`main`**: Branch produksi (rilis stabil). Tidak boleh commit langsung kecuali via merge release/hotfix.
- **`develop`**: Branch integrasi harian. Seluruh pekerjaan fitur digabungkan ke sini.
- **`feature/[nama-fitur]`**: Dibuat dari `develop`, di-merge kembali ke `develop`.
- **`release/[versi]`**: Dibuat dari `develop`, di-merge ke `main` dan `develop`.
- **`hotfix/[nama-perbaikan]`**: Dibuat dari `main`, di-merge ke `main` dan `develop`.
- Gunakan pesan commit deskriptif (Conventional Commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`).
