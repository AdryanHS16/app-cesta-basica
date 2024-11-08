"use client"; // Marca o componente como cliente, pois estamos usando o hook usePathname

import { usePathname } from "next/navigation"; // Importa o hook para capturar a URL atual
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/_assets/logo_nav.svg";
import { HiOutlineHome } from "react-icons/hi";
import { FaRegListAlt } from "react-icons/fa";
import { LuFileText } from "react-icons/lu";

export default function Navbar() {
  const pathname = usePathname(); // Captura a URL atual

  // Se a URL for a raiz "/", que é a página de login, não renderiza a Navbar
  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="w-64 h-screen bg-[#3E665E] text-white flex flex-col items-center py-6">
      <div className="mb-12">
        <Link href="/dashboard">
          <Image src={logo} alt="Logo" width={80} height={80} className="" />
        </Link>
      </div>

      <ul className="flex flex-col items-left space-y-6">
        <li className="flex items-center space-x-3">
          <Link
            href="/dashboard"
            className="flex items-center hover:text-green-500"
          >
            <HiOutlineHome className="mr-2" /> <span>Início</span>
          </Link>
        </li>
        <li className="flex items-center space-x-3">
          <Link
            href="/registros"
            className="flex items-center hover:text-green-500"
          >
            <FaRegListAlt className="mr-2" />
            <span>Registros</span>
          </Link>
        </li>
        <li className="flex items-center space-x-3">
          <Link
            href="/cadastros"
            className="flex items-center hover:text-green-500"
          >
            <LuFileText className="mr-2" />
            <span>Cadastros</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
