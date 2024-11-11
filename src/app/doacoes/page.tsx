"use client";

import { useState } from "react";
import { ResponsivePie } from "@nivo/pie";

const stockData = [
  {
    id: "Em estoque",
    label: "Em estoque",
    value: 60,
    color: "#3E665E",
  },
  {
    id: "doadas",
    label: "Doadas",
    value: 40,
    color: "#A3D9C5",
  },
];

const donatedThisMonthData = [
  {
    id: "doadas",
    label: "Doadas",
    value: 40,
    color: "#3E665E",
  },
  {
    id: "Em estoque",
    label: "Em estoque",
    value: 60,
    color: "#A3D9C5",
  },
];

const totalData = [
  {
    id: "total",
    label: "Total",
    value: 100,
    color: "#3E665E",
  },
];

interface PieChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  title: string;
  isModalOpen: boolean;
}

const PieChart = ({ data, title, isModalOpen }: PieChartProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`transition-transform duration-300 ${
        isHovered && !isModalOpen ? "scale-105" : "scale-100"
      } w-full h-full flex flex-col items-center`}
      onMouseEnter={() => !isModalOpen && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-48 h-48">
        <ResponsivePie
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          innerRadius={0.7}
          padAngle={1}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ datum: "data.color" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          enableArcLinkLabels={false}
          enableArcLabels={false}
          layers={[
            "arcs",
            "arcLabels",
            "legends",
            (props) => (
              <text
                x={props.centerX}
                y={props.centerY}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  fill: "#000000", // Mudado para preto
                }}
              >
                {data[0].value}
              </text>
            ),
          ]}
        />
      </div>
      <p className="text-black text-lg mt-2">{title}</p>
    </div>
  );
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="pt-8 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-[#3E665E] text-3xl font-semibold">
          Painel de Doações
        </h1>
        <button
          onClick={openModal}
          className="bg-[#3E665E] text-white px-8 py-2 rounded-lg shadow-lg hover:bg-[#365e4b] transition duration-300 mr-[4%]"
        >
          + Doação
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[600px] z-60">
            <h2 className="text-xl font-semibold mb-4 text-[#3E665E]">
              Adicionar Doação
            </h2>
            <form>
              <label className="block text-sm mb-2">Nome do destinatário</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2  focus:ring-GreenCustom"
                placeholder="Digite o nome"
              />
              <label className="block text-sm mb-2">Data de doação</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2  focus:ring-GreenCustom"
              />
              <label className="block text-sm mb-2">Data de validade</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2  focus:ring-GreenCustom"
              />
              <label className="block text-sm mb-2">Categoria</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2  focus:ring-GreenCustom">
                <option value="Familiar">Familiar</option>
                <option value="Outros">Outros</option>
              </select>
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

      <section className="grid grid-cols-1 md:grid-cols-3 gap-9 mt-8">
        <PieChart
          data={stockData}
          title="Em estoque"
          isModalOpen={isModalOpen}
        />
        <PieChart
          data={donatedThisMonthData}
          title="Doadas esse mês"
          isModalOpen={isModalOpen}
        />
        <PieChart data={totalData} title="Total" isModalOpen={isModalOpen} />
      </section>

      <section className="mt-8">
        <div className="rounded-lg shadow-lg p-4">
          <table className="min-w-full table-auto shadow-lg">
            <thead>
              <tr className="bg-[#3E665E] text-white">
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Data de validade</th>
                <th className="px-4 py-2 text-center">Data de doação</th>
                <th className="px-4 py-2 text-center">Categoria</th>
                <th className="px-4 py-2 text-center">Destinatário</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }, (_, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border px-4 py-2 text-center">0011547</td>
                  <td className="border px-4 py-2 text-center">10/11/2024</td>
                  <td className="border px-4 py-2 text-center">10/11/2024</td>
                  <td className="border px-4 py-2 text-center">Familiar</td>
                  <td className="border px-4 py-2 text-center">
                    Felicia Paula Mendes
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
