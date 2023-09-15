import { FileUploadInput, LongTextInput, TextInput } from "./FormComponents";
import axios from "axios";
import { Item } from "../../types";
import { useState } from "react";
import { useWishList } from "../context/WishlistContext";

const EditItemForm = () => {
  const { selectedItem } = useWishList();

  const fieldItems = [
    {
      type: "text-input",
      label: "Item Name",
      name: "itemName",
      value: selectedItem.itemName,
    },
    {
      type: "text-input",
      label: "Category",
      name: "category",
      value: selectedItem.category,
    },
    {
      type: "text-input",
      label: "Brand",
      name: "brand",
      value: selectedItem.brand,
    },
    {
      type: "text-input",
      label: "Price",
      name: "price",
      value: selectedItem.price,
    },
    {
      type: "text-input",
      label: "Color",
      name: "color",
      value: selectedItem.color,
    },
    {
      type: "long-text-input",
      label: "Message to contributors",
      name: "itemMessageContributor",
      value: selectedItem.itemMessageContributor,
    },
    {
      type: "file-upload",
      label: "Upload a picture",
      name: "itemPicture",
      value: selectedItem.itemPicture,
    },
  ];

  const [item, setItem] = useState<Item>({
    itemStatus: false,
    accumulatedAmount: 0,
    itemName: "",
    itemPicture: "",
    category: "",
    brand: "",
    price: 0,
    color: "",
    productUrl: "",
    itemMessageContributor: "",
  });

  const handleInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log("test: ", event.target.value);
    setItem((prev: Item) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const updateItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("item sent => ", JSON.stringify(item, null, 2));
    try {
      axios({
        method: "PUT",
        url: `http://localhost:15432/items/${item.uuid}`,
        data: {
          itemName: item.itemName,
          accumulatedAmount: item.accumulatedAmount,
          itemPicture: "placeholder text",
          category: item.category,
          color: item.color,
          brand: item.brand,
          price: item.price,
          productUrl: item.productUrl,
          itemMessageContributor: item.itemMessageContributor,
        },
      }).then((response) => {
        console.log(response.status);
        console.log(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="w-5/6 p-8 rounded-3xl" onSubmit={updateItem}>
      <div>
        <h3>Edit item</h3>
        {fieldItems.map((item, index) => {
          if (item.type === "text-input") {
            return (
              <TextInput
                key={index}
                label={item.label}
                name={item.name}
                handleInput={handleInput}
                value={item.value}
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
              />
            );
          } else if (item.type === "file-upload") {
            // show last uploaded picture
            return (
              <FileUploadInput
                key={index}
                label={item.label}
                name={item.name}
                handleInput={handleInput}
                selectedPicture={import.meta.env.VITE_CDN+selectedItem.itemPicture}
                value={item.value}
              />
            );
          }
        })}
      </div>
      <label
        htmlFor="my-drawer-2"
        className="btn btn-primary float-right mt-[10px] mr-[6px]drawer-button"
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

export default EditItemForm;
