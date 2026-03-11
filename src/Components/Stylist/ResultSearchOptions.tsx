import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";

import { RootState } from "../../Store/store";
import { addRecommendations } from "../../Store/stylistChat";
import { extractRecommendations, generateKey } from "../../utils";
import Recommendation from "./Recommendation";

const ResultSearchOptions = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { recommendations, likedRecommendations, messages } = useSelector(
    (state: RootState) => state.stylistChat
  );

  const fetchRecommendations = async () => {
    try {
      setError("");
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/stylist/stylist-recs`,
        { messages }
      );
      if (res.data.includes("Insufficient")) {
        setError(res.data);
      } else {
        const recs = extractRecommendations(res.data[0].content);
        dispatch(addRecommendations(recs));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      as="section"
      id="post-stylist-instruction"
      width="300px"
      ml={{ md: "50px" }}
    >
      <Text>
        Once the assistant thinks you're ready, click to get your
        recommendations!
      </Text>
      <Text mt={2}>
        Hint: if you heart the recommendations you like, they will appear in
        your Shopper tab to make the search easier!
      </Text>
      {!!error.length && (
        <Text color="red.500" fontWeight="bold" mt={2}>
          {error}
        </Text>
      )}
      <Button onClick={fetchRecommendations} mt={3}>
        Get your recommendations!
      </Button>
      <Box as="ul" id="recommendation-list" mt={4} pl={0} listStyleType="none">
        {recommendations.map((rec: string, i: number) => (
          <Box as="li" key={generateKey(`recommendation-${i}`)}>
            <Recommendation
              recommendation={rec}
              liked={likedRecommendations[i] === true}
              index={i}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ResultSearchOptions;
