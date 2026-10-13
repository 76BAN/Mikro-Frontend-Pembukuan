import { useAuthStore } from '../../../store/authStore';
import { StatusCard } from './StatusCard';

export interface DashboardViewProps {
  onNavigateToLogin?: () => void;
}

export function DashboardView({ onNavigateToLogin }: DashboardViewProps) {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard Pembukuan
        </h2>
        <p className="text-gray-600">
          Selamat datang di sistem manajemen pembukuan alternatif terdistribusi (Micro-Frontend).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatusCard title="Status Autentikasi">
          {isAuthenticated ? (
            <p className="text-sm text-green-700 font-medium">
              Aktif sebagai: <span className="underline">{user?.username}</span>
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Anda belum masuk ke dalam akun.</p>
              {onNavigateToLogin ? (
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                  Menuju Halaman Login &rarr;
                </button>
              ) : (
                <a
                  href="/login"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Menuju Halaman Login &rarr;
                </a>
              )}
            </div>
          )}
        </StatusCard>

        <StatusCard title="Status Modul MFE">
          <ul className="text-sm space-y-1 text-gray-600">
            <li>
              Host Layout:{' '}
              <span className="text-green-600 font-semibold">Aktif (Port 3000)</span>
            </li>
            <li>
              Remote Login:{' '}
              <span className="text-blue-600 font-semibold">Tersambung (Port 3001)</span>
            </li>
          </ul>
        </StatusCard>
      </div>
    </div>
  );
}

export default DashboardView;
