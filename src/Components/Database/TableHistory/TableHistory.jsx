import { useEffect, useState } from 'react'
import { getDataOrder } from '../../../utils/FetchData';
import TableBody from './TableBody';
const TableHistory = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getDataOrder(setData)
    }, [])
    console.log(data);
    return (
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
                    <th className="p-2 lg:p-3 font-bold uppercase lg:table-cell">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((i) => 
                    <TableBody product={i} key={i.id}/>
                    )
                }
            </tbody>
        </table>)
}

export default TableHistory