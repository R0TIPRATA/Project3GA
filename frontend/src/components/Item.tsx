import { Item as ItemType } from "../types";



const Item = (item:ItemType) => {
  console.log(JSON.stringify(item))
  // <div>
  //<div className="card w-[800px] bg-base-100 shadow-xl m-20"> */}
return (
    <div className="card-body text-left bg-base-100 shadow-xl rounded-3xl border border-slate-500">
      <div className="parent1 flex justify-between">
        <div className="flex-col">
          <figure>
            <img
              className="object-scale-down h-[200px] w-48"
              src="https://m.media-amazon.com/images/I/51EbqQYsl1S._AC_SX679_.jpg"
              alt={`${item.itemName}`}
            />
          </figure>
        </div>

        <div className="flex-col">
          <div className="parent2 flex justify-between">
            <div className="col1 inline-flex">
              <div className="flex-col">
                <div className="badge capitalize badge-ghost">
                  {item.category}
                </div>
                <h2 className="card-title">Vacuum Cleaner</h2>
                <p>{item.brand}</p>
                <p>Color: {item.color}</p>
                <p>
                  Link to product: <a href={`{item.productUrl}`}>Link</a>
                </p>
              </div>
            </div>
            <div className="col-2 justify-space-between w-[262px] h-[94px] relative float-right">
              <div className="left-[182px] top-0 absolute text-black text-xl font-normal">
                <p className="left-[22px] absolute">{`$${item.price}`}</p>
              </div>
              <div className="w-60 h-[74px] left-[22px] top-[30px] absolute">
                <progress
                  className="progress progress-success w-[193px] float-right"
                  value="70"
                  max="100"
                ></progress>
                <div className="w-[237px] h-[38px] left-0 top-[15px] absolute text-right text-black text-[10px] font-normal">
                  $80.00 collected
                  <br />
                  $70.00 more to goal
                </div>
              </div>
            </div>
          </div>
          <div className="w-[517px] h-[41px] px-2 py-4 bg-indigo-50 rounded-lg justify-center items-center gap-[5px] inline-flex mt-[20px]">
            <div className="w-[31px] h-[31px] justify-center items-center flex">
              <div className="w-[31px] h-[31px] text-center text-black text-base">
                💬
              </div>
            </div>
            <div className="grow shrink basis-0 text-black text-base">
              “{item.itemMessageContributor}”{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="divider divider-vertical p-0"></div>
      <div className="card-actions justify-end">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button"
        >
          Edit item
        </label>

        <button className="btn btn-primary">
          Delete item
        </button>
      </div>
    </div>
);
};

export default Item;
