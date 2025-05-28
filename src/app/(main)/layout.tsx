import Footer from "@/components/MainComponents/footer/footer";
import Header from "@/components/MainComponents/header/header";
import { ReactNode } from "react";
import type React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
