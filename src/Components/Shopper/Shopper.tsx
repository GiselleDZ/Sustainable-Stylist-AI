import { useState } from "react";

import Search from "./Search";
import DepopScraper from "../Scrapers/DepopScraper";
import EbayScraper from "../Scrapers/EbayScraper";
import RealRealScraper from "../Scrapers/RealRealScraper";

type Tab = "depop" | "ebay" | "realreal";

const Shopper = () => {
  const [searchString, setSearchString] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("depop");

  return (
    <>
      <Search setSearchString={setSearchString} />
      {searchString && (
        <>
          <div className="shopper-tabs">
            <button
              className={activeTab === "depop" ? "active" : ""}
              onClick={() => setActiveTab("depop")}
            >
              Depop
            </button>
            <button
              className={activeTab === "ebay" ? "active" : ""}
              onClick={() => setActiveTab("ebay")}
            >
              eBay
            </button>
            <button
              className={activeTab === "realreal" ? "active" : ""}
              onClick={() => setActiveTab("realreal")}
            >
              The Real Real
            </button>
          </div>
          <div style={{ display: activeTab === "depop" ? "block" : "none" }}>
            <DepopScraper key={`depop-${searchString}`} searchString={searchString} />
          </div>
          <div style={{ display: activeTab === "ebay" ? "block" : "none" }}>
            <EbayScraper key={`ebay-${searchString}`} searchString={searchString} />
          </div>
          <div style={{ display: activeTab === "realreal" ? "block" : "none" }}>
            <RealRealScraper key={`realreal-${searchString}`} searchString={searchString} />
          </div>
        </>
      )}
    </>
  );
};

export default Shopper;
