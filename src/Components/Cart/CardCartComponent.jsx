import React, { useEffect, useState } from "react";
import { getDetailProduct } from "../../utils/FetchData";
import { getImage, updateQuantityCart } from "../../supabase/CrudSupabase";
import toRupiah from "@develoka/angka-rupiah-js";

const CardCartComponent = ({ product }) => {
  // TODO: UNTUK NOTALIN SEMUA KIRIM SET STATE NYA DARI PAGE DAN STATE NYA BERUPA ARRAY
  //  TODO: REALTIME
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const fileName = data?.category + "/" + data?.img_url;
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  useEffect(() => {
    setQuantity(product.quantity);
    getDetailProduct(setData, product.id_product);
  }, [product]);

  const updateQuantity = async (qty) => {
    const { data, error } = updateQuantityCart(product.id, qty);
    if (error) {
      alert(error.message);
      setQuantity(product.quantity);
    }
    console.log(data);
  };
  const decreaseQuantity = async () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setDisableButton(true);
      await updateQuantity(quantity - 1).then(() =>
        setTimeout(() => {
          setDisableButton(false);
        }, 300)
      );
    }
  };
  const increaseQuantity = () => {
    if (quantity >= data.total_product) {
      return;
    } else {
      setQuantity(quantity + 1);
    }
  };
  const calculateTotalPrice = (price, quantity) => {
    return toRupiah(price * quantity);
  };
  // const handleDelete = () => {
  //   console.log(
  //     "Hasil Perhitungan",
  //     calculateTotalPrice(data.price, product.quantity)
  //   );
  //   console.log("Harga Awal", data.price);
  //   console.log(data);
  // };
  if (isLoading) {
    return (
      <div className=" h-32 items-center p-5 flex border rounded-md">
        <div className="flex gap-6 items-center">
          <div className="skeleton w-7 h-7 rounded-md"></div>
          <div className="w-28 h-28 skeleton rounded"></div>
          <div className="flex flex-col">
            <div className="w-48 h-5 skeleton"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-32 flex justify-center items-center border rounded-md border-neutral-400">
      <div className="w-full flex justify-between items-center p-6 gap-6">
        <input type="checkbox" className="checkbox checkbox-success" />
        <div className="w-[40rem] flex">
          <div className="flex gap-5 items-center">
            <img
              src={getImage(fileName).publicUrl}
              alt="Image Cart"
              className="w-20 h-20 rounded-md object-cover"
            />
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg">{data.product_name}</p>
              <p className="font-normal text-[15px]">{data.category}</p>
            </div>
          </div>
        </div>
        <div className="w-[32rem] pe-4 flex justify-between items-center">
          <div className="relative flex items-center justify-center w-28">
            <button
              onClick={decreaseQuantity}
              type="button"
              className=" dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-md p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-2 h-2  dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              id="quantity-input"
              className=" border-x-0 border-gray-300 h-8 text-center  text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
              value={quantity}
            />
            <button
              type="button"
              onClick={increaseQuantity}
              className=" dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-md p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-2 h-2 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <p className="font-normal text-sm w-24 flex justify-center items-center">
            {calculateTotalPrice(data.price, product.quantity)}
          </p>
          <div className="min-w-20 flex justify-end">
            <button className="btn  btn-error" onClick={() => handleDelete()}>
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCartComponent;
