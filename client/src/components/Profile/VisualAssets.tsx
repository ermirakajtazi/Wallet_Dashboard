import React from "react";
import {
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Chart as ChartJS,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useAssetsContext } from "../../contexts/Assets";

const DoughnutChart = () => {
  const { assets } = useAssetsContext();
  const data = {
    labels: Object.values(assets).map((asset) => asset.name.toUpperCase()),
    datasets: [
      {
        data: Object.values(assets).map((asset) => asset.balance),
        backgroundColor: [
          "#3498db",
          "#b83280",
          "#5a67d8",
          "#3c366b",
          "#702459",
        ],
      },
    ],
  };

  ChartJS.register(
    ArcElement,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
  );
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%",
    radius: "90%",
    elements: {
      arc: {
        spacing: 10,
        borderRadius: 20,
      },
    },
  };
  return (
    <div className="bg-[#0d0d0d] px-10 py-5 justify-center flex flex-col items-center rounded-xl text-[#dedede] mt-10">
      <span className="font-semibold">Assets Chart</span>
      <div className="w-[300px] h-[300px] mt-5">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
