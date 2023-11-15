import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../slices/themeSlice";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const handleClick = () => {
     dispatch(setTheme({ payload: theme }));
  };

  useEffect(() => {
    document.body.dataset.theme = theme === "light" ? "light" : "dark";
  }, [theme]);

  return (
    <div className="flex items-center gap-2 ">
      <input
        type="image"
        src="../assets/desktop/icon-sun.svg"
        alt="light-theme-icon-sun"
      />
      <input type="checkbox" className="toggle" onChange={handleClick} />
      <input
        type="image"
        src="../assets/desktop/icon-moon.svg"
        alt="dark-theme-icon-moon"
      />
    </div>
  );
};

export default ThemeSwitcher;
