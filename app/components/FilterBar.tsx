"use client";

import { Filter, ArrowUpDown, Search } from "lucide-react";
import { Category, SortOrder } from "@/app/types/product";
import { useState } from "react";

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
  getProductByName: (name: string) => void;
  keywordProducts: string;
  onKeywordProductsChange: (value: string) => void;
}

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
  getProductByName,
  keywordProducts,
  onKeywordProductsChange,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-40 mb-8 animate-slide-up backdrop-blur-md">
      <div className="glass-effect rounded-2xl p-6 shadow-xl border-2 border-[--text-secondary]/10">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-display uppercase tracking-wider text-[--text-secondary] mb-3">
              <Search size={16} />
              Search Products
            </label>
            <input
              type="text"
              placeholder="Search products..."
              value={keywordProducts ?? ""}
              className="w-full bg-white border-2 border-[--text-secondary]/20 rounded-xl px-4 py-3 text-[--text-primary] font-semibold focus:outline-none focus:border-[--accent] transition-all hover:border-[--accent]/50"
              onChange={(e) => onKeywordProductsChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  getProductByName((keywordProducts ?? "").trim());
                }
              }}
            />
          </div>
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-display uppercase tracking-wider text-[--text-secondary] mb-3">
              <Filter size={16} />
              Filter by Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full appearance-none bg-white border-2 border-[--text-secondary]/20 rounded-xl px-4 py-3 pr-10 text-[--text-primary] font-semibold focus:outline-none focus:border-[--accent] transition-all cursor-pointer hover:border-[--accent]/50"
              >
                <option value="">All Products</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-[--text-secondary]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-display uppercase tracking-wider text-[--text-secondary] mb-3">
              <ArrowUpDown size={16} />
              Sort by Price
            </label>

            <select
              value={sortOrder}
              onChange={(e: any) => onSortChange(e.target.value)}
              className="w-full appearance-none bg-white border-2 border-[--text-secondary]/20 rounded-xl px-4 py-3 pr-10 text-[--text-primary] font-semibold focus:outline-none focus:border-[--accent] transition-all cursor-pointer hover:border-[--accent]/50"
            >
              <option value="">Default</option>
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </select>

            {/* Dropdown Arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-[--text-secondary]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
