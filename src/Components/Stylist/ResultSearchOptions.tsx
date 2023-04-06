import axios from "axios";
import { connect, useDispatch } from "react-redux";

import { RootState } from "../../Store/store";
import { addRecommendations } from "../../Store/stylistChat";
import { extractRecommendations, generateKey } from "../../utils";
import Recommendation from "./Recommendation";
import "./recommendations.css";
import { useState } from "react";

interface ResultSearchOptionsProps {
  recommendations: string[];
  likedRecommendations: { [index: number]: boolean };
  messages: Object[];
}

const ResultSearchOptions = ({
  recommendations,
  likedRecommendations,
  messages,
}: ResultSearchOptionsProps) => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const fetchRecommendations = async () => {
    try {
      setError("");
      const data = { messages: messages };
      const res = await axios.post(
        `http://192.168.1.193:8000/stylist-recs`,
        data
      );
      console.log(res.data);
      if (res.data.includes("Insufficient")) setError(res.data);
      else {
        const recommendations = extractRecommendations(res.data[0].content);
        dispatch(addRecommendations(recommendations));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section id="post-stylist-instruction">
        <p>
          Once the assistant thinks you're ready, click to get your
          recommendations!
        </p>
        <p>
          Hint: if you heart the recommendations you like, they will appear in
          your Shopper tab to make the search easier!
        </p>
        {!!error.length && <h1>{error}</h1>}
        <button onClick={() => fetchRecommendations()}>
          Get your recommendations!
        </button>
        <ul id="recommendation-list">
          {recommendations.map((rec: string, i: number) => (
            <li key={generateKey(`recommendation-${i}`)}>
              <Recommendation
                recommendation={rec}
                liked={likedRecommendations[i] === true}
                index={i}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default connect((state: RootState) => {
  const { stylistChat } = state;
  const messages = stylistChat.messages;
  return {
    recommendations: stylistChat.recommendations,
    likedRecommendations: stylistChat.likedRecommendations,
    messages,
  };
})(ResultSearchOptions);
