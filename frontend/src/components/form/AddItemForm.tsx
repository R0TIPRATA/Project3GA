import axios from "axios";
import { Item } from "../../types";
import { TextInput, LongTextInput, FileUploadInput } from "./FormComponents";
import { useContext, useState } from "react";
import { WishlistContext } from "../../pages/Home";

const AddItemForm = () => {
  const wishlist = useContext(WishlistContext)
  
  const fieldItems = [
    {
      type: "text-input",
      label: "Item Name",
      name: "itemName"
    },
    {
      type: "text-input",
      label: "Category",
      name: "category"
    },
    {
      type: "text-input",
      label: "Brand",
      name: "brand"
    },
    {
      type: "text-input",
      label: "Price",
      name: "price"
    },
    {
      type: "text-input",
      label: "Color",
      name: "color"
    },
    {
      type: "long-text-input",
      label: "Message to contributors",
      name: "itemMessageContributor"
    },
    {
      type: "file-upload",
      label: "Upload a picture",
      name: "itemPicture"
    },
  ];

  const [item, setItem] = useState<Item>(
    {
      itemStatus: false,
      accumulatedAmount: 0,
      itemName: "",
      itemPicture: "",
      category: "",
      brand: "",
      price: 0,
      color: "",
      productUrl: "",
      itemMessageContributor: ""
    }
  )

  const handleInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("test: ", event.target.value);
    setItem(
      (prev: Item) => ({
        ...prev,
        [event.target.name]: event.target.value
      })
      )
    }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("item sent => ", JSON.stringify(item,null,2));
    try{
      axios({
        method: "POST",
        url: `http://localhost:15432/items/${wishlist.uuid}`,
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
    }catch(err){
      console.log(err)
    }
  }

  return (
    <form className=" bg-slate-50 p-8 rounded-3xl" onSubmit={handleSubmit}>
      <div className="flex-col">
        <h3>Add item</h3>
        {fieldItems.map((item, index) => {
          if (item.type === "text-input") {
            return <TextInput key={index} label={item.label} name={item.name} handleInput={handleInput}/>;
          } else if (item.type === "long-text-input") {
            return <LongTextInput key={index} label={item.label} name={item.name} handleInput={handleInput}/>;
          } else if (item.type === "file-upload") {
            return <FileUploadInput key={index} label={item.label} name={item.name} handleInput={handleInput}/>;
          }
        })}
      <input type="submit" className="btn btn-primary mt-4"  value="Add Item"/>
      </div>
    </form>
  );
};

export default AddItemForm;
