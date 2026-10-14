# Log: Implementasi Komponen Alert di Shared UI Library

Tanggal: 2026-10-14  
Harness / Author: OMP Assistant & Senior Frontend Engineer  
Scope: `packages/ui`, `apps/host-layout`  

## 1. Konteks & Tujuan
1. Menambahkan komponen banner notifikasi dan peringatan (`Alert`) ke dalam `@pembukuan/ui` (`packages/ui/src/components/Alert/`) untuk menampilkan pesan status transaksi, umpan balik sistem, dan error boundary fallback modul Micro-Frontend (MFE).
2. Mendukung 4 varian semantik adaptif tema (Dark `#1A202C` & Light `#E2E8F0`):
   - `info`: Informasi sistem dan status sinkronisasi (icon `Info`).
   - `success`: Konfirmasi transaksi berhasil dicatat (icon `CheckCircle2`).
   - `warning`: Peringatan saldo menipis atau verifikasi mutasi (icon `AlertTriangle`).
   - `error`: Kesalahan sistem atau modul remote offline (icon `AlertCircle`).
3. Fitur utama:
   - Standar aksesibilitas WAI-ARIA `role="alert"`.
   - Sub-komponen composable `AlertTitle` dan `AlertDescription`.
   - Tombol dismiss (tutup) opsional via prop `onClose`.
   - Refaktor: Menggantikan div styling manual pada error fallback remote di `DashboardView.tsx` dan `RemoteLoginSlot.tsx` dengan komponen `<Alert variant="error" ...>`.

## 2. Siklus TDD (Test-Driven Development)
- **Unit Test Path**: `packages/ui/src/components/Alert/Alert.test.tsx`
- **Skenario Pengujian**:
  1. Render alert dengan role="alert" dan varian default info.
  2. Render seluruh varian semantik (`info`, `success`, `warning`, `error`) dengan warna dan icon yang sesuai.
  3. Render judul, deskripsi, dan children secara terstruktur.
  4. Render tombol dismiss dan mengeksekusi callback `onClose` saat diklik.
  5. Memastikan tombol dismiss tidak muncul jika `onClose` tidak diberikan.
  6. Render sub-komponen composable `AlertTitle` dan `AlertDescription`.
- **Status Red**: Test dijalankan dan gagal sebelum `Alert.tsx` diimplementasikan.
- **Status Green**: Implementasi selesai dan seluruh 6 unit test lulus (6/6 passed).
- **Refactoring**: Menggantikan raw HTML div fallback di `DashboardView.tsx` dan `RemoteLoginSlot.tsx` dengan `<Alert>`.

Total Test Suites: 18 file pengujian, 72 unit test lulus (100% Green).

## 3. Daftar Perubahan File
- **Added**:
  - `packages/ui/src/components/Alert/Alert.tsx`
  - `packages/ui/src/components/Alert/Alert.test.tsx`
  - `packages/ui/src/components/Alert/index.ts`
  - `artifacts/log-shared-ui-alert.md`
- **Modified**:
  - `packages/ui/src/index.ts`
  - `apps/host-layout/src/features/dashboard/components/DashboardView.tsx`
  - `apps/host-layout/src/features/auth/components/RemoteLoginSlot.tsx`

## 4. Hasil Validasi Mutlak
- `npm run lint`: PASS (0 errors, 0 warnings)
- `npm run typecheck`: PASS (0 errors)
- `npm run test`: PASS (18 test suites, 72 tests passed)
- `npm run build`: PASS (Build produksi seluruh aplikasi sukses)
