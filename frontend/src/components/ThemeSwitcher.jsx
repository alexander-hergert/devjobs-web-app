import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../slices/themeSlice";
import { loadDataFromLocalStorage } from "../utils";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const handleClick = () => {
    dispatch(setTheme({ payload: theme === "light" ? "dark" : "light" }));
  };

  useEffect(() => {
    //set theme from storage
    const theme = loadDataFromLocalStorage("theme");
    if (theme === "light") {
      dispatch(setTheme({ payload: "light" }));
    } else if (theme === "dark") {
      dispatch(setTheme({ payload: "dark" }));
    }
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="flex items-center gap-2 ">
      <input
        type="image"
        src="../assets/desktop/icon-sun.svg"
        alt="light-theme-icon-sun"
      />
      <input
        type="checkbox"
        className="toggle"
        onChange={handleClick}
        defaultChecked={loadDataFromLocalStorage("theme") === "dark"}
      />
      <input
        type="image"
        src="../assets/desktop/icon-moon.svg"
        alt="dark-theme-icon-moon"
      />
    </div>
  );
};

export default ThemeSwitcher;
