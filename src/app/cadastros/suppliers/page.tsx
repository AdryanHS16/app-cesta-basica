"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

interface Supplier {
  id: number;
  company_name: string;
  cnpj: string;
  address: string;
  contact: string;
}

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    cnpj: "",
    address: "",
    contact: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:4000/suppliers");
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true); // Ativa o carregamento ao enviar a requisição

    try {
      const response = await fetch("http://localhost:4000/suppliers", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao criar fornecedor");
      }

      const newSupplier = await response.json();
      console.log("Fornecedor criado com sucesso:", newSupplier);

      setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);

      closeModal();
      setFormData({
        company_name: "",
        cnpj: "",
        address: "",
        contact: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Desativa o carregamento depois que a requisição terminar
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[600px] z-60">
            <h2 className="text-xl font-semibold mb-4 text-[#3E665E]">
              Adicionar Fornecedor
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm mb-2">Nome</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-GreenCustom"
                placeholder="Digite o nome"
              />
              <label className="block text-sm mb-2">CNPJ</label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-GreenCustom"
                placeholder="Digite o CNPJ"
              />
              <label className="block text-sm mb-2">Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-GreenCustom"
                placeholder="Digite o Endereço"
              />
              <label className="block text-sm mb-2">Contato</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-GreenCustom"
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
                  disabled={isLoading} // Desabilita o botão enquanto está carregando
                >
                  {isLoading ? (
                    <span className="animate-spin">Carregando...</span>
                  ) : (
                    "Confirmar"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela de fornecedores */}
      <section className="mt-8">
        <div className="rounded-lg shadow-lg p-4">
          <table className="min-w-full table-auto shadow-lg">
            <thead>
              <tr className="bg-[#3E665E] text-white">
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Nome</th>
                <th className="px-4 py-2 text-center">CNPJ</th>
                <th className="px-4 py-2 text-center">Endereço</th>
                <th className="px-4 py-2 text-center">Contato</th>
                <th className="px-4 py-2 text-center">Opções</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className={
                    suppliers.indexOf(supplier) % 2 === 0
                      ? "bg-gray-100"
                      : "bg-white"
                  }
                >
                  <td className="border px-4 py-2 text-center">
                    {supplier.id}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {supplier.company_name}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {supplier.cnpj}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {supplier.address}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {supplier.contact}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button className="text-blue-500 hover:text-blue-700 mx-2">
                      <FiEdit size={20} />
                    </button>
                    <button className="text-red-500 hover:text-red-700 mx-2">
                      <FiTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
