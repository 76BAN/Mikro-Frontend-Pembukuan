import type { ReactNode } from 'react';

export interface StatusCardProps {
  title: string;
  children: ReactNode;
}

export function StatusCard({ title, children }: StatusCardProps) {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>
      {children}
    </div>
  );
}
