import { Box, Heading } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box
      as="section"
      id="about"
      width={{ base: "70%", md: "400px" }}
      display="flex"
      marginTop="20%"
      mx={{ base: "15%", md: "auto" }}
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      textAlign="center"
      fontFamily='"Courier New", Courier, monospace'
    >
      <Heading size="sm" mb={4}>
        Looking for the perfect style can be overwhelming, but don't worry!
        We're here to make it easier for you while caring for the environment.
      </Heading>
      <Box
        as="ul"
        id="actions"
        listStyleType="none"
        padding={0}
        style={{ color: "var(--fg-color)" }}
        fontSize={{ base: "14px", md: "16px" }}
        fontWeight="500"
      >
        <Box as="li" mb="20px">
          Our AI Style Assistant is here to help you find the style that suits
          you best. It's like having a personal stylist at your fingertips! Just
          answer a few questions, and our AI Style Assistant will suggest
          outfits that match your taste.
        </Box>
        <Box as="li" mb="20px">
          We know that sustainability is essential to you, and it's important to
          us too. We also offer a search feature for vintage and pre-owned
          clothing from multiple retailers. By choosing second-hand fashion,
          you're helping to reduce waste and contribute to a better future.
        </Box>
        <Box as="li" mb="20px">
          So, let's get started! Use our AI Style Assistant's suggestions and
          the search feature to create your most sustainable wardrobe. You'll be
          stylish and helping the planet at the same time!
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
