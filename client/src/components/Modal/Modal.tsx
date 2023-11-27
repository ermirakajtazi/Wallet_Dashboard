import { EmitPaymentInterface, ModalInterface } from "./ModalInterface";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
export const Modal = ({ isOpen, assetName, onClose }: ModalInterface) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmitPaymentInterface>();

  const onSubmit: SubmitHandler<EmitPaymentInterface> = async (data) => {
    console.log(data,"data")
    try {
      const response = await axios.post(`/assets/${assetName}/payouts`, data);
      toast.success("The payment has been completed");
      reset();
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
  return (
    <>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              <div className="border-0 rounded-sm shadow-lg relative flex flex-col w-full min-w-96 bg-gray-900 outline-none focus:outline-none text-[#dedede]">
                <div className="flex justify-end pt-4 pr-4">
                  <button
                    onClick={onClose}
                    className="flex items-center px-3 py-2 hover:bg-slate-800 rounded"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-14">
                  <h2 className="text-2xl font-bold mb-4">Payment</h2>
                  <p>Plase fill out the inputs to make the payment.</p>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="rounded-md shadow-md mt-10"
                  >
                    <div className="mb-4">
                      <label htmlFor="type" className="text-white block mb-2">
                        Type
                      </label>
                      <select
                        {...register("type")}
                        id="type"
                        className="w-full p-2 rounded-md text-black"
                      >
                        <option value="payout" className="text-black">
                          Payout
                        </option>
                        <option value="refund" className="text-black">
                          Refund
                        </option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="destination"
                        className="text-white block mb-2"
                      >
                        Destination
                      </label>
                      <input
                        {...register("destination", {
                          required: "Destination is required",
                        })}
                        type="text"
                        id="destination"
                        className="w-full p-2 rounded-md text-black"
                      />
                      {errors.destination && (
                        <p className="text-red-500">
                          {errors.destination.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="amount" className="text-white block mb-2">
                        Amount
                      </label>
                      <input
                        {...register("amount", {
                          required: "Amount is required",
                          pattern: /^[0-9]+$/,
                        })}
                        type="number"
                        id="amount"
                        className="w-full p-2 rounded-md text-black"
                      />
                      {errors.amount && (
                        <p className="text-red-500">{errors.amount.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="px-0.5 inline-block py-0.5 rounded bg-transparent hover:bg-slate-800 mt-3 w-full sm:w-fit bg-gradient-to-br from-blue-500 via-purple-500 to-blue-500"
                    >
                      <span className="block bg-gray-900 hover:bg-slate-800 rounded px-5 py-2">
                        Pay
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-10 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
