import React from "react";

const ScrollUpButton = () => {
  const handleScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      onClick={handleScroll}
      className="btn duration-0 fixed bottom-0 right-0 capitalize"
    >
      back to top
    </button>
  );
};

export default ScrollUpButton;
