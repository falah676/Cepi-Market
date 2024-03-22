import Swal from "sweetalert2";
import { supabase } from "./Client";
const uploadImage = async (FileName, file, to) => {
  const { error } = await supabase.storage.from(to).upload(FileName, file);
  if (error) {
    console.error(error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.message}`,
    });
    return;
  }
};
const orderProduct = async (idUser, idProduct, qty, totalPrice) => {
  const { data, error } = await supabase
    .from("order_user")
    .insert([{ id_user: idUser, id_product: idProduct, quantity: qty, total_price: totalPrice }])
    .select();
  return { data, error };
};
const getCartProduct = async () => {
  let { data: order_user, error, count } = await supabase
    .from("order_user")
    .select("*", { count: 'exact' })
    .order('id');
  return { order: order_user, error, count };
};
const deletImage = async (FileName) => {
  const { data, error } = await supabase.storage
    .from("task_school_1")
    .remove([FileName]);
  if (error) {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: `Cannot Delete Image`,
    });
    console.log(data);
  }
};

const deleteCart = async (id) => {
  const { error } = await supabase
    .from('order_user')
    .delete()
    .in('id', id)
  return { error }
}
const insertProfile = async (
  id,
  name,
  full,
  phone,
  role,
  imageName,
  imageFile
) => {
  const { error } = await supabase
    .from("profiles")
    .update([
      {
        username: name,
        full_name: full,
        phone_number: phone,
        role: role,
        avatar_url: imageName,
      },
    ])
    .eq("id", id);
  await uploadImage(imageName, imageFile, "avatars");
  return error;
};

const getImage = (FileName, folder) => {
  const { data, error } = supabase.storage
    .from(folder)
    .getPublicUrl(FileName);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal Mendapatkan Gambar!",
      text: `Server Error`,
    });
  } else {
    return data;
  }
};
const InsertProduct = async (
  nameValue,
  totalValue,
  descValue,
  priceValue,
  categoryValue,
  fileName,
  file,
  imgUrl
) => {
  const { error } = await supabase
    .from("task_school_1")
    .insert([
      {
        product_name: nameValue,
        total_product: totalValue,
        product_desc: descValue,
        price: priceValue,
        category: categoryValue,
        img_url: imgUrl,
      },
    ])
    .select();
  uploadImage(fileName, file, "task_school_1");
  return error;
};

const SelectAllProduct = async () => {
  let { data: task_school_1, error } = await supabase
    .from("task_school_1")
    .select("*");
  return { error, data: task_school_1 };
};

const DeleteProduct = async (id) => {
  const { error } = await supabase.from("task_school_1").delete().eq("id", id);
  return { error };
};

const DetailProduct = async (id) => {
  console.log(id);
  const { data, error } = await supabase
    .from("task_school_1")
    .select()
    .eq("id", id);

  if (!error && data.length > 0) {
    return data[0];
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Data not found!",
    });
    console.error(error);
    throw new Error(error.message);
  }
};
const getUserData = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
};

const signUp = async (email, password, user, role) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: user,
          role: role,
        },
        emailRedirectTo: "http://localhost:5173/profile/add/form",
      },
    });
    return { data: data, error: error };
  } catch (e) {
    console.log("Error", e);
  }
};

const updateProduct = async (
  totalValue,
  id,
  nameValue,
  descValue,
  priceValue,
  categoryValue,
  file,
  fileName,
  fileNameOld,
  imgUrl
) => {
  if (totalValue !== undefined && nameValue === undefined) {
    const { error } = await supabase
      .from("task_school_1")
      .update({ total_product: totalValue })
      .eq("id", id)
      .select();

    if (typeof file === "object") {
      await deletImage(fileNameOld);
      await uploadImage(fileName, file, "task_school_1");
    }
    return { error };
  }
  if (nameValue !== undefined && id !== undefined) {
    const { error } = await supabase
      .from("task_school_1")
      .update({
        product_name: nameValue,
        product_desc: descValue,
        price: priceValue,
        category: categoryValue,
        img_url: imgUrl,
        total_product: totalValue
      })
      .eq("id", id)
      .select();

    if (typeof file === "object") {
      await deletImage(fileNameOld);
      await uploadImage(fileName, file, "task_school_1");
    }
    return { error };
  }
};

const signIn = async (email, password) => {
  try {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return { user, session, error };
  } catch (e) {
    console.log("Error", e);
  }
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};

const getUserProfile = async (id) => {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);
  return { profiles, errorUser: error };
};

const updateQuantityCart = async (id, quantity, totalPrice) => {
  const { data, error } = await supabase
    .from("order_user")
    .update({ quantity: quantity, total_price: totalPrice })
    .eq("id_product", id)
    .select();
  return { data, error };
};
const checkOutProduct = async (value) => {
  const { error } = await supabase
    .from('checkout')
    .insert(value)
    .select()
  return { error }
}
const selectCheckout = async (id) => {
  let query = supabase.from('checkout')
  if (id) {
    query = query.select('*').eq('user_id', id);
  } else {
    query = query.select(`*`)
  }
  const { data, error } = await query
  if (error) { console.log(`ERROR ${error}`) }
  else { return data; }
}
const deleteCheckout = async (id) => {
  const { error } = await supabase
    .from('checkout')
    .delete()
    .eq('id', id)
  return { error }
}
const updateStatusCheckout = async (id, status) => {
  const { data, error } = await supabase
    .from('checkout')
    .update({ "status": status })
    .eq('id', id)
    .select()
  return { error }
}
export {
  InsertProduct,
  DeleteProduct,
  SelectAllProduct,
  DetailProduct,
  getImage,
  updateProduct,
  signUp,
  signIn,
  getUserData,
  signOut,
  getUserProfile,
  insertProfile,
  orderProduct,
  getCartProduct,
  updateQuantityCart,
  deleteCart,
  checkOutProduct,
  selectCheckout,
  deleteCheckout,
  updateStatusCheckout
};
