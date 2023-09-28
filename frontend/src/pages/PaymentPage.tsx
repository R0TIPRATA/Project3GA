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
        setSelectedItem(response.data);
        response.data && itemId !== response.data.uuid && navigate("/err")
      })
      .catch((error) => {
        console.error("Error fetching wish lists:", error);
      });
  }, [itemId, setSelectedItem, navigate]);

  //check if payment amount has been met
  useEffect(()=>{
    //get total contributions
    getAccumulatedAmount()
    totalContributions > 0 && totalContributions === selectedItem.price && navigate("/err")
    //compare with price
    //if true
    //show error
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
