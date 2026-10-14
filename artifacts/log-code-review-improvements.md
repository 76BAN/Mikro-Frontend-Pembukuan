# Log: Perbaikan Hasil Code Review Senior Frontend

Tanggal: 2026-10-14  
Harness / Author: OMP Assistant & Senior Frontend Engineer  
Scope: `apps/host-layout`, `apps/remote-dashboard`, `.github/workflows`  

## 1. Konteks & Tujuan
Menindaklanjuti temuan code review arsitektur monorepo:
1. Menambahkan environment variable `VITE_REMOTE_DASHBOARD_URL` ke `.github/workflows/deploy-host-layout.yml` agar build Host di CI/CD terhubung ke remote dashboard CDN alih-alih fallback ke localhost.
2. Melakukan standardisasi penamaan file standalone `apps/remote-dashboard/src/Apps.tsx` menjadi `App.tsx` sesuai konvensi `App.tsx` di modul lain, membersihkan tag `<span />` kosong, dan memperbarui impor di `main.tsx`.
3. Memperbaiki sintaks `@source "../../../packages/ui";` pada `apps/remote-dashboard/src/index.css`.
4. Mengekstrak handler aksi transaksi di `DashboardView.tsx` dari synchronous browser `alert()` ke prop opsional `onAddTransaction?: () => void`.

## 2. Siklus TDD (Test-Driven Development)
- **Unit Test Path**: `apps/host-layout/src/features/dashboard/components/DashboardView.test.tsx`
- **Skenario Pengujian**:
  1. Render heading dan deskripsi dashboard.
  2. Tampilkan pesan belum login saat user belum autentikasi.
  3. Tampilkan username saat user sudah login.
  4. Eksekusi callback `onAddTransaction` saat tombol aksi "Catat Transaksi" di Remote Dashboard diklik.
- **Status Red**: Pengujian callback baru gagal sebelum prop `onAddTransaction` didelegasikan ke `RemoteDashboard`.
- **Status Green**: Prop `onAddTransaction` diteruskan ke `RemoteDashboard` dan semua 4 pengujian di `DashboardView.test.tsx` berhasil.
- **Refactoring**: Isolasi callback transaksi tanpa dependensi alert bawaan browser.

## 3. Daftar Perubahan File
- **Added**:
  - `apps/remote-dashboard/src/App.tsx`
  - `artifacts/log-code-review-improvements.md`
- **Modified**:
  - `.github/workflows/deploy-host-layout.yml`
  - `apps/host-layout/src/features/dashboard/components/DashboardView.tsx`
  - `apps/host-layout/src/features/dashboard/components/DashboardView.test.tsx`
  - `apps/remote-dashboard/src/index.css`
  - `apps/remote-dashboard/src/main.tsx`
- **Deleted**:
  - `apps/remote-dashboard/src/Apps.tsx`

## 4. Hasil Validasi Mutlak
- `npm run lint`: PASS (0 errors, 0 warnings)
- `npm run typecheck`: PASS (0 errors)
- `npm run test`: PASS (10 test files, 30 tests passed)
