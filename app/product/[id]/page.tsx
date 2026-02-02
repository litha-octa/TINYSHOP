import { getProductById, getAllProducts } from "@/app/lib/api";
import ImageCarousel from "@/app/components/ImageCarousel";
import Link from "next/link";
import { ArrowLeft, Star, Package, Shield, Truck } from "lucide-react";
import { Metadata } from "next";

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Generate static params for top products
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.slice(0, 20).map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductById(params.id);
  return {
    title: `${product.title} — TINYSHOP`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  return (
    <div className="min-h-screen bg-[--bg-primary]">
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[--text-secondary] hover:text-[--accent] transition-colors font-display"
        >
          <ArrowLeft size={20} />
          Back to catalog
        </Link>
      </div>

      {/* Product Detail */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-12 animate-fade-in">
          {/* Left: Image Carousel */}
          <div className="animate-slide-up">
            <ImageCarousel images={product.images} title={product.title} />
          </div>

          {/* Right: Product Info */}
          <div className="animate-slide-up animate-delay-200">
            <div className="sticky top-8">
              {/* Category */}
              <span className="inline-block text-sm uppercase tracking-wider text-[--text-secondary] font-display mb-3 bg-amber-50 px-3 py-1 rounded-full">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-[--text-primary] mb-4 text-balance">
                {product.title}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-[--text-secondary]">
                  {product.rating.toFixed(1)} ({product.reviews?.length || 0}{" "}
                  reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-[--text-secondary]/10">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold text-[--accent] font-display">
                    ${product.price}
                  </span>
                  {product.discountPercentage > 0 && (
                    <>
                      <span className="text-2xl text-[--text-secondary] line-through">
                        $
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                      <span className="bg-[--accent] text-white px-3 py-1 rounded-full text-sm font-bold font-display">
                        Save {Math.round(product.discountPercentage)}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-[--text-primary]">
                  Description
                </h2>
                <p className="text-[--text-secondary] leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Availability Badge */}
              <div className="mb-8">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    product.stock > 10
                      ? "bg-green-50 text-green-700"
                      : product.stock > 0
                        ? "bg-amber-50 text-amber-700"
                        : "bg-red-50 text-red-700"
                  }`}
                >
                  <Package size={18} />
                  <span className="font-semibold">
                    {product.stock > 10
                      ? "In Stock"
                      : product.stock > 0
                        ? `Only ${product.stock} left`
                        : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-3 mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[--text-secondary]/10">
                <div className="flex justify-between py-2 border-b border-[--text-secondary]/10">
                  <span className="text-[--text-secondary]">Brand</span>
                  <span className="font-semibold text-[--text-primary]">
                    {product.brand || "N/A"}
                  </span>
                </div>
                {product.sku && (
                  <div className="flex justify-between py-2 border-b border-[--text-secondary]/10">
                    <span className="text-[--text-secondary]">SKU</span>
                    <span className="font-semibold text-[--text-primary] font-display">
                      {product.sku}
                    </span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between py-2 border-b border-[--text-secondary]/10">
                    <span className="text-[--text-secondary]">Weight</span>
                    <span className="font-semibold text-[--text-primary]">
                      {product.weight}g
                    </span>
                  </div>
                )}
                {product.warrantyInformation && (
                  <div className="flex justify-between py-2">
                    <span className="text-[--text-secondary]">Warranty</span>
                    <span className="font-semibold text-[--text-primary]">
                      {product.warrantyInformation}
                    </span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[--text-secondary]/10">
                  <Shield className="text-[--accent] mb-2" size={24} />
                  <p className="text-sm text-[--text-secondary]">
                    Secure Payment
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[--text-secondary]/10">
                  <Truck className="text-[--accent] mb-2" size={24} />
                  <p className="text-sm text-[--text-secondary]">
                    {product.shippingInformation || "Fast Shipping"}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-[--accent] hover:bg-[--accent-light] text-white font-bold py-4 px-8 rounded-xl transition-all text-lg font-display shadow-lg hover:shadow-xl hover:scale-105">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
