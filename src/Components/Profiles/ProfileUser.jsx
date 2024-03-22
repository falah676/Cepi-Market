import { getImage } from "../../supabase/CrudSupabase"

const ProfileUser = ({ user }) => {
  return (
    <section>
      {/* welcome text */}
      <h1 className="text-center mt-5">Welcome back {user.username}!</h1>
      {/* user profile picture and username*/}
      <div className="d-flex justify-content-around align-items-center flex-wrap mt-4">
        <img src={getImage(user.id, "avatars").publicUrl} alt="Profile Picture" />
        <div>
          <h3>{user.username}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number: </strong> {user.phone_number}</p>
          <p><strong>Role: </strong> {user.role.toLowerCase() === "admin" ? 'Seller And Buyer' : 'Buyer'}</p>
        </div>
      </div>
    </section>
  )
}

export default ProfileUser