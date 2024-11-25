"use client";

import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";

interface Basket {
  id: number;
  name: string;
  description: string;
  quantity: number;
  excluido: string;
}

export default function Baskets() {
  const [baskets, setBaskets] = useState<Basket[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editingBasketId, setEditingBasketId] = useState<number | null>(null);

  const openModal = (basket?: Basket) => {
    setIsModalOpen(true);
    if (basket) {
      setFormData({
        name: basket.name,
        description: basket.description,
        quantity: basket.quantity,
      });
      setEditingBasketId(basket.id);
    } else {
      setEditingBasketId(null);
      setFormData({
        name: "",
        description: "",
        quantity: 0,
      });
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const fetchBaskets = async () => {
    try {
      const response = await fetch("http://localhost:4000/baskets");
      const data = await response.json();
      setBaskets(data);
    } catch (error) {
      console.error("Erro ao buscar cestas:", error);
    }
  };

  useEffect(() => {
    fetchBaskets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const method = editingBasketId ? "PUT" : "POST";
      const url = editingBasketId
        ? `http://localhost:4000/baskets/${editingBasketId}`
        : "http://localhost:4000/baskets";

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          editingBasketId ? "Erro ao editar cesta" : "Erro ao criar cesta"
        );
      }

      const newBasket = await response.json();

      if (editingBasketId) {
        setBaskets((prev) =>
          prev.map((basket) =>
            basket.id === newBasket.id ? newBasket : basket
          )
        );
      } else {
        setBaskets((prev) => [...prev, newBasket]);
      }

      closeModal();
      setFormData({
        name: "",
        description: "",
        quantity: 0,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  return (
    <main className="pt-8 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-[#3E665E] text-3xl font-semibold">Cestas</h1>
        <button
          onClick={() => openModal()}
          className="bg-[#3E665E] text-white px-8 py-2 rounded-lg shadow-lg hover:bg-[#365e4b] transition duration-300 mr-[4%]"
        >
          + Cesta
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[600px] z-60">
            <h2 className="text-xl font-semibold mb-4 text-[#3E665E]">
              {editingBasketId ? "Editar Cesta" : "Adicionar Cesta"}
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm mb-2">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-GreenCustom"
                placeholder="Digite o nome da cesta"
              />
              <label className="block text-sm mb-2">Descrição</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-GreenCustom"
                placeholder="Digite a descrição"
              />
              <label className="block text-sm mb-2">Quantidade</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-GreenCustom"
                placeholder="Digite a quantidade"
                min={0}
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
                  disabled={isLoading}
                >
                  {isLoading ? "Carregando..." : "Confirmar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela */}
      <section className="mt-8">
        <div className="rounded-lg shadow-lg p-4">
          <table className="min-w-full table-auto shadow-lg">
            <thead>
              <tr className="bg-[#3E665E] text-white">
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Nome</th>
                <th className="px-4 py-2 text-center">Descrição</th>
                <th className="px-4 py-2 text-center">Quantidade</th>
                <th className="px-4 py-2 text-center">Opções</th>
              </tr>
            </thead>
            <tbody>
              {baskets.length > 0 ? (
                baskets
                  .filter((basket) => basket.excluido === "N")
                  .map((basket) => (
                    <tr key={basket.id}>
                      <td className="px-4 py-2 text-center">{basket.id}</td>
                      <td className="px-4 py-2 text-center">{basket.name}</td>
                      <td className="px-4 py-2 text-center">
                        {basket.description}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {basket.quantity}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => openModal(basket)}
                          className="text-blue-500"
                        >
                          <FiEdit size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Nenhuma cesta encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
