import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import InputComponent from '../Components/InputComponent';
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2';
import { signIn } from '../supabase/CrudSupabase';
import LoadingComponent from '../Components/LoadingComponent';


const LoginPage = () => {
    const [email, handleEmail] = useInput('');
    const [pass, handlePass] = useInput('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [initializing, setInitializing] = useState(false);
    // useEffect(() => {
    //   getUserLogin(setInitializing)
    // },[])
    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)
          const { error, user, session } = await signIn(email, pass)
          if (!error) {
            if (user && session) {
              navigate('/')
              setIsLoading(false)
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message,
            })
            setIsLoading(false)
          }
      };
    if (initializing) {
      return <LoadingComponent />
    }
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700 backdrop-blur-lg">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign In
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                        <InputComponent isLoading={isLoading} id='email' placeholder='name@gmail.com' titleInput='Your Email' type='email' value={email} valueHandler={handleEmail} />
                        <InputComponent isLoading={isLoading} id='password' type='password' titleInput='Password' placeholder='•••••••' value={pass} valueHandler={handlePass} />
                        {
                            isLoading ?
                                <button type="submit" className="w-full flex justify-center bg-green-600 font-medium rounded-lg text-sm" disabled={true}><ReactLoading type={'bubbles'} color={'#fff'} height={'10%'} width={'10%'} /></button>
                                :
                                <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign In</button>
                        }            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don&lsquo;t have any account? <Link to={'/register'} className="font-medium text-green-600 hover:underline dark:text-green-500">Sign Up here</Link>
                        </p>
                    </form>
                </div>
            </div>  
            </div>
    )
}

export default LoginPage