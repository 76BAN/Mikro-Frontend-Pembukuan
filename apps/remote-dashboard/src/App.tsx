import React from "react";
import Dashboard from "./Dashboard";

export const App:React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-[#0F172A] dark:text-[#F8FAFC] p-8 transition-colors">
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
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