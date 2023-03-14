import React from "react";

import UseInput from "../Hooks/UseInput";
import "./search.css";

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
    <div id="search">
      <h4>
        Use this search to find vintage and pre-owned items in multiple
        retailers at once.
      </h4>
      <form onSubmit={(e) => handleSubmit(e)} id="search-form">
        <input
          id="search-input"
          type="search"
          placeholder="Search"
          {...bindSearch}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
