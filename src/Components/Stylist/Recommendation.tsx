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
      <h4 className="rec">{recommendation}</h4>
      <div
        onClick={() => dispatch(likeRecommendation(index))}
        className="rec-heart"
      >
        {liked ? <span>&#x2764;</span> : <span>&#x2661;</span>}
      </div>
    </div>
  );
};

export default Recommendation;
