import React from "react";
import { Link } from "react-router-dom";

function CardBest() {
  return (
    <div className="w-72 h-96 border border-2 flex cursor-default justify-center border-slate-200 rounded-xl">
      <div className="flex items-center flex-col gap-2">
        <img
          src="https://www.spatuladesserts.com/wp-content/uploads/2021/09/Passion-fruit-panna-cotta-6138656-1.jpg"
          alt=""
          className="w-72 h-48 rounded-b-none rounded-lg object-cover"
        />
        <div className="w-64 flex flex-col gap-6">
          <div className="flex h-24 flex-col gap-2">
            <h6 className="text-base font-bold">Coconut panna cotta</h6>
            <h6 className="text-sm font-semibold">49.000</h6>
            <h6 className="text-sm text-red-500 font-semibold">Out of stock</h6>
          </div>
          <Link to={"/detail"}>
            <button className="w-full h-10 border border-blue-900 rounded-3xl text-blue-900 font-semibold hover:bg-blue-100 hover:duration-300">
              Add
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardBest;
