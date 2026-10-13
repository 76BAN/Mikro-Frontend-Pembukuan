# Log: Fix Tailwind CSS Source Scanning in Monorepo

Tanggal: 2026-10-13  
Harness / Author: OMP Assistant  
Scope: `apps/host-layout/src/index.css`, `apps/remote-login/src/index.css`, `packages/ui`  

## 1. Konteks & Akar Masalah
Pengguna melaporkan tampilan form login berantakan dan teks placeholder pada input menempel ke border tanpa jarak (padding).

**Penyebab:**
1. Di Tailwind CSS v4, compiler hanya memindai file di root proyek masing-masing secara default.
2. File komponen input (`TextInput.tsx`) berada di luar direktori aplikasi (`packages/ui/src/components/TextInput/`), dan `LoginForm.tsx` berada di `apps/remote-login`.
3. Path directive `@source` sebelumnya kurang 1 level direktori (`../../` bukan `../../../`), sehingga Tailwind v4 gagal memindai komponen di `packages/ui`. Akibatnya class padding horizontal `.px-3` (`padding-inline: calc(var(--spacing) * 3)`) tidak ter-generate ke dalam file CSS Host maupun Remote.
4. Input HTML merender padding horizontal `0px` bawaan browser sehingga placeholder menempel ke garis batas.

## 2. Solusi Perbaikan
1. Mengoreksi path `@source` di `apps/host-layout/src/index.css`:
   - `@source "../../../packages/ui";`
   - `@source "../../remote-login";`
2. Mengoreksi path `@source` di `apps/remote-login/src/index.css`:
   - `@source "../../../packages/ui";`
3. Mengimpor `./index.css` di `LoginForm.tsx` agar bundle Module Federation menyertakan stylesheet yang tepat.
4. Menambahkan class eksplisit `bg-white`, `text-gray-900`, dan `placeholder:text-gray-400` pada `TextInput.tsx` serta `flex justify-center` pada `LoginView.tsx`.

## 3. Hasil Validasi
- File CSS Host membesar dari 10.65 kB menjadi 15.67 kB (class `px-3`, `py-2`, `rounded-md`, dll terkonfirmasi ada).
- File CSS Remote membesar dari 10.62 kB menjadi 17.10 kB.
- `npm run test`: PASS (9 suites, 27 tests).
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm run build`: PASS.
