export default function StarRating({ rating }: { rating: number }) {
  const filled = Math.floor(rating);
  const half = rating - filled >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(filled)].map((_, i) => (
        <span key={i} className="text-yellow-500 text-lg">★</span>
      ))}
      {half && <span className="text-yellow-500 text-lg">★</span>}
      {[...Array(5 - filled - (half ? 1 : 0))].map((_, i) => (
        <span key={i} className="text-gray-300 text-lg">★</span>
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
}
