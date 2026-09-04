import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer, MobileBottomNav } from '@/components/layout/Footer';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db/store';

export const metadata: Metadata = {
  title: 'EduCode Academy — Master Programming from Basic to Advanced Real Projects',
  description: 'Full-stack education learning platform for Python, Java, Go, PHP, C#, Rust, Laravel, React, Next.js, Vue, Node, Flutter, and Django.',
  openGraph: {
    title: 'EduCode Academy — Learn Programming & Build Real Applications',
    description: 'Free comprehensive developer courses, quizzes, interactive code playground, and real-world projects.',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionUser = await getSession();
  let streakCount = 1;

  if (sessionUser) {
    const user = await db.getUserById(sessionUser.id);
    streakCount = user?.streakCount || 1;
  }

  return (
    <html lang="en" className="dark bg-slate-950 text-slate-100">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        <Navbar user={sessionUser} streakCount={streakCount} />
        <main className="flex-1 flex flex-col pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav user={sessionUser} />
      </body>
    </html>
  );
}
