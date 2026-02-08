import type { Metadata } from "next";
import "./globals.css";
{/* Components */ }
import SmoothScrollProvider from './components/SmoothScrollProvider'
{/* Components End */ }

export const metadata: Metadata = {
  title: "MBKM UNG 2026",
  description: "Platform portofolio, blog, dan direktori anggota untuk mahasiswa MBKM Prodi PTI Universitas Negeri Gorontalo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" style={{ fontFamily: "'Rubik'" }}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,600;0,700;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
