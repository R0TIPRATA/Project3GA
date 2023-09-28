import { useNavigate, useParams } from "react-router-dom";
import Item from "../components/contributor/Item";
import AddContributorForm from "../components/form/ContributorForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useWishList } from "../components/context/WishlistContext";

const PaymentPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user, itemId } = params;
  const { selectedItem, setSelectedItem } = useWishList();
  const [totalContributions, setTotalContributions] = useState(0)

  const goBack = () => {
    navigate(`/wishlist/${user}`);
  };

  const getAccumulatedAmount = async () => {
      axios
        .get(`http://localhost:15432/items/sum/${selectedItem.id}`)
        .then((response) => {
          console.log("total contributions",response.data.accumulatedAmount);
          setTotalContributions(response.data.accumulatedAmount);
        })
        .catch((error) => {
          console.error("Error fetching accumulated amount:", error);
        });
  };

  //get item by item UUID
  useEffect(() => {
    axios
      .get(`http://localhost:15432/items/${itemId}`)
      .then((response) => {
        //if itemID exists, setSelected item, otherwise navigate to error page
        !response.data ? navigate("/err") : setSelectedItem(response.data);
      })
      .catch((error) => {
        console.log("test 2!")
        console.error("Error fetching wish lists:", error);
      });
  }, [itemId, setSelectedItem, navigate]);

  //check if payment amount has been met, if yes going to this page leads to an error
  useEffect(()=>{
    getAccumulatedAmount()
    totalContributions > 0 && totalContributions === selectedItem.price && navigate("/err")
  }, [selectedItem, getAccumulatedAmount, navigate])

  return (
    <div className="bg-orange-100 p-20 pb-20 min-h-full flex flex-col gap-8">
      <div className="title">
        <button className="btn-link" onClick={goBack}>
          Back
        </button>
        <h2>Contribute to item:</h2>
      </div>
      <div className="item-wrapper">
        <Item {...selectedItem} />
      </div>
      <div className="form-wrapper">
        <AddContributorForm />
      </div>
    </div>
  );
};

export default PaymentPage;
