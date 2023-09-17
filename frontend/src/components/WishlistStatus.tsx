const WishlistStatus = () => {
  return (
    <div className="w-96 mt-[15px] flex flex-row justify-between">
      {/* <!-- First Rectangle --> */}
      <div className="order-1 w-[200px] h-24 bg-white rounded-2xl">
        <div className="text-right text-black text-sm font-light mr-[20px] mt-[18px]">
          DAYS LEFT
        </div>
        <div className="w-24 h-8 text-right text-black text-xl font-semibold  ml-[70px] mr-[15px] mt-[10px]">
          30
        </div>
        <div className="w-5 h-5 left-[14px] top-[15px] absolute bg-zinc-300 rounded-full" />
      </div>

      {/* <!-- Second Rectangle --> */}
      <div className="order-2 w-[200px] h-24 bg-white rounded-2xl">
        <div className="text-right text-black text-sm font-light  mr-[20px] mt-[18px]">
          ITEMS LEFT
        </div>
        <div className="w-24 h-8 text-right text-black text-xl font-semibold  ml-[70px] mr-[15px] mt-[10px]">
          2
        </div>
        <div className="w-5 h-5 left-[14px] top-[15px] absolute bg-zinc-300 rounded-full" />
      </div>

      {/* <!-- Third Rectangle --> */}
      <div className="order-3 w-[200px] h-24 bg-white rounded-2xl">
        <div className="text-right text-black text-sm font-light mr-[20px] mt-[9px]">
          TOTAL <br />
          CONTRIBUTION
        </div>
        <div className=" text-right text-black text-xl font-semibold ml-[70px] mr-[15px] mt-[10px]">
          $120.00
        </div>
        <div className="w-5 h-5 left-[14px] top-[15px] absolute bg-zinc-300 rounded-full" />
      </div>
    </div>

    // <div className="w-64 h-24 relative flex flex-row justify-between">
    //   <div className="order-1 w-64 h-24 left-0 top-0 absolute bg-white rounded-2xl" />
    //   <div className="left-[160px] top-[18px] absolute text-right text-black text-sm font-light font-['Inter']">
    //     DAYS LEFT
    //   </div>
    //   <div className="w-24 h-8 left-[142px] top-[48px] absolute text-right text-black text-xl font-semibold font-['Inter']">
    //     30
    //   </div>
    //   <div className="w-5 h-5 left-[14px] top-[15px] absolute bg-zinc-300 rounded-full" />

    //   <div className="order-2 w-64 h-24 left-0 top-0 absolute bg-white rounded-2xl" />
    //   <div className="left-[153px] top-[18px] absolute text-right text-black text-sm font-light font-['Inter']">
    //     ITEMS LEFT
    //   </div>
    //   <div className="w-24 h-8 left-[142px] top-[48px] absolute text-right text-black text-xl font-semibold font-['Inter']">
    //     2
    //   </div>
    //   <div className="w-5 h-5 left-[14px] top-[15px] absolute bg-zinc-300 rounded-full" />

    //   <div className="order-3 w-64 h-24 left-0 top-0 absolute bg-white rounded-2xl" />
    //   <div className="left-[127px] top-[9px] absolute text-right text-black text-sm font-light font-['Inter']">
    //     TOTAL <br />
    //     CONTRIBUTION
    //   </div>
    //   <div className="w-24 h-8 left-[142px] top-[48px] absolute text-right text-black text-xl font-semibold font-['Inter']">
    //     $120.00
    //   </div>
    //   <div className="w-5 h-5 left-[14px] top-[15px] absolute bg-zinc-300 rounded-full" />
    // </div>
  );
};

export default WishlistStatus;
