"use client";

import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";

interface Beneficiary {
  id: number;
  name: string;
  cpf: string;
  address: string;
  contact: string;
  date_of_birth: string; // Novo campo adicionado
  excluido: string;
}

export default function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    address: "",
    contact: "",
    date_of_birth: "", // Novo campo adicionado
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editingBeneficiaryId, setEditingBeneficiaryId] = useState<
    number | null
  >(null);

  const openModal = (beneficiary?: Beneficiary) => {
    setIsModalOpen(true);
    if (beneficiary) {
      setFormData({
        name: beneficiary.name,
        cpf: beneficiary.cpf,
        address: beneficiary.address,
        contact: beneficiary.contact,
        date_of_birth: beneficiary.date_of_birth, // Popula a data de nascimento no modal
      });
      setEditingBeneficiaryId(beneficiary.id);
    } else {
      setEditingBeneficiaryId(null);
      setFormData({
        name: "",
        cpf: "",
        address: "",
        contact: "",
        date_of_birth: "", // Reseta o campo no caso de novo registro
      });
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const fetchBeneficiaries = async () => {
    try {
      const response = await fetch("http://localhost:4000/beneficiaries");
      const data = await response.json();
      setBeneficiaries(data);
    } catch (error) {
      console.error("Erro ao buscar beneficiários:", error);
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const method = editingBeneficiaryId ? "PUT" : "POST";
      const url = editingBeneficiaryId
        ? `http://localhost:4000/beneficiaries/${editingBeneficiaryId}`
        : "http://localhost:4000/beneficiaries";

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          editingBeneficiaryId
            ? "Erro ao editar beneficiário"
            : "Erro ao criar beneficiário"
        );
      }

      const newBeneficiary = await response.json();

      if (editingBeneficiaryId) {
        setBeneficiaries((prev) =>
          prev.map((beneficiary) =>
            beneficiary.id === newBeneficiary.id ? newBeneficiary : beneficiary
          )
        );
      } else {
        setBeneficiaries((prev) => [...prev, newBeneficiary]);
      }

      closeModal();
      setFormData({
        name: "",
        cpf: "",
        address: "",
        contact: "",
        date_of_birth: "", // Reseta o campo após o envio
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main className="pt-8 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-[#3E665E] text-3xl font-semibold">Beneficiários</h1>
        <button
          onClick={() => openModal()}
          className="bg-[#3E665E] text-white px-8 py-2 rounded-lg shadow-lg hover:bg-[#365e4b] transition duration-300 mr-[4%]"
        >
          + Beneficiário
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[600px] z-60">
            <h2 className="text-xl font-semibold mb-4 text-[#3E665E]">
              {editingBeneficiaryId
                ? "Editar Beneficiário"
                : "Adicionar Beneficiário"}
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm mb-2">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-GreenCustom"
                placeholder="Digite o nome"
              />
              <label className="block text-sm mb-2">CPF</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-GreenCustom"
                placeholder="Digite o CPF"
              />
              <label className="block text-sm mb-2">Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-GreenCustom"
                placeholder="Digite o endereço"
              />
              <label className="block text-sm mb-2">Contato</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-GreenCustom"
                placeholder="Digite o contato"
              />
              <label className="block text-sm mb-2">Data de Nascimento</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-GreenCustom"
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
                <th className="px-4 py-2 text-center">CPF</th>
                <th className="px-4 py-2 text-center">Endereço</th>
                <th className="px-4 py-2 text-center">Contato</th>
                <th className="px-4 py-2 text-center">Data de Nascimento</th>
                <th className="px-4 py-2 text-center">Opções</th>
              </tr>
            </thead>
            <tbody>
              {beneficiaries.length > 0 ? (
                beneficiaries
                  .filter((b) => b.excluido === "N")
                  .map((beneficiary) => (
                    <tr key={beneficiary.id}>
                      <td className="px-4 py-2 text-center">
                        {beneficiary.id}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {beneficiary.name}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {beneficiary.cpf}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {beneficiary.address}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {beneficiary.contact}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {beneficiary.date_of_birth}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => openModal(beneficiary)}
                          className="text-blue-500"
                        >
                          <FiEdit size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    Nenhum beneficiário encontrado
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
