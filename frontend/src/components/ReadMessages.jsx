import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { getMessages } from "../slices/messagesSlice";
import { useSelector, useDispatch } from "react-redux";
import { TfiWrite } from "react-icons/tfi";
import { FaTrashAlt } from "react-icons/fa";

const Style = styled.section`
  position: absolute;
  top: 0;
  padding-top: 5rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 100;
  width: 100%;
  min-height: 100dvh;

  input,
  textarea {
    width: 100%;
    border-radius: 5px;
  }

  textarea {
    height: 30vh;
    min-height: 20vh;
    max-height: 40vh;
    padding: 1rem;
    border: 1px solid #ccc;
  }

  @media screen and (max-width: 767px) {
    padding-top: 2rem;
  }
`;

const ReadMessages = ({ setIsReadingMessages }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);

  //load messages
  useEffect(() => {
    const loadMessages = async () => {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:3000/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      dispatch(getMessages({ payload: response.data }));
    };
    loadMessages();
  }, []);

  return (
    <Style>
      <button
        className="btn block m-auto border-0 text-white capitalize my-4 bg-red-500 hover:bg-red-200"
        onClick={() => setIsReadingMessages(false)}
        aria-label="close"
      >
        CLOSE
      </button>
      <div
        className="flex flex-col bg-neutral m-auto p-10 max-md:w-[327px] 
        max-md:p-6 md:w-[690px] xl:w-[1100px] shadow rounded-xl"
      >
        <h2 className="text-center font-bold">Read Messages</h2>
        <div className="flex gap-4 items-center my-4">
          {messages.map((message, i) => (
            <div
              className="flex items-center gap-4 max-md:flex-col"
              key={`${message.subject + i}`}
            >
              <div className="flex flex-col gap-4 my-4">
                <h3 className="font-bold">
                  {`(${i + 1})  Subject: ${message?.subject}`}
                </h3>
                <p>{message?.content}</p>
              </div>
              <div className="flex md:flex-col self-start max-md:gap-4">
                <button
                  aria-label="answer to message"
                  className="flex gap-4 items-center p-2 rounded-lg capitalize md:mt-4 text-white bg-accent hover:bg-info min-w-[4rem]"
                >
                  ANSWER
                  <TfiWrite />
                </button>
                <button
                  className="flex gap-4 items-center p-2 rounded-lg text-white capitalize bg-red-500 md:my-2 hover:bg-red-200 min-w-[4rem]"
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
  );
};

export default ReadMessages;
