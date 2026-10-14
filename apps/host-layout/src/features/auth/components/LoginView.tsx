import { Card } from '@pembukuan/ui';
import { useAuthStore } from '../../../store/authStore';
import { RemoteLoginSlot } from './RemoteLoginSlot';

export interface LoginViewProps {
  onNavigateHome?: () => void;
}

export function LoginView({ onNavigateHome }: LoginViewProps) {
  const { user, login } = useAuthStore();

  const handleSuccess = (userData: { username: string }) => {
    login(userData);
    onNavigateHome?.();
  };

  return (
    <div className="max-w-md mx-auto py-8 flex justify-center">
      {user ? (
        <Card className="w-full text-center space-y-4">
          <p className="text-gray-700 dark:text-gray-200">
            Anda sudah masuk sebagai <strong className="text-gray-900 dark:text-white">{user.username}</strong>
          </p>
          <button
            type="button"
            onClick={onNavigateHome}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 font-medium cursor-pointer"
          >
            Buka Dashboard
          </button>
        </Card>
      ) : (
        <RemoteLoginSlot onLoginSuccess={handleSuccess} />
      )}
    </div>
  );
}

export default LoginView;
