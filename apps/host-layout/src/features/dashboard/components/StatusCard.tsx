import type { ReactNode } from 'react';
import { Card, CardTitle } from '@pembukuan/ui';

export interface StatusCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function StatusCard({ title, children, className }: StatusCardProps) {
  return (
    <Card className={className}>
      <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {title}
      </CardTitle>
      {children}
    </Card>
  );
}
