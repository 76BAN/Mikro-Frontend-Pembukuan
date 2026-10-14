# Log: Implementasi Theme Switch, Canvas Palette, dan Design Tokens

Tanggal: 2026-10-14  
Harness / Author: OMP Assistant & Senior Frontend Engineer  
Scope: `packages/ui`, `apps/host-layout`, `apps/remote-login`, `apps/remote-dashboard`  

## 1. Konteks & Tujuan
1. Mengimplementasikan sistem tema dinamis (Light & Dark theme) berbasis Tailwind CSS v4 dengan patokan:
   - Background Canvas Dark Theme: `#1A202C`
   - Background Canvas Light Theme: `#E2E8F0`
2. Menghadirkan komponen shared UI `Switch` di `@pembukuan/ui` dengan dukungan penuh aksesibilitas (`role="switch"`, `aria-checked`, keyboard navigasi).
3. Mengelola state tema global melalui Zustand (`useThemeStore`) dengan persistensi `localStorage` dan sinkronisasi class `.dark` pada `document.documentElement` sehingga seluruh remote micro-frontend (`remote-login`, `remote-dashboard`) langsung terpengaruh tanpa event bus tambahan.
4. Mengintegrasikan toggle tema ke dalam komponen `Header` pada Host Shell.
5. Memperbarui dokumentasi palet warna dan spesifikasi canvas di `README.md`.

## 2. Siklus TDD (Test-Driven Development)
1. **Shared Switch Component (`packages/ui`)**:
   - **Unit Test Path**: `packages/ui/src/components/Switch/Switch.test.tsx`
   - **Skenario Pengujian**:
     1. Render switch dengan role="switch" dan nilai atribut `aria-checked` yang tepat.
     2. Menangani toggle state saat diklik.
     3. Menangani navigasi keyboard (tombol Spasi dan Enter).
     4. Mencegah toggle saat properti `disabled` aktif.
     5. Menampilkan dan mengaitkan label aksesibilitas secara benar.
   - **Status Red**: Pengujian gagal sebelum `Switch.tsx` dibuat.
   - **Status Green**: Komponen selesai dan 6 pengujian unit lulus (6/6).

2. **Theme Store (`apps/host-layout`)**:
   - **Unit Test Path**: `apps/host-layout/src/store/themeStore.test.ts`
   - **Skenario Pengujian**:
     1. Inisialisasi tema default (`light`).
     2. Toggle tema antara light dan dark, sinkronisasi class `.dark` pada DOM root, dan simpan ke `localStorage`.
     3. Set tema secara eksplisit.
   - **Status Red**: Pengujian gagal sebelum store diimplementasikan.
   - **Status Green**: 3 pengujian unit lulus (3/3).

3. **Header Theme Integration (`packages/ui`)**:
   - **Unit Test Path**: `packages/ui/src/components/Header/Header.test.tsx`
   - **Skenario Pengujian**: Menampilkan switch toggle tema pada bar navigasi header dan memicu callback `onThemeToggle`.
   - **Status Green**: 4 pengujian unit lulus (4/4).

Total Test Suites: 12 file pengujian, 40 unit test lulus (100% Green).

## 3. Daftar Perubahan File
- **Added**:
  - `packages/ui/src/components/Switch/Switch.tsx`
  - `packages/ui/src/components/Switch/Switch.test.tsx`
  - `packages/ui/src/components/Switch/index.ts`
  - `apps/host-layout/src/store/themeStore.ts`
  - `apps/host-layout/src/store/themeStore.test.ts`
  - `artifacts/log-theme-switch-and-palette.md`
- **Modified**:
  - `README.md`
  - `packages/ui/src/index.ts`
  - `packages/ui/src/components/Header/Header.tsx`
  - `packages/ui/src/components/Header/Header.test.tsx`
  - `packages/ui/src/components/Button/Button.tsx`
  - `packages/ui/src/components/TextInput/TextInput.tsx`
  - `apps/host-layout/src/index.css`
  - `apps/host-layout/src/routes/__root.tsx`
  - `apps/host-layout/src/features/dashboard/components/DashboardView.tsx`
  - `apps/host-layout/src/features/dashboard/components/StatusCard.tsx`
  - `apps/host-layout/src/features/auth/components/LoginView.tsx`
  - `apps/remote-login/src/index.css`
  - `apps/remote-login/src/LoginForm.tsx`
  - `apps/remote-login/src/App.tsx`
  - `apps/remote-dashboard/src/index.css`
  - `apps/remote-dashboard/src/Dashboard.tsx`
  - `apps/remote-dashboard/src/App.tsx`

## 4. Hasil Validasi Mutlak
- `npm run lint`: PASS (0 errors, 0 warnings)
- `npm run typecheck`: PASS (0 errors)
- `npm run test`: PASS (12 test suites, 40 tests passed)
- `npm run build`: PASS (Build produksi seluruh aplikasi sukses)
