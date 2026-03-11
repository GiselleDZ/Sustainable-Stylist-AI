import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, Button } from "@chakra-ui/react";

import Listing from "../Shopper/Listings";
import { generateKey } from "../../utils";

type RealRealScraperProps = {
  searchString: string;
};

type ListingItem = { image: string; price: number; alt: string; link: string };

const RealRealScraper = ({ searchString }: RealRealScraperProps) => {
  const [totalListings, setTotalListings] = useState(0);
  const [currentListings, setCurrentListings] = useState<ListingItem[]>([]);
  const [viewListings, setViewListings] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchListings = async () => {
    const parsedString = searchString.split(" ").join("-");
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/shopper/scrape-realreal?searchstring=${parsedString}&page=${page + 1}`
      );
      setPage((p) => p + 1);
      setTotalListings(res.data.numOfListings);
      setCurrentListings((prev) => [...res.data.elements, ...prev]);
    } catch (error) {
      console.log("Real Real scraper error", error);
    }
  };

  if (!currentListings.length) return null;

  return (
    <Box as="section" mt={4}>
      <Heading
        size="md"
        onClick={() => setViewListings(!viewListings)}
        cursor="pointer"
        mb={3}
      >
        {`${viewListings ? "Hide" : "View"} The Real Real Listings`}
      </Heading>
      <Box display="flex" flexWrap="wrap" gap={3}>
        {viewListings &&
          currentListings.map(
            (li, i) =>
              !!li.image && (
                <Listing
                  key={generateKey(`realrealListing_${i}`)}
                  image={li.image}
                  price={li.price}
                  text={li.alt}
                  link={li.link}
                  root="https://www.therealreal.com"
                />
              )
          )}
      </Box>
      {currentListings.length < totalListings && viewListings && (
        <Button variant="ghost" onClick={fetchListings} mt={2}>
          See more listings...
        </Button>
      )}
    </Box>
  );
};

export default RealRealScraper;
