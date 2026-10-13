# Aturan Monorepo Micro-Frontend (pembukuan-v2)

Wajib dipatuhi oleh setiap developer maupun AI agent/harness sebelum dan selama melakukan pengembangan.

## 1. Konsistensi Arsitektur
- **Host App**: Lokasi `apps/host-layout` (port default development: `3000`).
- **Remote App**: Lokasi `apps/remote-[nama-modul]` (port sequence: `3001`, `3002`, dst). Contoh: `apps/remote-login` di port `3001`.
- **Shared Library**: Lokasi `packages/ui` (komponen atomik) atau `packages/[nama-package]`.
- **Clean Architecture**: Pisahkan layer komponen (presentation) dan logika bisnis/domain. Jangan campuradukkan urusan remote dan host di luar kontrak Module Federation.

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
Sebelum pekerjaan dianggap selesai, seluruh perintah berikut WAJIB lolos tanpa error:
1. `npm run lint:fix` (atau `npm run lint`)
2. `npm run typecheck`
3. `npm run test`
