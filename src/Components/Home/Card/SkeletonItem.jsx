const SkeletonItem = () => {
  return (
    <div className="w-[25rem] h-56 border flex cursor-default justify-center border-slate-200 rounded-xl">
      <div className="w-full p-[10px] flex justify-between items-center">
        <div className="flex w-64 flex-col gap-2">
          <div className="flex w-full h-36 gap-5 flex-col">
            <div className="w-44 h-[18px] skeleton"></div>
            <div className="w-48 h-[14px] skeleton"></div>
            <div className="w-20 h-[14px] skeleton"></div>
          </div>
          <div className="w-24 h-[18px] skeleton"></div>
        </div>
        <div className="flex w-36 gap-4 flex-col justify-center items-center">
          <div className="w-36 h-36 skeleton rounded-lg" />
          <div className="w-36 h-10 skeleton rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonItem;
