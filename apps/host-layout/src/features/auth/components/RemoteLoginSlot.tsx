import { Suspense, lazy } from 'react';
import { Alert, Spinner } from '@pembukuan/ui';

const RemoteLoginForm = lazy(() =>
  import('remote_login/LoginForm').catch(() => ({
    default: () => (
      <Alert variant="error" title="Modul Remote Tidak Aktif">
        Modul Login Remote sedang tidak aktif (Pastikan remote-login aktif di port 3001)
      </Alert>
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
          <div className="flex justify-center py-6">
            <Spinner label="Memuat modul login remote..." />
          </div>
        }
      >
        <RemoteLoginForm onSuccess={onLoginSuccess} />
      </Suspense>
    </div>
  );
}

export default RemoteLoginSlot;
