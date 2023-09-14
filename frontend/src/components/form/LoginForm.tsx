import { useState } from "react";
import { UsernameInput, PasswordInput } from "./FormComponents";
import { User } from "../../types";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useWishList } from "../context/WishlistContext";

const AddLoginForm = () => {
  const {setUserToken} = useWishList();
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  })
  const [message, setMessage] = useState<string | undefined>("");
  const navigate = useNavigate();

  const fieldItems = [
    { type: "text-input", label: "Username", name: "username" },
    { type: "password-input", label: "Password", name: "password" },
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
        url: "http://localhost:15432/users/login",
        data: {
          username: user.username,
          password: user.password,
        }
      }).then((response) => {
        // console.log(response.data);3
        if(response.data.message) {
          setMessage(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
          setUserToken({username: response.data.username, token: response.data.token});
          setTimeout(() => {
            navigate("/")
          }, 800);
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
              />
            )
          } else if (item.type === "password-input") {
            return (
              <PasswordInput
                key={index}
                label={item.label}
                name={item.name}
                handleInput={handleInput}
              />
            )
          }
        })}
        {message && 
          (message === "User logged in successfully!" ? <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center mt-3">{message}</div> :
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mt-3">{message}</div>)}
        <button type="submit" className="btn btn-primary mr-0 ml-auto mt-4 block">Login</button>
      </form>
  </div>
 );

}
 
export default AddLoginForm;