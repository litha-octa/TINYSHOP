"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { Product, Category, SortOrder } from "@/app/types/product";
import {
  getProductByName,
  getAllProducts,
  getProductsByCategory,
} from "../lib/api";

interface ProductGridProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ProductGrid({
  initialProducts,
  categories,
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("");
  const [keywordProducts, setKeywordProducts] = useState<string>("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const perPage = 30;

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (keywordProducts !== "") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(keywordProducts.toLowerCase()),
      );
    }

    // Sort by price
    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, selectedCategory, sortOrder, keywordProducts]);

  // Load more products on scroll
  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      let newProducts: Product[] = [];

      if (keywordProducts) {
        const result = await getProductByName(
          keywordProducts,
          page + 1,
          perPage,
        );
        newProducts = result;
        setHasMore(result.length === perPage);
      } else if (selectedCategory) {
        const result = await getProductsByCategory(
          selectedCategory,
          page + 1,
          perPage,
        );
        newProducts = result;
        setHasMore(result.length === perPage);
      } else {
        const result = await getAllProducts(page + 1, perPage);
        newProducts = result;
        setHasMore(result.length === perPage);
      }

      setProducts((prev) => [...prev, ...newProducts]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore, keywordProducts, selectedCategory]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMoreProducts, hasMore, isLoading]);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setProducts(initialProducts);
  }, [selectedCategory, keywordProducts, initialProducts]);

  return (
    <>
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        keywordProducts={keywordProducts}
        onKeywordProductsChange={setKeywordProducts}
        getProductByName={getProductByName}
      />

      {/* Product Count */}
      <div className="mb-6 text-center">
        <p className="text-lg text-[--text-secondary]">
          Showing{" "}
          <span className="font-bold text-[--accent] font-display">
            {filteredAndSortedProducts.length}
          </span>{" "}
          products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center py-10">
          <p className="text-[--text-secondary]">Loading more products...</p>
        </div>
      )}

      {/* Intersection Observer Target */}
      <div ref={observerTarget} className="py-10 text-center" />

      {/* Empty State */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-[--text-primary] mb-2">
            No products found
          </h3>
          <p className="text-[--text-secondary]">Try adjusting your filters</p>
        </div>
      )}
    </>
  );
}
