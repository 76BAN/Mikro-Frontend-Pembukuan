# Log: Setup Pre-commit Hook dengan Husky & lint-staged

Tanggal: 2026-10-13  
Harness / Author: OMP Assistant  
Scope: Root repo, Git hooks, Pre-commit automation  

## 1. Konteks & Tujuan
Menyiapkan otomatisasi pra-commit (pre-commit hook) agar setiap kali developer atau agent melakukan `git commit`:
1. File yang di-stage (`git add`) otomatis diperbaiki stylenya via `eslint --fix`.
2. Hasil perbaikan otomatis di-stage kembali oleh `lint-staged`.
3. Validasi tipe (`npm run typecheck`) dijalankan ke seluruh monorepo.
4. Seluruh unit test (`npm run test`) dijalankan.
5. Commit hanya berhasil jika semua pemeriksaan lulus tanpa error.

## 2. Implementasi
- Menginstall paket `husky` dan `lint-staged` di root devDependencies.
- Menambahkan script `"prepare": "husky"` di root `package.json`.
- Menambahkan konfigurasi `lint-staged` di `package.json` untuk file `*.{ts,tsx,js,mjs}`.
- Membuat file hook `.husky/pre-commit`:
  ```bash
  npx lint-staged
  npm run typecheck
  npm run test
  ```

## 3. Daftar Perubahan File
- **Added**:
  - `.husky/pre-commit`
  - `artifacts/log-setup-husky-lint-staged.md`
- **Modified**:
  - `package.json`

## 4. Hasil Validasi
- `sh .husky/pre-commit`: PASS (lint-staged, typecheck, dan 27 unit tests lulus).
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run test`: PASS.
