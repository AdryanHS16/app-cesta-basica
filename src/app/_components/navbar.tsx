"use client"; // Marca o componente como cliente, pois estamos usando o hook usePathname

import { usePathname } from "next/navigation"; // Importa o hook para capturar a URL atual
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/_assets/logo_nav.svg";
import { HiOutlineHome } from "react-icons/hi";
import { FaRegListAlt } from "react-icons/fa";
import { LuFileText } from "react-icons/lu";
import { HiChevronDown, HiChevronUp } from "react-icons/hi"; // Importando ícones de seta
import { BiDonateHeart } from "react-icons/bi";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname(); // Captura a URL atual
  const [isCadastrosOpen, setIsCadastrosOpen] = useState(false); // Estado para controlar a abertura do submenu

  // Se a URL for a raiz "/", que é a página de login, não renderiza a Navbar
  if (pathname === "/") {
    return null;
  }

  const isActive = (currentPath: string, pathname: string) => {
    if (currentPath.includes(pathname)) return "text-green-500"; // Aplica a cor do hover ao item ativo
    return "";
  };

  return (
    <nav className="w-[13%] h-screen fixed left-0 top-0 bg-[#3E665E] text-white flex flex-col items-center py-6">
      <div className="mb-12">
        <Link href="/dashboard">
          <Image src={logo} alt="Logo" width={80} height={80} />
        </Link>
      </div>

      <ul className="flex text-lg flex-col items-left space-y-6">
        <li className="flex items-center space-x-3">
          <Link
            href="/dashboard"
            className={`flex items-center hover:text-green-500 ${isActive(
              pathname,
              "dashboard"
            )}`}
          >
            <HiOutlineHome className="mr-2" /> <span>Início</span>
          </Link>
        </li>
        <li className="flex items-center space-x-3">
          <Link
            href="/doacoes"
            className={`flex items-center hover:text-green-500 ${isActive(
              pathname,
              "doacoes"
            )}`}
          >
            <BiDonateHeart className="mr-2" /> <span>Doações</span>
          </Link>
        </li>
        <li className="flex items-center space-x-3">
          <Link
            href="/registros"
            className={`flex items-center hover:text-green-500 ${isActive(
              pathname,
              "registros"
            )}`}
          >
            <FaRegListAlt className="mr-2" /> <span>Registros</span>
          </Link>
        </li>
        <li className="flex flex-col space-y-2">
          <button
            onClick={() => setIsCadastrosOpen(!isCadastrosOpen)}
            className={`flex items-center hover:text-green-500 ${isActive(
              pathname,
              "cadastros"
            )}`}
          >
            <LuFileText className="mr-2" /> <span>Cadastros</span>
            <span className="ml-2">
              {isCadastrosOpen ? (
                <HiChevronUp className="text-lg" />
              ) : (
                <HiChevronDown className="text-lg" />
              )}
            </span>
          </button>
          {isCadastrosOpen && (
            <ul className="pl-6 space-y-2">
              <li>
                <Link
                  href="/cadastros/suppliers"
                  className={`block hover:text-green-500 ${isActive(
                    pathname,
                    "suppliers"
                  )}`}
                >
                  Fornecedores
                </Link>
              </li>
              <li>
                <Link
                  href="/cadastros/beneficiaries"
                  className={`block hover:text-green-500 ${isActive(
                    pathname,
                    "beneficiaries"
                  )}`}
                >
                  Beneficiários
                </Link>
              </li>
              <li>
                <Link
                  href="/cadastros/baskets"
                  className={`block hover:text-green-500 ${isActive(
                    pathname,
                    "baskets"
                  )}`}
                >
                  Cestas
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
