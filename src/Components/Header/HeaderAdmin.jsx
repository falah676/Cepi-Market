import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/CepiContext'

const HeaderAdmin = ({user, handleLogout}) => {
  const {imgUrl} = useContext(UserContext)
  return (
    <div className="navbar bg-base-100 shadow-2xl rounded-md mb-5">
      <div className="flex-1">
        <button onClick={() => window.location.replace('/')} className="btn btn-ghost text-xl">CevMarket</button>
      </div>
      <div className="flex-none gap-3">
        <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full flex justify-center items-center">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={imgUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={`/profile/${user.id}`} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                {user.user_metadata.role === "Admin" && (
                  <li>
                    <Link to={"/admin"}>database</Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} title="Logout">
                    Sign Out
                  </button>
                </li>
              </ul>
         
        </div>
      </div>
    </div>  )
}

export default HeaderAdmin