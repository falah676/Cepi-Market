import FormPage from "./pages/AddFormPage";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Database from "./pages/Database";
import ProfilForm from "./pages/ProfilForm";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import { getCartProduct, getImage, getUserData, signOut } from "./supabase/CrudSupabase";
import { useState, useEffect } from "react";
import { UserProvider } from "./Context/CepiContext";
import Swal from "sweetalert2";
import LoadingComponent from "./Components/LoadingComponent";
import MainHeader from "./Components/Header/MainHeader";
export default function App() {
  // TODO: BUAT AGAR DATA USER NYA BISA DI JADIKAN CHILDREN SEHINGGA BISA DIBUAT MENGGUNAKAN USECONTEXT, UNTUK SAAT INI USER DIPAKAI DI (ADMIN, HOMEPAGE, DETAILPAGE DAN CART)
  const [userData, setUser] = useState();
  const [cartProduct, setCartProduct] = useState({});
  const [initializing, setInitializing] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("")
  const location = useLocation();
  const onLoadWeb = async () => {
    const { user, error } = await getUserData();
    if (!error) {
      setUser(user);
      const { order, error, count } = await getCartProduct();
      if (!error) {
        setCartProduct({ order, count });
         setImgUrl( getImage(user.id, "avatars").publicUrl)
        if (order.length > 0) {
          setTotalPrice(order.map((item) => item.total_price).reduce((a, b) => a + b))
        } else {
          setTotalPrice(0)
        }
        setTimeout(() => {
          setInitializing(false);
        }, 2000);
      } else {
        console.log("Error FetchData: ", error);
      }
    } else {
      setUser(null)
      console.error(error)
      setTimeout(() => {
        setInitializing(false)
      }, 1000);
    }
  };
  useEffect(() => {
    onLoadWeb()
  }, []);
  const handleLogout = async () => {
    const error = await signOut();
    if (!error) {
      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  console.log(initializing);
console.log(location.pathname !== "/admin" && location.pathname !== '/cart' && location.pathname !== '/register' && location.pathname !== '/login' && location.pathname === '/profile/:id/form', location.pathname);
  if (initializing) {
    return <LoadingComponent />;
  }
  return (
    <UserProvider value={{ user: userData, cartProduct, imgUrl }}>
 {
  location.pathname !== "/admin" && location.pathname !== '/cart' && location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/profile/:id/form'&&
    <MainHeader handleLogout={handleLogout} user={userData} totalCart={cartProduct.count} totalPrice={totalPrice}/>
}

      <Routes>
        <Route path="/admin" element={<Database handleLogout={handleLogout}/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="admin/Form/:id" element={<FormPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/:id/form" element={<ProfilForm />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage handleLogout={handleLogout}/>} />
      </Routes>
    </UserProvider>
  );
}
