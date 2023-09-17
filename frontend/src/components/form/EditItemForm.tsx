import { useEffect, useState } from "react";
import { FileUploadInput, LongTextInput, TextInput } from "./FormComponents";
import axios from "axios";
import { Item } from "../../types";
import { useWishList } from "../context/WishlistContext";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

//needed for file upload
const supabase = createClient(
  `${import.meta.env.VITE_SUPABASE_PROJECT_URL}`,
  `${import.meta.env.VITE_SUPABASE_API_KEY}`
);

type EditItemFormProps = {
  closeDrawer: () => void;
};

const EditItemForm = ({ closeDrawer }: EditItemFormProps) => {
  const { selectedItem, setSelectedItem, userToken, updateItem } =
    useWishList();
  const [itemImage, setItemImage] = useState("");
  const [imageFile, setImageFile] = useState<File>({} as File);

  const fieldItems = [
    {
      type: "text-input",
      label: "Item Name",
      name: "itemName",
      value: selectedItem.itemName,
      required: true,
    },
    {
      type: "text-input",
      label: "Category",
      name: "category",
      value: selectedItem.category,
      required: true,
    },
    {
      type: "text-input",
      label: "Brand",
      name: "brand",
      value: selectedItem.brand,
      required: true,
    },
    {
      type: "text-input",
      label: "Price",
      name: "price",
      value: selectedItem.price,
      required: true,
    },
    {
      type: "text-input",
      label: "Color",
      name: "color",
      value: selectedItem.color,
      required: true,
    },
    {
      type: "long-text-input",
      label: "Message to contributors",
      name: "itemMessageContributor",
      value: selectedItem.itemMessageContributor,
      required: false,
    },
    {
      type: "file-upload",
      label: "Upload a picture",
      name: "itemPicture",
      value: selectedItem.itemPicture,
      required: false,
    },
  ];

  const handleInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSelectedItem((prev: Item) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  async function uploadImage() {
    if (itemImage) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(selectedItem.itemPicture, imageFile);
      if (error) console.log("error: ", error);
      if (data) return data;
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("item sent => ", JSON.stringify(selectedItem, null, 2));
    let res: Item;
    try {
      axios({
        method: "PUT",
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
      })
        .then((response) => {
          res = response.data;
          uploadImage();
        })
        .then((response) => {
          console.log(response);
          updateItem(res);
        });
    } catch (err) {
      console.log(err);
    }
    closeDrawer();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItem((prev: Item) => ({
      ...prev,
      [event.target.name]: `/wishlistimages/${uuidv4()}`,
    }));
    setImageFile(event.target.files![0]);
    setItemImage(URL.createObjectURL(event.target.files![0]));
  };

  useEffect(() => {
    selectedItem.uuid &&
      setItemImage(import.meta.env.VITE_CDN + selectedItem.itemPicture);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem.uuid]);

  return (
    <form className="w-5/6 p-8 rounded-3xl" onSubmit={handleSubmit}>
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
          } else if (item.type === "file-upload") {
            // show last uploaded picture
            return (
              <FileUploadInput
                key={index}
                label={item.label}
                name={item.name}
                handleFileUpload={handleFileUpload}
                selectedPicture={itemImage}
                required={item.required}
              />
            );
          }
        })}
      </div>
      <label
        htmlFor="my-drawer-2"
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

export default EditItemForm;
