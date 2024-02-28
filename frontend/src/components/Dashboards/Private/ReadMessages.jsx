import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { getMessages } from "../../../slices/messagesSlice";
import { useSelector, useDispatch } from "react-redux";
import { TfiWrite } from "react-icons/tfi";
import { FaTrashAlt } from "react-icons/fa";
import ReplyMessage from "../Private/ReplyMessage";
import Loader from "../../Global/Loader";
import { setUser } from "../../../slices/userSlice";
import { getCsrfToken } from "../../../utils";
import { toast, ToastContainer } from "react-toastify";

const Style = styled.section`
  position: absolute;
  top: 0;
  padding-top: 5rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 100;
  width: 100%;
  min-height: 100dvh;
  white-space: pre-wrap;

  input {
    width: 100%;
    border-radius: 5px;
  }

  @media screen and (max-width: 767px) {
    padding-top: 2rem;
  }
`;

const ReadMessages = ({ setIsReadingMessages, setIsMainVisible }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const isLoading = useSelector((state) => state.messages.isLoading);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const csrfToken = getCsrfToken();

  //load messages
  useEffect(() => {
    const loadMessages = async () => {
      //dispatch isLoading
      dispatch(getMessages({ messages: [], isLoading: true }));
      const token = await getAccessTokenSilently();
      const response = await axios.get(`${baseUrl}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      dispatch(
        getMessages({ messages: response.data.messages, isLoading: false })
      );
      dispatch(setUser({ user: response.data.user, isLoading: false }));
    };
    loadMessages();
  }, []);

  const handleOpenReply = (message_id) => {
    setIsReplyOpen(!isReplyOpen);
    setSelectedMessage(message_id);
  };

  const handleDelete = async (message_id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.delete(`${baseUrl}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": csrfToken,
        },
        data: { message_id },
      });
      dispatch(getMessages({ messages: response.data, isLoading: false }));
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error("Error deleting message", {
        toastId: "error-deleting-message",
      });
    }
  };

  const handleExpand = (message_id) => {
    setSelectedMessage(message_id);
  };

  if (isLoading) {
    return (
      <Style>
        <Loader />
      </Style>
    );
  }

  return (
    <>
      <ToastContainer />
      {isReplyOpen && (
        <ReplyMessage
          setIsReplyOpen={setIsReplyOpen}
          selectedMessage={selectedMessage}
        />
      )}
      <Style>
        <button
          className="btn block m-auto border-0 text-white capitalize my-4 bg-red-500 hover:bg-red-200"
          onClick={() => {
            setIsReadingMessages(false);
            setIsMainVisible(true);
          }}
          aria-label="close"
        >
          CLOSE
        </button>
        <div
          className="flex flex-col bg-neutral m-auto p-10 max-md:w-[327px] 
        max-md:p-6 md:w-[690px] xl:w-[1100px] shadow rounded-xl"
        >
          <h2 className="text-center font-bold">Read Messages</h2>
          <div className="flex flex-col gap-4 items-center my-4">
            {messages?.length === 0 && (
              <p className="text-center">No messages yet</p>
            )}
            {messages?.map((message, i) => (
              <div
                onClick={() => handleExpand(message?.message_id)}
                className="flex items-center justify-between gap-4 max-md:flex-col cursor-pointer md:p-6 md:w-[690px] xl:w-[1100px]"
                key={`${message?.subject + i}`}
              >
                <div className="flex flex-col gap-4 my-4">
                  <h3 className="font-bold">
                    {`(${i + 1})  Subject: ${message?.subject}`}
                  </h3>
                  {selectedMessage === message?.message_id && (
                    <p className="break-words">{message?.content}</p>
                  )}
                </div>
                <div className="flex md:flex-col md:self-start max-md:gap-4">
                  {selectedMessage === message?.message_id && (
                    <button
                      onClick={() => handleOpenReply(message?.message_id)}
                      aria-label="answer to message"
                      className="flex gap-4 justify-center items-center p-2 rounded-lg capitalize md:mt-4 text-white bg-accent hover:bg-info min-w-[4rem]"
                    >
                      ANSWER
                      <TfiWrite />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(message?.message_id)}
                    className="flex gap-4 justify-center items-center p-2 rounded-lg text-white capitalize bg-red-500 md:my-2 hover:bg-red-200 min-w-[4rem]"
                    aria-label="delete message"
                  >
                    DELETE
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Style>
    </>
  );
};

export default ReadMessages;
