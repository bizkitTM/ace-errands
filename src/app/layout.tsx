import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Peter's Errand Run Checklist | AutoZone, Home Depot, Gas & Whole Foods",
  description: 'High-contrast, large-format shopping & errand checklist for today.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
