import axios from "axios";
import { DeleteModalProps } from "../../types";
import { useWishList } from "../context/WishlistContext";
import supabase from "../../util/Supabase";

const DeleteItemModal = ({ handleToggle, open }: DeleteModalProps) => {
  const { selectedItem, deleteItem, notifySuccess, notifyError } =
    useWishList();

  const deleteImage = async () => {
    if (selectedItem.itemPicture) {
      const { data, error } = await supabase.storage
        .from("images")
        .remove([selectedItem.itemPicture]);
      if (error) console.log("error deleting image: ", error);
      if (data) return data;
    }
  };

  const handleClick = async () => {
    //console.log("item deleted => ", JSON.stringify(selectedItem, null, 2));
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:15432/items/${selectedItem.uuid}`,
        withCredentials: true,
      }).then(() => { //response
        //console.log(response.data);
        deleteItem(selectedItem.uuid);
        deleteImage();
        notifySuccess("Item successfully deleted!")
      });
    } catch (err) {
      console.log(err)
      notifyError()
    }
    handleToggle();
  };

  return (
    <dialog
      id="delete-wishlist-modal"
      className="modal"
      open={open}
      onClose={handleToggle}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete item</h3>
        <p className="py-4">
          Are you sure you want to delete this item? This action cannot be
          reversed.
        </p>
        <div className="btn-wrapper float-right">
          <button className="btn btn-primary mr-2" onClick={handleToggle}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleClick}>
            Delete
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="bg-slate-950/50">close</button>
      </form>
    </dialog>
  );
};

export default DeleteItemModal;
