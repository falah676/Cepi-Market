import FormPage from "./pages/AddFormPage";
import { Route, Routes } from "react-router-dom";
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
import { getUserData } from "./supabase/CrudSupabase";
import { useState, useEffect } from "react";
import { UserProvider } from "./Context/CepiContext";
export default function App() {
  // TODO: BUAT AGAR DATA USER NYA BISA DI JADIKAN CHILDREN SEHINGGA BISA DIBUAT MENGGUNAKAN USECONTEXT, UNTUK SAAT INI USER DIPAKAI DI (ADMIN, HOMEPAGE, DETAILPAGE DAN CART)
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const { user, error } = await getUserData();
      if (!error) {
        setUser(user);
      }
    }
    getUser()
  }, []);
  return (
    <UserProvider value={user}>
      <Routes>
        <Route path="/admin" element={<Database />} />
        <Route path="/" element={<HomePage />} />
        <Route path="admin/Form/:id" element={<FormPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/:id/form" element={<ProfilForm />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </UserProvider>
  );
}
