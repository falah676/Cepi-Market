import { useContext, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom';
import { MdHistory } from "react-icons/md";
import Swal from 'sweetalert2';
import LoadingComponent from '../Components/LoadingComponent';
import { DeleteProduct, SelectAllProduct, getUserProfile } from '../supabase/CrudSupabase';
import HeaderAdmin from '../Components/Header/HeaderAdmin';
import { UserContext } from '../Context/CepiContext';
import TableProduct from '../Components/Database/TableProduct/TableProduct';
import TableHistory from '../Components/Database/TableHistory/TableHistory';
const Database = ({ handleLogout }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTableProduct, setShowTableProduct] = useState(true);
  // !cara yang salah
  // TODO: PELAJARI CARA PAKE OUTLET UNTUK CARA YANG BENAR
  const getId = JSON.parse(localStorage.getItem('sb-pimncbqgwimhulzkxcyz-auth-token'))

  useEffect(() => {
    const getData = async () => {
      if (user === null) {
        navigate("/login")
      }
      const { profiles } = await getUserProfile(user.id);
      if (profiles[0].role.toLowerCase() !== "admin") {
        window.location.replace('/login')
      }
      const { data, error } = await SelectAllProduct();
      if (error) {
        console.log('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
        setIsLoading(false)
      } else {
        setData(data)
        setTimeout(() => {
          setIsLoading(false)
        }, 2000);
      }
    }
    getData()
  }, []);
  const handleEdit = (id) => {
    navigate(`form/${id}`)
  }
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = DeleteProduct(id)
        if (!error) {
          await Swal.fire({
            icon: 'success',
            title: 'Deleted Successfully!',
          })
          window.location.reload()
        } else {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Your product is safe!',
          text: 'Your imaginary file is still intact',
        })
      }
    })
  }

  if (isLoading) {
    return <LoadingComponent />
  }
  return (
    <>
      <HeaderAdmin handleLogout={handleLogout} user={user} />
      <section>
        <div className="flex flex-col justify-center items-center min-h-screen max-md:px-4">
          <div className="w-full lg:w-[80%]">
            <div className="overflow-x-auto">
              <div className="min-w-full flex flex-col gap-5 py-7">
                <div className="flex w-full justify-between">
                  <button className="btn btn-xs md:btn-sm self-end bg-purple-900 hover:bg-purple-950" onClick={() => setShowTableProduct(!showTableProduct)}>
                    {showTableProduct ? <> <MdHistory />Purchase History</> : <>Table Product</>}
                  </button>
                  {
                    showTableProduct &&
                  <button className="btn btn-xs md:btn-sm self-end" onClick={() => navigate('form/add')}><FaPlus /> Add Data</button>
                  }
                </div>
                {
                  showTableProduct ? 
                 <TableProduct handleDelete={handleDelete} handleEdit={handleEdit} product={data} /> 
                 :
                <TableHistory/>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Database