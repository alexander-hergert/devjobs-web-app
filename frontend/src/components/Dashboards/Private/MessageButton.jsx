import React from "react";
import { SlEnvolopeLetter } from "react-icons/sl";
import { useSelector } from "react-redux";

const MessageButton = ({ setIsReadingMessages, setIsMainVisible }) => {
  const user = useSelector((state) => state.user.user);

  const handleMessages = async () => {
    setIsReadingMessages(true);
    setIsMainVisible(false);
  };

  return (
    <button
      onClick={handleMessages}
      className="w-[10rem] btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info"
    >
      <div className="flex gap-2 items-center">
        Read Messages
        <SlEnvolopeLetter />
        {user.has_new_message && (
          <div className="w-[0.75rem] h-[0.75rem] bg-red-500 rounded-2xl"></div>
        )}
      </div>
    </button>
  );
};

export default MessageButton;
