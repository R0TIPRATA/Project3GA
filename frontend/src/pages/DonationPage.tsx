//THINGS TO DO:
//CHECK IF PAYMENT HAS BEEN MADE, IF PAYMENT HAS BEEN MADE SHOW A 'YOU SHOULD NOT BE HERE' MSG

import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Item from "../components/contributor/Item";
import { useWishList } from "../components/context/WishlistContext";
import AddDonationForm from "../components/form/AddDonationForm";

const DonationPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user, itemId } = params;
  const { selectedItem, setSelectedItem } = useWishList();

  const goBack = () => {
    navigate(`/${user}`);
  };
  //get item by item UUID
  useEffect(() => {
    axios
      .get(`http://localhost:15432/items/${itemId}`)
      .then((response) => {
        setSelectedItem(response.data);
        console.log(JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        console.error("Error fetching wish lists:", error);
      });
  }, [itemId, setSelectedItem]);

  return (
    <div className="bg-orange-100 p-20 pb-20 min-h-full flex flex-col gap-8">
      <div className="title">
        <button className="btn-link" onClick={goBack}>
          Back
        </button>
        <h2>Donate item:</h2>
      </div>
      <div className="item-wrapper">
        <Item {...selectedItem} />
      </div>
      <div className="form-wrapper">
        <AddDonationForm price={selectedItem.price} />
      </div>
    </div>
  );
};

export default DonationPage;
