import { useContext, useEffect, useState } from "react";
import LoadingComponent from "../Components/LoadingComponent";
import { useParams } from "react-router-dom";
import { getImage, getUserProfile, selectCheckout } from "../supabase/CrudSupabase";
import { UserContext } from "../Context/CepiContext";
import Swal from "sweetalert2";
import TableBody from "../Components/Profiles/TableBody";
import { getDataOrder } from "../utils/FetchData";

const ProfilePage = () => {
    const { user } = useContext(UserContext);
    const [initializing, setInitializing] = useState(true);
    const [data, setData] = useState([]);
    const [productOrder, setProductOrder] = useState([])
console.log(productOrder);
    useEffect(() => {
        
        const getUser = async () => {
            const { profiles, error } = await getUserProfile(user.id);
            if (profiles[0].role !== null) {
                if (error) throw error;
                setData(profiles[0]);
                getDataOrder(setProductOrder, profiles[0].id).then(() => setTimeout(() => {
                    setInitializing(false);
                }, 1500))
            } else {
                window.location.replace('/profile/add/form');
            }
        }
        if (user !== null) {
            getUser();
        } else {
            window.location.replace("/login");
        }
    }, [user]);

    if (initializing) {
        return <LoadingComponent />;
    }
    console.log(productOrder > 0 ? true : false, productOrder);
    return (
        <div className="bg-base-100">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4">
                    <div className="lg:col-span-3 col-span-12 mb-6 lg:mb-0 flex justify-center items-center">
                        <div className="bg-base-200 shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img
                                    src={getImage(data.avatar_url, "avatars").publicUrl}
                                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                                    alt="Profile"
                                />
                                <h1 className="text-xl font-bold">{data.full_name}</h1>
                                <p className="text-gray-400">{data.email}</p>
                                <p className="text-gray-400">+62{data.phone_number}</p>
                                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                    <button
                                    onClick={() => window.location.replace('/admin')}
                                        className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded"
                                    >
                                        Admin
                                    </button>
                                    <a
                                        href="#"
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                                    >
                                        Change Profile
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-9 col-span-12">
                        <div className="bg-base-200 shadow rounded-lg p-5 flex w-full flex-col">
                            <div className="text-center shadow shadow-slate-300 hover:shadow-md transition-all hover:shadow-white bg-gray-900 px-10 py-8 rounded-md flex flex-col mt-10 gap-5 w-full">
                                <h2 className="font-semibold text-4xl">My Purchase</h2>
                                <div className="overflow-x-auto">
                                    {
                                        productOrder.length > 0 ?
                                    <table className="border-collapse w-full">
                                        <thead className="bg-base-300">
                                            <tr>
                                                <th className="p-2 lg:p-3 font-bold uppercase lg:table-cell">
                                                    Product name
                                                </th>
                                                <th className="p-2 lg:p-3 font-bold uppercase lg:table-cell">
                                                    Quantity
                                                </th>
                                                <th className="p-2 lg:p-3 font-bold uppercase lg:table-cell">
                                                    Status
                                                </th>
                                                <th className="p-2 lg:p-3 font-bold uppercase lg:table-cell">
                                                    Total Price
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                productOrder.map(i => (
                                                    <TableBody key={i.id} product={i} />
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <h2>Not Shoping yet, please checkout your order</h2>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

