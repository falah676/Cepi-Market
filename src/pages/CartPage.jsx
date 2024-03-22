import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import CardCartComponent from "../Components/Cart/CardCartComponent"
import { UserContext } from "../Context/CepiContext"
import { checkOutProduct, deleteCart, getCartProduct } from "../supabase/CrudSupabase";
import toRupiah from "@develoka/angka-rupiah-js"
import { FaCartPlus } from "react-icons/fa6";
import HeaderAdmin from "../Components/Header/HeaderAdmin";

const CartPage = ({ handleLogout }) => {
  // TODO: PINDAHKAN DISABLE BUTTON DAN REALTIME NYA KE FILE INI SEHINGGA PERUBAHAN DATA HARGA TOTAL NYA BISA REALTIME
  const { user, cartProduct } = useContext(UserContext);
  // console.log(user);
  const [data, setData] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [selectedItem, setSelectedItem] = useState([])
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(selectedItem);
  const fetchCartProducts = async (setDisableButton) => {
    const { order, error } = await getCartProduct(user.id);
    if (!error) {
      setData(order);
      setDisableButton(false);
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops..',
        text: 'Something went wrong',
        timer: 2000
      }).then(() => window.location.replace('/'))
    }
  };

  const productCart = cartProduct.order
  const handleChekcChange = (e) => {
    const { value, checked } = e.target;
    setIsCheck((prevCheck) => {
      if (checked) {
        return [...prevCheck, Number(value)];
      } else {
        return prevCheck.filter((item) => item !== Number(value));
      }
    });
  };

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleCheckoutItems = async () => {
    const checkout = async () => {
      let confirm = Swal.fire({
        icon: "question",
        title: "Continue to checkout?",
        text: `You will buy ${isCheck.length} item${isCheck.length > 1 ? "s" : ""} from this shop`,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Checkout'
      })

      if (confirm) {
        const { error } = checkOutProduct(selectedItem);
        if (!error) {
          const { error } = deleteCart(isCheck);
          if (!error) {
            Swal.fire({
              icon: "success",
              title: "Successfully Checked out!",
              text: "Your order will be processed",
              timer: 3000,
              showConfirmButton: false
            })
            .then(() => { window.location = "/"; });
          } else {
            Swal.showValidationMessage(`Request failed with status code: ${error}`);
          }
        } else {
          return
        }

      }
    }


    if (isCheck.length > 0) {
      checkout()
    } else{
      Swal.fire({
        icon: "warning",
        title: "Select at least one product!",
        text: "Please select a product before proceeding."
        })
    }
  }

  const handleDeleteSelectedItem = async () => {
    let result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be  able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) {
      return;
    } else {
      setIsCheck([])
      const { error } = deleteCart(isCheck)
      if (error) {
        console.log("Error");
      } else {
        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  };

  useEffect(() => {
    if (isCheck.length === data.length && data.length > 0) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
    let itemChecked = data.filter(item => isCheck.includes(item.id));
    const calculateTotalPrice = () => {
      const arrayPrice = itemChecked.map(i => i.total_price);
      const sumPrice = (total, price) => {
        return total + price
      }
      setTotalPrice(arrayPrice.reduce(sumPrice));
    }
    if (isCheck.length > 0) {
      setShowDeleteButton(true)
      setSelectedItem(itemChecked.map(i => (
        { product_id: i.id_product, total_price: i.total_price, user_id: user.id, quantity: i.quantity, status: 0 }
      ))
      )
      // console.log(itemChecked);
      calculateTotalPrice()
    } else {
      setShowDeleteButton(false)
      setTotalPrice(0)
    }
  }, [isCheck, data])
  useEffect(() => {
    if (user === null) {
      console.log("Im runninng");
      Swal.fire({
        title: "You are not logged in",
        text: "Please login first!",
        icon: "info",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      }).then(() => window.location.replace("/login"));
    } else {
      if (productCart.length > 0) {
        setData(productCart);
      }
    }
  }, [user, productCart]);
  if (user !== null) {

    return (
      <>
        <HeaderAdmin handleLogout={handleLogout} user={user} />
        <section className="min-h-full py-10 px-10 flex flex-col gap-6">
          <div className="w-full h-16 flex justify-between items-center gap-6 border p-6 border-neutral-400 rounded-md">
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              onChange={handleSelectAll}
              checked={isCheckAll}
            />
            <div className="w-[40rem]">Product</div>
            <div className="w-[32rem] pe-10  flex justify-between items-center">
              <div className="w-28 flex justify-center items-center">Quantity</div>
              <div className="w-24 flex justify-center items-center">
                Total Price
              </div>
              <div className="w-10 flex justify-center items-center">Action</div>
            </div>
          </div>
          <div className="flex flex-col gap-6 pb-16">
            {data.map((i) => (
              <CardCartComponent
                product={i}
                key={i.id}
                handleCheckbox={handleChekcChange}
                isCheck={isCheck}
                setOrder={setData}
                user={user}
                setTotalPrice={setTotalPrice}
                fetchCartProducts={fetchCartProducts}
              />
            ))}
          </div>
          <div className="w-full fixed -bottom-0.5 left-0 right-0 px-5">
            <div className=" border border-white bg-slate-800 rounded-t-xl flex justify-center items-center p-4">
              <div className="flex justify-between w-full items-center">
                <h1 className="font-bold text-white text-lg">Total Payment</h1>
                <div className="flex items-center gap-5">
                  <span className="text-white font-semibold">{toRupiah(totalPrice)}</span>
                  {
                    showDeleteButton &&
                    <button className="btn btn-outline btn-error" onClick={handleDeleteSelectedItem}>Delete Item</button>
                  }
                  <button className="btn btn-neutral" onClick={handleCheckoutItems}><FaCartPlus /> Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default CartPage;
