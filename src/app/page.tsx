import { useState } from "react";
import Image from "next/image";
import img_login from "@/app/_assets/img_login.png";
import logo from "@/app/_assets/logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!login || !password) {
      setError("Por favor, preencha todos os campos.");
    } else {
      setError(null); // Limpa o erro
      router.push("/dashboard"); // Redireciona para o dashboard
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-[#3E665E]">
      <div className="container w-4/5 h-[85vh] flex shadow-md rounded-lg overflow-hidden">
        <div className="w-1/2 flex items-center justify-center">
          <Image
            src={img_login}
            alt="imagem de uma cruz"
            className="object-cover h-full w-full"
          />
        </div>

        <div className="w-1/2 p-8 bg-white flex flex-col justify-center items-center">
          <div className="flex flex-col items-center mb-6">
            <Image
              src={logo}
              alt="logo"
              width={120}
              height={120}
              className="mb-10"
            />
            <h1 className="text-2xl font-semibold text-center"></h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div>
              <label
                htmlFor="login"
                className="block text-sm font-medium text-gray-700"
              >
                Login
              </label>
              <input
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Digite seu login"
                required
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-GreenCustom"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-GreenCustom"
              />
            </div>
            <button
              type="submit"
              className="p-3 text-white bg-[#3E665E] rounded-md hover:bg-[#365C52]"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
