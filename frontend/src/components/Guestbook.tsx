import guestbookImg from "../assets/guestbook_placeholder.png";
import { useEffect, useState } from "react";
import { Message } from "../types";
import { useWishList } from "./context/WishlistContext";
import axios from "axios";
import { DateTime } from "luxon";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//else display messages
const Guestbook = () => {
  const { wishlist } = useWishList();
  const NUM_DISPLAY = 3; //min number of messages to display 
  const [minNum, setMinNum] = useState(NUM_DISPLAY); 
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "",
      uuid: "",
      message: "",
      createdAt: "",
      updatedAt: "",
      contributorId: "",
      contributor: {
        uuid: "",
        name: "",
        email: "",
        wishlistId: "",
        createdAt: "",
        updatedAt: "",
      },
    },
  ]);

  const EmptyState = () => {
    return (
      <div>
        <img
          src={guestbookImg}
          alt="image placeholder"
          className="w-[50px] h-auto mb-4"
        />
        <p>
          The guestbook is currently empty. Messages from contributors will
          appear here.
        </p>
      </div>
    );
  };
  
  const convertDate = (date: string) => {
    const dt = DateTime.fromISO(date);
    return dt.toLocaleString(DateTime.DATE_FULL);
  };

  const displayMessages = () => {
    const messagesToDisplay = messages.slice(0, minNum).map((item: Message, index: number) => {
      if (item.message)
      return (
        <Message
          key={index}
          createdAt={item.createdAt}
          contributorName={item.contributor.name}
          message={item.message}
        />
    );
  });
  return messagesToDisplay;
};

const filterEmptyMessages = (allMessages: Message[]) => {
  const nonEmptyMessages = allMessages.filter((item) => {
    return item.message !== "";
  });
  return nonEmptyMessages;
};

const showMore = () => {
  setMinNum(messages.length);
};

const showLess = () => {
  setMinNum(NUM_DISPLAY);
};

const Message = ({
  createdAt,
  contributorName,
  message,
  }: {
    createdAt: string;
    contributorName: string;
    message: string;
  }) => {
    return (
      <>
        <div className="flex gap-2 py-4">
          <div>
            <div className="contributor-img w-8 h-8 rounded-full flex justify-center items-center bg-orange-200 opacity-60 text-center">
              <FontAwesomeIcon icon={faHeart} className="text-yellow-700 opacity-60"/>
            </div>
          </div>
          <div className="flex flex-col ">
            <p className="text-sm">{convertDate(createdAt)}</p>
            <p className="font-bold">{contributorName}</p>
            <p>{message}</p>
          </div>
        </div>
        <div className="divider m-0"></div>
      </>
  );
};

  useEffect(() => {
    axios
      .get(`http://localhost:15432/messages/${wishlist.uuid}`)
      .then((response) => {
        setMessages(filterEmptyMessages(response.data));
      })
      .catch((error) => {
        console.error("Error fetching wish lists:", error);
      });
  }, [wishlist]);

  return (
    <div>
      <div className="bg-slate-50 p-8 rounded-3xl flex flex-col gap-4">
        <h3>Guestbook</h3>
        {messages.length > 0 ? (
          <div>
            {displayMessages()}
            <div className="button-wrapper">
              {messages.length > NUM_DISPLAY && minNum === NUM_DISPLAY && (
                <button
                  onClick={showMore}
                  className="btn btn-primary float-right"
                >
                  Show more
                </button>
              )}
              {minNum > NUM_DISPLAY && (
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

export default Guestbook;
