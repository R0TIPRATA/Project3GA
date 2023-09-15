import { useState, useEffect } from "react";
import EmptyWishlistPage from "./EmptyWishlistPage";
import WishlistPage from "./WishlistPage";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Wishlist } from "../types";
import { useWishList } from "../components/context/WishlistContext";
// import AddContributorForm from "../components/form/ContributorForm";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [wishlists, setWishlists] = useState<Wishlist[]>([]);
	//const [wishlist, setWishlist] = useState<Wishlist>(defaultWishlist)
	const { setWishlist, userToken } = useWishList();
	const navigate = useNavigate();

	useEffect(() => {
		// Fetch wishlist when the component mounts
		axios
			.get(`http://localhost:15432/lists/user/${userToken.username}`, { headers: { Authorization: `Bearer ${userToken.token}` } }) //hard-coded for now
			.then((response) => {
				console.log(response.data);
				setWishlists(response.data);
			})
			.catch((error) => {
				console.error("Error fetching wish lists:", error);
				navigate("/login");
			});
	}, [userToken]);

	useEffect(() => {
		//store individual wishlist from wishlists
		if (wishlists && wishlists.length > 0) {
			axios
				.get(`http://localhost:15432/lists/${wishlists[0].uuid}`, { headers: { Authorization: `Bearer ${userToken.token}` } }) //hard-coded for now
				.then((response) => {
					console.log("line 45 =>", response.data);
					//setWishlist(response.data)
					setWishlist(response.data);
				})
				.catch((error) => {
					console.error("Error fetching wish lists:", error);
				});
		}
	}, [wishlists]);

	return (
		<>
			<Navbar />
			{wishlists.length > 0 ? <WishlistPage /> : <EmptyWishlistPage />}
			{/* <AddContributorForm /> */}
		</>
	);
};

export default Home;
