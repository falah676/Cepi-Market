import { useContext, useEffect, useState } from "react";
import Header from "../Components/Header/MainHeader";
import {
  SelectAllProduct,
  getUserData,
  signOut,
} from "../supabase/CrudSupabase";
import Swal from "sweetalert2";
import LoadingComponent from "../Components/LoadingComponent";
import CardComponents from "../Components/Home/CardComponents";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/CepiContext";

const HomePage = () => {
  const {user} = useContext(UserContext)
  // const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await SelectAllProduct();
      if (error) {
        console.log("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        navigate("/notfound");
      } else {
        setData(data);
      }
    };
      getData().then(() =>
      setTimeout(() => {
        setInitializing(false)
      }, 1000)
      );
  }, [navigate, user]);

  // const handleBuy = (id) => {
  //   if (user === null) {
  //     navigate("/login");
  //   } else {
  //     navigate(`/detail/${id}`);
  //   }
  // };
 
  return (
    <section className="p-5">
      {/* <Header user={user} handleLogout={handleLogout} /> */}
      <div className="grid gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {/* <div className="flex justify-center"> */}
        {data.map((i, index) => (
          <>
            <CardComponents key={index} data={i}  />
          </>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
