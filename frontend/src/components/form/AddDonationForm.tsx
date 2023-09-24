import { useState } from "react";
import { ContributorInput } from "../../types";
import { TextInput, LongTextInput, CheckboxInput } from "./FormComponents";
import axios from "axios";
import { useWishList } from "../context/WishlistContext";
import { useNavigate, useParams } from "react-router-dom";

const AddDonationForm = ({price}:{price:number}) => {
  const params = useParams()
  const navigate = useNavigate()
  const{user, itemId} = params
  const [contributor, setContributor] = useState<ContributorInput>({
    name: "",
    email: "",
    message: "",
  });
  const { selectedItem } = useWishList();

  const fieldItems = [
    { type: "text-input", label: "Name", name: "name", required: true },
	{
		type: "text-input",
		label: "Contributor Email",
		name: "email",
		required: true,
	},
    {
      type: "long-text-input",
      label: "Message (optional)",
      name: "message",
      required: false,
    },
    {
      type: "checkbox",
      description: "Please remember to deliver the item to the user:",
      label: "I will deliver the item, I promise!",
      name: "checkbox",
      required: true,
    },
  ];

  const postContributionDetails = async () => {
    try {
      axios({
        method: "POST",
        url: `http://localhost:15432/contributions/addcontribution/${selectedItem.uuid}`,
        data: {
          name: contributor.name,
          email: contributor.email,
          message: contributor.message,
          amount: price,
        },
      }).then((response) => {
        console.log(response.status);
        console.log("updating contributo details: ", response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await postContributionDetails();
    navigate(`/${user}/${itemId}/success`);
	
  };

  const handleInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContributor((prev: ContributorInput) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form
      className=" bg-slate-50 p-8 rounded-3xl flex flex-col"
      onSubmit={handleSubmit}
    >
      <div>
        <h3>Your details</h3>
        <p>
          Note: your message will be displayed in the wishlist for the user and
          other contributors to see.
        </p>
        {fieldItems.map((item, index) => {
          if (item.type === "text-input") {
            return (
              <TextInput
                key={index}
                name={item.name}
                label={item.label}
                handleInput={handleInput}
                required={item.required}
              />
            );
          } else if (item.type === "long-text-input") {
            return (
              <LongTextInput
                key={index}
                name={item.name}
                label={item.label}
                handleInput={handleInput}
                required={item.required}
              />
            );
          } else if (item.type === "checkbox") {
            return (
              <CheckboxInput
                key={index}
                name={item.name}
                description={item.description}
                label={item.label}
                required={item.required}
              />
            );
          }
        })}
        <button type="submit" className="btn btn-primary mt-4 float-right">
          Donate item
        </button>
      </div>
    </form>
  );
};

export default AddDonationForm;
