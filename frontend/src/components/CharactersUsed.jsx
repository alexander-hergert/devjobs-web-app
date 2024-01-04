import React from "react";

const CharactersUsed = ({ charactersUsed, maxCharacters }) => {
  return (
    <div className="relative left-[13rem] bottom-12">
      <p className={charactersUsed >= maxCharacters ? "text-red-500" : ""}>
        Characters Used: {charactersUsed} / {maxCharacters}
      </p>
    </div>
  );
};

export default CharactersUsed;
