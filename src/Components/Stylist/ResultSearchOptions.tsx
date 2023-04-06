import axios from "axios";
import { connect, useDispatch } from "react-redux";

import { RootState } from "../../Store/store";
import { addRecommendations } from "../../Store/stylistChat";
import { extractRecommendations, generateKey } from "../../utils";
import Recommendation from "./Recommendation";
import "./recommendations.css";

interface ResultSearchOptionsProps {
  summary: string;
  recommendations: string[];
  likedRecommendations: { [index: number]: boolean };
  lastMessage: { role: string; content: string };
}

const ResultSearchOptions = ({
  summary,
  recommendations,
  likedRecommendations,
  lastMessage,
}: ResultSearchOptionsProps) => {
  const dispatch = useDispatch();

  const fetchRecommendations = async () => {
    console.log(recommendations);
    if (lastMessage.content.includes("--")) {
      console.log("it does include!");
      const recommendations = extractRecommendations(lastMessage.content);
      dispatch(addRecommendations(recommendations));
    } else {
      console.log("does not include");
      try {
        const res = await axios.get(`http://10.0.0.168:8000/stylist`, {
          params: {
            messages: "",
            summary: summary,
          },
        });
        console.log(res.data);
        const recommendations = extractRecommendations(res.data[0].content);
        dispatch(addRecommendations(recommendations));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <section id="post-stylist-instruction">
        <h3>What's next?</h3>
        <p>
          Once you're happy with our assistants suggestions, click the button
          below to see all your recommendations. Click one to preview the
          results. Heart the recommendations you like to save them, and they
          will appear in your search tab.
        </p>
        <button onClick={() => fetchRecommendations()}>I'm all set!</button>
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
    summary: stylistChat.summary,
    recommendations: stylistChat.recommendations,
    likedRecommendations: stylistChat.likedRecommendations,
    lastMessage: messages[messages.length - 1],
  };
})(ResultSearchOptions);
