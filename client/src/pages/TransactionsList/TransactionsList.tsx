import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useParams, useNavigate } from "react-router-dom";
import { TransactionListInterface } from "../../shared/Interfaces/TransactionInterface";
import { LoadingSkeleton } from "../../components/LoadingSkeleton";
import toast from "react-hot-toast";

export const TransactionsList = () => {
  const { assetName } = useParams();
  const [data, setData] = useState<TransactionListInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/assets/${assetName}/transactions`);
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage: string | undefined = error.response.data?.message;
          if (errorMessage) {
            toast.error(errorMessage);
          } else {
            toast.error("An error occurred during payment.");
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [assetName]);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <section>
      <div className="container max-h-[700px] custom-scrollbar py-4 mt-10 bg-[#191919] rounded text-[#dedede]">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ml-4"
          onClick={handleGoBack}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-xl sm:text-xl lg:text-2xl  font-semibold mt-8 pl-4">
          Transactions:
          <span className="pl-1 text-transparent bg-clip-text bg-gradient-to-r capitalize from-blue-500 via-purple-500 to-pink-500">
            {assetName}
          </span>
        </h1>
        {loading ? (
          <LoadingSkeleton />
        ) : data.length === 0 ? (
          <div className="text-xl sm:text-xl lg:text-2xl  font-semibold mt-8 pl-4">
            There are no Transactions for this Assset at the moment
          </div>
        ) : (
          <table className="table-auto mt-10 ml-10">
            <thead className="border-b border-slate-800">
              <tr>
                <th className="py-4">Type</th>
                <th className="py-4">Destination</th>
                <th className="py-4">Amount</th>
                <th className="py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-slate-800">
                  <td className="py-4 px-10 capitalize">{item.type}</td>
                  <td className="py-4 px-10">{item.destination}</td>
                  <td className="py-4 px-10">{item.amount}</td>
                  <td className="py-4 px-10 capitalize">
                    <span
                      className={`${
                        item.status === "rejected"
                          ? "text-white border border-red-800 py-2 px-4"
                          : item.status === "confirmed"
                          ? "text-white border border-green-500 p-2"
                          : "text-white border border-blue-500 p-2"
                      }  rounded-md`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};
