import { FaEdit,  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsBoxArrowUpRight } from "react-icons/bs";
import toRupiah from '@develoka/angka-rupiah-js';
import { useEffect, useState } from "react";
import TruncateString from "../../../utils/TruncateString"
import { getImageUrl } from "../../../utils/FetchData";

const TableBody = ({data, handleDelete, handleEdit}) => {
    const [imgUrl, setImgUrl] = useState('')
    const fileName = data?.category + '/' + data?.img_url;
    useEffect(() => {
        getImageUrl(setImgUrl, fileName, "task_school_1")
    },[fileName])
  return (
    <tbody>
          <tr className="border-b dark:border-neutral-500">
          <td className="whitespace-nowrap  px-4 py-2 dark:border-neutral-500 flex gap-2 items-center">
          <img src={imgUrl}className='max-w-8 rounded-md' alt="Product image" />
          {data.product_name}
          </td>
        <td className="whitespace-nowrap  px-4 py-2 dark:border-neutral-500">{data.category}</td>
        <td className="px-4 py-2">{data.total_product}</td>
        <td className="px-4 py-2">{toRupiah(data.price)}</td>
        <td className="px-4 py-2  text-center">{TruncateString(data.product_desc, 20)}</td>
        <td>
          <ul className='flex justify-center pe-3'>
          <li><button title='Edit Product' onClick={() => handleEdit(data.id)} className='hover:bg-black/40 p-2 transition-all duration-200 rounded-md'><FaEdit size={"1rem"}/></button></li>
          <li><button title='Delete product' onClick={() => handleDelete(data.id)} className='hover:bg-black/40 p-2 transition-all duration-200 rounded-md'><MdDelete color='red' size={"1rem"}/></button></li>
          <li><button title='Detail product' className='hover:bg-black/40 p-2 transition-all duration-200 rounded-md'><BsBoxArrowUpRight size={"1rem"}/></button></li>
        </ul>
        </td>
      </tr>
    </tbody>
  )
}

export default TableBody