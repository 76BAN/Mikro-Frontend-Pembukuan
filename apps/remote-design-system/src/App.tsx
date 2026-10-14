import React from 'react';
import './index.css';
import { DesignSystem } from './DesignSystem';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-gray-900 dark:text-gray-100 p-6 transition-colors">
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-extrabold">Remote Design System (Port 3003)</h1>
        <p className="text-xs text-muted mt-1">Standalone preview & showcase UI components.</p>
      </div>
      <DesignSystem />
    </div>
  );
};

export default App;
