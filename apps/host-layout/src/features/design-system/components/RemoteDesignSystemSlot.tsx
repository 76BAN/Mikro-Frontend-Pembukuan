import { Suspense, lazy } from 'react';
import { Alert, Spinner } from '@pembukuan/ui';

const RemoteDesignSystem = lazy(() =>
  import('remote_design_system/DesignSystem').catch(() => ({
    default: () => (
      <Alert variant="error" title="Modul Remote Design System Tidak Aktif">
        Modul Design System Remote sedang tidak aktif (Pastikan remote-design-system aktif di port 3003)
      </Alert>
    ),
  }))
);

export function RemoteDesignSystemSlot() {
  return (
    <div data-testid="remote-design-system-slot">
      <Suspense
        fallback={
          <div className="flex justify-center py-8">
            <Spinner label="Memuat modul design system remote..." />
          </div>
        }
      >
        <RemoteDesignSystem />
      </Suspense>
    </div>
  );
}

export default RemoteDesignSystemSlot;
