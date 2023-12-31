import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { getReplies } from "../slices/repliesSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";

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

const ReadMessages = ({ setIsReadingReplies }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const replies = useSelector((state) => state.replies.replies);
  const isLoading = useSelector((state) => state.replies.isLoading);

  //load replies
  useEffect(() => {
    const loadMessages = async () => {
      //dispatch isLoading
      dispatch(getReplies({ replies: [], isLoading: true }));
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:3000/getReplies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      dispatch(getReplies({ replies: response.data, isLoading: false }));
    };
    loadMessages();
  }, []);

  if (isLoading) {
    return (
      <Style>
        <Loader />
      </Style>
    );
  }

  return (
    <Style>
      <button
        className="btn block m-auto border-0 text-white capitalize my-4 bg-red-500 hover:bg-red-200"
        onClick={() => setIsReadingReplies(false)}
        aria-label="close"
      >
        CLOSE
      </button>
      <div
        className="flex flex-col bg-neutral m-auto p-10 max-md:w-[327px] 
        max-md:p-6 md:w-[690px] xl:w-[1100px] shadow rounded-xl"
      >
        <h2 className="text-center font-bold">Read Replies</h2>
        <div className="flex flex-col gap-4 items-center my-4">
          {replies?.map((reply, i) => (
            <div
              className="flex items-center gap-4 max-md:flex-col"
              key={`${reply?.subject + i}`}
            >
              <div
                className="m-auto p-10 max-md:w-[327px] 
        max-md:p-6 md:w-[690px] xl:w-[1100px]"
              >
                <h3 className="font-bold mb-2">
                  {`(${i + 1})  Subject: ${reply?.subject}`}
                </h3>
                <p className="break-words">{reply?.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Style>
  );
};

export default ReadMessages;
