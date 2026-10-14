import React, { useState } from "react";
import './index.css';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Modal,
  Select,
  ServerTable,
  Switch,
  TextInput,
  Toast,
  ToastContainer,
} from "@pembukuan/ui";
import type { ColumnDef } from "@pembukuan/ui";

export interface DashboardProps {
  onAddTransaction?: () => void;
}

interface TransactionItem {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
}

const INITIAL_TRANSACTIONS: TransactionItem[] = [
  { id: '1', date: '2026-10-14', description: 'Pembayaran Invoice #1029', category: 'Penjualan', type: 'income', amount: 8500000 },
  { id: '2', date: '2026-10-13', description: 'Langganan Cloud Server & Database', category: 'Operasional', type: 'expense', amount: 1250000 },
  { id: '3', date: '2026-10-12', description: 'Jasa Konsultasi Arsitektur MFE', category: 'Pendapatan', type: 'income', amount: 7000000 },
  { id: '4', date: '2026-10-10', description: 'Biaya Lisensi Software & Domain', category: 'IT & Tools', type: 'expense', amount: 1500000 },
  { id: '5', date: '2026-10-08', description: 'Pengadaan Meja & Kursi Kerja', category: 'Aset Kantor', type: 'expense', amount: 1500000 },
];

const CATEGORY_OPTIONS = [
  { value: 'operasional', label: 'Operasional' },
  { value: 'penjualan', label: 'Penjualan' },
  { value: 'pendapatan', label: 'Pendapatan Jasa' },
  { value: 'gaji', label: 'Gaji & Honor' },
  { value: 'pajak', label: 'Pajak & Retribusi' },
];

const TYPE_OPTIONS = [
  { value: 'income', label: 'Pemasukan (Income)' },
  { value: 'expense', label: 'Pengeluaran (Expense)' },
];

const Dashboard: React.FC<DashboardProps> = ({ onAddTransaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [transactions, setTransactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);

  // Form state inside Modal
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('operasional');
  const [type, setType] = useState('income');
  const [isRecurring, setIsRecurring] = useState(false);

  // Table state
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [activeToast, setActiveToast] = useState<{ id: string; title: string; desc: string; variant: 'success' | 'info' | 'warning' | 'error' } | null>(null);
  const handleOpenModal = () => {
    setIsModalOpen(true);
    onAddTransaction?.();
  };

  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim() || !amount) return;

    const newTx: TransactionItem = {
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0],
      description: desc,
      category: CATEGORY_OPTIONS.find((c) => c.value === category)?.label || 'Umum',
      type: type as 'income' | 'expense',
      amount: Number(amount) || 0,
    };

    setTransactions([newTx, ...transactions]);
    setActiveToast({
      id: String(Date.now()),
      title: 'Transaksi Berhasil',
      desc: `Pencatatan kas "${desc}" sebesar Rp ${Number(amount).toLocaleString('id-ID')} tersimpan.`,
      variant: 'success',
    });
    setDesc('');
    setAmount('');
  };

  const columns: ColumnDef<TransactionItem, unknown>[] = [
    {
      accessorKey: 'date',
      header: 'Tanggal',
      enableSorting: true,
      cell: (info) => (
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
          {String(info.getValue())}
        </span>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Keterangan Transaksi',
      enableSorting: true,
      cell: (info) => (
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {String(info.getValue())}
        </span>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Kategori',
      cell: (info) => <Badge variant="info">{String(info.getValue())}</Badge>,
    },
    {
      accessorKey: 'type',
      header: 'Tipe',
      cell: (info) => {
        const val = info.getValue() as 'income' | 'expense';
        return val === 'income' ? (
          <Badge variant="success">Pemasukan</Badge>
        ) : (
          <Badge variant="danger">Pengeluaran</Badge>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Nominal',
      cell: (info) => {
        const val = Number(info.getValue());
        return (
          <div className="font-mono font-semibold text-right tabular-nums text-gray-900 dark:text-gray-100">
            Rp {val.toLocaleString('id-ID')}
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-[#F8FAFC] m-0">
            Ringkasan Keuangan
          </h2>
          <p className="text-xs text-muted mt-1">
            Pantau arus kas masuk dan keluar bisnis Anda secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            label="Catat Transaksi"
            onClick={handleOpenModal}
            variant="primary"
          />
        </div>
      </div>

      {/* 2. Alert Notification */}
      {showAlert && (
        <Alert
          variant="info"
          title="Sistem Pembukuan Realtime Aktif"
          description="Seluruh komponen UI dari @pembukuan/ui dimuat dan terintegrasi di modul Remote Dashboard."
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* 3. Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hoverLift>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Total Pemasukan
            </span>
            <Badge variant="success" size="sm" dot ping>+12.5%</Badge>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2 font-mono">
            Rp 15.500.000
          </p>
        </Card>

        <Card hoverLift>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Total Pengeluaran
            </span>
            <Badge variant="danger" size="sm" dot>-4.2%</Badge>
          </div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2 font-mono">
            Rp 4.250.000
          </p>
        </Card>

        <Card hoverLift>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Saldo Akhir
            </span>
            <Badge variant="info" size="sm" dot>Sehat</Badge>
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2 font-mono">
            Rp 11.250.000
          </p>
        </Card>
      </div>

      {/* 4. ServerTable Mutasi Transaksi */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Buku Kas & Riwayat Transaksi</CardTitle>
              <CardDescription>
                Tabel data transaksi server-side menggunakan @tanstack/react-table.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Total {transactions.length} baris</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ServerTable
            columns={columns}
            data={transactions}
            zebra
            pagination={{
              page,
              pageSize: 5,
              totalRows: transactions.length,
              onPageChange: (newPage) => setPage(newPage),
            }}
            sort={{
              sortBy,
              sortOrder,
              onSortChange: (newSortBy, newOrder) => {
                setSortBy(newSortBy);
                setSortOrder(newOrder);
              },
            }}
            emptyMessage="Belum ada transaksi tercatat."
          />
        </CardContent>
      </Card>

      {/* 6. Modal "Catat Transaksi Baru" */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Catat Transaksi Baru"
        description="Lengkapi formulir berikut untuk mencatat mutasi kas pembukuan."
        size="lg"
      >
        <form onSubmit={handleSaveTransaction} className="space-y-4">
          <TextInput
            label="Keterangan Transaksi"
            placeholder="Contoh: Pembayaran Jasa Hosting Web"
            value={desc}
            onChange={setDesc}
            required
          />

          <TextInput
            label="Nominal (Rp)"
            type="number"
            placeholder="Contoh: 1500000"
            startAdornment={<span className="text-xs font-semibold text-gray-400">Rp</span>}
            value={amount}
            onChange={setAmount}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Tipe Transaksi"
              options={TYPE_OPTIONS}
              value={type}
              onChange={setType}
            />
            <Select
              label="Kategori Akun"
              options={CATEGORY_OPTIONS}
              value={category}
              onChange={setCategory}
            />
          </div>

          <div className="pt-2">
            <Switch
              label="Tandai sebagai transaksi berulang (otomatis tiap bulan)"
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
              id="recurring-tx"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-border">
            <Button
              type="button"
              label="Batal"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            />
            <Button
              type="submit"
              label="Simpan Transaksi"
              variant="primary"
            />
          </div>
        </form>
      </Modal>
      {/* Floating Toast Notification Container */}
      {activeToast && (
        <ToastContainer position="bottom-right">
          <Toast
            key={activeToast.id}
            title={activeToast.title}
            description={activeToast.desc}
            variant={activeToast.variant}
            duration={4000}
            onClose={() => setActiveToast(null)}
          />
        </ToastContainer>
      )}
    </div>
  );
};

export default Dashboard;
