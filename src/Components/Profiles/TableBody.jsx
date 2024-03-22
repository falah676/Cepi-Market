import React, { useEffect, useState } from 'react'
import { getDetailProduct } from '../../utils/FetchData'
import toRupiah from "@develoka/angka-rupiah-js"
const TableBody = ({product}) => {
    // TODO: TAMBAHKAN KOLOM NAMA PRODUCT DI TABLE CHECKOUT SEHINGGA TIDAK 2 KALI AMBIL DATA
    const [detailProduct, setDetailProduct] = useState([]);
    useEffect(() => {
        if (product) {
            getDetailProduct(setDetailProduct,  product.product_id);
        }
    }, [product])
  return (
    <tr className="bg-base-200 lg:hover:bg-base-100">
    <td className="w-full lg:w-auto p-2 lg:p-3 border text-center">
        {detailProduct.product_name}
    </td>
    <td className="w-full lg:w-auto p-2 lg:p-3 border text-center">
        {product.quantity}
    </td>
    <td className="w-full lg:w-auto p-2 lg:p-3 border text-center text-xs">
        {product.status === 0 ?   
        <span className='bg-orange-500 py-1 px-5 rounded-full text-white'>Waiting For Payment</span>
        :
        product.status === 1 ?
        <span className='bg-green-600 py-1 px-5  rounded-full text-white'>Paid</span>
        :
        product.status === 2 ? 
        <span className='bg-orange-600 py-1 px-5  rounded-full text-white'>Wait For Packing</span>
        :
        product.status === 3 ?
        <span className='bg-orange-600 py-1 px-5 p-2 rounded-full text-white'>Wait For Packing</span>
        :
        product.status === 4 ?
        <span className='bg-green-500 py-1 px-5 p-2 rounded-full text-white'>Complete</span>
        :
        <span className='bg-red-500 py-1 px-5 p-2 rounded-full text-white'>Canceled</span>


    }
    </td>
    <td className="w-full lg:w-auto p-2 lg:p-3 border text-center">
        {toRupiah(product.total_price)}
    </td>
</tr>
  )
}

export default TableBody