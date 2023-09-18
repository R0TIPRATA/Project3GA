import { Item as ItemType } from "../types";
import { useWishList } from "./context/WishlistContext";
import axios from "axios";

const Item = (item: ItemType) => {
  const { userToken, selectedItem, setSelectedItem, setEditFormType } = useWishList();

  const calculateProgress = () => {
    return (item.accumulatedAmount / item.price) * 100;
  };

  const hideButtons = item.accumulatedAmount > 0;

  const handleClick = () => {
    setSelectedItem(item)
    setEditFormType("item")
  };

  const showModal = () => {
    setSelectedItem(item);
    document.getElementById("my_modal_1").showModal();
  };

  const deleteItem = async () => {
    console.log("item deleted => ", JSON.stringify(selectedItem, null, 2));
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:15432/items/${selectedItem.uuid}`,
        headers: { Authorization: `Bearer ${userToken.token}` },
      }).then((response) => {
        console.log(response);
        window.location.reload();
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
              className="object-scale-down h-40 w-40"
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
                    Link to product: <a href={item.productUrl} target="_blank" >Link</a>
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
              htmlFor="edit-drawer"
              className="btn btn-primary drawer-button"
              onClick={handleClick}
            >
              Edit item
            </label>

            <button className="btn btn-primary" onClick={showModal}>
              Delete item
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg text-center">
                  Are you sure you want to delete this item?
                </h3>
                <p className="py-4 text-center">
                  This action cannot be reversed.
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* not sure how to center the button haha do we need to?*/}
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={deleteItem}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </dialog>

            {/* shall delete this later
            
            <button
              className="btn btn-primary"
              type="button"
              onClick={deleteItem}
            >
              Delete item
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
