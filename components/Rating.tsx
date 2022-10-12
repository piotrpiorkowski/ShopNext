interface RatingProps {
  rating: number;
}

const Rating = ({ rating }: RatingProps) => {
  return <div className="text-blue-500 font-bold">{rating}</div>;
};

export default Rating;
