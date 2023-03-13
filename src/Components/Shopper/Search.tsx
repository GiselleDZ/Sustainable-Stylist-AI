import React from "react";

import UseInput from "../Hooks/UseInput";

type searchProps = {
  setSearchString: Function;
};

const Search = ({ setSearchString }: searchProps) => {
  const { value: search, bind: bindSearch } = UseInput({
    initialValue: "",
    valueTransformer: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchString(search);
  };

  return (
    <div>
      <h3>Search</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="search" placeholder="Search" {...bindSearch} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
