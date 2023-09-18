import axios from "axios";
import { Item } from "../../types";
import { TextInput, LongTextInput, FileUploadInput } from "./FormComponents";
import { useRef, useState } from "react";
import { useWishList } from "../context/WishlistContext";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

//needed for file upload
const supabase = createClient(
  `${import.meta.env.VITE_SUPABASE_PROJECT_URL}`,
  `${import.meta.env.VITE_SUPABASE_API_KEY}`
);

const AddItemForm = () => {
  const { wishlist, addItem, userToken } = useWishList();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const formRef = useRef({} as HTMLFormElement);

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

  const fieldItems = [
    {
      type: "text-input",
      label: "Item Name",
      name: "itemName",
      value: item.itemName,
      required: true,
    },
    {
      type: "text-input",
      label: "Category",
      name: "category",
      value: item.category,
      required: true,
    },
    {
      type: "text-input",
      label: "Brand",
      name: "brand",
      value: item.brand,
      required: true,
    },
    {
      type: "text-input",
      label: "Price",
      name: "price",
      value: item.price,
      required: true,
    },
    {
      type: "text-input",
      label: "Color",
      name: "color",
      value: item.color,
      required: true,
    },
    {
      type: "long-text-input",
      label: "Message to contributors",
      name: "itemMessageContributor",
      value: item.itemMessageContributor,
      required: false,
    },
    {
      type: "file-upload",
      label: "Upload a picture",
      name: "itemPicture",
      value: item.itemPicture,
      required: true,
    },
  ];

  const handleInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setItem((prev: Item) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem((prev: Item) => ({
      ...prev,
      [event.target.name]: `/wishlistimages/${uuidv4()}`,
    }));
    setImageFile(event.target.files![0]);
  };

  async function uploadImage() {
    if (imageFile) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(item.itemPicture, imageFile);
      if (error) console.log("error: ", error);
      if (data) return data;
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("item sent => ", JSON.stringify(item, null, 2));
    let res: Item;
    try {
      axios({
        method: "POST",
        url: `http://localhost:15432/items/${wishlist.uuid}`,
        headers: { Authorization: `Bearer ${userToken.token}` },
        data: {
          itemName: item.itemName,
          accumulatedAmount: item.accumulatedAmount,
          itemPicture: item.itemPicture,
          category: item.category,
          color: item.color,
          brand: item.brand,
          price: item.price,
          productUrl: item.productUrl,
          itemMessageContributor: item.itemMessageContributor,
        },
      })
        .then((response) => {
          res = response.data;
          uploadImage();
        })
        .then((response) => {
          console.log(response);
          setTimeout(()=>addItem(res),500)
          formRef.current.reset();
          setImageFile(null);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className=" bg-slate-50 p-8 rounded-3xl"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div className="flex-col">
        <h3>Add item</h3>
        {fieldItems.map((item, index) => {
          if (item.type === "text-input") {
            return (
              <TextInput
                key={index}
                label={item.label}
                name={item.name}
                handleInput={handleInput}
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
                required={item.required}
              />
            );
          } else if (item.type === "file-upload") {
            return (
              <FileUploadInput
                key={index}
                label={item.label}
                name={item.name}
                selectedPicture={imageFile && URL.createObjectURL(imageFile!)}
                handleFileUpload={handleFileUpload}
                required={item.required}
              />
            );
          }
        })}
        <div className="wrapper flex flex-row-reverse">
          <input
            type="submit"
            className="btn btn-primary mt-4"
            value="Add Item"
          />
        </div>
      </div>
    </form>
  );
};

export default AddItemForm;
