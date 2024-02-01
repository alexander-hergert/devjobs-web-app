import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [url, setUrl] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const clname = import.meta.env.VITE_CLOUDNAME;
  const preset = import.meta.env.VITE_UPLOAD_PRESET;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: clname,
        uploadPreset: preset,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          const url = result.info.secure_url;
          console.log(url);
          setUrl(url);
        }
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (url) {
        try {
          const token = await getAccessTokenSilently();
          const data = { url };
          const response = await axios.put(`${baseUrl}/userprofile`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          dispatch(setUser({ user: response.data[0], isLoading: false }));
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [url]);

  return (
    <button
      aria-label="upload-profile-picture"
      className="cursor-pointer"
      onClick={() => widgetRef.current.open()}
    >
      Upload Image
    </button>
  );
};

export default UploadWidget;
