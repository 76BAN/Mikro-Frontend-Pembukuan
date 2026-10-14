import React from 'react';
import LoginForm from './LoginForm';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-[#0F172A] dark:text-[#F8FAFC] flex flex-col items-center justify-center p-6 transition-colors">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Standalone Remote Login
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Aplikasi berjalan mandiri di port 3001
        </p>
      </div>
      <LoginForm
        onSuccess={(user) => {
          alert(`Berhasil masuk sebagai ${user.username}`);
        }}
      />
    </div>
  );
};

export default App;
