import React from "react";
import './index.css';
import {Button} from "@pembukuan/ui";

export interface DashboardProps {
  onAddTransaction?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({onAddTransaction}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 m-0">
            Ringkasan Keuangan
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Pantau arus kas masuk dan keluar bisnis Anda secara real-time.
          </p>
        </div>
        <Button
          label="Catat Transaksi"
          onClick={onAddTransaction}
          variant="primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Total Pemasukan
          </span>
          <p className="text-2xl font-bold text-green-600 mt-2">
            Rp 15.500.000
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Total Pengeluaran
          </span>
          <p className="text-2xl font-bold text-red-600 mt-2">
            Rp 4.250.000
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Saldo Akhir
          </span>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            Rp 11.250.000
          </p>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;