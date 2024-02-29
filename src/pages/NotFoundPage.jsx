import {  FaArrowLeftLong } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <div className="max-w-lg mx-auto text-gray-600 flex items-center justify-start h-screen md:px-8">
                <div className="space-y-3 text-center">
                    <h3 className="text-indigo-600 font-semibold">
                        404 Error
                    </h3>
                    <p className=" text-4xl font-semibold sm:text-5xl">
                        Page not found
                    </p>
                    <p>
                        Sorry, the page you are looking for could not be found or has been removed.
                    </p>
                    <button className="btn text-center group" onClick={() => window.location.replace('/')}><FaArrowLeftLong className="group-hover:me-2 transition-all"/>Back To Home</button>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage