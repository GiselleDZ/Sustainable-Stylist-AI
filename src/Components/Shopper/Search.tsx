import React from "react";
import { Box, Text, Input, Button, HStack } from "@chakra-ui/react";

import UseInput from "../Hooks/UseInput";

type SearchProps = {
  setSearchString: (s: string) => void;
};

const Search = ({ setSearchString }: SearchProps) => {
  const { value: search, bind: bindSearch } = UseInput({
    initialValue: "",
    valueTransformer: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchString(search);
  };

  return (
    <Box
      id="search"
      width={{ base: "70%", md: "400px" }}
      ml={{ base: "15%", md: "10px" }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Text fontWeight="600" mb={2}>
        Use this search to find vintage and pre-owned items in multiple
        retailers at once.
      </Text>
      <form onSubmit={handleSubmit}>
        <HStack id="search-form">
          <Input
            id="search-input"
            type="search"
            placeholder="Search"
            mr="10px"
            {...bindSearch}
          />
          <Button type="submit">Search</Button>
        </HStack>
      </form>
    </Box>
  );
};

export default Search;
