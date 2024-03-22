import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputComponent from '../Components/InputComponent'
import useInput from '../hooks/useInput'
import Swal from 'sweetalert2'
import { signUp } from '../supabase/CrudSupabase'
import ReactLoading from 'react-loading';
import { UserContext } from '../Context/CepiContext'
import LoadingComponent from '../Components/LoadingComponent'


const RegisterPage = () => {
    const [email, handleEmail] = useInput('');
    const [showInput, setShowInput] = useState(false);
    const [confirmPass, handleConfirmPass] = useInput('');
    const [role, handleRole] = useInput('');
    const [pass, handlePass] = useInput('');
    const [userInput, handleUser] = useInput('');
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const [initializing, setInitializing] = useState(true);
    const {user} = useContext(UserContext)
    useEffect(() => {
        if (user !== null) {
          window.location.replace('/')
        } else {
          setInitializing(false)
        }
      },[])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (!email || !pass || !confirmPass || !userInput) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
            })
            setIsLoading(false)
            return;
        }
        if (pass.length <= 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be at least 7 characters!',
            })
            setIsLoading(false)
            return;
        }
        if (pass !== confirmPass) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password does not match!',
            })
            setIsLoading(false)
        } else {
            const { data, error } = await signUp(email, pass, userInput, role.toLowerCase() === "admin" ? "Admin" : "user");
            if (data) {
                Swal.fire({
                    title: "Sign Up is Success",
                    text: "Please check your email for email verification",
                    icon: "success"
                });
                setIsLoading(false)
                navigate('/admin')
            } else {
                Swal.fire({
                    title: "Sign Up is Failed",
                    text: error.message,
                    icon: "error"
                });
                setIsLoading(false)
            }
        }
    }
    if (initializing) {
        return <LoadingComponent />
    }
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700 backdrop-blur-lg">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white" onDoubleClick={() => setShowInput(!showInput)}>
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <InputComponent isLoading={isLoading} id='user' titleInput='Username' type='user' value={userInput} valueHandler={handleUser} placeholder='mamank ramz' />
                        <InputComponent isLoading={isLoading} id='email' titleInput='Your Email' type='email' value={email} valueHandler={handleEmail} placeholder='name@gmail.com' />
                        <InputComponent isLoading={isLoading} id='password' titleInput='Password' type='password' value={pass} valueHandler={handlePass} placeholder='•••••••' />
                        <InputComponent isLoading={isLoading} id='confirmpass' placeholder='•••••••' titleInput='Confirm Password' value={confirmPass} valueHandler={handleConfirmPass} type='password' />
                        {
                            showInput &&
                            <InputComponent isLoading={isLoading} id='role' placeholder='•••••••' titleInput='You are is' value={role} valueHandler={handleRole} type='password' />
                        }
                        <button type="submit" disabled={isLoading} className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex justify-center">{isLoading ?  <span className="loading loading-dots loading-sm"></span> : 'Sign Up'}</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to={'/login'} className="font-medium text-green-600 hover:underline dark:text-green-500">Sign In here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage