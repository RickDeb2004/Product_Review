/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ReviewModal({
  open,
  onClose,
  productId,
  onSubmitSuccess,
}: {
  open: boolean;
  onClose: () => void;
  productId: string;
  onSubmitSuccess: (review: any) => void;
}) {
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit() {
    setLoading(true);
    let imageUrl = "";

    if (image) {
      const fileName = `review-${Date.now()}-${image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("review-images")
        .upload(fileName, image);

      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: publicURLData } = supabase.storage
        .from("review-images")
        .getPublicUrl(uploadData.path);
      imageUrl = publicURLData.publicUrl;
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          product_id: productId,
          user_name: "Anonymous",
          rating,
          review_text: text,
          image_url: imageUrl || null,
        },
      ])
      .select()
      .single();

    setLoading(false);

    if (error) {
      alert("Failed to submit review");
      return;
    }

    onSubmitSuccess(data);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-xl relative">
        <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>

        {/* Star Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Overall Rating
          </label>
          <div className="flex gap-1 text-2xl">
            {[1, 2, 3, 4, 5].map((i) => (
              <button key={i} type="button" onClick={() => setRating(i)}>
                <span
                  className={`${
                    i <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            maxLength={1000}
            placeholder="Tell us about your experience with this product. What did you like or dislike? How did it meet your expectations?"
            className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          <p className="text-xs text-gray-400 text-right">
            {text.length}/1000 characters
          </p>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add Photos (Optional)
          </label>
          <div className="border border-dashed border-gray-300 rounded-md p-4 text-center bg-gray-50 hover:bg-gray-100 transition">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <div className="flex flex-col items-center justify-center space-y-1">
                <span className="text-3xl">⬆️</span>
                <p className="text-sm text-gray-500">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, GIF up to 10MB each
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || loading}
            className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
