# Log: Ekstraksi Komponen Card ke Shared UI Library

Tanggal: 2026-10-14  
Harness / Author: OMP Assistant & Senior Frontend Engineer  
Scope: `packages/ui`, `apps/host-layout`, `apps/remote-dashboard`  

## 1. Konteks & Tujuan
1. Mengeliminasi duplikasi markup dan styling container kartu (`Card`) yang sebelumnya ditulis lokal di `StatusCard.tsx` (host-layout), banner sambutan di `DashboardView.tsx` (host-layout), dan metrik ringkasan keuangan di `Dashboard.tsx` (remote-dashboard).
2. Mengekstrak dan mempublikasikan komponen atomik `Card` beserta sub-komponen composable (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`) ke dalam shared library `@pembukuan/ui` (`packages/ui/src/components/Card/`).
3. Menerapkan styling adaptif tema terang & gelap (`bg-white dark:bg-[#2D3748] border-gray-200 dark:border-[#4A5568] rounded-xl shadow-sm transition-colors`).
4. Merefaktor seluruh pemanggilan card di aplikasi Host dan Remote agar mengonsumsi komponen shared `@pembukuan/ui`.

## 2. Siklus TDD (Test-Driven Development)
- **Unit Test Path**: `packages/ui/src/components/Card/Card.test.tsx`
- **Skenario Pengujian**:
  1. Render `Card` dengan children dan styling dasar.
  2. Mendukung custom `className` pada container `Card`.
  3. Render sub-komponen composable (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`) secara terstruktur dan semantik.
  4. Mendukung delegasi event handler HTML (seperti `onClick`).
- **Status Red**: Test dijalankan dan gagal sebelum `Card.tsx` dibuat.
- **Status Green**: Implementasi selesai dan seluruh 4 unit test lulus (4/4 passed).
- **Refactoring**: Mengganti elemen card lokal di `StatusCard.tsx`, `DashboardView.tsx`, `LoginView.tsx`, dan `Dashboard.tsx` menggunakan komponen shared `Card`.

Total Test Suites: 13 file pengujian, 44 unit test lulus (100% Green).

## 3. Daftar Perubahan File
- **Added**:
  - `packages/ui/src/components/Card/Card.tsx`
  - `packages/ui/src/components/Card/Card.test.tsx`
  - `packages/ui/src/components/Card/index.ts`
  - `artifacts/log-shared-ui-card.md`
- **Modified**:
  - `packages/ui/src/index.ts`
  - `apps/remote-dashboard/src/Dashboard.tsx`
  - `apps/host-layout/src/features/dashboard/components/StatusCard.tsx`
  - `apps/host-layout/src/features/dashboard/components/DashboardView.tsx`
  - `apps/host-layout/src/features/auth/components/LoginView.tsx`

## 4. Hasil Validasi Mutlak
- `npm run lint`: PASS (0 errors, 0 warnings)
- `npm run typecheck`: PASS (0 errors)
- `npm run test`: PASS (13 test suites, 44 tests passed)
- `npm run build`: PASS (Build produksi seluruh aplikasi sukses)
