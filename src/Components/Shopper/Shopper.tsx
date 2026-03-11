import { useState } from "react";
import { Box, Tabs } from "@chakra-ui/react";

import Search from "./Search";
import DepopScraper from "../Scrapers/DepopScraper";
import EbayScraper from "../Scrapers/EbayScraper";
import RealRealScraper from "../Scrapers/RealRealScraper";

const Shopper = () => {
  const [searchString, setSearchString] = useState("");

  return (
    <Box>
      <Search setSearchString={setSearchString} />
      {searchString && (
        <Tabs.Root defaultValue="depop" mt={4}>
          <Tabs.List>
            <Tabs.Trigger value="depop">Depop</Tabs.Trigger>
            <Tabs.Trigger value="ebay">eBay</Tabs.Trigger>
            <Tabs.Trigger value="realreal">The Real Real</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="depop">
            <DepopScraper
              key={`depop-${searchString}`}
              searchString={searchString}
            />
          </Tabs.Content>
          <Tabs.Content value="ebay">
            <EbayScraper
              key={`ebay-${searchString}`}
              searchString={searchString}
            />
          </Tabs.Content>
          <Tabs.Content value="realreal">
            <RealRealScraper
              key={`realreal-${searchString}`}
              searchString={searchString}
            />
          </Tabs.Content>
        </Tabs.Root>
      )}
    </Box>
  );
};

export default Shopper;
