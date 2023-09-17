import { Item as ItemType } from "../types";
import { useWishList } from "./context/WishlistContext";
import axios from "axios";

const Item = (item: ItemType) => {
  const { userToken } = useWishList();

  const calculateProgress = () => {
    return (item.accumulatedAmount / item.price) * 100;
  };

  const hideButtons = item.accumulatedAmount > 0;

  const { selectedItem, setSelectedItem } = useWishList();

  const handleClick = () => {
    setSelectedItem(item);
  };

  const deleteItem = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:15432/items/${selectedItem.uuid}`,
        headers: { Authorization: `Bearer ${userToken.token}` },
        data: {
          itemName: selectedItem.itemName,
          accumulatedAmount: selectedItem.accumulatedAmount,
          itemPicture: selectedItem.itemPicture,
          category: selectedItem.category,
          color: selectedItem.color,
          brand: selectedItem.brand,
          price: selectedItem.price,
          productUrl: selectedItem.productUrl,
          itemMessageContributor: selectedItem.itemMessageContributor,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card-body text-left bg-base-100 shadow-sm rounded-3xl border border-slate-500">
      <div className="card-top flex gap-4 justify-between">
        <div className="item-img flex items-start w-1/4">
          <figure>
            <img
              className="object-scale-down"
              src={`${import.meta.env.VITE_CDN}${item.itemPicture}`}
              alt={`${item.itemName}`}
            />
          </figure>
        </div>
        <div className="main-card-content w-3/4 flex flex-col">
          <div className="details-progress flex justify-between">
            <div className="details flex w-1/2">
              <div className="flex-col">
                <div className="badge capitalize badge-ghost">
                  {item.category}
                </div>
                <h2 className="card-title">{item.itemName}</h2>
                <p>{item.brand}</p>
                <p>Color: {item.color}</p>
                {item.productUrl && (
                  <p>
                    Link to product: <a href={`{item.productUrl}`}>Link</a>
                  </p>
                )}
              </div>
            </div>
            <div className="contribution flex flex-col content-end w-1/2">
              <div className="text-black text-xl font-normal">
                <p className="font-semibold text-right">{`$${item.price}`}</p>
              </div>
              <progress
                className="progress progress-success w-3/4 mt-2 self-end"
                value={calculateProgress()}
                max="100"
              ></progress>
              <div className="text-right text-black text-[10px] font-normal mt-2">
                <p>${item.accumulatedAmount} collected</p>
                <p>${item.price - item.accumulatedAmount} more to goal</p>
              </div>
            </div>
          </div>
          {item.itemMessageContributor && (
            <div className="comment w-full h-[41px] px-2 py-4 bg-indigo-50 rounded-lg justify-center items-center gap-[5px] inline-flex mt-[20px]">
              <div className="w-[31px] h-[31px] justify-center items-center flex">
                <div className="w-[31px] h-[31px] text-center text-black text-base">
                  💬
                </div>
              </div>
              <div className="grow shrink basis-0 text-black text-base">
                “{item.itemMessageContributor}”
              </div>
            </div>
          )}
        </div>
      </div>
      {!hideButtons && (
        <div>
          <div className="divider divider-vertical p-0"></div>
          <div className="card-actions justify-end">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button"
              onClick={handleClick}
            >
              Edit item
            </label>

            <button
              className="btn btn-primary"
              type="button"
              onClick={deleteItem}
            >
              Delete item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
