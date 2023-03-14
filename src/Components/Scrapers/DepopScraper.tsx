import React, { useEffect, useState } from "react";
import axios from "axios";
import Listing from "../Shopper/Listings";
import { generateKey } from "../../utils";

type DepopScraperProps = {
  searchString: string;
};
const DepopScraper = ({ searchString }: DepopScraperProps) => {
  const [totalListings, setTotalListings] = useState(0);
  const [currentListings, setCurrentListings] = useState(Array(totalListings));
  const [viewListings, setViewListings] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!currentListings.length) {
      fetchListings();
    }
  }, []);

  const fetchListings = async () => {
    const parsedString = searchString.split(" ").join("-");
    try {
      const res = await axios.get(
        `http://192.168.1.193:8000/scrape-depop?searchstring=${parsedString}&page=${
          page + 1
        }`
      );
      setPage(page + 1);
      setTotalListings(res.data.numOfListings);
      setCurrentListings([...res.data.elements, ...currentListings]);
    } catch (error) {
      console.log("ERRRRORRR", error);
    }
  };

  const loadMoreItems = async () => {
    fetchListings();
  };

  if (!currentListings?.length) return null;

  return (
    <section className="depop-listings">
      <h3
        onClick={() => setViewListings(!viewListings)}
        className="depop-listings"
      >
        {`${viewListings ? "Hide" : "View"} Depop Listings`}
      </h3>
      <div className="depop-listings">
        {viewListings &&
          currentListings.map(
            (
              li: { image: string; price: number; alt: string; link: string },
              i: number
            ) =>
              !!li.image && (
                <Listing
                  key={generateKey(`depopListing_${i}`)}
                  image={li.image}
                  price={li.price}
                  text={li.alt}
                  link={li.link}
                  root={"https://depop.com"}
                />
              )
          )}
      </div>
      <div className="depop-listings">
        {currentListings.length < totalListings && viewListings && (
          <h4 onClick={() => loadMoreItems()}>See more listings...</h4>
        )}
      </div>
    </section>
  );
};

export default DepopScraper;
