import { useDispatch } from "react-redux";
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
    <div className={`recommendation ${liked && "liked"}`}>
      <div
        onClick={() => dispatch(likeRecommendation(index))}
        className="rec-heart"
      >
        {liked ? (
          <span className="heart">&#x2764;</span>
        ) : (
          <span className="heart">&#x2661;</span>
        )}
      </div>
      <h4 className="rec">{recommendation.trim()}</h4>
    </div>
  );
};

export default Recommendation;
