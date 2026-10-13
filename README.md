# Pembukuan v2 (Micro-Frontend Monorepo)

Monorepo arsitektur Micro-Frontend berbasis npm workspaces, Vite, Module Federation, dan React.

## Struktur Direktori
- `apps/host-layout`: Host / Shell application (Port `3000`)
- `apps/remote-login`: Remote application modul login (Port `3001`)
- `packages/ui`: Shared atomic UI library (`@pembukuan/ui`)
- `artifacts/`: Dokumentasi log perubahan per fitur (`log-[feature].md`)

## Aturan Wajib
Baca panduan lengkap di [AGENTS.md](./AGENTS.md) sebelum melakukan perubahan.

## Menjalankan Project
```bash
# Install seluruh dependency
npm install

# Menjalankan seluruh aplikasi paralel
npm run dev

# Menjalankan spesifik app
npm run dev:host    # Host di port 3000
npm run dev:login   # Remote login di port 3001

# Validasi kode
npm run lint
npm run typecheck
npm run test
```
