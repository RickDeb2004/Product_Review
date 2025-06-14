/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRouter } from "next/navigation";
import StarRating from "./StarRating";

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-40 object-cover mb-4 bg-gray-100 rounded"
        />
        <p className="text-sm text-gray-500">{product.brand}</p>
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <StarRating rating={product.avg_rating ?? 0} />
        <p className="text-gray-500 text-sm">{product.reviewCount ?? 0} reviews</p>
        <p className="text-xl font-bold mt-2">₹{product.price}</p>
      </div>
      <button
        onClick={() => router.push(`/product/${product.id}`)}
        className="bg-black text-white rounded-md py-2 mt-4 w-full flex items-center justify-center gap-2"
      >
        <span>🗨</span> View Reviews
      </button>
    </div>
  );
}
