import React, { useEffect, useState } from 'react'
import useInput from '../hooks/useInput'
import {  InsertProduct, updateProduct } from '../supabase/CrudSupabase';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../Components/LoadingComponent'
import { getDetailProduct } from '../utils/FetchData';
import { v4 as uuidv4 } from 'uuid';
const FormPage = () => {
  const [initializing, setInitializing] = useState(true);
  const { id } = useParams();
  const idNumber = Number(id);
  const isEdit = !isNaN(idNumber);
  const [nameValue, handleNameValue, setNameValue] = useInput('')
  const [stockValue, handleStockValue, setStockValue] = useInput('');
  const [priceValue, handlePriceValue, setPriceValue] = useInput('');
  const [categoryValue, handleCategoryValue, setCategoryValue] = useInput('');
  const [descValue, handleDescValue, setDescValue] = useInput('');
  const [imgValue, setImgValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const navigate = useNavigate();
  const [data, setData] = useState([])

  useEffect(() => {
    isEdit ? getDetailProduct(setData, idNumber) : setInitializing(false)
  }, [idNumber, isEdit])
  useEffect(() => {
    if (data) {
      setNameValue(data.product_name);
      setPriceValue(data.price);
      setStockValue(data.total_product);
      setCategoryValue(data.category);
      setDescValue(data.product_desc);
      setImgValue(data.img_url);
      setImgUrl(data.img_url);
      setTimeout(() => (
        setInitializing(false)
      ), 2000)
    }
  }, [data])
  const handleImageValue = (e) => {
    setImgValue(e.target.files[0]);
  }
  
  useEffect(() => {
    if (typeof imgValue === "object") {
      setImgUrl(uuidv4());
    }
  }, [imgValue]);
  
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!nameValue || !priceValue || !categoryValue || !stockValue || descValue.length < 30 || !descValue || !imgValue) {
      Swal.fire({
        icon: 'error',
        title: "Oops...",
        text: "Please fill all field",
      })
      setIsLoading(false);
      return;
    }
    
    if (!imgValue) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Image is not found",
        showConfirmButton: false,
        timer: 1500,
      })
      return;
    }
    if (!imgUrl) {
      console.log(imgUrl);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong when trying to upload the image!'
      })
      setIsLoading(false)
      return;
    }
    if (isEdit) {
      const imageName = categoryValue + '/' + imgUrl
      const nameOld = data.category + '/' + data.img_url
      if (typeof imgValue === "object") {
        Swal.fire({
          icon:"warning",
          title: "Warning",
          text: "Gambar baru dapat berubah paling cepat 1 menit setelah Anda submit, mau lanjut?",
          showCancelButton: true,
          confirmButtonText:'Ya Lanjut',
          cancelButtonText : 'Nanti aja kalau gitu',
          reverseButtons : true,
          }).then(async (result) => {
            if (result.value) {
              // TODO: ketika category berubah gambar akan error
              const { error } = await updateProduct(stockValue, idNumber, nameValue, descValue, priceValue, categoryValue, imgValue, imageName, nameOld, imgUrl);
              if (!error) {
                Swal.fire({
                  icon: "success",
                  title: `Data berhasil disimpan`,
                  showConfirmButton: false,
                  timer: 1500
                })
                window.location.replace('/admin')
              } else {
                Swal.fire({
                  icon: "error",
                  title: `${error.message}`
                })
                setIsLoading(false);
                return;
              }
            }
        }) 
      } else {
        const { error } = await updateProduct(stockValue, idNumber, nameValue, descValue, priceValue, categoryValue, imgValue, imageName, nameOld, imgUrl);
        if (!error) {
          Swal.fire({
            icon: "success",
            title: `Data berhasil disimpan`,
            showConfirmButton: false,
            timer: 1500
          })
          window.location.replace('/admin')
        } else {
          Swal.fire({
            icon: "error",
            title: `${error.message}`
          })
          setIsLoading(false);
          return;
        }
      }
    } else {
      const imageName = categoryValue + '/' + imgUrl
      const insert = await InsertProduct(nameValue, stockValue, descValue, priceValue, categoryValue, imageName, imgValue, imgUrl)
      console.log(imgUrl);
      if (!insert) {
        Swal.fire({
          icon: "success",
          title: `Data berhasil disimpan`,
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/')
      } else {
        Swal.fire({
          icon: "error",
          title: `${insert.message}`
        })
        setIsLoading(false);
        return;
      }
    }
  }
  console.log(imgUrl);
  if (initializing) {
    return <LoadingComponent />
  }
  return (
    <section className='flex justify-center items-center py-9 px-5'>
      <div className='p-10 rounded-md w-full'>
        <h2 className='text-xl text-center mb-5 uppercase'>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Product Name</span>
            </div>
            <input required disabled={isLoading} value={nameValue} onChange={handleNameValue} type="text" placeholder="Type here" className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Product Price</span>
            </div>
            <input required disabled={isLoading} value={priceValue} onChange={handlePriceValue} type="number" placeholder="Type here" className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Stock Product</span>
            </div>
            <input required disabled={isLoading} value={stockValue} onChange={handleStockValue} type="number" placeholder="Type here" className="input input-bordered w-full" />
          </label>
          {
            isEdit ?
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Category Product</span>
            </div>
            <select disabled className="select select-bordered" value={categoryValue}>
              <option disabled selected value="selected">Pick one</option>
              <option value="food">Food</option>
              <option value="drink">Drink</option>
            </select>
          </label>
          :
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Category Product</span>
            </div>
            <select disabled={isLoading} className="select select-bordered" onChange={handleCategoryValue} value={categoryValue}>
              <option disabled selected value="selected">Pick one</option>
              <option value="food">Food</option>
              <option value="drink">Drink</option>
            </select>
          </label>
          }

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Choose Photo</span>
            </div>
            <input type="file" className="file-input file-input-bordered w-full" accept="image/*" onChange={handleImageValue} />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Desciption</span>
            </div>
            <textarea disabled={isLoading} onChange={handleDescValue} className="textarea textarea-bordered h-24" placeholder="Description" defaultValue={descValue}></textarea>
          </label>
          {isLoading ?
            <div className='mt-5 flex gap-3 justify-end'>
              <button className="btn btn-xs md:btn-sm  btn-error" disabled>
                <span className="loading loading-spinner"></span>
                loading
              </button>
              <button className="btn btn-xs md:btn-sm  btn-success" disabled>
                <span className="loading loading-spinner"></span>
                loading
              </button>

            </div>
            :
            <div className='mt-5 flex gap-3 justify-end'>
              <button type='reset' className="btn btn-xs md:btn-sm btn-outline btn-error">Reset</button>
              <button type='submit' className="btn btn-xs md:btn-sm btn-success btn-outline">Submit</button>
            </div>
          }
        </form>
      </div>
    </section>
  )
}

export default FormPage