import React from 'react';
import './index.css';
import { Button, TextInput } from '@pembukuan/ui';
import { useLoginForm } from './features/login/hooks/useLoginForm';
import type { UseLoginFormProps } from './features/login/hooks/useLoginForm';

export type LoginFormProps = UseLoginFormProps;

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const {
    username,
    password,
    error,
    setUsername,
    setPassword,
    handleSubmit,
  } = useLoginForm({ onSuccess });

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm w-full p-6 rounded-xl border border-gray-200 bg-white shadow-sm space-y-4"
    >
      <div className="border-b border-gray-100 pb-3">
        <h2 className="text-xl font-bold text-gray-900 m-0">Masuk Akun</h2>
        <p className="text-xs text-gray-500 mt-1">
          Masukkan informasi akun Anda untuk mengakses sistem pembukuan.
        </p>
      </div>

      <TextInput
        label="Username"
        placeholder="Masukkan username"
        value={username}
        onChange={setUsername}
        error={error}
      />

      <TextInput
        label="Password"
        type="password"
        placeholder="Masukkan password"
        value={password}
        onChange={setPassword}
      />

      <Button
        label="Masuk"
        type="submit"
        variant="primary"
        className="w-full mt-2"
      />
    </form>
  );
};

export default LoginForm;
