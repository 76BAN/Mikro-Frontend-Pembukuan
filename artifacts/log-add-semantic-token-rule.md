# Log: Penambahan Aturan Pengembangan Semantic Color Tokens dan Clean Architecture

Tanggal: 2026-10-14  
Harness / Author: Senior Frontend Engineer (OMP)  
Scope: root, AGENTS.md, README.md, artifacts  

## 1. Konteks & Tujuan
Menetapkan aturan standar pengembangan resmi ke dalam proyek:
1. Memastikan setiap developer maupun AI agent mematuhi arsitektur bersih (*Clean Architecture*), *component colocation*, dan konsistensi struktur file.
2. Mewajibkan penggunaan **token semantik** yang telah disediakan di `packages/ui/src/styles/theme.css` (`bg-canvas`, `bg-surface`, `bg-surface-hover`, `border-border`, `text-muted`).
3. Melarang keras penggunaan nilai hex sembarang (*hardcoded arbitrary hex* seperti `dark:bg-[#1A202C]`, `dark:bg-[#2D3748]`, `dark:border-[#4A5568]`) di seluruh modul aplikasi dan komponen shared UI.

## 2. Siklus TDD (Test-Driven Development)
- **Unit Test Path**: N/A (Dokumentasi standar arsitektur & rule enforcement).
- **Status Green**: Seluruh unit test eksisting di monorepo (114 tests) tetap valid dan lulus 100%.

## 3. Daftar Perubahan File
- **Added**:
  - `artifacts/log-add-semantic-token-rule.md`
- **Modified**:
  - `AGENTS.md` (Menambahkan seksi aturan ke-2: Kepatuhan Design System & Semantic Color Tokens)
  - `README.md` (Memperbarui tabel spesifikasi token dengan utility class serta catatan aturan wajib)
  - `artifacts/TEMPLATE-log.md` (Menambahkan checklist kepatuhan clean architecture dan semantic tokens)

## 4. Kepatuhan Standar Desain & Arsitektur
- **Clean Architecture & Colocation**: PASS (Pemisahan layer presentation, controller/hooks, dan shared UI atomik tetap konsisten).
- **Kepatuhan Semantic Color Tokens**: PASS (Semua panduan mewajibkan token utility semantik adaptif).

## 5. Hasil Validasi Mutlak
- `npm run lint`: PASS (0 errors, 0 warnings)
- `npm run typecheck`: PASS (0 errors)
- `npm run test`: PASS (114 passed)
- `npm run build`: PASS (Build produksi seluruh aplikasi sukses)
