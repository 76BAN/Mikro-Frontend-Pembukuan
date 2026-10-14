# Log: Fix GitHub Actions npm ci EUSAGE Lockfile Sync

Tanggal: 2026-10-14  
Harness / Author: Senior Frontend Engineer (OMP)  
Scope: root, package-lock.json, CI/CD  

## 1. Konteks & Akar Masalah
Setelah menambahkan modul baru `apps/remote-design-system`, seluruh GitHub Actions status check untuk host dan remote gagal pada step `Install dependencies` (`npm ci`).

**Akar Masalah:**
- Modul baru `apps/remote-design-system` ditambahkan ke workspace monorepo, tetapi `package-lock.json` belum disinkronisasi melalui `npm install`.
- Pada GitHub Actions, perintah `npm ci` mewajibkan `package.json` dan `package-lock.json` identik 100%.
- Karena entri `apps/remote-design-system` dan `node_modules/remote-design-system` belum ada di `package-lock.json`, npm melempar error:
  `npm error code EUSAGE: Missing: remote-design-system@1.0.0 from lock file`
- Hal ini menyebabkan seluruh 4 workflow gagal pada step install dependencies sebelum masuk ke tahap linting atau pengujian.

## 2. Solusi Perbaikan
1. Menjalankan `npm install` untuk memperbarui dan mensinkronisasikan `package-lock.json` dengan workspace `apps/remote-design-system`.
2. Menguji validasi `npm ci --dry-run` secara lokal untuk memastikan clean install berhasil tanpa error `EUSAGE`.

## 3. Hasil Validasi
- `npm ci --dry-run`: PASS (Lockfile sinkron, 0 error).
- `npm run lint`: PASS (0 errors).
- `npm run typecheck`: PASS (0 errors).
- `npm run test`: PASS (121 tests passed across 25 test files).
- `npm run build`: PASS (Seluruh workspace host + remotes ter-build sukses).
