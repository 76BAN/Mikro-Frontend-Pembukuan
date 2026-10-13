import React from "react";
import Dashboard from "./Dashboard";

export const App:React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto mb-6">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
        </span>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Remote Dashboard App (Port 3002)
        </h1>
      </div>
      <Dashboard
        onAddTransaction={() => alert('Aksi catat transaksi terpicu!')}
      />
    </div>
  );
};

export default App;