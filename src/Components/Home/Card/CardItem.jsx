import { Link } from "react-router-dom";

const CardItem = () => {
  return (
    <div className="w-[25rem] h-56 border flex  justify-center border-slate-200 rounded-xl">
      <div className="w-full p-[10px] flex justify-between items-center">
        <div className="flex w-64 flex-col gap-2">
          <div className="flex w-full h-36 flex-col">
            <h6 className="text-lg font-medium">Coconut panna cotta</h6>
            <h6 className="text-sm font-normal pt-1 text-neutral-500">
              This creamy Coconut Panna Cotta
            </h6>
            <h6 className="text-sm font-semibold pt-4">49.000</h6>
          </div>
          <h6 className="text-lg text-red-500 font-normal">Out of stock</h6>
        </div>
        <div className="flex w-36 gap-4 flex-col justify-center items-center">
          <img
            src="https://www.spatuladesserts.com/wp-content/uploads/2021/09/Passion-fruit-panna-cotta-6138656-1.jpg"
            alt=""
            className="w-36 h-36 object-cover rounded-lg"
          />
          <Link to={"/detail"}>
            <button className="w-36 h-10 border border-blue-900 rounded-3xl text-blue-900 font-semibold hover:bg-blue-100 hover:duration-300">
              Add
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
