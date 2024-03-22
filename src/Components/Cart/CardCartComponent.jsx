import React, { useEffect, useState } from "react";
import { getDetailProduct } from "../../utils/FetchData";
import { deleteCart, getImage, updateQuantityCart } from "../../supabase/CrudSupabase";
import toRupiah from "@develoka/angka-rupiah-js";
import { supabase } from "../../supabase/Client";
import { PiArrowSquareOutBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CardCartComponent = ({fetchCartProducts, product, handleCheckbox, isCheck, user }) => {
  // TODO: UNTUK NOTALIN SEMUA KIRIM SET STATE NYA DARI PAGE DAN STATE NYA BERUPA ARRAY
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(0);
  const fileName = data?.category + "/" + data?.img_url;
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  useEffect(() => {
    supabase.channel("order_user").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "order_user"
      },
      () => {
        fetchCartProducts(setDisableButton);
      }
    ).subscribe();
  })

  useEffect(() => {
    setQuantity(product.quantity);
    getDetailProduct(setData, product.id_product).then(() => setIsLoading(false))
    }, [product]);
  const Checked = (e) => isCheck.includes(e);
  const updateQuantity = async (qty, totalPrice) => {
    // console.log("Click");
    const { data, error } = updateQuantityCart(product.id_product, qty, totalPrice);
    if (error) {
      alert(error.message);
      setQuantity(product.quantity);
    }
    // console.log(data);
  };
  const handleDeleteCart = async() => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be  able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
    if (confirm.isConfirmed) {
    const {error} = deleteCart(product.id);
    if(!error){
      Swal.fire({
        icon: 'success',
        title: 'Successfully deleted!',
        showConfirmButton: false,
        timer:1500
      })
    }
  } else {
    return;
  }
  }
  const decreaseQuantity = async () => {
    setDisableButton(true);
    if (quantity > 1) {
      setQuantity(quantity - 1);
      await updateQuantity(quantity - 1)
    } else {
      handleDeleteCart();
      setDisableButton(false)
    }
  };
  const increaseQuantity = async () => {
    setDisableButton(true);
    if (quantity === data.total_product) {
      // when quantity over from  total prodduct
      Swal.fire({
        icon: "warning",
        title: `You can't add more than ${data.total_product} items`,
        showConfirmButton: false,
        timer: 2500,
      })
      setDisableButton(false)
    } else {
      let qty = quantity + 1
      console.log(qty);
      setQuantity(qty);
      await updateQuantity(quantity + 1, data.price * qty)
    }
  };
  const calculateTotalPrice = (price, quantity) => {
    return toRupiah(price * quantity);
  };
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
        <input type="checkbox" className="checkbox checkbox-success" value={product.id} onChange={handleCheckbox} checked={Checked(product.id)}  />
        <div className="w-[40rem] flex">
          <div className="flex gap-5 items-center">
            <img
              src={getImage(fileName, "task_school_1").publicUrl}
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
              disabled={disableButton}
              className=" dark:bg-gray-700  disabled:bg-gray-800 dark:border-gray-600 hover:bg-gray-600 border border-gray-300 rounded-s-md p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
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
              disabled={disableButton}
              className=" border-x-0 disabled:bg-gray-800 border-gray-300 h-8 text-center  text-sm block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required=""
              value={quantity}
            />
            <button
              type="button"
              onClick={increaseQuantity}
              disabled={disableButton}
              className=" dark:bg-gray-700 disabled:bg-gray-800 hover:bg-gray-600 dark:border-gray-600  border border-gray-300 rounded-e-md p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
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
            <button className="btn btn-ghost" title="See More" onClick={() => navigate(`/detail/${data.id}`)}>
              <PiArrowSquareOutBold  size={25}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCartComponent;
