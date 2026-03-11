import { useDispatch } from "react-redux";
import { HStack, Box, Text } from "@chakra-ui/react";

import { likeRecommendation } from "../../Store/stylistChat";

type RecommendationProps = {
  recommendation: string;
  liked: boolean;
  index: number;
};

const Recommendation = ({
  recommendation,
  liked,
  index,
}: RecommendationProps) => {
  const dispatch = useDispatch();

  return (
    <HStack alignItems="baseline" opacity={liked ? 1 : 0.75}>
      <Box
        onClick={() => dispatch(likeRecommendation(index))}
        mr="10px"
        cursor="pointer"
        flexShrink={0}
      >
        <Text fontSize="2em">{liked ? "\u2764" : "\u2661"}</Text>
      </Box>
      <Text
        fontFamily='"Open Sans", sans-serif'
        fontWeight={400}
        fontSize="1.3em"
        textAlign="left"
      >
        {recommendation.trim()}
      </Text>
    </HStack>
  );
};

export default Recommendation;
