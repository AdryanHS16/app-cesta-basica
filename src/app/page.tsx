import Image from "next/image";
import img_login from "@/app/_assets/img_login.png";
import logo from "@/app/_assets/logo.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-[#3E665E]">
      <div className="container w-4/5 h-[80vh] flex shadow-md rounded-lg overflow-hidden">
        <div className="w-1/2 flex items-center justify-center">
          <Image
            src={img_login}
            alt="imagem de uma cruz"
            className="object-cover h-full w-full"
          />
        </div>

        <div className="w-1/2 p-8 bg-white flex flex-col justify-center items-center">
          <div className="flex flex-col items-center mb-6">
            <Image src={logo} alt="logo" className="mb-5" />
            <h1 className="text-2xl font-semibold text-center"></h1>
          </div>
          <form className="space-y-6 w-full">
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
                placeholder="Digite seu login"
                required
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2  focus:ring-GreenCustom"
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
                placeholder="Digite sua senha"
                required
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2  focus:ring-GreenCustom"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 text-white bg-[#3E665E] rounded-md hover:bg-[#365C52]"
            >
              Entrar
            </button>
          </form>

          <Link href="/dashboard" className="mt-4 text-sm text-blue-500">
            Ir para Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
