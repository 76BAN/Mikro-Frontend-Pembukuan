import { useState } from 'react';
import type { FormEvent } from 'react';

export interface UseLoginFormProps {
  onSuccess?: (data: { username: string }) => void;
}

export function useLoginForm({ onSuccess }: UseLoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (val: string) => {
    setUsername(val);
    if (error) setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username wajib diisi');
      return;
    }
    setError('');
    onSuccess?.({ username });
  };

  return {
    username,
    password,
    error,
    setUsername: handleUsernameChange,
    setPassword,
    handleSubmit,
  };
}
