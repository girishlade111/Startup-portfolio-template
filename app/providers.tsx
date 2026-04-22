'use client';

import { ThemeProvider } from 'next-themes';
import { MantineWrapper } from '@/components/providers/MantineWrapper';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <MantineWrapper>
        {children}
      </MantineWrapper>
    </ThemeProvider>
  );
}