import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { Provider } from "react-redux";
import store from "./store";
import { Cloudinary } from "@cloudinary/url-gen";

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: "dopr4ns84" } });
cld.upload
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
