# Log: Migrasi Semantic Color System pada Shared UI dan MFE

Tanggal: 2026-10-14  
Harness / Author: Senior Frontend Engineer (OMP)  
Scope: packages/ui, apps/host-layout, apps/remote-login, apps/remote-dashboard  

## 1. Konteks & Tujuan
Mengganti seluruh hardcoded arbitrary hex color (`dark:bg-[#1A202C]`, `dark:bg-[#2D3748]`, `dark:border-[#4A5568]`, `dark:bg-[#374151]`, `dark:text-[#94A3B8]`) di `@pembukuan/ui` dan modul aplikasi dengan semantic design tokens Tailwind v4 terpusat:
- Menghadirkan file stylesheet bersama: `packages/ui/src/styles/theme.css` yang mendefinisikan custom properties CSS adaptif (`--color-canvas`, `--color-surface`, `--color-surface-hover`, `--color-border`, `--color-muted`) serta utility token `@theme`.
- Mengimpor `theme.css` di seluruh stylesheet remote dan host (`host-layout/src/index.css`, `remote-login/src/index.css`, `remote-dashboard/src/index.css`).
- Mengalihkan utility class komponen shared UI:
  - `bg-surface` (otomatis `#ffffff` di light theme, `#2d3748` di dark theme)
  - `bg-canvas` (otomatis `#e2e8f0` di light theme, `#1a202c` di dark theme)
  - `border-border` (otomatis `#cbd5e1` di light theme, `#4a5568` di dark theme)
  - `text-muted` (otomatis `#64748b` di light theme, `#94a3b8` di dark theme)
  - `bg-surface-hover` (otomatis `#f1f5f9` di light theme, `#374151` di dark theme)

## 2. Siklus TDD (Test-Driven Development)
- **Unit Test Path**: Seluruh pengujian komponen di `packages/ui/src/components/**/*.test.tsx` dan integrasi host/remotes.
- **Skenario Pengujian**:
  1. Verifikasi rendering class semantik pada `Card`, `Button`, `TextInput`, `Modal`, `Select`, `Table`, `Tabs`, `Checkbox`, `DropdownMenu`, dan `Toast`.
  2. Verifikasi backward compatibility style props dan custom class overriding.
  3. Verifikasi build produksi Vite MFE dengan plugin `@tailwindcss/vite`.
- **Status Green**: 114 test lulus tanpa kegagalan (24 test suites).
- **Refactoring**: Menghilangkan 100% hardcoded arbitrary hex di dalam `packages/ui/src/components/`.

## 3. Daftar Perubahan File
- **Added**:
  - `packages/ui/src/styles/theme.css`
  - `artifacts/log-semantic-color-system-migration.md`
- **Modified**:
  - `packages/ui/package.json` (ekspor `./styles/theme.css`)
  - `packages/ui/src/components/Card/Card.tsx`
  - `packages/ui/src/components/Button/Button.tsx`
  - `packages/ui/src/components/TextInput/TextInput.tsx`
  - `packages/ui/src/components/Checkbox/Checkbox.tsx`
  - `packages/ui/src/components/DropdownMenu/DropdownMenu.tsx`
  - `packages/ui/src/components/Modal/Modal.tsx`
  - `packages/ui/src/components/Select/Select.tsx`
  - `packages/ui/src/components/Table/Table.tsx`
  - `packages/ui/src/components/Table/ServerTable.tsx`
  - `packages/ui/src/components/Tabs/Tabs.tsx`
  - `packages/ui/src/components/Toast/Toast.tsx`
  - `apps/host-layout/src/index.css`
  - `apps/host-layout/src/routes/__root.tsx`
  - `apps/remote-login/src/index.css`
  - `apps/remote-login/src/App.tsx`
  - `apps/remote-login/src/LoginForm.tsx`
  - `apps/remote-dashboard/src/index.css`
  - `apps/remote-dashboard/src/App.tsx`
  - `apps/remote-dashboard/src/Dashboard.tsx`

## 4. Hasil Validasi Mutlak
- `npm run lint`: PASS (0 errors, 0 warnings)
- `npm run typecheck`: PASS (0 errors)
- `npm run test`: PASS (114 tests passed)
- `npm run build`: PASS (Build produksi seluruh workspaces berhasil)
