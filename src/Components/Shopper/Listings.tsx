import { Box, Text, Image } from "@chakra-ui/react";

type ListingProps = {
  image: string;
  price: number;
  text: string;
  link: string;
  root: string;
};

const Listing = ({ image, price, text, link, root }: ListingProps) => {
  return (
    <a href={`${root}${link}`} style={{ textDecoration: "none", display: "block", width: "180px" }}>
      <Box
        borderRadius="md"
        overflow="hidden"
        boxShadow="md"
        _hover={{ transform: "scale(1.02)", transition: "transform 0.2s" }}
      >
        <Image
          src={image}
          alt={text}
          width="180px"
          height="180px"
          objectFit="cover"
        />
        <Box p={2} style={{ color: "var(--fg-color)" }}>
          <Text fontSize="sm" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {text}
          </Text>
          <Text fontWeight="bold">{price}</Text>
        </Box>
      </Box>
    </a>
  );
};

export default Listing;
