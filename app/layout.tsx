import type { Metadata } from "next";
import "@/app/globals.css";
{/* Libs */ }
import { createClient } from "@/utils/supabase/server";
{/* Libs End */ }
{/* Components */ }
import GeneralLayout from "@/app/components/GeneralLayout";
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
  return (
    <GeneralLayout>
      {children}
    </GeneralLayout>
  );
}
