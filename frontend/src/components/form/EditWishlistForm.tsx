import { useEffect, useState } from "react";
import { Item, Wishlist } from "../../types";
import { useWishList } from "../context/WishlistContext";
import { TextInput, LongTextInput, DateInput } from "./FormComponents";
import axios from "axios";
import { DateTime } from "luxon";

const EditWishlistForm = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const { 
    wishlist, 
    setWishlist, 
    notifySuccess, 
    notifyError 
  } = useWishList();
  
  const currentDate: string = DateTime.local({ zone: "Asia/Singapore" })
    .toString()
    .slice(0, 10);
  const defaultWishlist = {
    uuid: "",
    listTitle: "",
    listMessage: "",
    campaignDate: "",
    createdAt: "",
    updatedAt: "",
    wishlistItems: [{} as Item],
  };

  const [selectedWishlist, setSelectedWishlist] =
    useState<Wishlist>(defaultWishlist);

  // selectedWishlist.campaignDate && console.log("campaign date: ", selectedWishlist.campaignDate.slice(0, 10));

  useEffect(() => {
    wishlist.uuid && setSelectedWishlist(wishlist);
  }, [wishlist]);

  const fieldItems = [
    {
      type: "text-input",
      label: "Wishlist Title",
      name: "listTitle",
      value: selectedWishlist.listTitle,
      required: true,
    },
    {
      type: "long-text-input",
      label: "Message to Contributors(optional)",
      name: "listMessage",
      value: selectedWishlist.listMessage,
      required: false,
    },
    {
      type: "date-input",
      label: "Date campaign ends (Optional)",
      name: "campaignDate",
      value:
        selectedWishlist.campaignDate &&
        selectedWishlist.campaignDate.slice(0, 10),
      required: false,
    },
  ];

  const handleInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSelectedWishlist((prev: Wishlist) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const dateInputHandle = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.value === "") {
      setSelectedWishlist((prev: Wishlist) => ({
        ...prev,
        [event.target.name]: DateTime.fromISO(currentDate)
          .plus({ days: +180 })
          .toString()
          .slice(0, 10),
      }));
    } else {
      setSelectedWishlist((prev: Wishlist) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log("item sent => ", JSON.stringify(selectedItem, null, 2));
    try {
      axios({
        method: "PUT",
        url: `http://localhost:15432/lists/${wishlist.uuid}`,
        withCredentials: true,
        data: {
          listTitle: selectedWishlist.listTitle,
          listMessage: selectedWishlist.listMessage,
          campaignDate: selectedWishlist.campaignDate,
        },
      }).then(() => {
        setWishlist(selectedWishlist);
        notifySuccess("Wishlist successfully updated!");
      });
    } catch (err) {
      console.log(err);
      notifyError();
    }
    closeDrawer();
  };

  return (
    <form className="w-5/6 p-8 rounded-3xl" onSubmit={handleSubmit}>
      <div>
        <h3 className="mb-4">Edit wishlist</h3>
        {fieldItems.map((item, index) => {
          if (item.type === "text-input") {
            return (
              <TextInput
                key={index}
                label={item.label}
                name={item.name}
                handleInput={handleInput}
                value={item.value}
                required={item.required}
              />
            );
          } else if (item.type === "long-text-input") {
            return (
              <LongTextInput
                key={index}
                label={item.label}
                name={item.name}
                handleInput={handleInput}
                value={item.value}
                required={item.required}
              />
            );
          } else if (item.type === "date-input") {
            return (
              <DateInput
                key={index}
                label={item.label}
                name={item.name}
                value={item.value}
                min={currentDate}
                handleInput={dateInputHandle}
                required={item.required}
              />
            );
          }
        })}
      </div>
      <label
        htmlFor="edit-drawer"
        className="btn btn-primary float-right mt-[10px] mr-[6px]drawer-button"
        onClick={() => closeDrawer}
      >
        Cancel
      </label>

      <button
        className="btn btn-primary float-right mt-[10px] mr-[6px]"
        type="submit"
      >
        Save
      </button>
    </form>
  );
};

export default EditWishlistForm;
