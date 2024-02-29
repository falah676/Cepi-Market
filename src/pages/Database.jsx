import  { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingComponent from '../Components/LoadingComponent';
import { DeleteProduct, SelectAllProduct, getUserProfile } from '../supabase/CrudSupabase';
import TableHeader from '../Components/TableComponent/TableHeader';
import TableBody from '../Components/TableComponent/TableBody';
import { getUserLogin } from '../utils/FetchData';
const Database = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  // !cara yang salah
  // TODO: PELAJARI CARA PAKE OUTLET UNTUK CARA YANG BENAR
  const getId = JSON.parse(localStorage.getItem('sb-pimncbqgwimhulzkxcyz-auth-token'))

  useEffect(() => {
    const getData = async () => {
      if (!getId) {
        navigate("/login")
      }
      const {profiles} = await getUserProfile(getId.user.id);
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
        setIsLoading(false)
      }
    }
    getData()
    }, [])
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
    <section>
      <div className="flex flex-col justify-center items-center min-h-screen max-md:px-4">
        <div className="w-full lg:w-[80%]">
          <div className="overflow-x-auto">
            <div className="min-w-full flex flex-col gap-5 py-7">
              <button className="btn btn-xs md:btn-sm self-end" onClick={() => navigate('form/add')}><FaPlus /> Add Data</button>
              <table className="w-full border text-center text-sm font-light dark:border-neutral-500">
              <TableHeader />
              {
                data.map((i, index) => (
                  <TableBody key={index} data={i} handleDelete={handleDelete} handleEdit={handleEdit}/>
                ))
              }
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>)
}

export default Database