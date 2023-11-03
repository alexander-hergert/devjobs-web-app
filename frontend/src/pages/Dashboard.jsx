import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadDataFromLocalStorage } from "../utils";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const isLoggedIn = loadDataFromLocalStorage("user");
  console.log(user);

  if (user || isLoggedIn) {
    return (
      <main>
        <section className="flex justify-around items-center mt-10">
          <img
            className="w-[10rem] h-[10rem] rounded-full"
            src={user.payload.picture}
            alt={user.payload.nickname}
          />
          <h1>
            Hello, <span className="font-bold">{user?.payload.name}</span>.
            Welcome to Devjobs!
          </h1>
          <button className="btn">Edit Profile</button>
        </section>
        <h2 className="my-5 text-center">Jobapplications</h2>
        <section className="flex justify-around items-center">
          <ul>
            <li className="flex items-center gap-2">
              <h3>Job Title</h3>
              <p>Company Name</p>
              <p>Location</p>
              <button className="btn">View Details</button>
            </li>
          </ul>
        </section>
      </main>
    );
  }

  if (!user) {
    useEffect(() => {
      navigate("/");
    }, []);
  }
};

export default Dashboard;
