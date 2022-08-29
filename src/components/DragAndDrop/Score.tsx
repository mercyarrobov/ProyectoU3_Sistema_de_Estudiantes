import { Rating } from "react-simple-star-rating";

interface Props {
  ratingValue: number;
  handleRating: (n: number) => void;
}

export default function RatingComponent({ ratingValue, handleRating }: Props) {
  return (
    <div className="">
      <Rating ratingValue={ratingValue} onClick={handleRating} />
    </div>
  );
}
