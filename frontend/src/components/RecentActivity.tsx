import guestbookImg from "../assets/guestbook_placeholder.png";
import { useEffect, useState } from "react";
import { useWishList } from "./context/WishlistContext";
import axios from "axios";
import { DateTime } from "luxon";
import { faGift, faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { Contribution } from "../types";

const RecentActivity = () => {
  const { wishlist, wishlists } = useWishList();
  const pathName = useLocation().pathname;
  const NUM_DISPLAY = 5; //min number of activities to display
  const [minNum, setMinNum] = useState(NUM_DISPLAY);
  const [isLoading, setIsLoading] = useState(false);
  const [contribution, setContribution] = useState<Contribution[]>([
    {
      id: "",
      amount: 0,
      wishlistItemId: "",
      contributorId: "",
      createdAt: "",
      updatedAt: "",
      wishlistItem: {
          id: "",
          uuid: "",
          itemName: "",
          category: "",
          brand: "",
          price: 0,
          color: "",
          productUrl: "",
          itemMessageContributor: "",
          itemPicture: "",
          itemStatus: false,
          createdAt: "",
          updatedAt: "",
          wishlistId: ""
        },
      contributor: {
          id: "",
          uuid: "",
          name: "",
          email: "",
          relationship: "",
          createdAt: "",
          updatedAt: "",
          wishlistId: ""
      }
    },
  ]);

  const EmptyState = () => {
    return (
      <div className="bg-slate-50 rounded-3xl p-6 flex gap-5 py-4 my-3 items-center">
        <img
          src={guestbookImg}
          alt="image placeholder"
          className="w-[50px] h-auto mb-4"
        />
        <p>
          There's no recent activity to display.
        </p>
      </div>
    );
  };

  const convertDate = (date: string) => {
    const dt = DateTime.fromISO(date);
    return dt.toLocaleString(DateTime.DATE_FULL);
  };

  const displayActivities = () => {
    const contributionMap: { [key: string]: number }  = {};
    const activitiesToDisplay = contribution
       // Map each item in the sliced array to a pair of JSX elements
      .flatMap((item: Contribution, index: number) => {
        if (!contributionMap[item.wishlistItemId]) {
          contributionMap[item.wishlistItemId] = 0 + item.amount;
        } else {
          contributionMap[item.wishlistItemId] += item.amount;
        }
        // console.log(contributionMap);
        // Conditionally render a GoalAchieved component if the amount is equal to the price
        return [
          contributionMap[item.wishlistItemId] === item.wishlistItem.price ? (
          <GoalAchieved
            key={`${index}-achieved`}
            createdAt={item.createdAt}
            brand={item.wishlistItem.brand}
            itemName={item.wishlistItem.itemName}
          />
          ) : null,
          <Activity
            key={index}
            createdAt={item.createdAt}
            contributorName={item.contributor.name}
            brand={item.wishlistItem.brand}
            amount={item.amount}
            itemName={item.wishlistItem.itemName}
          />,]
        // Filter out any null or undefined elements in the array
          .filter(Boolean);
      })
    
    return activitiesToDisplay.sort((a, b) => {
      const createdAtA = a?.props.createdAt;
      const createdAtB = b?.props.createdAt;

      if (createdAtA > createdAtB) {
        return -1;
      }
      if (createdAtA < createdAtB) {
        return 1;
      }
      return 0;
    }).slice(0, minNum);
  };

  const showMore = () => {
    setMinNum(contribution.length * 2);
  };

  const showLess = () => {
    setMinNum(NUM_DISPLAY);
  };

  const Activity = ({
    createdAt,
    contributorName,
    brand,
    amount,
    itemName,
  }: {
    createdAt: string;
    contributorName: string;
    brand: string;
    amount: number;
    itemName: string;
  }) => {
    return (
      <>
        <div className="bg-slate-50 rounded-3xl p-6 flex gap-4 py-4 my-3 items-center">
          <div>
            <div className="contributor-img w-9 h-9 rounded-full flex justify-center items-center bg-gray-200 opacity-60 text-center">
              <FontAwesomeIcon
                icon={faHandHoldingDollar}
                className="text-black"
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <p className="text-sm">{convertDate(createdAt)}</p>
            <p>{contributorName} contributed ${amount.toFixed(2)} to {brand} {itemName}!</p>
          </div>
        </div>
      </>
    );
  };

  const GoalAchieved = ({
    createdAt,
    brand,
    itemName,
  }: {
    createdAt: string;
    brand: string;
    itemName: string;
  }) => {
    return (
      <>
        <div className="bg-[#DBFECE] rounded-3xl p-6 flex gap-4 py-4 my-3 items-center">
          <div>
            <div className="contributor-img w-9 h-9 rounded-full flex justify-center items-center bg-gray-200 text-center">
              <FontAwesomeIcon
                icon={faGift}
                className="text-black"
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <p className="text-sm">{convertDate(createdAt)}</p>
            <p>Congratulations, your goal for {brand} {itemName} has been achieved!</p>
          </div>
        </div>
      </>
    );
  };

  const filterContributions = (allContributions: Contribution[]) => {
    const filteredContributions = allContributions.filter(contribution => wishlist.wishlistItems.some(item => item.id === contribution.wishlistItemId))
    return filteredContributions;
  }

  useEffect(() => {
    if (wishlists.length > 0) {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/contributions/getcontribution`)
        .then((response) => {
          // console.log(response.data);
          const data = filterContributions(response.data);
          console.log("filtered Contributions", data);
          setContribution(data);
        })
        .catch((error) => {
          console.error("Error fetching wish lists:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist, wishlists]);

  useEffect(() => {
    setIsLoading(false);
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      <div className="flex flex-col gap-4">
        {pathName!=="/activity" && <h3>Recent Activity</h3>}
        {wishlists.length > 0 && contribution.length > 0 ? (
          <div>
            {isLoading && displayActivities()}
            <div className="button-wrapper">
              {contribution.length > NUM_DISPLAY && minNum === NUM_DISPLAY && (
                <button
                  onClick={showMore}
                  className="btn btn-primary float-right"
                >
                  Show more
                </button>
              )}
              {pathName!=="/messages" && minNum > NUM_DISPLAY && (
                <button
                  onClick={showLess}
                  className="btn btn-primary float-right"
                >
                  Show less
                </button>
              )}
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
