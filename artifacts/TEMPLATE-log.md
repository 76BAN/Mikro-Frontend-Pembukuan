# Log: [Nama Fitur]

Tanggal: YYYY-MM-DD  
Harness / Author: [Nama Author / Harness]  
Scope: [apps/host-layout | apps/remote-[nama] | packages/ui | root]  

## 1. Konteks & Tujuan
[Jelaskan kebutuhan bisnis/teknis fitur ini]

## 2. Siklus TDD (Test-Driven Development)
- **Unit Test Path**: `apps/.../feature.test.tsx` (atau `packages/...`)
- **Skenario Pengujian**:
  1. [Skenario 1]
  2. [Skenario 2]
- **Status Red**: Test dijalankan dan gagal (sesuai ekspektasi karena implementasi belum ada).
- **Status Green**: Implementasi selesai dan seluruh test berhasil.
- **Refactoring**: [Catatan perapihan kode jika ada]

## 3. Daftar Perubahan File
- **Added**:
  - `path/to/file`
- **Modified**:
  - `path/to/file`
- **Deleted**:
  - `path/to/file`

## 4. Hasil Validasi Mutlak
- `npm run lint`: PASS (0 errors, 0 warnings)
- `npm run typecheck`: PASS (0 errors)
- `npm run test`: PASS ([N] passed)
