import { useEffect, useState } from 'react';
import { getUserData, insertProfile } from '../supabase/CrudSupabase';
import LoadingComponent from '../Components/LoadingComponent';
import ReactLoading from 'react-loading';
import useInput from '../hooks/useInput';
import Swal from 'sweetalert2';
// TODO: Berikan outlet pada app.jsx sehingga jika belum ada data nya maka akan dikembalikan kesini
const ProfilForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  // TODO: Cari tau cara agar email dan username nya bisa diganti, soalnya keduanya ada nya di authenthication bukan di table
  const [user, setUser] = useState([])
  const [fullName, handleFullName] = useInput('');
  const [phoneNumber, handlePhoneNumber] = useInput('');
  const [imgValue, setImgValue] = useState([]);
  const handleImgChange = (e) => {
    setImgValue(e.target.files[0])
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if ( !fullName || !phoneNumber){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Field is empty!',
      })
      return;
    }
    if (!imgValue) {
      Swal.fire({
        icon: 'warning',
        title: "You haven't upload an Image",
        showConfirmButton: true,
      })
    }
    const uploadProfile = async() => {
      const insertData = await insertProfile(user.id, user.user_metadata.username, fullName, phoneNumber, user.user_metadata.role, user.id, imgValue )
      if (!insertData) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your profile has been created',
          showConfirmButton: false,
          timer: 1500
        }).then(() => window.location.replace('/')) 
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: insertData
        })
        return;
      }
    }
    uploadProfile()
  }
    useEffect(() => {
      const fetchData = async () => {
        const { user } = await getUserData();
        if (!user) {
          window.location.replace('/login');
        } else {
          setUser(user);
          setInitializing(false);
        }
      };
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 
    console.log(user);
  console.log(imgValue);
  if (initializing) {
    return <LoadingComponent />
  }
  return (
    <section className='flex flex-col justify-center min-h-screen items-center p-5 py-10'>
      <form className='w-1/2 border p-10 rounded-md flex flex-col gap-2' onSubmit={handleSubmit}>
      <h1 className='text-xl font-bold text-center mb-5'>Please Complete Your Data</h1>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input required disabled type="text" value={user.user_metadata.username} className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">email</span>
          </div>
          <input required disabled type="email" value={user.email} className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Full Name</span>
          </div>
          <input required disabled={isLoading} value={fullName} onChange={handleFullName} type="text" placeholder="John Doe" className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Phone Number</span>
          </div>
          <input required disabled={isLoading} value={phoneNumber} onChange={handlePhoneNumber} type="number" placeholder="08123455768" className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Choose Your Avatar Image</span>
            </div>
            <input type="file" className="file-input file-input-bordered w-full" accept="image/*" onChange={handleImgChange} />
          </label>
          <button type="submit" disabled={isLoading} className="mt-5 w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{isLoading ? <ReactLoading type={'bubbles'} color={'#fff'} height={'10%'} width={'10%'} /> : 'Save Change'}</button>
      </form>
    </section>
  )
}

export default ProfilForm