import Swal from "sweetalert2";
import {
  DetailProduct,
  getCartProduct,
  getImage,
  getUserData,
  getUserProfile,
  selectCheckout,
} from "../supabase/CrudSupabase";

const getDetailProduct = async (setData, id) => {
  const productData = await DetailProduct(Number(id));
  setData(productData);
};

const getImageUrl = async (setImg, fileName, folder) => {
  const image = getImage(fileName, folder);
  setImg(image.publicUrl);
};

const getUserLogin = async (setloading) => {
  const { user } = await getUserData();
  if (user) {
    window.location.replace("/admin");
    setloading(false);
  } else {
    window.location.replace("/login");
  }

};

const getDataOrder = async (setProductOrder, idUser) => {
  const order = await selectCheckout(idUser);
  if (order) {
    setProductOrder(order)
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong',
      showConfirmButton: false,
      timer: 2000
    }).then(() => window.location.replace('/'));
  }
}

const getUserAdmin = async (id, setloading) => {
  const { profiles, error } = await getUserProfile(id);
  console.log(profiles, error);
};

// const getDataCart = async (userId) => {
//   const { order, error } = await getCartProduct(user.id).then(() => get)

// }
export { getDetailProduct, getImageUrl, getUserLogin, getUserAdmin, getDataOrder };
