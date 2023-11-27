'use client';
import './globals.css';
import { Poppins } from 'next/font/google';
import Navbar from './navbar';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

const poppins = Poppins({
 subsets: ['latin'],
 weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
const disabledNavbar = ['/login', '/register'];

export default function RootLayout({ children }: { children: React.ReactNode }) {
 const pathname = usePathname();
 return (
  <html lang='en'>
   <body className={poppins.className}>
    <SessionProvider>
     {!disabledNavbar.includes(pathname) && <Navbar />}
     {children}
    </SessionProvider>
   </body>
  </html>
 );
}
