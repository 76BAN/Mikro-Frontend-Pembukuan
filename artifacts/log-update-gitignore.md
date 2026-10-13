# Log: Update .gitignore Rules

Tanggal: 2026-10-13  
Harness / Author: OMP Assistant  
Scope: Root `.gitignore`  

## 1. Konteks & Tujuan
Audit dan standardisasi aturan `.gitignore` agar mencakup seluruh folder dan file di monorepo:
- Mengabaikan output build (`dist/`, `build/`, `*.tsbuildinfo`, `.vite/`).
- Mengabaikan environment variables lokal (`.env`, `.env.local`, `.env.*.local`).
- Mengabaikan laporan test coverage (`coverage/`).
- Mengabaikan log npm/yarn/pnpm.
- Mengabaikan temporary files dari OS dan editor (`.DS_Store`, `Thumbs.db`, `.idea/`).

## 2. Hasil Audit
- File cache build seperti `apps/host-layout/tsconfig.tsbuildinfo`, `apps/remote-login/tsconfig.tsbuildinfo`, dan `packages/ui/tsconfig.tsbuildinfo` terkonfirmasi ter-ignore dengan benar.
- Folder `node_modules` di root dan seluruh workspace ter-ignore dengan benar.
- `git status` hanya menampilkan source code murni, konfigurasi, dan file workflow CI/CD.

## 3. Hasil Validasi
- `git status`: Bersih dari build artifacts dan cache.
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run test`: PASS.
