import React, { useEffect, useState } from "react";
import { useAssetsContext } from "../../contexts/Assets";
import { Avatar } from "../../components/Avatar/Avatar";
import { Modal } from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CryptoInterface } from "./CryptoInterface";
import toast from "react-hot-toast";

export const Assets = () => {
  const { assets } = useAssetsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetName, setAssetName] = useState("");
  const navigate = useNavigate();
  const [cryptoData, setCryptoData] = useState<CryptoInterface[]>([]);

  const handleOpenModal = (name: string) => {
    setAssetName(name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const idsParam = assets.map((asset) => asset.id).join(",");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: "eur",
              ids: idsParam,
            },
          }
        );

        const data = response.data;
        const updatedData = assets.map((asset) => {
          const cryptoInfo = data.find((crypto: any) => crypto.id === asset.id);
          const euroValue = cryptoInfo
            ? cryptoInfo.current_price * Number(asset.balance)
            : null;

          return {
            ...asset,
            euroValue,
            image: cryptoInfo ? cryptoInfo.image : null,
          };
        });

        setCryptoData(updatedData);
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
      }
    };

    fetchData();
  }, [assets, idsParam]);
  return (
    <section>
      <div className="container mx-auto py-8 mt-10 bg-[#191919] rounded text-[#dedede]">
        <h1 className="text-xl sm:text-xl lg:text-2xl  font-semibold pb-4 pl-4">
          Assets
        </h1>
        {cryptoData.length === 0 ? (
          <div className="text-xl sm:text-xl lg:text-2xl  font-semibold mt-8 pl-4">
            There are no Transactions for this Assset at the moment
          </div>
        ) : (
          <table className="table-auto mt-10 ml-10">
            <thead className="border-b border-slate-800">
              <tr>
                <th></th>
                <th className="py-4">Name</th>
                <th className="py-4">Balance</th>
                <th className="py-4">Amount in Euro</th>
                <th className="py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((item) => (
                <tr key={item.id} className="border-b border-slate-800">
                  <td className="py-4 px-10">
                    <Avatar
                      src={item.image}
                      alt="assets"
                      size="w-12 h-12"
                      name={item.name}
                      backgroundColor=""
                    />
                  </td>
                  <td className="py-4 px-10 capitalize">{item.name}</td>
                  <td className="py-4 px-10">{item.balance}</td>
                  <td className="py-4 px-10">
                    € {item.euroValue ? Math.round(item.euroValue) : "No value"}
                  </td>
                  <td className="py-4 px-10">
                    <div>
                      <button
                        onClick={() => {
                          handleOpenModal(item.name);
                        }}
                        className="px-0.5 inline-block py-0.5 rounded bg-transparent hover:bg-slate-800 mt-3 w-full sm:w-fit bg-gradient-to-br from-blue-500 via-purple-500 to-blue-500"
                      >
                        <span className="block bg-[#191919] hover:bg-slate-800 rounded px-5 py-2">
                          Emit Payment
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/transactions/${item.name}`);
                        }}
                        className="px-0.5 inline-block py-0.5 rounded bg-transparent hover:bg-slate-800 mt-3 w-full sm:w-fit ml-4"
                      >
                        <span className="block bg-[#191919] hover:bg-slate-800 rounded px-5 py-2  text-blue-500">
                          Transactions
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        assetName={assetName}
      />
    </section>
  );
};
