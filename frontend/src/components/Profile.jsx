import React, { useEffect } from "react";
import { useCreateUserMutation } from "../api/apiSlice";

const Profile = ({ user, isAuthenticated }) => {
 // const [createUser, { isLoading: isCreatingUser }] = useCreateUserMutation();

  useEffect(() => {
    const createUserAsync = async () => {
      if (isAuthenticated && user) {
        const userData = {
          user_id: user.sub,
          nickname: user.nickname,
          name: user.name,
        };
        await createUser(userData);
      }
    };

    createUserAsync();
  }, [isAuthenticated, user, createUser]);

  return (
    isAuthenticated && (
      <div className="m-auto block text-center">
        <img src={user.picture} alt={user.name} className="m-auto block" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
