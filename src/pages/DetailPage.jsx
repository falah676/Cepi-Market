import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailProduct, getImageUrl } from "../utils/FetchData";
import toRupiah from "@develoka/angka-rupiah-js";
import LoadingComponent from "../Components/LoadingComponent";
import { FaCartShopping } from "react-icons/fa6";
import {
  getUserData,
  orderProduct,
  updateProduct,
} from "../supabase/CrudSupabase";
import Swal from "sweetalert2";

const DetailPage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [initializing, setInitializing] = useState(true);
  const fileName = data?.category + "/" + data?.img_url;
  const [imgUrl, setImgUrl] = useState("");
  const [quantity, setQuantity] = useState(0);
  const handleBuy = async () => {
    if (user === null) {
      navigate("/login");
    } else {
      if (quantity <= 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill quantity first!",
        });
        return;
      } else {
        const { error } = await orderProduct(user.id, data.id, quantity);
        const updateQuantity = await updateProduct(
          data.total_product - quantity,
          data.id
        );
        if (!error && !updateQuantity) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `You bought ${quantity} item${
              quantity > 1 ? "s" : ""
            } of this product`,
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.replace("/");
          setQuantity(0);
        } else {
          console.log("Error : ", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          return;
        }
      }
    }
  };
  useEffect(() => {
    const getUser = async () => {
      const { user, error } = await getUserData();
      if (!error) {
        setUser(user);
      }
    };
    getUser()
      .then(() => getDetailProduct(setData, id))
      .then(() => setInitializing(false));
  }, [id]);
  useEffect(() => {
    getImageUrl(setImgUrl, fileName);
  }, [fileName]);
  if (initializing) {
    return <LoadingComponent />;
  }
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    if (quantity >= data.total_product) {
      return;
    } else {
      setQuantity(quantity + 1);
    }
  };
  return (
    <section className="h-auto pt-32 pb-12 lg:py-32 mb-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img
              src={imgUrl}
              alt="image product"
              className="max-w-[200px] lg:max-w-sm"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium  max-w-[450px] mx-auto lg:mx-0">
              {data.product_name}
            </h1>
            <p className="text-sm text-gray-500 mb-2">{data?.category}</p>
            <p className="text-xl font-medium mb-6">{toRupiah(data.price)}</p>
            <p className="mb-8">{data.product_desc}</p>

            <div className="flex items-center gap-4 mb-6">
              <label
                htmlFor="quantity-input"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Choose quantity :
              </label>
              <div className="relative flex items-center max-w-[8rem]">
                <button
                  type="button"
                  onClick={decreaseQuantity}
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
                  placeholder={999}
                  value={quantity}
                  required=""
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
              <p>Tersisa : {data.total_product}</p>
            </div>
            <button
              className="btn btn-success text-xl text-white w-full flex items-center"
              onClick={handleBuy}
            >
              <FaCartShopping size={25} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
