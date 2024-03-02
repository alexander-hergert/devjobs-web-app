import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { getReplies } from "../../../slices/repliesSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Global/Loader";
import { FaTrashAlt } from "react-icons/fa";
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
  word-wrap: break-word;

  h2,
  p {
    text-align: left;

    //media query from 768px
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 32rem;
    }

    //media query from max 768px
    @media screen and (max-width: 767px) {
      font-size: 0.8rem;
      width: 16rem;
    }
  }

  input {
    width: 100%;
    border-radius: 5px;
  }

  @media screen and (max-width: 767px) {
    padding-top: 2rem;
  }
`;

const ReadMessages = ({ setIsReadingReplies, setIsMainVisible }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const replies = useSelector((state) => state.replies.replies);
  const isLoading = useSelector((state) => state.replies.isLoading);
  const [selectedReply, setSelectedReply] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const csrfToken = getCsrfToken();

  //load replies
  useEffect(() => {
    const loadMessages = async () => {
      //dispatch isLoading
      dispatch(getReplies({ replies: [], isLoading: true }));
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${baseUrl}/getReplies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        dispatch(
          getReplies({ replies: response.data.replies, isLoading: false })
        );
        dispatch(setUser({ user: response.data.user, isLoading: false }));
      } catch (error) {
        console.error("Error calling API:", error);
        toast.error("Error loading messages", {
          toastId: "error-loading-messages",
        });
      }
    };
    loadMessages();
  }, []);

  const handleDelete = async (reply_id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.delete(`${baseUrl}/deleteReply`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": csrfToken,
        },
        data: { reply_id },
        withCredentials: true,
      });
      dispatch(getReplies({ replies: response.data, isLoading: false }));
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error("Error deleting reply", {
        toastId: "error-deleting-reply",
      });
    }
  };

  if (isLoading) {
    return (
      <Style>
        <Loader />
      </Style>
    );
  }

  const handleExpand = (reply_id) => {
    setSelectedReply(reply_id);
  };

  return (
    <Style>
      <ToastContainer />
      <button
        className="btn block m-auto border-0 text-white capitalize my-4 bg-red-500 hover:bg-red-200"
        onClick={() => {
          setIsReadingReplies(false);
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
        <h2 className="text-center font-bold">Read Replies</h2>
        <div className="flex flex-col gap-4 items-center my-4">
          {replies?.length === 0 && (
            <p className="text-center hyphens-auto">No replies yet</p>
          )}
          {replies?.map((reply, i) => (
            <div
              onClick={() => handleExpand(reply?.reply_id)}
              className="flex items-center justify-between gap-4 max-md:flex-col cursor-pointer md:p-6 md:w-[690px] xl:w-[1100px]"
              key={`${reply?.subject + i}`}
            >
              <div className="flex flex-col gap-4 my-4">
                <h3 className="font-bold mb-2">
                  {`(${i + 1})  Subject: ${reply?.subject}`}
                </h3>
                {selectedReply === reply?.reply_id && (
                  <p className="break-words hyphens-auto">{reply?.content}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(reply?.reply_id)}
                className="flex md:self-start justify-center gap-4 items-center p-2 rounded-lg text-white capitalize bg-red-500 md:my-2 hover:bg-red-200 min-w-[8rem]"
                aria-label="delete reply"
              >
                DELETE
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Style>
  );
};

export default ReadMessages;
