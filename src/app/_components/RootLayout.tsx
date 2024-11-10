"use client"; // Para usar usePathname

import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/"; // Condição para saber se é a página de login

  return (
    <div className={`flex-1 ${!isLoginPage ? "ml-[15%]" : ""}`}>{children}</div>
  );
}
