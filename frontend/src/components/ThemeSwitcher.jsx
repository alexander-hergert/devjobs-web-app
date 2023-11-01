import React, { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.dataset.theme = theme === "light" ? "light" : "dark";
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      <input type="image" src="../assets/desktop/icon-sun.svg" alt="" />
      <input type="checkbox" className="toggle" onChange={handleClick} />
      <input type="image" src="../assets/desktop/icon-moon.svg" alt="" />
    </div>
  );
};

export default ThemeSwitcher;
