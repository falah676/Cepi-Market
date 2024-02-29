import React, { useContext, useEffect, useState } from "react";
import CardCartComponent from "../Components/Cart/CardCartComponent";
import { UserContext } from "../Context/CepiContext";
import { getCartProduct } from "../supabase/CrudSupabase";

const CartPage = () => {
  const user = useContext(UserContext);
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    const fetchCartProducts = async () => {
      if (user != null) {
        const { order, error } = await getCartProduct(user.id);
        setData(order);
      }
    };
    fetchCartProducts();
  }, [user]);

  return (
    <section className="min-h-full py-10 px-10 flex flex-col gap-6">
      <div className="w-full h-16 flex justify-between items-center gap-6 border p-6 border-neutral-400 rounded-md">
        <input type="checkbox" className="checkbox checkbox-success" />
        <div className="w-[40rem]">Product</div>
        <div className="w-[32rem] pe-10  flex justify-between items-center">
          <div className="w-28 flex justify-center items-center">Quantity</div>
          <div className="w-24 flex justify-center items-center">
            Total Price
          </div>
          <div className="w-10 flex justify-center items-center">Action</div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {data.map((i) => (
          <CardCartComponent product={i} />
        ))}
      </div>
    </section>
  );
};

export default CartPage;
