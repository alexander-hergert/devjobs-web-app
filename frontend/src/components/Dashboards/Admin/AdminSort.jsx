import React from "react";
import { useForm } from "react-hook-form";
import { getUsers } from "../../../slices/allUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaSortAlphaDown } from "react-icons/fa";

const AdminSort = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers.allUsers);

  const onSubmit = (data) => {
    console.log(data);
    const { typesort, rowsort } = data;
    const sortedUsers = [...users];
    console.log(sortedUsers);

    if (typesort === "user_id") {
      sortedUsers?.sort((a, b) => {
        if (rowsort === "asc") {
          return a.user_id.localeCompare(b.user_id);
        } else {
          return b.user_id.localeCompare(a.user_id);
        }
      });
    } else if (typesort === "role") {
      sortedUsers?.sort((a, b) => {
        if (rowsort === "asc") {
          return a.role.localeCompare(b.role);
        } else {
          return b.role.localeCompare(a.role);
        }
      });
    } else if (typesort === "fullname") {
      sortedUsers?.sort((a, b) => {
        if (rowsort === "asc") {
          return a.fullname.localeCompare(b.fullname);
        } else {
          return b.fullname.localeCompare(a.fullname);
        }
      });
    }
    console.log(sortedUsers);

    dispatch(
      getUsers({
        allUsers: sortedUsers,
        isLoading: false,
      })
    );
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 max-md:flex-col max-md:w-[375px]"
    >
      <div className="max-md:self-start flex gap-4 items-center">
        <label className="font-bold text-2xl" htmlFor="typesort">
          Sort
        </label>
        <select
          className="w-[130px] border-2 border-gray-500 rounded-md bg-neutral"
          id="typesort"
          {...register("typesort")}
        >
          <option defaultChecked value="user_id">
            User_Id
          </option>
          <option value="role">Role</option>
          <option value="fullname">Fullname</option>
        </select>
        <select
          className="w-[130px] border-2 border-gray-500 rounded-md bg-neutral"
          id="rowsort"
          {...register("rowsort")}
        >
          <option defaultChecked value="asc">
            Ascending
          </option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <button
        className="flex gap-2 btn border-0 my-4 duration-0 capitalize text-white bg-accent hover:bg-info"
        type="submit"
      >
        <div className="flex gap-2 items-center">
          Sort
          <FaSortAlphaDown />
        </div>
      </button>
    </form>
  );
};

export default AdminSort;
