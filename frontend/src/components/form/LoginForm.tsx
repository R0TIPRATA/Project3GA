import { useState } from "react";
import { UsernameInput, PasswordInput } from "./FormComponents";
import { User } from "../../types";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { useWishList } from "../context/WishlistContext";

const AddLoginForm = () => {
  // const { notifySuccess } = useWishList();
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  })
  const [message, setMessage] = useState<string | undefined>("");
  const navigate = useNavigate();

  const fieldItems = [
    { type: "text-input", label: "Username", name: "username", required: true },
    { type: "password-input", label: "Password", name: "password", required: true },
  ]

  const handleInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage("");
    setUser(
      (prev: User) => ({
        ...prev,
        [event.target.name]: event.target.value
      })
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try{
      axios({
        method: "POST",
        url: `${import.meta.env.VITE_APP_API_URL}/users/login`,
        data: {
          username: user.username,
          password: user.password,
        },
        withCredentials: true,
      }).then((response) => {
        // console.log(response.data);
        if(response.data.success) {
          // setUserToken({username: response.data.cookies.username, token: response.data.cookies.token});
          setTimeout(() => {
            navigate("/")
          }, 500);
        } else {
          setMessage(response.data.message)
        }
      })

    } catch (err) {
      console.log("An error occurred: ", err);
    }
  };
  
  return ( 
    <div className=" bg-slate-50 p-8 rounded-3xl max-w-lg flex flex-row flex-wrap m-20">
      <div className="text-xl font-semibold basis-1/2">Account Login</div>
      <Link className="basis-1/2 text-right" to="/signup">Sign Up</Link>
      <form className="basis-full mt-4" onSubmit={handleSubmit}>
        {fieldItems.map((item, index) => {
          if (item.type === "text-input") {
            return (
              <UsernameInput
                key={index}
                label={item.label}
                name={item.name}
                handleInput={handleInput}
                required={item.required}
              />
            )
          } else if (item.type === "password-input") {
            return (
              <PasswordInput
                key={index}
                label={item.label}
                name={item.name}
                handleInput={handleInput}
                required={item.required}
              />
            )
          }
        })}
        {message && 
          <div className="bg-red-100 text-red-700 py-3 w-full text-center mt-3 mx-auto">{message}</div>}
        <button type="submit" className="btn btn-primary mr-0 ml-auto mt-4 block">Login</button>
      </form>
  </div>
 );

}
 
export default AddLoginForm;