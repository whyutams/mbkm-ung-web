import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";
{/* Libs */ }
import { createClient } from "@/utils/supabase/server";
{/* Libs End */ }
{/* Components */ }
import SmoothScrollProvider from './components/SmoothScrollProvider'
import Header from "./components/Header"
import Footer from "./components/Footer"
{/* Components End */ }

export const metadata: Metadata = {
  title: "MBKM UNG 2026",
  description: "Platform portofolio, blog, dan direktori anggota untuk mahasiswa MBKM Prodi PTI Universitas Negeri Gorontalo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  {/* SUPABASE */ }
  const supabase = await createClient();

  {/* General */ }
  const { data: general, error: generalError } = await supabase
    .from("general")
    .select("*")
    .limit(1)
    .maybeSingle();
  let generalSetting = {};
  if (!generalError && general?.data) {
    const _f = [{ name: "_mbkm_location_name", value: (JSON.parse(general.data)).mbkm_location_name }];
    generalSetting = JSON.parse(_f.map(_ => general?.data?.replaceAll(`{${_.name}}`, _.value))[0]);
  }
  if (generalError) console.log("Error fetch general:", generalError.message);
  {/* General End */ }
  {/* SUPABASE END */ }

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
        <NextTopLoader
          color="#f97316"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #f97316,0 0 5px #f97316"
        />
        <SmoothScrollProvider>
          <Header generalSetting={generalSetting || {}} />
          {children}
          <Footer generalSetting={generalSetting || {}} />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
