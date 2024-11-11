"use client";

import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { useState } from "react";

const actives = [
  {
    id: "ativos",
    label: "ativos",
    value: 103,
    color: "#B0D9A3",
  },
];

const renovations = [
  {
    id: "pendente",
    label: "Pendente",
    value: 14,
    color: "#B0D9A3",
  },
  {
    id: "restante",
    label: "Restante",
    value: 100 - 14,
    color: "#14BEA2",
  },
];

const distributed = [
  {
    id: "distribuido",
    label: "Distribuído",
    value: 546,
    color: "#B0D9A3",
  },
];

const totalExpensesData = [
  {
    id: "gastos",
    label: "Gastos",
    value: 26500,
    color: "#B0D9A3",
  },
  {
    id: "restante",
    label: "Restante",
    value: 100000 - 26500, // Valor de exemplo para ilustrar o total
    color: "#14BEA2",
  },
];

const monthlyExpenses = [
  { month: "Janeiro", value: 4000 },
  { month: "Fevereiro", value: 1500 },
  { month: "Março", value: 3000 },
  { month: "Abril", value: 2500 },
  { month: "Maio", value: 3200 },
  { month: "Junho", value: 3600 },
  { month: "Julho", value: 3600 },
];

interface PieChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
}

const PieChart = ({ data }: PieChartProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`transition-transform duration-300 ${
        isHovered ? "scale-105" : "scale-100"
      } w-full h-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
                fill: "#FFFFFF",
              }}
            >
              {data[0].value}
            </text>
          ),
        ]}
      />
    </div>
  );
};

const BarChart = () => (
  <div style={{ height: 300 }}>
    <ResponsiveBar
      data={monthlyExpenses}
      keys={["value"]}
      indexBy="month"
      margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
      padding={0.3}
      colors="#B0D9A3"
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      labelTextColor="#FFFFFF"
      theme={{
        axis: {
          ticks: {
            text: {
              fill: "#FFFFFF", // Cor dos textos dos ticks
            },
          },
          legend: {
            text: {
              fill: "#FFFFFF", // Cor do texto das legendas dos eixos
            },
          },
        },
      }}
    />
  </div>
);

export default function Dashboard() {
  return (
    <main className="pt-8 px-6">
      <h1 className="text-[#3E665E] text-3xl font-semibold">Dashboard</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-9 mt-8">
        <div className="bg-[#3E665E] rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-white text-center mb-4">103 Cadastros Ativos</h2>
          <div className="w-36 h-36">
            <PieChart data={actives} />
          </div>
        </div>
        <div className="bg-[#3E665E] rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-white text-center mb-4">14 Renovação Pendente</h2>
          <div className="w-36 h-36">
            <PieChart data={renovations} />
          </div>
        </div>
        <div className="bg-[#3E665E] rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-white text-center mb-4">
            546 Cestas Distribuídas
          </h2>
          <div className="w-36 h-36">
            <PieChart data={distributed} />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-9 mt-8">
        <div className="bg-[#3E665E] rounded-lg p-4 col-span-1 md:col-span-2">
          <h2 className="text-white text-center mb-4">Gastos Mensais</h2>
          <BarChart />
        </div>

        <div className="bg-[#3E665E] rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-white text-center mb-4">
            Total de Gastos: R$26.500,00
          </h2>
          <div className="w-48 h-48 md:w-64 md:h-64">
            <PieChart data={totalExpensesData} />
          </div>
        </div>
      </section>
    </main>
  );
}
