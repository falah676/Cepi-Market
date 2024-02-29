const TableHeader = () => {
    return (
        <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
                <th className="px-4 py-2 dark:border-neutral-500"> Nama Produk </th>
                <th className="px-4 py-2 dark:border-neutral-500"> Jenis Produk </th>
                <th className="px-4 py-2"> Jumlah Produk </th>
                <th className="px-4 py-2"> Harga Produk </th>
                <th className="px-5 py-2 w-[30rem]"> Deskripsi </th>
                <th className="px-4 py-2"> Action </th>
            </tr>
        </thead>
    )
}

export default TableHeader