import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const authorize = async (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    try {
      const response = await axios.get(process.env.AUTH0_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw new Error("Error fetching user info");
    }
  } else {
    throw new Error("Unauthorized");
  }
};
