import React from "react";
import styled from "styled-components";

const Style = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 5rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100%;
  min-height: 100dvh;
  white-space: pre-wrap;
  word-wrap: break-word;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteModal = ({ id, handleDelete, setIsDeleteModalVisible, user }) => {
  return (
    <Style>
      <article
        className="flex flex-col bg-neutral m-auto p-10 max-md:w-[327px]
        max-md:p-6 md:w-[690px] xl:w-[1100px] shadow rounded-xl items-center gap-4"
      >
        {user?.role == "private" ? (
          <div className="text-center">
            <h2 className="text-primary leading-8">
              Are you sure you want to delete this application?
            </h2>
            <p className="text-primary leading-6">
              This action cannot be undone. This will delete all relevant
              informations which relate to this application including messages.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-primary leading-8">
              Are you sure you want to delete this job offer?
            </h2>
            <p className="text-primary leading-6">
              This action cannot be undone. This will delete all relevant
              informations which relate to this job offer including applications
              and messages.
            </p>
          </div>
        )}
        <div className="flex gap-8">
          <button
            className="btn border-0 duration-0 capitalize text-white bg-red-500  hover:bg-red-200 min-w-[4rem]"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
          <button
            className="btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info min-w-[4rem]"
            onClick={() => {
              setIsDeleteModalVisible(false);
            }}
          >
            Cancel
          </button>
        </div>
      </article>
    </Style>
  );
};

export default DeleteModal;
