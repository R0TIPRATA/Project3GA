import { WishlistDetails } from "../../types";
import { useState } from "react";
import { TextInput, LongTextInput, DateInput } from "./FormComponents";
import axios from "axios";
import { useWishList } from "../context/WishlistContext";
import { DateTime } from "luxon";

type AddWishlistFormProps = {
  closeDrawer : () => void
}

const AddWishlistForm = ({closeDrawer}: AddWishlistFormProps) => {
  const { userToken } = useWishList();
  const currentDate: string = DateTime.local({ zone: "Asia/Singapore" }).toString().slice(0, 10);
  const [wishlistDetails, setWishlistDetails] = useState<WishlistDetails>({
    listTitle: "",
    listMessage: "",
    campaignDate: "",
  })

  const fieldItems = [
    { type: "text-input", label: "Wishlist title", name: "listTitle", required: true },
    { type: "long-text-input", label: "Message to contributors (optional)", name: "listMessage", required: false },
    { type: "date-input", label: "Date campaign ends (Optional)", name: "campaignDate", required: false }
  ]

  const handleInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(event.target.value);
    setWishlistDetails((prev: WishlistDetails) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log("wishlist details: ", JSON.stringify(wishlistDetails, null, 2));
    try { 
      axios({
        method: "POST",
        url: `http://localhost:15432/lists`,
        headers: { Authorization: `Bearer ${userToken.token}` },
        data: {
          listTitle: wishlistDetails.listTitle,
          listMessage: wishlistDetails.listMessage,
          campaignDate: wishlistDetails.campaignDate === "" ? DateTime.fromISO(currentDate).plus({ days: +180 }).toString().slice(0, 10) : wishlistDetails.campaignDate,
          username: userToken.username
        }
      }).then((response) => {
        console.log(response.data);
      })
    } catch (err) {
      console.log(err);
    }
    closeDrawer();
    window.location.reload();
  }

  return (
    <div className=" bg-slate-50 p-8 rounded-3xl max-w-lg flex flex-row flex-wrap mt-10 mx-5">
      <div className="text-xl font-semibold">Create a wishlist</div>
      <form className="mt-4 w-full" onSubmit={handleSubmit}>
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
            )
          } else if (item.type === "long-text-input") {
            return (
              <LongTextInput
                key={index}
                label={item.label}
                name={item.name}
                handleInput={handleInput}
                required={item.required}
              />
            )
          } else if (item.type === "date-input") {
            return(<DateInput
              key={index}
              label={item.label}
              name={item.name}
              min={currentDate}
              handleInput={handleInput}
              required={item.required}
            />)
          }
        })}
        {/* {message && 
          (message==="Sign up successful!" ? <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center mt-3">{message}</div> : <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mt-3">{message}</div>)} */}
        <button type="submit" className="btn btn-primary mr-0 ml-auto mt-4 block">Next</button>
      </form>
    </div>
  )
}

export default AddWishlistForm