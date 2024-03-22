import React from 'react'
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const TableProduct = ({product, handleDelete, handleEdit}) => {
  return (
    <table className="w-full border text-center text-sm font-light dark:border-neutral-500">
    <TableHeader />
    {
      product.map((i, index) => (
        <TableBody key={index} data={i} handleDelete={handleDelete} handleEdit={handleEdit}/>
      ))
    }
    </table>  )
}

export default TableProduct