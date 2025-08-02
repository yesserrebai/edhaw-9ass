import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import ThemeInitializer from '../components/ThemeInitializer';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Edhaw 9as - Signalement de Coupures',
  description:
    "Application de signalement de coupures d'électricité en Tunisie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-200`}
      >
        <ThemeInitializer />
        <ThemeProvider defaultTheme="light" storageKey="theme">
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
