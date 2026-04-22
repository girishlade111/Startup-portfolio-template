'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import { useTheme } from 'next-themes';
import { ReactNode } from 'react';

const theme = createTheme({
  primaryColor: 'gold',
  fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
  colors: {
    gold: [
      '#fdf8e8',
      '#faf0cc',
      '#f5e4a0',
      '#efd670',
      '#e8c84a',
      '#D4AF37',
      '#B48C14',
      '#9A7510',
      '#7D5F0D',
      '#604A0A',
    ],
  },
});

interface MantineWrapperProps {
  children: ReactNode;
}

export function MantineWrapper({ children }: MantineWrapperProps) {
  const { theme: nextTheme } = useTheme();
  const colorScheme = nextTheme === 'dark' ? 'dark' : 'light';

  return (
    <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
      {children}
    </MantineProvider>
  );
}
