import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Item from "../components/contributor/Item";
import { useWishList } from "../components/context/WishlistContext";
import AddDonationForm from "../components/form/AddDonationForm";

const DonationPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user, itemId } = params;
  const { selectedItem, setSelectedItem } = useWishList();
  const [totalContributions, setTotalContributions] = useState(0);

  const goBack = () => {
    navigate(`/wishlist/${user}`);
  };
  //get item by item UUID
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/items/${itemId}`)
      .then((response) => {
        setSelectedItem(response.data);
        response.data && itemId !== response.data.uuid && navigate("/err");
        //console.log(JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        console.error("Error fetching wish lists:", error);
      });
  }, [itemId, setSelectedItem, navigate]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/items/${itemId}`)
      .then((response) => {
        setSelectedItem(response.data);
        response.data && itemId !== response.data.uuid && navigate("/err");
        
      })
      .catch((error) => {
        console.error("Error fetching wish lists:", error); 
      });
  }, [itemId, setSelectedItem, navigate]);

  const getAccumulatedAmount = async () => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/items/sum/${selectedItem.id}`)
      .then((response) => {
        console.log("total contributions", response.data.accumulatedAmount);
        setTotalContributions(response.data.accumulatedAmount);
      })
      .catch((error) => {
        console.error("Error fetching accumulated amount:", error);
      });
  };

  //check if payment amount has been met
  useEffect(() => {
    //get total contributions
    getAccumulatedAmount();
    totalContributions > 0 && navigate("/err");
  }, [getAccumulatedAmount, navigate]);

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
