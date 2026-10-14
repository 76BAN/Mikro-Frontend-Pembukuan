# Pembukuan v2 (Micro-Frontend Monorepo)

Aplikasi web manajemen pembukuan modern berbasis arsitektur **Micro-Frontend (MFE)** terdistribusi dengan **npm workspaces**, **Vite Module Federation**, dan **React**.

---

## 1. Informasi Aplikasi

**Pembukuan v2** dirancang untuk mendukung skalabilitas pengembangan multi-tim, di mana aplikasi utama (Host) dan modul-modul fungsional (Remotes) dapat dikembangkan, diuji, dan dideploy secara independen tanpa ketergantungan deployment monolitis.

### Repositori & Remote
- **Remote Origin**: `git@github.com:76BAN/Mikro-Frontend-Pembukuan.git`
- **Branch Utama**: `main` (Produksi) & `develop` (Integrasi Pengembangan)

---

## 2. Arsitektur Aplikasi

```text
pembukuan-v2/
├── apps/
│   ├── host-layout/          # Port 3000: Shell / Host Container (Orkestrator MFE)
│   ├── remote-login/         # Port 3001: Remote Micro-Frontend (Modul Autentikasi)
│   ├── remote-dashboard/     # Port 3002: Remote Micro-Frontend (Modul Dashboard & Keuangan)
│   └── remote-design-system/ # Port 3003: Remote Micro-Frontend (Modul Panduan & Desain Komponen)
│   └── ui/                   # Shared Atomic UI Library (@pembukuan/ui)
├── artifacts/                # Dokumentasi log perubahan fitur (log-[feature].md)
└── .github/workflows/        # CI/CD terpisah per aplikasi berbasis path filter
```

### Konvensi Port Development Lokal
- **`host-layout`**: `http://localhost:3000`
- **`remote-login`**: `http://localhost:3001`
- **`remote-dashboard`**: `http://localhost:3002`
- **`remote-design-system`**: `http://localhost:3003`
- *Pola remote masa depan*: `remote-laporan` (Port `3004`), dst.

### Pola Desain (Clean Architecture & Colocation)
- **Host**: Menerapkan *Thin Route Controllers* di `routes/` dan memisahkan tampilan ke `features/` (`dashboard`, `auth`).
- **Remote**: Mengekstrak logika form ke custom hooks (`useLoginForm`) dan presentasi UI murni.
- **Shared UI**: Menerapkan pola *Component Colocation* per-folder (`Button/`, `TextInput/`, `Header/`) lengkap dengan unit test dan re-export.


---

## 3. Design System, Theme & Canvas Palette

Aplikasi menerapkan sistem tema dinamis (Light & Dark Mode) berbasis Tailwind CSS v4 dengan integrasi state global via Zustand (`themeStore`) dan kontrol visual komponen `Switch` dari `@pembukuan/ui`.

### Palet Warna & Spesifikasi Canvas

| Token Semantik | Utility Class | Light Theme | Dark Theme | Kegunaan |
|---|---|---|---|---|
| **Canvas (Background)** | `bg-canvas` | `#E2E8F0` | `#1A202C` | Background utama root layout aplikasi |
| **Surface (Card / Container)** | `bg-surface` | `#FFFFFF` | `#2D3748` | Kontainer card, panel, form, dan slot modul |
| **Surface Hover / Active** | `bg-surface-hover` | `#F1F5F9` | `#374151` | State hover elemen interaktif & sub-container |
| **Border / Divider** | `border-border` | `#CBD5E1` | `#4A5568` | Pembatas antar-seksi dan garis form input |
| **Text Muted / Secondary** | `text-muted` | `#64748B` | `#94A3B8` | Label sekunder, deskripsi, dan helper text |
| **Button Primary** | `bg-blue-600` | `#2563EB` | `#3B82F6` | Tombol aksi utama (submit, tambah transaksi) |
| **Status Success** | `text-green-700` | `#16A34A` | `#22C55E` | Metrik pemasukan dan indikator status aktif |
| **Status Danger** | `text-red-700` | `#DC2626` | `#EF4444` | Metrik pengeluaran dan pesan error validasi |
| **Focus Ring / Accent** | `focus:ring-blue-500` | `#3B82F6` | `#60A5FA` | Indikator fokus aksesibilitas keyboard |

> **Aturan Wajib Pengembangan**: Dilarang keras menggunakan nilai hex arbitrary secara hardcoded (misal `dark:bg-[#1A202C]`). Seluruh komponen di `packages/ui` dan modul aplikasi wajib menggunakan token utility semantik (`bg-canvas`, `bg-surface`, `border-border`, `text-muted`, `bg-surface-hover`). File tema terpusat disediakan di `@import "../../../packages/ui/src/styles/theme.css";`.
### Mekanisme Theming Micro-Frontend
Tema dikontrol dari Host Shell melalui class `.dark` pada `document.documentElement` (`<html>`). Seluruh remote micro-frontend (`remote-login`, `remote-dashboard`) secara otomatis mengadopsi tema aktif tanpa perlu sinkronisasi event bus lintas aplikasi.
---

## 4. Tech Stack & Library

| Kategori | Teknologi | Deskripsi |
|---|---|---|
| **Runtime & Workspace** | Node.js (v20+ / v22+), npm Workspaces | Manajemen paket monorepo terpadu tanpa build tool berat |
| **Bundler & MFE** | Vite 5, `@originjs/vite-plugin-federation` | Bundler kilat dengan kapabilitas runtime Module Federation |
| **UI Framework** | React 18, TypeScript 5 | Library frontend deklaratif dengan type-safety ketat |
| **Routing** | `@tanstack/react-router` | Routing berbasis TypeScript aman tipe (type-safe) |
| **State Management** | `zustand` | Store global ringan untuk sesi autentikasi (`authStore`) |
| **Server State / API** | `@tanstack/react-query` | Caching, revalidasi, dan data fetching client |
| **Styling** | `tailwindcss` v4, `@tailwindcss/vite` | Utility-first CSS generasi terbaru |
| **CSS Utilities** | `clsx`, `tailwind-merge` | Penggabungan class Tailwind dinamis via helper `cn()` |
| **Icons** | `lucide-react` | Icon SVG modern, ringan, dan tree-shakeable |
| **Testing** | `vitest`, `@testing-library/react`, `jsdom` | Test runner modern kompatibel Vite untuk siklus TDD |
| **Git Hooks & Quality** | `husky`, `lint-staged`, ESLint 9 | Otomasi pre-commit linting, type-checking, dan test |

---

## 5. Aturan Pengembangan (Rules)

Setiap pengembang maupun AI agent wajib mematuhi aturan baku di [`AGENTS.md`](./AGENTS.md):

1. **Konsistensi Arsitektur**:
   - Host di `apps/host-layout` (port 3000).
   - Remote berawalan `apps/remote-[nama-modul]` (port 3001, 3002, dst).
   - Komponen bersama di `packages/ui/src/components/[NamaKomponen]/`.
2. **Artifact Logging**:
   - Setiap fitur baru wajib mencatat file `artifacts/log-[feature].md` mengikuti template `artifacts/TEMPLATE-log.md`.
3. **Clean Code & TDD (Test-Driven Development)**:
   - Tulis unit test terlebih dahulu (`*.test.tsx`) sebelum implementasi (Red $\rightarrow$ Green $\rightarrow$ Refactor).
4. **Git Flow Standard**:
   - `main`: Rilis produksi.
   - `develop`: Integrasi aktif.
   - `feature/*`: Dibuat dari `develop`, digabung kembali ke `develop` via PR.
   - `hotfix/*`: Dibuat dari `main` untuk perbaikan darurat.
5. **Pre-commit Gate**:
   - `git commit` otomatis menjalankan `lint-staged` (`eslint --fix`), `npm run typecheck`, dan `npm run test`. Jika ada kegagalan, commit ditolak otomatis.

---

## 6. Cara Instalasi & Menjalankan Project

### Prasyarat
- Node.js versi 20 ke atas
- npm versi 10 ke atas
- Git

### Langkah Instalasi
```bash
# 1. Clone repositori
git clone git@github.com:76BAN/Mikro-Frontend-Pembukuan.git
cd Mikro-Frontend-Pembukuan

# 2. Install seluruh dependency di root dan workspaces
npm install
```

### Menjalankan Development Server
```bash
# Menjalankan seluruh aplikasi secara bersamaan (Host + Remote)
npm run dev

# ATAU jalankan secara terpisah di terminal berbeda:
npm run dev:host    # Host Layout di http://localhost:3000
npm run dev:login       # Remote Login di http://localhost:3001
npm run dev:dashboard   # Remote Dashboard di http://localhost:3002
```

### Menjalankan Pengujian & Validasi Mutlak
```bash
# Menjalankan unit test (Vitest)
npm run test

# Menjalankan pengecekan TypeScript (typecheck)
npm run typecheck

# Menjalankan linter
npm run lint

# Memperbaiki formatting dan lint secara otomatis
npm run lint:fix

# Membangun produksi seluruh aplikasi
npm run build
```

---

## 7. Panduan Kontribusi (Git Flow Workflow)

Setiap kontributor wajib mengikuti alur kerja Git Flow berikut:

### A. Memulai Fitur Baru
Pastikan berada di branch `develop` terbaru:
```bash
# Menggunakan CLI git-flow:
git flow feature start nama-fitur

# ATAU menggunakan perintah git standar:
git checkout develop
git pull origin develop
git checkout -b feature/nama-fitur
```

### B. Siklus Pengembangan (TDD & Clean Code)
1. Tulis unit test terlebih dahulu (`*.test.tsx`) $\rightarrow$ pastikan gagal (Red).
2. Tulis implementasi kode sampai seluruh test lulus (Green).
3. Rapikan kode (Refactor) mengikuti standar Clean Architecture (Route tipis, komponen di `features/` atau `packages/ui`).
4. Buat catatan perubahan di `artifacts/log-[nama-fitur].md` mengikuti template `artifacts/TEMPLATE-log.md`.

### C. Commit Kode
```bash
git add .
git commit -m "feat: deskripsi perubahan fitur"
```
*Pre-commit hook (Husky + lint-staged) akan memvalidasi lint, typecheck, dan unit test otomatis.*

### D. Mempublikasikan Fitur & Membuka Pull Request
```bash
# Menggunakan CLI git-flow:
git flow feature publish nama-fitur

# ATAU menggunakan perintah git standar:
git push -u origin feature/nama-fitur
```
1. Buka GitHub $\rightarrow$ buat **Pull Request**:
   - **Base branch**: `develop`
   - **Compare branch**: `feature/nama-fitur`
2. Pastikan seluruh pipeline CI/CD GitHub Actions berstatus hijau.
3. Dapatkan persetujuan (approval) dari reviewer, lalu **Merge Pull Request** di GitHub.

> **⚠️ Catatan Penting:**  
> Jangan menjalankan `git flow feature finish` di lokal karena merge wajib dilakukan melalui GitHub Pull Request yang dilindungi oleh *Branch Protection Rules*.

### E. Membersihkan Branch Lokal
Setelah PR berhasil di-merge di GitHub:
```bash
git checkout develop
git pull origin develop
git branch -d feature/nama-fitur
```
