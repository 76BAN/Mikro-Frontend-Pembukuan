# Log: Penambahan Panduan Git Flow Kontributor di README

Tanggal: 2026-10-13  
Harness / Author: OMP Assistant  
Scope: `README.md`  

## 1. Konteks & Tujuan
Menambahkan panduan langkah demi langkah Git Flow untuk kontributor di `README.md`:
- Perintah memulai fitur via `git flow feature start` maupun `git checkout -b feature/*`.
- Alur TDD, Clean Code, dan pencatatan artifact log.
- Publikasi branch via `git flow feature publish` untuk membuka Pull Request ke `develop`.
- Larangan menjalankan `git flow feature finish` di lokal karena merge harus melewati PR dan Branch Protection di GitHub.
- Cara membersihkan branch lokal setelah merge.

## 2. Hasil Validasi
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run test`: PASS.
