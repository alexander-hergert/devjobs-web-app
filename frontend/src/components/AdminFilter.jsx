import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../slices/allUsersSlice";

const AdminFilter = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers.allUsers);
  const [allUsers, setAllUsers] = useState(users);
  const isLoading = useSelector((state) => state.apps.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    setAllUsers(users);
  }, [isLoading]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //execute submit with queryparams on load
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");

  useEffect(() => {
    const data = { search };
    console.log(allUsers);
    if (allUsers) {
      if (Object.keys(allUsers).length !== 0 && search) {
        onSubmit(data);
      }
    }
  }, [allUsers]);

  const onSubmit = (data) => {
    console.log(data);
    let { search } = data || { search: "" };
    console.log(search);

    const filteredUsers = allUsers?.filter((user) => {
      return (
        user.user_id.toLowerCase().includes(search?.toLowerCase() || "") ||
        user.fullname.toLowerCase().includes(search?.toLowerCase() || "") ||
        user.role.toLowerCase().includes(search?.toLowerCase() || "")
      );
    });
    console.log(filteredUsers);

    dispatch(
      getUsers({
        allUsers: filteredUsers,
        isLoading: false,
      })
    );
    //navigate user to query
    navigate(`?search=${search}`);
  };

  return (
    <form
      className="flex gap-4 max-md:flex-col max-md:w-[375px]"
      action=""
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex max-md:flex-col gap-4 items-center">
        <div className="max-md:self-start flex gap-4 items-center">
          <label className="font-bold text-2xl" htmlFor="filter">
            Filter
          </label>
          <input
            type="text"
            id="filter"
            {...register("search")}
            className="w-[265px] bg-neutral outline-none border-2 border-gray-500 rounded-md"
            defaultValue={search}
          />
        </div>
      </div>
      <button className="flex gap-2 btn border-0 my-4 duration-0 capitalize text-white bg-accent hover:bg-info">
        Search
        <FaSearch />
      </button>
    </form>
  );
};

export default AdminFilter;
