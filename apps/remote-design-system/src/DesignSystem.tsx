import React, { useState } from 'react';
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
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Modal,
  Select,
  ServerTable,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextInput,
  Toast,
  ToastContainer,
  cn,
} from '@pembukuan/ui';
import type { ColumnDef } from '@pembukuan/ui';

interface PropItem {
  name: string;
  type: string;
  defaultVal?: string;
  description: string;
}

const PropTable: React.FC<{ props: PropItem[] }> = ({ props }) => (
  <div className="overflow-x-auto rounded-lg border border-border mt-3 text-xs">
    <table className="w-full text-left">
      <thead className="bg-canvas text-muted border-b border-border font-semibold uppercase">
        <tr>
          <th className="px-3 py-2 font-mono">Prop</th>
          <th className="px-3 py-2 font-mono">Tipe</th>
          <th className="px-3 py-2 font-mono">Default</th>
          <th className="px-3 py-2">Deskripsi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/50 bg-surface">
        {props.map((p) => (
          <tr key={p.name} className="hover:bg-surface-hover transition-colors">
            <td className="px-3 py-2 font-mono font-semibold text-blue-600 dark:text-blue-400">{p.name}</td>
            <td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-300">{p.type}</td>
            <td className="px-3 py-2 font-mono text-gray-500 dark:text-gray-400">{p.defaultVal || '-'}</td>
            <td className="px-3 py-2 text-gray-700 dark:text-gray-200">{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <div className="relative rounded-xl border border-border overflow-hidden mt-2 bg-[#0d1117] text-[#e6edf3] shadow-md">
    <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-[#30363d] bg-[#161b22] text-[11px] font-mono text-[#8b949e]">
      <span className="flex items-center gap-1.5">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#f85149]" />
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#e3b341]" />
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#2ea043]" />
        <span className="ml-2 font-semibold text-[#c9d1d9]">TSX / React</span>
      </span>
      <span className="text-[10px] text-[#8b949e]">Contoh Penggunaan</span>
    </div>
    <pre className="p-3.5 font-mono text-xs overflow-x-auto leading-relaxed text-[#56d364] bg-[#0d1117]">
      <code>{code}</code>
    </pre>
  </div>
);

interface SwatchItem {
  step: string;
  hex: string;
  bgClass: string;
  isLight?: boolean;
}

const ColorSwatch: React.FC<SwatchItem> = ({ step, hex, bgClass, isLight = false }) => (
  <div className="flex-1 min-w-[70px] space-y-1">
    <div
      className={cn(
        'h-12 w-full rounded-lg border border-black/10 dark:border-white/10 flex flex-col justify-between p-1.5 transition-transform hover:scale-105 select-none shadow-xs',
        bgClass
      )}
    >
      <span className={cn('text-[10px] font-mono font-bold leading-none', isLight ? 'text-gray-900' : 'text-white')}>
        {step}
      </span>
      <span className={cn('text-[9px] font-mono leading-none opacity-80', isLight ? 'text-gray-800' : 'text-white')}>
        {hex}
      </span>
    </div>
  </div>
);

const ColorScaleCard: React.FC<{
  title: string;
  description: string;
  badge?: string;
  swatches: SwatchItem[];
}> = ({ title, description, badge, swatches }) => (
  <Card className="space-y-3">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 m-0">{title}</h3>
        <p className="text-xs text-muted m-0 mt-0.5">{description}</p>
      </div>
      {badge && <Badge variant="outline" size="sm">{badge}</Badge>}
    </div>
    <div className="flex flex-wrap gap-2 pt-1">
      {swatches.map((s) => (
        <ColorSwatch key={s.step} {...s} />
      ))}
    </div>
  </Card>
);

const GuideCard: React.FC<{
  title: string;
  description: string;
  preview: React.ReactNode;
  propsList?: PropItem[];
  exampleCode?: string;
}> = ({ title, description, preview, propsList, exampleCode }) => (
  <Card className="space-y-4">
    <CardHeader className="mb-0">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4 pt-1">
      <div>
        <span className="text-xs font-bold text-muted uppercase tracking-wider block mb-2">Live Preview</span>
        <div className="p-4 rounded-xl border border-border/80 bg-canvas/40 flex flex-wrap gap-3 items-center">
          {preview}
        </div>
      </div>
      {propsList && propsList.length > 0 && (
        <div>
          <span className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Spesifikasi Props</span>
          <PropTable props={propsList} />
        </div>
      )}
      {exampleCode && (
        <div>
          <span className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Contoh Penggunaan</span>
          <CodeBlock code={exampleCode} />
        </div>
      )}
    </CardContent>
  </Card>
);

export const DesignSystem: React.FC = () => {
  // Live demo states
  const [btnLoading, setBtnLoading] = useState(false);
  const [demoInput, setDemoInput] = useState('');
  const [demoSelect, setDemoSelect] = useState('1');
  const [demoSwitch, setDemoSwitch] = useState(true);
  const [demoCheck, setDemoCheck] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<{ id: string; title: string; desc: string; variant: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  const tableColumns: ColumnDef<{ id: string; name: string; role: string; status: string }, unknown>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Nama Akuntan' },
    { accessorKey: 'role', header: 'Peran' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => <Badge variant="success" dot ping>{String(info.getValue())}</Badge>,
    },
  ];

  const tableData = [
    { id: 'ACT-01', name: 'Budi Santoso', role: 'Lead Auditor', status: 'Aktif' },
    { id: 'ACT-02', name: 'Siti Rahma', role: 'Staff Pajak', status: 'Aktif' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* 1. Page Header */}
      <Card className="p-6">
        <CardHeader className="mb-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 m-0">
                Design System & UI Components Guide
              </h2>
              <CardDescription className="text-sm mt-1">
                Katalog dokumentasi, spesifikasi props, dan panduan penggunaan komponen atomik @pembukuan/ui.
              </CardDescription>
            </div>
            <Badge variant="info" size="md" dot ping>
              Theme Tokens V2
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* 2. Categorized Tabs Navigation */}
      <Tabs defaultValue="tokens" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="tokens">Semantic Tokens</TabsTrigger>
          <TabsTrigger value="palette">Color Palette</TabsTrigger>
          <TabsTrigger value="atoms">Actions & Atoms</TabsTrigger>
          <TabsTrigger value="forms">Form Controls</TabsTrigger>
          <TabsTrigger value="feedback">Feedback & Overlays</TabsTrigger>
          <TabsTrigger value="data">Data & Layout</TabsTrigger>
        </TabsList>

        {/* TAB 1: Semantic Tokens */}
        <TabsContent value="tokens" className="space-y-6">
          {/* 1. Core Adaptive Tokens */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>1. Token Kanvas & Kontainer Adaptif (Core Layout)</CardTitle>
                <Badge variant="info" size="sm" dot>Otomatis Light / Dark</Badge>
              </div>
              <CardDescription>
                Token utilitas inti yang langsung menyesuaikan mode tema aktif tanpa perlu deklarasi dark: manual.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-border bg-surface space-y-3 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">bg-canvas</span>
                    <Badge variant="outline" size="sm">Root Canvas</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-12 rounded border border-border bg-[#E2E8F0] shadow-xs" title="Light: #E2E8F0" />
                    <div className="h-6 w-12 rounded border border-border bg-[#1A202C] shadow-xs" title="Dark: #1A202C" />
                  </div>
                  <p className="text-xs text-muted">Light: #E2E8F0 | Dark: #1A202C</p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-surface space-y-3 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">bg-surface</span>
                    <Badge variant="outline" size="sm">Container Card</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-12 rounded border border-border bg-[#FFFFFF] shadow-xs" title="Light: #FFFFFF" />
                    <div className="h-6 w-12 rounded border border-border bg-[#2D3748] shadow-xs" title="Dark: #2D3748" />
                  </div>
                  <p className="text-xs text-muted">Light: #FFFFFF | Dark: #2D3748</p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-surface space-y-3 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">bg-surface-hover</span>
                    <Badge variant="outline" size="sm">Row / Item Hover</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-12 rounded border border-border bg-[#F1F5F9] shadow-xs" title="Light: #F1F5F9" />
                    <div className="h-6 w-12 rounded border border-border bg-[#374151] shadow-xs" title="Dark: #374151" />
                  </div>
                  <p className="text-xs text-muted">Light: #F1F5F9 | Dark: #374151</p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-surface space-y-3 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">border-border</span>
                    <Badge variant="outline" size="sm">Divider & Stroke</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-12 rounded border-2 border-[#CBD5E1] bg-surface" title="Light: #CBD5E1" />
                    <div className="h-6 w-12 rounded border-2 border-[#4A5568] bg-surface" title="Dark: #4A5568" />
                  </div>
                  <p className="text-xs text-muted">Light: #CBD5E1 | Dark: #4A5568</p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-surface space-y-3 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">text-muted</span>
                    <Badge variant="outline" size="sm">Secondary Typography</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#64748B]">Aa Light</span>
                    <span className="text-xs font-bold text-[#94A3B8]">Aa Dark</span>
                  </div>
                  <p className="text-xs text-muted">Light: #64748B | Dark: #94A3B8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Brand & Action Colors */}
          <Card>
            <CardHeader>
              <CardTitle>2. Token Brand & Primary Actions</CardTitle>
              <CardDescription>
                Warna aksen utama untuk tombol interaktif, link aktif, dan indikator fokus aksesibilitas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-border bg-surface space-y-2 shadow-xs">
                  <div className="h-10 w-full rounded-lg bg-blue-600 shadow-sm shadow-blue-500/25 flex items-center justify-center text-white font-mono text-xs font-bold">
                    #2563EB
                  </div>
                  <span className="font-mono text-xs font-bold block">bg-blue-600</span>
                  <p className="text-[11px] text-muted">Tombol aksi utama (Primary CTA Light)</p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-surface space-y-2 shadow-xs">
                  <div className="h-10 w-full rounded-lg bg-blue-700 flex items-center justify-center text-white font-mono text-xs font-bold">
                    #1D4ED8
                  </div>
                  <span className="font-mono text-xs font-bold block">hover:bg-blue-700</span>
                  <p className="text-[11px] text-muted">State hover tombol primary</p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-surface space-y-2 shadow-xs">
                  <div className="h-10 w-full rounded-lg bg-blue-500 flex items-center justify-center text-white font-mono text-xs font-bold">
                    #3B82F6
                  </div>
                  <span className="font-mono text-xs font-bold block">dark:bg-blue-500</span>
                  <p className="text-[11px] text-muted">Tombol primary pada dark mode</p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-surface space-y-2 shadow-xs">
                  <div className="h-10 w-full rounded-lg border-2 border-blue-500 ring-4 ring-blue-500/20 bg-surface flex items-center justify-center font-mono text-xs font-bold text-blue-600">
                    Ring 4px
                  </div>
                  <span className="font-mono text-xs font-bold block">focus:ring-blue-500</span>
                  <p className="text-[11px] text-muted">Aura ring fokus keyboard</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Status & Functional Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>3. Token Status & Umpan Balik (Functional Colors)</CardTitle>
              <CardDescription>
                Warna semantik untuk data pemasukan, pengeluaran, peringatan saldo, dan notifikasi sistem.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Success */}
                <div className="p-4 rounded-xl border border-green-200 dark:border-green-800/80 bg-green-50/60 dark:bg-green-950/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-green-700 dark:text-green-300">Success / Pemasukan</span>
                    <Badge variant="success" size="sm" dot ping>+Aktif</Badge>
                  </div>
                  <div className="h-8 w-full rounded bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white font-mono text-xs font-bold">
                    #16A34A
                  </div>
                  <p className="text-[11px] text-muted">Arus kas masuk, badge sukses, alert verified.</p>
                </div>

                {/* Danger */}
                <div className="p-4 rounded-xl border border-red-200 dark:border-red-800/80 bg-red-50/60 dark:bg-red-950/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-red-700 dark:text-red-300">Danger / Pengeluaran</span>
                    <Badge variant="danger" size="sm" dot>-Keluar</Badge>
                  </div>
                  <div className="h-8 w-full rounded bg-red-600 dark:bg-red-500 flex items-center justify-center text-white font-mono text-xs font-bold">
                    #DC2626
                  </div>
                  <p className="text-[11px] text-muted">Arus kas keluar, validasi error input, hapus mutasi.</p>
                </div>

                {/* Warning */}
                <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-amber-50/60 dark:bg-amber-950/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-amber-800 dark:text-amber-300">Warning / Pending</span>
                    <Badge variant="warning" size="sm">Tertunda</Badge>
                  </div>
                  <div className="h-8 w-full rounded bg-amber-500 flex items-center justify-center text-white font-mono text-xs font-bold">
                    #D97706
                  </div>
                  <p className="text-[11px] text-muted">Peringatan limit anggaran, transaksi menunggu konfirmasi.</p>
                </div>

                {/* Info */}
                <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800/80 bg-blue-50/60 dark:bg-blue-950/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-blue-700 dark:text-blue-300">Info / Akuntansi</span>
                    <Badge variant="info" size="sm">Info</Badge>
                  </div>
                  <div className="h-8 w-full rounded bg-blue-600 flex items-center justify-center text-white font-mono text-xs font-bold">
                    #2563EB
                  </div>
                  <p className="text-[11px] text-muted">Kategori transaksi umum, info akun buku besar.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Complete Palette Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>4. Matriks Spesifikasi Seluruh Token</CardTitle>
              <CardDescription>
                Referensi lengkap token semantik, class utilitas, dan kecocokan peruntukannya pada arsitektur MFE.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-canvas text-muted border-b border-border font-semibold uppercase">
                    <tr>
                      <th className="px-4 py-3">Token Semantik</th>
                      <th className="px-4 py-3 font-mono">Utility Class</th>
                      <th className="px-4 py-3 font-mono">Light Mode</th>
                      <th className="px-4 py-3 font-mono">Dark Mode</th>
                      <th className="px-4 py-3">Penerapan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 bg-surface">
                    <tr className="hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-3 font-semibold">Canvas (Root)</td>
                      <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">bg-canvas</td>
                      <td className="px-4 py-3 font-mono">#E2E8F0</td>
                      <td className="px-4 py-3 font-mono">#1A202C</td>
                      <td className="px-4 py-3 text-muted">Latar belakang utama aplikasi</td>
                    </tr>
                    <tr className="hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-3 font-semibold">Surface (Card)</td>
                      <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">bg-surface</td>
                      <td className="px-4 py-3 font-mono">#FFFFFF</td>
                      <td className="px-4 py-3 font-mono">#2D3748</td>
                      <td className="px-4 py-3 text-muted">Card, dialog modal, panel form</td>
                    </tr>
                    <tr className="hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-3 font-semibold">Surface Hover</td>
                      <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">bg-surface-hover</td>
                      <td className="px-4 py-3 font-mono">#F1F5F9</td>
                      <td className="px-4 py-3 font-mono">#374151</td>
                      <td className="px-4 py-3 text-muted">Hover baris tabel & menu dropdown</td>
                    </tr>
                    <tr className="hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-3 font-semibold">Border & Divider</td>
                      <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">border-border</td>
                      <td className="px-4 py-3 font-mono">#CBD5E1</td>
                      <td className="px-4 py-3 font-mono">#4A5568</td>
                      <td className="px-4 py-3 text-muted">Garis batas kartu, input, dan tabel</td>
                    </tr>
                    <tr className="hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-3 font-semibold">Muted Text</td>
                      <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">text-muted</td>
                      <td className="px-4 py-3 font-mono">#64748B</td>
                      <td className="px-4 py-3 font-mono">#94A3B8</td>
                      <td className="px-4 py-3 text-muted">Label sekunder & teks deskripsi</td>
                    </tr>
                    <tr className="hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-3 font-semibold">Brand Primary</td>
                      <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">bg-blue-600</td>
                      <td className="px-4 py-3 font-mono">#2563EB</td>
                      <td className="px-4 py-3 font-mono">#3B82F6</td>
                      <td className="px-4 py-3 text-muted">Tombol utama & link aktif</td>
                    </tr>
                    <tr className="hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-3 font-semibold">Status Success</td>
                      <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">text-green-700</td>
                      <td className="px-4 py-3 font-mono">#16A34A</td>
                      <td className="px-4 py-3 font-mono">#22C55E</td>
                      <td className="px-4 py-3 text-muted">Nominal pemasukan & badge aktif</td>
                    </tr>
                    <tr className="hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-3 font-semibold">Status Danger</td>
                      <td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">text-red-700</td>
                      <td className="px-4 py-3 font-mono">#DC2626</td>
                      <td className="px-4 py-3 font-mono">#EF4444</td>
                      <td className="px-4 py-3 text-muted">Nominal pengeluaran & pesan error</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: Color Palette */}
        <TabsContent value="palette" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Chromatic Color Palette Specs</CardTitle>
                <Badge variant="info" size="sm">Design Tokens V2</Badge>
              </div>
              <CardDescription>
                Spektrum skala warna sistemik pembukuan-v2 lengkap dari step 50 hingga 950 untuk konsistensi visual multi-modul.
              </CardDescription>
            </CardHeader>
          </Card>

          <ColorScaleCard
            title="Brand Primary (Blue Palette)"
            description="Skala warna aksen biru utama untuk tombol interaktif, link, fokus ring, dan state aktif."
            badge="CTA & Branding"
            swatches={[
              { step: '50', hex: '#EFF6FF', bgClass: 'bg-blue-50', isLight: true },
              { step: '100', hex: '#DBEAFE', bgClass: 'bg-blue-100', isLight: true },
              { step: '200', hex: '#BFDBFE', bgClass: 'bg-blue-200', isLight: true },
              { step: '300', hex: '#93C5FD', bgClass: 'bg-blue-300', isLight: true },
              { step: '400', hex: '#60A5FA', bgClass: 'bg-blue-400' },
              { step: '500', hex: '#3B82F6', bgClass: 'bg-blue-500' },
              { step: '600', hex: '#2563EB', bgClass: 'bg-blue-600' },
              { step: '700', hex: '#1D4ED8', bgClass: 'bg-blue-700' },
              { step: '800', hex: '#1E40AF', bgClass: 'bg-blue-800' },
              { step: '900', hex: '#1E3A8A', bgClass: 'bg-blue-900' },
              { step: '950', hex: '#172554', bgClass: 'bg-blue-950' },
            ]}
          />

          <ColorScaleCard
            title="Neutral Slate (Structure & Canvas Scales)"
            description="Skala netral abu-abu slate untuk fondasi kanvas, permukaan kontainer, garis pemisah, dan teks."
            badge="Layout & Surface"
            swatches={[
              { step: '50', hex: '#F8FAFC', bgClass: 'bg-slate-50', isLight: true },
              { step: '100', hex: '#F1F5F9', bgClass: 'bg-slate-100', isLight: true },
              { step: '200', hex: '#E2E8F0', bgClass: 'bg-slate-200', isLight: true },
              { step: '300', hex: '#CBD5E1', bgClass: 'bg-slate-300', isLight: true },
              { step: '400', hex: '#94A3B8', bgClass: 'bg-slate-400' },
              { step: '500', hex: '#64748B', bgClass: 'bg-slate-500' },
              { step: '600', hex: '#475569', bgClass: 'bg-slate-600' },
              { step: '700', hex: '#334155', bgClass: 'bg-slate-700' },
              { step: '800', hex: '#1E293B', bgClass: 'bg-slate-800' },
              { step: '900', hex: '#0F172A', bgClass: 'bg-slate-900' },
              { step: '950', hex: '#020617', bgClass: 'bg-slate-950' },
            ]}
          />

          <ColorScaleCard
            title="Success Emerald (Pemasukan & Aktif)"
            description="Skala hijau zamrud untuk metrik kas masuk, laba bersih, dan indikator status berhasil."
            badge="Positive Financial"
            swatches={[
              { step: '50', hex: '#ECFDF5', bgClass: 'bg-emerald-50', isLight: true },
              { step: '100', hex: '#D1FAE5', bgClass: 'bg-emerald-100', isLight: true },
              { step: '200', hex: '#A7F3D0', bgClass: 'bg-emerald-200', isLight: true },
              { step: '300', hex: '#6EE7B7', bgClass: 'bg-emerald-300', isLight: true },
              { step: '400', hex: '#34D399', bgClass: 'bg-emerald-400' },
              { step: '500', hex: '#10B981', bgClass: 'bg-emerald-500' },
              { step: '600', hex: '#059669', bgClass: 'bg-emerald-600' },
              { step: '700', hex: '#047857', bgClass: 'bg-emerald-700' },
              { step: '800', hex: '#065F46', bgClass: 'bg-emerald-800' },
              { step: '900', hex: '#064E3B', bgClass: 'bg-emerald-900' },
            ]}
          />

          <ColorScaleCard
            title="Danger Red (Pengeluaran & Error)"
            description="Skala merah mawar untuk metrik kas keluar, beban rugi, dan pesan validasi gagal."
            badge="Negative Financial"
            swatches={[
              { step: '50', hex: '#FEF2F2', bgClass: 'bg-red-50', isLight: true },
              { step: '100', hex: '#FEE2E2', bgClass: 'bg-red-100', isLight: true },
              { step: '200', hex: '#FECACA', bgClass: 'bg-red-200', isLight: true },
              { step: '300', hex: '#FCA5A5', bgClass: 'bg-red-300', isLight: true },
              { step: '400', hex: '#F87171', bgClass: 'bg-red-400' },
              { step: '500', hex: '#EF4444', bgClass: 'bg-red-500' },
              { step: '600', hex: '#DC2626', bgClass: 'bg-red-600' },
              { step: '700', hex: '#B91C1C', bgClass: 'bg-red-700' },
              { step: '800', hex: '#991B1B', bgClass: 'bg-red-800' },
              { step: '900', hex: '#7F1D1D', bgClass: 'bg-red-900' },
            ]}
          />

          <ColorScaleCard
            title="Warning Amber (Limit Anggaran & Pending)"
            description="Skala kuning jingga untuk transaksi tertunda dan peringatan batas pagu anggaran."
            badge="Cautionary"
            swatches={[
              { step: '50', hex: '#FFFBEB', bgClass: 'bg-amber-50', isLight: true },
              { step: '100', hex: '#FEF3C7', bgClass: 'bg-amber-100', isLight: true },
              { step: '200', hex: '#FDE68A', bgClass: 'bg-amber-200', isLight: true },
              { step: '300', hex: '#FCD34D', bgClass: 'bg-amber-300', isLight: true },
              { step: '400', hex: '#FBBF24', bgClass: 'bg-amber-400', isLight: true },
              { step: '500', hex: '#F59E0B', bgClass: 'bg-amber-500' },
              { step: '600', hex: '#D97706', bgClass: 'bg-amber-600' },
              { step: '700', hex: '#B45309', bgClass: 'bg-amber-700' },
              { step: '800', hex: '#92400E', bgClass: 'bg-amber-800' },
            ]}
          />

          <ColorScaleCard
            title="Info Sky (Kategori Akuntansi & Metadata)"
            description="Skala biru langit untuk tag akun buku besar, indikator tooltip, dan status netral."
            badge="Informative"
            swatches={[
              { step: '50', hex: '#F0F9FF', bgClass: 'bg-sky-50', isLight: true },
              { step: '100', hex: '#E0F2FE', bgClass: 'bg-sky-100', isLight: true },
              { step: '200', hex: '#BAE6FD', bgClass: 'bg-sky-200', isLight: true },
              { step: '300', hex: '#7DD3FC', bgClass: 'bg-sky-300', isLight: true },
              { step: '400', hex: '#38BDF8', bgClass: 'bg-sky-400' },
              { step: '500', hex: '#0EA5E9', bgClass: 'bg-sky-500' },
              { step: '600', hex: '#0284C7', bgClass: 'bg-sky-600' },
              { step: '700', hex: '#0369A1', bgClass: 'bg-sky-700' },
              { step: '800', hex: '#075985', bgClass: 'bg-sky-800' },
            ]}
          />
        </TabsContent>

        {/* TAB 2: Actions & Atoms */}
        <TabsContent value="atoms" className="space-y-6">
          <GuideCard
            title="Komponen Button"
            description="Tombol aksi interaktif dengan feedback taktil active:scale-[0.98], slot icon, ukuran, dan loading state."
            preview={
              <>
                <Button label="Primary Button" variant="primary" />
                <Button label="Secondary Button" variant="secondary" />
                <Button label="Outline Button" variant="outline" />
                <Button label="Danger Button" variant="danger" />
                <Button label="Small" size="sm" />
                <Button label="Large" size="lg" />
                <Button
                  label={btnLoading ? 'Memproses...' : 'Toggle Loading'}
                  isLoading={btnLoading}
                  onClick={() => {
                    setBtnLoading(true);
                    setTimeout(() => setBtnLoading(false), 1500);
                  }}
                />
              </>
            }
            propsList={[
              { name: 'label', type: 'string', description: 'Teks label utama tombol.' },
              { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'danger'", defaultVal: "'primary'", description: 'Variasi visual warna tombol.' },
              { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", description: 'Ukuran dimensi padding & font tombol.' },
              { name: 'leftIcon', type: 'React.ReactNode', description: 'Elemen icon pada posisi kiri label.' },
              { name: 'rightIcon', type: 'React.ReactNode', description: 'Elemen icon pada posisi kanan label.' },
              { name: 'isLoading', type: 'boolean', defaultVal: 'false', description: 'Menampilkan spinner inline dan menonaktifkan klik.' },
            ]}
            exampleCode={`import { Button } from '@pembukuan/ui';\n\n<Button\n  label="Simpan Data"\n  variant="primary"\n  size="md"\n  isLoading={isSubmitting}\n/>`}
          />

          <GuideCard
            title="Komponen Badge"
            description="Pill label status ringkas dengan indikator dot dan radar pulse animation."
            preview={
              <>
                <Badge variant="default">Default</Badge>
                <Badge variant="success" dot ping>Live Pulse</Badge>
                <Badge variant="danger" dot>Error Dot</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info" size="sm">Info Small</Badge>
                <Badge variant="outline">Outline</Badge>
              </>
            }
            propsList={[
              { name: 'variant', type: "'default' | 'success' | 'danger' | 'warning' | 'info' | 'outline'", defaultVal: "'default'", description: 'Tema warna status badge.' },
              { name: 'size', type: "'sm' | 'md'", defaultVal: "'md'", description: 'Dimensi badge.' },
              { name: 'dot', type: 'boolean', defaultVal: 'false', description: 'Menampilkan titik status berwarna di sisi kiri.' },
              { name: 'ping', type: 'boolean', defaultVal: 'false', description: 'Menambahkan animasi radar ping pada dot.' },
              { name: 'icon', type: 'React.ReactNode', description: 'Slot custom icon sebelum teks.' },
            ]}
            exampleCode={`import { Badge } from '@pembukuan/ui';\n\n<Badge variant="success" dot ping>\n  Tersinkronisasi\n</Badge>`}
          />

          <GuideCard
            title="Komponen Spinner"
            description="Indikator progres pemuatan data berbasis SVG animasi putar."
            preview={
              <>
                <Spinner size="sm" label="Small" />
                <Spinner size="md" label="Medium" />
                <Spinner size="lg" label="Large" />
                <Spinner size="md" variant="muted" label="Muted" />
              </>
            }
            propsList={[
              { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", defaultVal: "'md'", description: 'Ukuran dimensi spinner.' },
              { name: 'variant', type: "'primary' | 'white' | 'muted'", defaultVal: "'primary'", description: 'Warna stroke SVG spinner.' },
              { name: 'label', type: 'React.ReactNode', description: 'Teks label pendamping status loading.' },
              { name: 'labelPosition', type: "'right' | 'bottom'", defaultVal: "'right'", description: 'Tata letak teks pendamping terhadap spinner.' },
            ]}
            exampleCode={`import { Spinner } from '@pembukuan/ui';\n\n<Spinner size="md" label="Memuat mutasi kas..." />`}
          />
        </TabsContent>

        {/* TAB 3: Form Controls */}
        <TabsContent value="forms" className="space-y-6">
          <GuideCard
            title="Komponen TextInput"
            description="Field input teks dengan slot start/end adornment, helper text, dan status validasi error."
            preview={
              <div className="w-full max-w-md space-y-3">
                <TextInput
                  label="Nominal Transaksi"
                  placeholder="1500000"
                  value={demoInput}
                  onChange={setDemoInput}
                  startAdornment={<span className="text-xs font-semibold text-muted">Rp</span>}
                  helperText="Gunakan format angka tanpa titik."
                />
              </div>
            }
            propsList={[
              { name: 'label', type: 'string', description: 'Label form yang terhubung dengan htmlFor input.' },
              { name: 'value', type: 'string', description: 'Nilai input teks (controlled).' },
              { name: 'onChange', type: '(value: string) => void', description: 'Callback saat isi teks berubah.' },
              { name: 'startAdornment', type: 'React.ReactNode', description: 'Elemen prefix di dalam border (misal Rp atau icon).' },
              { name: 'endAdornment', type: 'React.ReactNode', description: 'Elemen suffix di dalam border (misal tombol show/hide password).' },
              { name: 'helperText', type: 'string', description: 'Teks petunjuk kecil di bawah input saat tidak ada error.' },
              { name: 'error', type: 'string', description: 'Pesan validasi error berwarna merah.' },
              { name: 'containerClassName', type: 'string', description: 'Kelas kustom untuk container pembungkus.' },
            ]}
            exampleCode={`import { TextInput } from '@pembukuan/ui';\n\n<TextInput\n  label="Nominal Transaksi"\n  value={amount}\n  onChange={setAmount}\n  startAdornment={<span>Rp</span>}\n  helperText="Tanpa tanda titik."\n/>`}
          />

          <GuideCard
            title="Komponen Select"
            description="Menu pilihan drop-down dengan wrapper ikon chevron bawaan."
            preview={
              <div className="w-full max-w-md">
                <Select
                  label="Pilihan Kategori"
                  value={demoSelect}
                  onChange={setDemoSelect}
                  options={[
                    { value: '1', label: 'Operasional Kantor' },
                    { value: '2', label: 'Pendapatan Jasa' },
                    { value: '3', label: 'Gaji Karyawan' },
                  ]}
                />
              </div>
            }
            propsList={[
              { name: 'label', type: 'string', description: 'Label elemen select.' },
              { name: 'options', type: 'Array<{ value: string; label: string; disabled?: boolean }>', description: 'Daftar opsi dropdown.' },
              { name: 'value', type: 'string', description: 'Nilai opsi yang terpilih.' },
              { name: 'onChange', type: '(value: string) => void', description: 'Callback saat opsi berubah.' },
              { name: 'placeholder', type: 'string', description: 'Opsi default kosong yang disabled.' },
              { name: 'error', type: 'string', description: 'Pesan kesalahan validasi.' },
            ]}
            exampleCode={`import { Select } from '@pembukuan/ui';\n\n<Select\n  label="Kategori"\n  options={[{ value: 'ops', label: 'Operasional' }]}\n  value={category}\n  onChange={setCategory}\n/>`}
          />

          <GuideCard
            title="Komponen Switch & Checkbox"
            description="Kontrol biner untuk toggle status dan seleksi baris data."
            preview={
              <div className="flex flex-wrap gap-6 items-center">
                <Switch
                  label={demoSwitch ? 'Status: Aktif' : 'Status: Nonaktif'}
                  checked={demoSwitch}
                  onCheckedChange={setDemoSwitch}
                  id="guide-switch"
                />
                <Checkbox
                  label="Pilih transaksi"
                  checked={demoCheck}
                  onCheckedChange={setDemoCheck}
                />
                <Checkbox
                  label="Indeterminate State"
                  checked={false}
                  indeterminate
                  onCheckedChange={() => {}}
                />
              </div>
            }
            propsList={[
              { name: 'checked', type: 'boolean', description: 'Status aktif atau centang.' },
              { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Callback saat toggle ditekan.' },
              { name: 'label', type: 'string', description: 'Label deskriptif di samping kontrol.' },
              { name: 'indeterminate', type: 'boolean', description: 'Status seleksi parsial (hanya Checkbox).' },
            ]}
            exampleCode={`import { Switch, Checkbox } from '@pembukuan/ui';\n\n<Switch label="Mode Otomatis" checked={enabled} onCheckedChange={setEnabled} />\n<Checkbox label="Setujui Syarat" checked={agreed} onCheckedChange={setAgreed} />`}
          />
        </TabsContent>

        {/* TAB 4: Feedback & Overlays */}
        <TabsContent value="feedback" className="space-y-6">
          <GuideCard
            title="Komponen Alert & Toast"
            description="Notifikasi inline dan floating toast untuk memberi umpan balik status mutasi."
            preview={
              <div className="w-full space-y-4">
                <Alert
                  variant="success"
                  title="Sinkronisasi Berhasil"
                  description="Seluruh mutasi telah tervalidasi ke dalam buku besar."
                />
                <div className="flex gap-2">
                  <Button
                    label="Picu Toast Sukses"
                    variant="primary"
                    size="sm"
                    onClick={() => setActiveToast({ id: String(Date.now()), title: 'Data Tersimpan', desc: 'Mutasi telah ditambahkan.', variant: 'success' })}
                  />
                  <Button
                    label="Picu Toast Error"
                    variant="danger"
                    size="sm"
                    onClick={() => setActiveToast({ id: String(Date.now()), title: 'Koneksi Gagal', desc: 'Tidak dapat menjangkau server buku kas.', variant: 'error' })}
                  />
                </div>
              </div>
            }
            propsList={[
              { name: 'variant', type: "'success' | 'warning' | 'error' | 'info'", defaultVal: "'info'", description: 'Tipe semantik notifikasi.' },
              { name: 'title', type: 'React.ReactNode', description: 'Judul tebal notifikasi.' },
              { name: 'description', type: 'React.ReactNode', description: 'Rincian deskripsi pesan status.' },
              { name: 'onClose', type: '() => void', description: 'Callback saat tombol tutup diklik.' },
            ]}
            exampleCode={`import { Alert, Toast } from '@pembukuan/ui';\n\n<Alert variant="info" title="Informasi" description="Data terbarui." />`}
          />

          <GuideCard
            title="Komponen Modal"
            description="Dialog overlay mengambang dengan backdrop-blur dan pembatasan fokus aksesibilitas."
            preview={
              <>
                <Button
                  label="Buka Dialog Modal Demo"
                  variant="primary"
                  onClick={() => setIsModalOpen(true)}
                />
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Panduan Dialog Modal"
                  description="Komponen modal merender portal ke body dengan manajemen tombol Escape."
                  footer={
                    <Button label="Tutup Dialog" variant="secondary" onClick={() => setIsModalOpen(false)} />
                  }
                >
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    Ini adalah konten dialog modal standar. Cocok untuk form pencatatan data baru.
                  </p>
                </Modal>
              </>
            }
            propsList={[
              { name: 'isOpen', type: 'boolean', description: 'Status buka/tutup modal.' },
              { name: 'onClose', type: '() => void', description: 'Callback saat modal ditutup (Escape/Overlay/Close button).' },
              { name: 'title', type: 'React.ReactNode', description: 'Judul dialog pada header.' },
              { name: 'description', type: 'React.ReactNode', description: 'Subjudul atau deskripsi singkat dialog.' },
              { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", defaultVal: "'md'", description: 'Lebar maksimal panel dialog.' },
              { name: 'footer', type: 'React.ReactNode', description: 'Slot tombol aksi di bagian bawah dialog.' },
            ]}
            exampleCode={`import { Modal, Button } from '@pembukuan/ui';\n\n<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Konfirmasi">\n  <p>Apakah Anda yakin?</p>\n</Modal>`}
          />

          <GuideCard
            title="Komponen DropdownMenu"
            description="Menu floating kontekstual untuk baris tabel dan tindakan cepat."
            preview={
              <DropdownMenu>
                <DropdownMenuTrigger className="px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold hover:bg-surface-hover">
                  Opsi Aksi Menu Transaksi &darr;
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => {}}>Rincian Jurnal</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>Ubah Data</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="danger" onClick={() => {}}>Hapus Transaksi</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            }
            propsList={[
              { name: 'align', type: "'left' | 'right'", defaultVal: "'left'", description: 'Perataan horizontal menu terhadap trigger.' },
              { name: 'variant', type: "'default' | 'danger'", defaultVal: "'default'", description: 'Variasi warna item (misal merah untuk hapus).' },
            ]}
            exampleCode={`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@pembukuan/ui';\n\n<DropdownMenu>\n  <DropdownMenuTrigger>Aksi</DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem onClick={edit}>Ubah</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`}
          />
        </TabsContent>

        {/* TAB 5: Data & Layout */}
        <TabsContent value="data" className="space-y-6">
          <GuideCard
            title="Komponen Card"
            description="Kontainer berbingkai dengan dukungan variant glass, hover lift micro-interaction, dan sub-komponen header/content."
            preview={
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <Card hoverLift>
                  <CardHeader>
                    <CardTitle>Kartu Interaktif</CardTitle>
                    <CardDescription>Hover untuk melihat animasi naiknya kartu.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted">
                    Prop hoverLift memberi efek hover:-translate-y-0.5.
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>Kartu Glass</CardTitle>
                    <CardDescription>Backdrop blur translusen.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted">
                    Prop variant="glass" mengaktifkan backdrop-blur-md.
                  </CardContent>
                </Card>
              </div>
            }
            propsList={[
              { name: 'variant', type: "'default' | 'glass' | 'outlined'", defaultVal: "'default'", description: 'Tipe visual latar dan batas kartu.' },
              { name: 'hoverLift', type: 'boolean', defaultVal: 'false', description: 'Mengaktifkan animasi naik tipis dan bayangan saat di-hover.' },
            ]}
            exampleCode={`import { Card, CardHeader, CardTitle, CardContent } from '@pembukuan/ui';\n\n<Card hoverLift>\n  <CardHeader><CardTitle>Ringkasan</CardTitle></CardHeader>\n  <CardContent><p>Konten</p></CardContent>\n</Card>`}
          />

          <GuideCard
            title="Komponen ServerTable"
            description="Tabel terintegrasi TanStack Table dengan sorting server-side, pagination, zebra striping, dan custom empty state."
            preview={
              <div className="w-full">
                <ServerTable
                  columns={tableColumns}
                  data={tableData}
                  zebra
                  pagination={{
                    page: 1,
                    pageSize: 5,
                    totalRows: tableData.length,
                    onPageChange: () => {},
                  }}
                />
              </div>
            }
            propsList={[
              { name: 'columns', type: 'ColumnDef<TData, unknown>[]', description: 'Definisi kolom tabel TanStack Table.' },
              { name: 'data', type: 'TData[]', description: 'Array baris data yang akan dirender.' },
              { name: 'zebra', type: 'boolean', defaultVal: 'false', description: 'Mengaktifkan warna belang-belang pada baris genap.' },
              { name: 'isLoading', type: 'boolean', defaultVal: 'false', description: 'Menampilkan skeleton loader baris tabel.' },
              { name: 'emptyMessage', type: 'string', description: 'Pesan ketika tidak ada data.' },
              { name: 'emptyIcon', type: 'React.ReactNode', description: 'Icon custom untuk state data kosong.' },
            ]}
            exampleCode={`import { ServerTable } from '@pembukuan/ui';\n\n<ServerTable\n  columns={columns}\n  data={data}\n  zebra\n  pagination={{ page: 1, pageSize: 10, totalRows: 50, onPageChange: setPage }}\n/>`}
          />

          <GuideCard
            title="Komponen Skeleton"
            description="Placeholder pemuatan data dengan animasi pulse atau shimmer gradient sweep."
            preview={
              <div className="w-full space-y-3 max-w-sm">
                <div className="flex items-center gap-3">
                  <Skeleton rounded="full" className="h-10 w-10 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton variant="shimmer" className="h-6 w-full rounded-md" />
              </div>
            }
            propsList={[
              { name: 'variant', type: "'pulse' | 'shimmer'", defaultVal: "'pulse'", description: 'Tipe animasi loading.' },
              { name: 'rounded', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", defaultVal: "'md'", description: 'Tingkat kebulatan sudut skeleton.' },
            ]}
            exampleCode={`import { Skeleton } from '@pembukuan/ui';\n\n<Skeleton variant="shimmer" className="h-8 w-full" />`}
          />
        </TabsContent>
      </Tabs>

      {/* Floating Toast Container */}
      <ToastContainer>
        {activeToast && (
          <Toast
            title={activeToast.title}
            description={activeToast.desc}
            variant={activeToast.variant}
            onClose={() => setActiveToast(null)}
          />
        )}
      </ToastContainer>
    </div>
  );
};

export default DesignSystem;
