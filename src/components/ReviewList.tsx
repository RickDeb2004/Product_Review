import StarRating from "./StarRating";
import { formatDistanceToNow, parseISO } from "date-fns";

type Review = {
  id: string;
  user_name: string;
  rating: number;
  review_text?: string;
  image_url?: string;
  created_at: string;
};

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <p className="mt-8 text-gray-500">
        No reviews yet. Be the first to write one!
      </p>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">All Reviews</h3>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-gray-50 p-4 rounded shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <strong>{r.user_name || "Anonymous"}</strong>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(r.created_at + "Z"), { addSuffix: true })}
                </p>
              </div>
              <StarRating rating={r.rating} />
            </div>
            {r.review_text && (
              <p className="text-gray-700 mt-2">{r.review_text}</p>
            )}
            {r.image_url && (
              <img
                src={r.image_url}
                alt="review"
                className="w-32 mt-2 rounded border shadow-sm"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
