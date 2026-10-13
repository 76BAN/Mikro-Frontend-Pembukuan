# Log: Fix GitHub Actions Required Status Check on PR

Tanggal: 2026-10-13  
Harness / Author: OMP Assistant  
Scope: `.github/workflows/deploy-host-layout.yml`, `.github/workflows/deploy-remote-login.yml`  

## 1. Konteks & Akar Masalah
Pada halaman Pull Request GitHub, status check menampilkan pesan:
*"Lint, Test, Build, and Deploy Host Layout Expected — Waiting for status to be reported"*, dan tombol merge terkunci tanpa progres.

**Akar Masalah:**
- Pada konfigurasi workflow, event `pull_request` dibatasi oleh filter `paths: ['apps/host-layout/**', 'packages/ui/**']`.
- PR yang dibuat hanya memodifikasi file dokumentasi (`README.md`, `AGENTS.md`, `artifacts/`).
- Karena tidak ada file yang cocok dengan filter path, GitHub Actions melewatkan (skip) eksekusi workflow secara keseluruhan.
- Namun di Branch Protection / Ruleset, job tersebut ditandai sebagai **Required**. GitHub akhirnya menunggu selamanya laporan dari workflow yang tidak pernah dimulai.

## 2. Solusi
- Menghapus filter `paths` khusus pada event `pull_request`. Setiap PR ke `main` dan `develop` akan selalu menjalankan validasi (`lint`, `typecheck`, `test`, `build`), menjamin status check selalu dilaporkan ke GitHub.
- Filter `paths` tetap dipertahankan pada event `push` (deployment) agar deploy hanya berjalan saat aplikasi target diubah.

## 3. Hasil Validasi
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run test`: PASS.
