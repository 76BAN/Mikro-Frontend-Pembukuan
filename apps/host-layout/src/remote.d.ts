declare module 'remote_login/LoginForm' {
  import type { ComponentType } from 'react';

  export interface LoginFormProps {
    onSuccess?: (data: { username: string }) => void;
  }

  const LoginForm: ComponentType<LoginFormProps>;
  export default LoginForm;
}
