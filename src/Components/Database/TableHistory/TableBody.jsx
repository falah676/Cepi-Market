import { useEffect, useState } from "react";
import { getDetailProduct } from "../../../utils/FetchData";
import toRupiah from '@develoka/angka-rupiah-js'
import Swal from "sweetalert2";
import { deleteCheckout, updateStatusCheckout } from "../../../supabase/CrudSupabase";

const TableBody = ({ product }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [detailProduct, setDetailProduct] = useState(null);
    const [disableSelect, setDisableSelect] = useState(false);

    const handleUpdateSelect =  async (event) => {
        setDisableSelect(true)
        updateStatusCheckout(product.id, Number(event.target.value)).then(() => setTimeout(() => {
            setDisableSelect(false)
        }, 2000))
    }

    const handleDeleteCheckout = () => {
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Tindakan ini tidak dapat diulang!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!'
          }).then(async (result) => {
              if (result.isConfirmed) {
                  const { error } = await deleteCheckout(product.id);
                  if (!error) {
                      Swal.fire('Deleted!','Your file has been deleted.','success');
                      window.location.reload()
                  } else {
                      Swal.fire('Error!', `Request failed: ${error.message}`, 'error');
                  }
              }
          });
    };
        
    useEffect(() => {
        if (product) {
            getDetailProduct(setDetailProduct, product.product_id).then(() => setTimeout(() => {
                setIsLoading(false);
            }, 2000));
        }
    }, [product]);
    if (isLoading) {
        return <tr>
        <td className="skeleton h-10 rounded-none border"></td>
        <td className="skeleton h-10 rounded-none border"></td>
        <td className="skeleton h-10 rounded-none border"></td>
        <td className="skeleton h-10 rounded-none border"></td>
        <td className="skeleton h-10 rounded-none border"></td>
    </tr>
    }

    return (
        <tr className="bg-base-200 lg:hover:bg-base-100">
            <td className="w-full lg:w-auto p-2 lg:p-3 border text-center">
                {detailProduct?.product_name}
            </td>
            <td className="w-full lg:w-auto p-2 lg:p-3 border text-center">
                {product.quantity} Pcs
            </td>
            <td className="w-full lg:w-auto border text-center">
                <select className='select select-ghost w-full focus:outline-none rounded-none' defaultValue={product.status} onChange={handleUpdateSelect} disabled={disableSelect}>
                    <option value={0}>Waiting For Payment</option>
                    <option value={1}>Paid</option>
                    <option value={2}>Has been packed</option>
                    <option value={3}>On Delivery</option>
                    <option value={4}>Completed</option>
                    <option className='bg-error' value={5}>Canceled</option>
                </select>
            </td>
            <td className="w-full lg:w-auto p-2 lg:p-3 border text-center">
                {toRupiah(product.total_price)}
            </td>
            <td className="w-full lg:w-auto p-2 lg:p-3 border text-center">
                <button className="btn btn-error btn-sm btn-outline" onClick={() => handleDeleteCheckout(product.id)}>Hapus</button>
            </td>
        </tr>
    );
};

export default TableBody;
