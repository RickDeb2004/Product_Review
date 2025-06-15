/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import StarRating from "@/components/StarRating";
import ReviewList from "@/components/ReviewList";
import ReviewModal from "@/components/ReviewModal";

export default function ProductDetail() {
  const { id: productId } = useParams(); // ✅ read from dynamic route
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!productId) return;

    async function fetchData() {
      const [{ data: product }, { data: reviews }] = await Promise.all([
        supabase.from("products").select("*").eq("id", productId).single(),
        supabase.from("reviews").select("*").eq("product_id", productId),
      ]);

      setProduct(product);
      setReviews(reviews ?? []);
      setLoading(false);
    }

    fetchData();
  }, [productId]);

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <main className="bg-[#F1F3F6] min-h-screen p-6">
      <div className="bg-white p-6 rounded-md max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <img
            src={product.image_url}
            className="w-full h-96 object-cover bg-gray-100"
          />
          <div>
            <p className="text-sm text-gray-500">
              {product.category} · {product.brand}
            </p>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-1">{product.description}</p>
            <p className="text-xl font-bold mt-2">₹{product.price}</p>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
              <StarRating rating={avgRating} />
              <p className="text-sm text-gray-500">{reviews.length} reviews</p>

              <div className="mt-2 space-y-1">
                {ratingCounts.map(({ star, count }) => (
                  <div key={star} className="flex items-center">
                    <span className="w-6">{star}</span>
                    <div className="w-full bg-gray-200 h-2 mx-2 rounded-full overflow-hidden">
                      <div
                        className="bg-black h-2"
                        style={{
                          width: `${(count / reviews.length) * 100 || 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm">{count}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-black text-white px-4 py-2 rounded mt-4 w-full"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>
        <ReviewList reviews={reviews} />
        <ReviewModal
          open={showModal}
          onClose={() => setShowModal(false)}
          productId={productId as string}
          onSubmitSuccess={(newReview) =>
            setReviews((prev) => [newReview, ...prev])
          }
        />
      </div>
    </main>
  );
}
