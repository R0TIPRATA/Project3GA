import axios from "axios";
import { Item as ItemType } from "../../types";
import { useWishList } from "../context/WishlistContext";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import successImg from "../../assets/success.png";

const Item = (item: ItemType) => {
  const params = useParams();
  const location = useLocation();
  const { user, itemId } = params;
  const { setSelectedItem, wishlistCampaignIsOver } = useWishList();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const getAccumulatedAmount = async () => {
    try {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/items/sum/${item.id}`)
        .then((response) => {
          setAmount(response.data["accumulatedAmount"]);
        })
        .catch((error) => {
          console.error("Error fetching wish lists:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const calculateProgress = () => {
    return (amount / item.price) * 100;
  };

  const handleClick = (type: string) => {
    setSelectedItem(item);
    if (type === "donate") {
      navigate(`/wishlist/${user}/${item.uuid}/donate`);
    } else if (type == "payment") {
      navigate(`/wishlist/${user}/${item.uuid}`);
    }
  };

  const [hideButtonGift, setHideButtonGift] = useState(false);//whether to hide/show btn
  const [hideButtonMoney, setHideButtonMoney] = useState(false); //whether to hide/show btn
  const [showComplete, setShowComplete] = useState(false); // whether items has achieved 100% goal

  useEffect(() => {
    getAccumulatedAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    if (
      wishlistCampaignIsOver ||
      location.pathname === `/wishlist/${user}/${itemId}` ||
      location.pathname === `/wishlist/${user}/${itemId}/donate`
    ) {
      setHideButtonGift(true);
      setHideButtonMoney(true);
    } else {
      setHideButtonGift(amount > 0);
      setHideButtonMoney(amount === item.price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, item]);

  useEffect(() => {
    if (amount > 0 && amount === item.price){
      setShowComplete(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  return (
    <div className={`card-body text-left bg-base-100 shadow-sm rounded-3xl border border-slate-500 ${(showComplete) && "bg-green-50"}`}>
      {/* {hideButtonMoney && ()} */}
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
                <h2 className="card-title">
                  {item.itemName}
                  {showComplete && (
                    <img src={successImg} className="w-6"></img>
                  )}
                </h2>
                <p>{item.brand}</p>
                <p>Color: {item.color}</p>
                {item.productUrl && (
                  <p>
                    Link to product:{" "}
                    <a href={item.productUrl} target="_blank">
                      Link
                    </a>
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
                <p>${amount} collected</p>
                <p>${item.price - amount} more to goal</p>
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

      <div>
        {!showComplete && (
          <div className="divider divider-vertical p-0"></div>
        )}
        <div className="card-actions justify-end">
          {!hideButtonGift && (
            <label
              htmlFor="edit-drawer"
              className="btn btn-secondary drawer-button"
              onClick={() => handleClick("donate")}
            >
              Gift item
            </label>
          )}
          {!hideButtonMoney && (
            <label
              htmlFor="delete-item-modal"
              onClick={() => handleClick("payment")}
              className="btn btn-secondary"
            >
              Contribute money
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
