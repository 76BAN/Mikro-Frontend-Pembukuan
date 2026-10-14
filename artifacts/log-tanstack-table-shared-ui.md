# Log: Implementasi ServerTable Berbasis TanStack Table di Shared UI

Tanggal: 2026-10-14  
Harness / Author: OMP Assistant & Senior Frontend Engineer  
Scope: `packages/ui`, `root`  

## 1. Konteks & Tujuan
1. Mengintegrasikan `@tanstack/react-table` (v8) ke dalam shared UI library `@pembukuan/ui` untuk mendukung kebutuhan tabel server-side pada aplikasi pembukuan (riwayat transaksi, ledger kas, laporan keuangan).
2. Membangun 2 layer komponen tabel:
   - **Layer Primitives**: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` yang membungkus elemen tabel HTML semantik dengan styling adaptif Tailwind v4 (dark & light theme).
   - **Layer High-Level (`ServerTable`)**: Wrapper TanStack Table siap pakai dengan dukungan manual server-side pagination, sortable columns dengan indikator panah dinamis, skeleton loading rows, pesan data kosong, serta pagination bar terintegrasi.
3. Menjamin type-safety ketat dengan generic `ColumnDef<TData, unknown>` tanpa kebocoran tipe `any`.

## 2. Siklus TDD (Test-Driven Development)
- **Unit Test Path**: `packages/ui/src/components/Table/Table.test.tsx`
- **Skenario Pengujian**:
  1. Render primitif struktur tabel semantik dengan styling yang sesuai.
  2. Render kolom dan data baris tabel menggunakan konfigurasi TanStack Table `ColumnDef`.
  3. Render pesan kosong saat `data` kosong dan tidak sedang loading.
  4. Render skeleton loading rows saat `isLoading = true` untuk mencegah layout shift.
  5. Menangani event klik header kolom yang dapat disortir dan memanggil `onSortChange(columnId, 'asc' | 'desc')`.
  6. Menampilkan pagination controls (info baris, info halaman) dan memicu callback `onPageChange` saat tombol navigasi diklik.
- **Status Red**: Test dijalankan dan gagal sebelum implementasi `Table.tsx` dan `ServerTable.tsx`.
- **Status Green**: Implementasi selesai dan seluruh 6 unit test lulus (6/6 passed).
- **Refactoring**: Merapikan penanganan generic tipe TanStack Table dan re-export di `packages/ui/src/index.ts`.

Total Test Suites: 14 file pengujian, 50 unit test lulus (100% Green).

## 3. Daftar Perubahan File
- **Added**:
  - `packages/ui/src/components/Table/Table.tsx`
  - `packages/ui/src/components/Table/ServerTable.tsx`
  - `packages/ui/src/components/Table/Table.test.tsx`
  - `packages/ui/src/components/Table/index.ts`
  - `artifacts/log-tanstack-table-shared-ui.md`
- **Modified**:
  - `package.json`
  - `package-lock.json`
  - `packages/ui/package.json`
  - `packages/ui/src/index.ts`

## 4. Hasil Validasi Mutlak
- `npm run lint`: PASS (0 errors, 0 warnings)
- `npm run typecheck`: PASS (0 errors)
- `npm run test`: PASS (14 test suites, 50 tests passed)
- `npm run build`: PASS (Seluruh workspace host & remotes sukses ter-bundle)
