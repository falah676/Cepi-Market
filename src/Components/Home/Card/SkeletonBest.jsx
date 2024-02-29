import React from "react";

function SkeletonBest() {
  return (
    <div className="w-72 h-96 border flex cursor-default justify-center border-slate-200 rounded-xl">
      <div className="flex items-center flex-col gap-2">
        <div className="w-72 h-48 skeleton rounded-b-none rounded-lg" />
        <div className="w-64 pt-1 flex flex-col gap-6">
          <div className="flex h-24 flex-col gap-3">
            <div className="w-48 h-[16px] skeleton"></div>
            <div className="w-28 h-[14px] skeleton"></div>
            <div className="w-24 h-[14px] skeleton"></div>
          </div>
          <div className="w-full h-10 skeleton rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonBest;
