"use client";

import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function Suppliers() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="pt-8 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-[#3E665E] text-3xl font-semibold">Fornecedores</h1>
        <button
          onClick={openModal}
          className="bg-[#3E665E] text-white px-8 py-2 rounded-lg shadow-lg hover:bg-[#365e4b] transition duration-300 mr-[4%]"
        >
          + Fornecedor
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[600px] z-60">
            <h2 className="text-xl font-semibold mb-4 text-[#3E665E]">
              Adicionar Fornecedor
            </h2>
            <form>
              <label className="block text-sm mb-2">Nome</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2  focus:ring-GreenCustom"
                placeholder="Digite o nome"
              />
              <label className="block text-sm mb-2">CNPJ</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2  focus:ring-GreenCustom"
                placeholder="Digite o CPF ou CNPJ"
              />
              <label className="block text-sm mb-2">Endereço</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2  focus:ring-GreenCustom"
                placeholder="Digite o Endereço"
              />
              <label className="block text-sm mb-2">Contato</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2  focus:ring-GreenCustom"
                placeholder="Digite o Contato"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  className="bg-[#3E665E] text-white px-6 py-2 rounded-lg"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="mt-8">
        <div className="rounded-lg shadow-lg p-4">
          <table className="min-w-full table-auto shadow-lg">
            <thead>
              <tr className="bg-[#3E665E] text-white">
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Nome</th>
                <th className="px-4 py-2 text-center">CPF / CNPJ</th>
                <th className="px-4 py-2 text-center">Endereço</th>
                <th className="px-4 py-2 text-center">Contato</th>
                <th className="px-4 py-2 text-center">Opções</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }, (_, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border px-4 py-2 text-center">00001</td>
                  <td className="border px-4 py-2 text-center">
                    Uni Distribuições
                  </td>
                  <td className="border px-4 py-2 text-center">
                    074.336.831-27
                  </td>
                  <td className="border px-4 py-2 text-center">
                    (62) 99228-0073
                  </td>
                  <td className="border px-4 py-2 text-center">
                    Felicia Paula Mendes
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button className="text-blue-500 hover:text-blue-700 mx-2">
                      <FiEdit size={20} />
                    </button>
                    <button className="text-red-500 hover:text-red-700 mx-2">
                      <FiTrash size={20} />
                    </button>
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
