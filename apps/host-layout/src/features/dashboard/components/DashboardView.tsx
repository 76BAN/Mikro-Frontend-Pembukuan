import { Suspense, lazy } from 'react';
import { Alert, Card, CardDescription, CardHeader, Spinner } from '@pembukuan/ui';
import { useAuthStore } from '../../../store/authStore';
import { StatusCard } from './StatusCard';
const RemoteDashboard = lazy(() =>
  import('remote_dashboard/Dashboard').catch(() => ({
    default: () => (
      <Alert variant="error" title="Modul Remote Tidak Aktif">
        Modul Dashboard Remote sedang tidak aktif (Pastikan remote-dashboard aktif di port 3002)
      </Alert>
    ),
  }))
);

export interface DashboardViewProps {
  onNavigateToLogin?: () => void;
  onAddTransaction?: () => void;
}

export function DashboardView({ onNavigateToLogin, onAddTransaction }: DashboardViewProps) {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <CardHeader className="mb-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC] mb-2 m-0">
            Dashboard Pembukuan
          </h2>
          <CardDescription>
            Selamat datang di sistem manajemen pembukuan alternatif terdistribusi (Micro-Frontend).
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatusCard title="Status Autentikasi">
          {isAuthenticated ? (
            <p className="text-sm text-green-700 dark:text-green-400 font-medium">
              Aktif sebagai: <span className="underline">{user?.username}</span>
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Anda belum masuk ke dalam akun.</p>
              {onNavigateToLogin ? (
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium cursor-pointer"
                >
                  Menuju Halaman Login &rarr;
                </button>
              ) : (
                <a
                  href="/login"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  Menuju Halaman Login &rarr;
                </a>
              )}
            </div>
          )}
        </StatusCard>

        <StatusCard title="Status Modul MFE">
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
            <li>Host Layout: <span className="text-green-600 dark:text-green-400 font-semibold">Aktif (Port 3000)</span></li>
            <li>Remote Dashboard: <span className="text-blue-600 dark:text-blue-400 font-semibold">Tersambung (Port 3002)</span></li>
          </ul>
        </StatusCard>
      </div>

      {/* Render modul Remote Dashboard MFE */}
      <div className="pt-4">
        <Suspense fallback={<div className="flex justify-center py-8"><Spinner label="Memuat modul dashboard remote..." /></div>}>
          <RemoteDashboard onAddTransaction={onAddTransaction} />
        </Suspense>
      </div>
    </div>
  );
}

export default DashboardView;