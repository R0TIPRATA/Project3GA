import { useEffect, useState } from "react";
import { FileUploadInput, LongTextInput, TextInput } from "./FormComponents";
import axios from "axios";
import { Item } from "../../types";
import { useWishList } from "../context/WishlistContext";
import { v4 as uuidv4 } from "uuid";
import supabase from "../../util/Supabase";

const EditItemForm = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const { selectedItem, setSelectedItem, updateItem, notifySuccess, notifyError } = useWishList();
  const [itemImagePreview, setItemImagePreview] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState<File>({} as File);

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
      type: "text-input",
      label: "Product URL (optional)",
      name: "productUrl",
      value: selectedItem.productUrl,
      required: false,
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

  const addHttp = (productUrl: string | null | undefined) =>{
    if(productUrl !== undefined && productUrl && !productUrl.startsWith('https://') && !productUrl.startsWith('http://')){
      return 'https://' + productUrl;
    }else{
      return productUrl
    }
  }

  const uploadImage = async () => {
    if (newImageUrl) {
      const { data, error } = await supabase.storage
        .from("images")
        //.upload(selectedItem.itemPicture, newImageFile)
        .upload(newImageUrl, newImageFile);
      setSelectedItem({} as Item);
      if (error) console.log("error uploading image: ", error);
      if (data){
        deleteImage()
        return data
      }
    }
  };

  //remove old image from storage after uploading new one
  const deleteImage = async () => {
    const { data, error } = await supabase.storage
      .from("images")
      .remove([selectedItem.itemPicture]);
      if (error) console.log("error deleting image: ", error);
      if (data) return data;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("old image src => ", selectedItem.itemPicture);
    console.log("new image src => ", newImageUrl);
    let res: Item;
    try {
      axios({
        method: "PUT",
        url: `http://localhost:15432/items/${selectedItem.uuid}`,
        withCredentials: true,
        data: {
          itemName: selectedItem.itemName,
          itemPicture: newImageUrl ? newImageUrl : selectedItem.itemPicture,
          category: selectedItem.category,
          color: selectedItem.color,
          brand: selectedItem.brand,
          price: selectedItem.price,
          productUrl: addHttp(selectedItem.productUrl),
          itemMessageContributor: selectedItem.itemMessageContributor,
        },
      })
        .then((response) => {
          res = response.data;
          uploadImage()
          notifySuccess("Item successfully updated!")
        })
        .then(() => {
          setTimeout(() => updateItem(res), 50);
        });
    } catch (err) {
      console.log(err);
      notifyError()
    }
    closeDrawer && closeDrawer();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setSelectedItem((prev: Item) => ({
    //   ...prev,
    //   [event.target.name]: `/wishlistimages/${uuidv4()}`,
    // }));
    setNewImageUrl(`wishlistimages/${uuidv4()}`);
    setNewImageFile(event.target.files![0]);
    setItemImagePreview(URL.createObjectURL(event.target.files![0]));
  };

  useEffect(() => {
    selectedItem.uuid &&
      setItemImagePreview(import.meta.env.VITE_CDN + selectedItem.itemPicture);
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
                selectedPicture={itemImagePreview}
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

export default EditItemForm;
