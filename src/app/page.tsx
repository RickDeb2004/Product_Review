import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";

export default async function HomePage() {
  const { data: products } = await supabase.from("products").select("*");

  const { data: reviews } = await supabase
    .from("reviews")
    .select("product_id, rating");

  const reviewsByProduct = reviews?.reduce((acc, curr) => {
    if (!acc[curr.product_id]) acc[curr.product_id] = [];
    acc[curr.product_id].push(curr.rating);
    return acc;
  }, {} as Record<string, number[]>);

  const enrichedProducts = products?.map((product) => {
    const ratings = reviewsByProduct?.[product.id] || [];
    const avg_rating = ratings.length
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 0;

    return {
      ...product,
      avg_rating: +avg_rating.toFixed(1),
      reviewCount: ratings.length,
    };
  });

  return (
    <main className="bg-[#F1F3F6] min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {enrichedProducts?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
