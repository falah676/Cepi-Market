import { useEffect, useState } from "react"
import LoadingComponent from "../Components/LoadingComponent";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../supabase/CrudSupabase";
import ProfileUser from "../Components/Profiles/ProfileUser";
const ProfilePage = () => {
    // TODO: buat profil user dan profile admin
    const {id} = useParams()
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState([])
    console.log(id);
    useEffect(() => {
        const getUser = async () => {
            const {profiles, error} = await getUserProfile(id);
            if (error) throw error;
            setUser(profiles[0]);
        }
        getUser().then(()=>{setInitializing(false)})
    }, [id])
    if (initializing) {
        return (
            <LoadingComponent />
        )
    }
  return (
    <ProfileUser user={user}/>
  )
}

export default ProfilePage