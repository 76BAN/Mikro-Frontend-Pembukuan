import { Suspense, lazy } from 'react';

const RemoteLoginForm = lazy(() =>
  import('remote_login/LoginForm').catch(() => ({
    default: () => (
      <div className="text-red-700 p-4 border border-dashed border-red-500 rounded bg-red-50 text-sm">
        Modul Login Remote sedang tidak aktif (Pastikan remote-login aktif di port 3001)
      </div>
    ),
  }))
);

export interface RemoteLoginSlotProps {
  onLoginSuccess: (user: { username: string }) => void;
}

export function RemoteLoginSlot({ onLoginSuccess }: RemoteLoginSlotProps) {
  return (
    <div data-testid="remote-slot">
      <Suspense
        fallback={
          <div className="text-gray-500 text-center py-6 text-sm">
            Memuat modul login remote...
          </div>
        }
      >
        <RemoteLoginForm onSuccess={onLoginSuccess} />
      </Suspense>
    </div>
  );
}

export default RemoteLoginSlot;
