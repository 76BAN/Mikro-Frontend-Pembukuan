# Log: Fix MFE Dev Runner & Concurrency

Tanggal: 2026-10-13  
Harness / Author: OMP Assistant  
Scope: root `package.json`, Dev Orchestration  

## 1. Konteks & Tujuan
Saat menjalankan `npm run dev` bawaan (`npm run dev --workspaces`), terjadi blocking serial pada `host-layout` (port 3000), sehingga `remote-login` (port 3001) tidak pernah dieksekusi oleh npm. Akibatnya host menampilkan fallback error: *"Modul Login Remote sedang tidak aktif"*.

Selain itu, `@originjs/vite-plugin-federation` hanya memproduksi `remoteEntry.js` saat build. Mode dev murni pada remote menyajikan native unbundled ESM yang tidak menyediakan file virtual federation untuk host.

## 2. Solusi
- Menambahkan dependensi `concurrently` di root devDependencies.
- Mengubah script root `npm run dev`:
  1. Build `remote-login` lebih dulu agar `remoteEntry.js` ter-generate.
  2. Menjalankan `apps/host-layout` (dev) dan `apps/remote-login` (preview port 3001) secara bersamaan (paralel).
- Menambahkan script terpisah: `npm run dev:host` dan `npm run dev:login`.

## 3. Daftar Perubahan File
- **Modified**:
  - `package.json`
- **Added**:
  - `artifacts/log-fix-mfe-dev-runner.md`

## 4. Hasil Validasi Mutlak
- `npm run lint`: PASS (0 errors, 0 warnings)
- `npm run typecheck`: PASS (0 errors)
- `npm run test`: PASS (13 tests passed)
