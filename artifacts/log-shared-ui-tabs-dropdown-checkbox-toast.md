# Log: Implementasi Komponen Tabs, Checkbox, DropdownMenu, dan Toast di Shared UI

Tanggal: 2026-10-14  
Harness / Author: OMP Assistant & Senior Frontend Engineer  
Scope: `packages/ui`  

## 1. Konteks & Tujuan
Memperkaya pustaka shared UI `@pembukuan/ui` dengan 4 komponen penting untuk mendukung alur kerja aplikasi pembukuan modern:
1. **`Tabs`**: Komponen navigasi tab composable (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`) untuk organisasi konten dashboard/laporan dengan dukungan controlled/uncontrolled state dan aksesibilitas WAI-ARIA tablist.
2. **`Checkbox`**: Komponen kotak centang aksesibilitas (`role="checkbox"`) dengan dukungan state `checked`, `unchecked`, serta `indeterminate` (`mixed`) untuk integrasi seleksi baris massal pada TanStack Table.
3. **`DropdownMenu`**: Menu popup composable (`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`) untuk aksi baris tabel (titik tiga `...`), listener Escape, dan click-outside detection.
4. **`Toast` & `ToastContainer`**: Sistem notifikasi melayang (floating notification) dengan 4 varian status (`success`, `error`, `warning`, `info`), timer auto-dismiss, dan tombol close manual.

## 2. Siklus TDD (Test-Driven Development)
1. **Tabs Component**:
   - Test: `packages/ui/src/components/Tabs/Tabs.test.tsx` (4 tests passed).
   - Pengujian: render tab default, perpindahan tab content saat trigger diklik, controlled value prop, handling disabled tab.
2. **Checkbox Component**:
   - Test: `packages/ui/src/components/Checkbox/Checkbox.test.tsx` (6 tests passed).
   - Pengujian: status role="checkbox", toggle boolean on click, dukungan status indeterminate/mixed, disabled handling, keterkaitan label.
3. **DropdownMenu Component**:
   - Test: `packages/ui/src/components/DropdownMenu/DropdownMenu.test.tsx` (5 tests passed).
   - Pengujian: state tertutup/terbuka, eksekusi aksi item dan auto-close, penutupan via tombol Escape, separator & danger variant.
4. **Toast Component**:
   - Test: `packages/ui/src/components/Toast/Toast.test.tsx` (5 tests passed).
   - Pengujian: rendering status notifikasi, varian border, dismiss button, auto-dismiss via fake timers, multiple toast di ToastContainer.

Total Test Suites: 24 file pengujian, 103 unit test lulus (100% Green).

## 3. Daftar Perubahan File
- **Added**:
  - `packages/ui/src/components/Tabs/Tabs.tsx`
  - `packages/ui/src/components/Tabs/Tabs.test.tsx`
  - `packages/ui/src/components/Tabs/index.ts`
  - `packages/ui/src/components/Checkbox/Checkbox.tsx`
  - `packages/ui/src/components/Checkbox/Checkbox.test.tsx`
  - `packages/ui/src/components/Checkbox/index.ts`
  - `packages/ui/src/components/DropdownMenu/DropdownMenu.tsx`
  - `packages/ui/src/components/DropdownMenu/DropdownMenu.test.tsx`
  - `packages/ui/src/components/DropdownMenu/index.ts`
  - `packages/ui/src/components/Toast/Toast.tsx`
  - `packages/ui/src/components/Toast/Toast.test.tsx`
  - `packages/ui/src/components/Toast/index.ts`
  - `artifacts/log-shared-ui-tabs-dropdown-checkbox-toast.md`
- **Modified**:
  - `packages/ui/src/index.ts`

## 4. Hasil Validasi Mutlak
- `npm run lint`: PASS (0 errors, 0 warnings)
- `npm run typecheck`: PASS (0 errors)
- `npm run test`: PASS (24 test suites, 103 tests passed)
- `npm run build`: PASS (Build produksi seluruh aplikasi sukses)
