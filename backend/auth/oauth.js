import axios from "axios";
//import bcrypt from "bcrypt";

export const authorize = async (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    try {
      const response = await axios.get(
        "https://dev-8xdmup6cvgzbmjkw.us.auth0.com/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw new Error("Error fetching user info");
    }
  } else {
    throw new Error("Unauthorized");
  }
};

// export const hashUser = (user) => {
//   const salt = bcrypt.genSaltSync(10);
//   const hashedUser = bcrypt.hashSync(user, salt);
//   return hashedUser;
// };

// export const compareUserHash = (user, hashedUser) => {
//   const isMatch = bcrypt.compareSync(user, hashedUser);
//   return isMatch;
// };
