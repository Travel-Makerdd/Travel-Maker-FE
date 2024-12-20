import type { Metadata } from 'next'
// import localFont from 'next/font/local'
import '@/styles/globals.css'
import { Header } from '@/components/header'
import { AuthProvider } from './context/AuthContext'
// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// })
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// })

export const metadata: Metadata = {
  title: 'Travel Maker 트레블메이커, 여행을 더 쉽게',
  description: '',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout
