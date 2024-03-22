import { useEffect, useState } from "react";
import { getImageUrl } from "../../utils/FetchData";
import TruncateString from "../../utils/TruncateString";
import { Link } from "react-router-dom";
import toRupiah from "@develoka/angka-rupiah-js"

const CardComponents = ({ data }) => {

  const fileName = data?.category + '/' + data?.img_url;
  const [imgUrl, setImgUrl] = useState('');
  useEffect(() => {
    getImageUrl(setImgUrl, fileName, "task_school_1")
  }, [fileName])
  return (
    <>
      {/* <div className=" card w-96 group bg-white shadow-xl image-full bagus">
  <figure className="rounded-xl"><img src={imgUrl} alt="Shoes" /></figure>
  <div className="card-body hidden duration-700 transition-all group-hover:inline-flex">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div> */}
      <Link to={`/detail/${data.id}`}>
        <div className="card bg-gray-700/45 min-w-64
             shadow-xl hover:shadow-xl hover:dark:shadow-green-600">
          <figure>
            <img
              className="h-40 w-full"
              src={imgUrl}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h4 className="text-lg -mt-5 text-white">{TruncateString(data.product_name, 45)}</h4>
            <h4 className="text-xs -mt-3">{data.category}</h4>
            <p className="flex text-2xl gap-1 mt-2 text-black dark:text-green-500 font-semibold">
              {toRupiah(data.price)}
            </p>
            <div className="card-actions flex flex-col">
              <p className="flex text-xs">📍 KOTA BANDUNG</p>
              <p className="flex text-xs">📦 {data.total_product} BUAH</p>
            </div>
          </div>
        </div>
      </Link>

      {/* <div className="card w-96 bg-base-100 shadow-2xl">
  <figure className="px-10 pt-10">
    <img src={imgUrl} alt="Shoes" className="rounded-xl w-44 h-44" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{data.product_name}</h2>
    <p>Rp.100.000</p>
    <div className="card-actions">
      <button className="btn btn-primary" onClick={() => handleBuyButton(data.id)}>Buy Now</button>
    </div>
  </div>
</div> */}
    </>
  )
}

export default CardComponents