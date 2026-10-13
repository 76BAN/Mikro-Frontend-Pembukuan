declare module 'remote_login/LoginForm' {
  import type { ComponentType } from 'react';

  export interface LoginFormProps {
    onSuccess?: (data: { username: string }) => void;
  }

  const LoginForm: ComponentType<LoginFormProps>;
  export default LoginForm;
}
declare module 'remote_dashboard/Dashboard' {
  import type { ComponentType } from 'react';

  export interface DashboardProps {
    onAddTransaction?: () => void;
  }

  const Dashboard: ComponentType<DashboardProps>;
  export default Dashboard;
}
