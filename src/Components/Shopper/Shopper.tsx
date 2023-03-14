import { useState } from "react";

import Search from "./Search";
import DepopScraper from "../Scrapers/DepopScraper";

type ShopperProps = {};

const Shopper = () => {
  const [searchString, setSearchString] = useState("");
  return (
    <>
      <Search setSearchString={setSearchString} />
      <DepopScraper searchString={searchString} />
    </>
  );
};

export default Shopper;
