# Log: Clean Architecture & Feature-Driven Refactoring

Tanggal: 2026-10-13  
Harness / Author: OMP Assistant  
Scope: `apps/host-layout`, `apps/remote-login`  

## 1. Konteks & Tujuan
Refaktorisasi struktur kode ke pola **Clean Architecture / Feature-Driven Architecture** di frontend React:
1. **Thin Route Controllers**: Memisahkan layer routing (`routes/`) dari layer presentasi UI dan logika bisnis. File di `routes/` kini tipis (hanya mapping rute dan delegasi ke komponen fitur).
2. **Feature-Driven Architecture**: Mengelompokkan tampilan UI, sub-komponen, hooks, dan unit test ke dalam domain fitur masing-masing (`features/dashboard/`, `features/auth/`).
3. **Pemisahan Logic & UI di Remote Login**:
   - Mengekstrak state, validasi, dan submit handling ke custom hook `useLoginForm`.
   - Mengganti seluruh inline styles di `LoginForm` dan `App` ke utility class Tailwind CSS.
4. **Isolasi Dynamic Remote MFE**:
   - Memindahkan loader `remote_login/LoginForm`, Suspense, dan fallback boundary ke dalam `features/auth/components/RemoteLoginSlot.tsx`.
5. **Sentralisasi Konfigurasi Navigasi**:
   - Mengekstrak hardcoded nav links ke `config/navigation.ts`.

## 2. Siklus TDD (Test-Driven Development)
1. **`useLoginForm` Hook**:
   - Test: `apps/remote-login/src/features/login/hooks/useLoginForm.test.ts` (4 unit tests passed).
2. **`DashboardView` Component**:
   - Test: `apps/host-layout/src/features/dashboard/components/DashboardView.test.tsx` (3 unit tests passed murni tanpa butuh routing instance).
3. **`LoginView` Component**:
   - Test: `apps/host-layout/src/features/auth/components/LoginView.test.tsx` (2 unit tests passed).
4. **Router Integration**:
   - Test: `apps/host-layout/src/router.test.tsx` (2 unit tests passed).

Total Pengujian: 9 test suites, 27 unit tests passed.

## 3. Daftar Perubahan File
- **Added**:
  - `apps/remote-login/src/features/login/hooks/useLoginForm.ts`
  - `apps/remote-login/src/features/login/hooks/useLoginForm.test.ts`
  - `apps/host-layout/src/config/navigation.ts`
  - `apps/host-layout/src/features/dashboard/components/DashboardView.tsx`
  - `apps/host-layout/src/features/dashboard/components/DashboardView.test.tsx`
  - `apps/host-layout/src/features/dashboard/components/StatusCard.tsx`
  - `apps/host-layout/src/features/auth/components/RemoteLoginSlot.tsx`
  - `apps/host-layout/src/features/auth/components/LoginView.tsx`
  - `apps/host-layout/src/features/auth/components/LoginView.test.tsx`
  - `artifacts/log-clean-architecture-refactor.md`
- **Modified**:
  - `apps/remote-login/src/LoginForm.tsx`
  - `apps/remote-login/src/App.tsx`
  - `apps/host-layout/src/routes/__root.tsx`
  - `apps/host-layout/src/routes/index.tsx`
  - `apps/host-layout/src/routes/login.tsx`

## 4. Hasil Validasi Mutlak
- `npm run lint`: PASS (0 errors, 0 warnings)
- `npm run typecheck`: PASS (0 errors)
- `npm run test`: PASS (9 test suites, 27/27 tests passed)
- `npm run build`: PASS (Build produksi kedua aplikasi sukses)
