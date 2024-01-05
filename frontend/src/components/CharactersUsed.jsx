import React from "react";

const CharactersUsed = ({ charactersUsed, maxCharacters, offset }) => {
  const { small = 0, medium = 0, large = 0 } = offset;

  return (
    <div
      className={`relative bottom-0 max-md:left-[${small}rem] md:left-[${medium}rem] xl:left-[${large}rem]`}
    >
      <p className={charactersUsed >= maxCharacters ? "text-red-500" : ""}>
        Characters used: {charactersUsed} / {maxCharacters}
      </p>
    </div>
  );
};

export default CharactersUsed;
