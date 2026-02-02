'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Product } from '@/app/types/product'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link 
      href={`/product/${product.id}`}
      className="group block animate-fade-in product-card-hover"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <article className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-[--text-secondary]/10 shadow-lg h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-64 bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-3 border-[--accent] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Discount Badge */}
          {product.discountPercentage > 0 && (
            <div className="absolute top-3 right-3 bg-[--accent] text-white px-3 py-1 rounded-full text-sm font-display font-bold shadow-lg">
              -{Math.round(product.discountPercentage)}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Category */}
          <span className="text-xs uppercase tracking-wider text-[--text-secondary] font-display mb-2">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="text-xl font-semibold text-[--text-primary] mb-2 line-clamp-2 group-hover:text-[--accent] transition-colors">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[--text-secondary] mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Footer */}
          <div className="flex items-end justify-between mt-auto">
            <div>
              <div className="text-3xl font-bold text-[--accent] font-display">
                ${product.price}
              </div>
              {product.discountPercentage > 0 && (
                <div className="text-sm text-[--text-secondary] line-through">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </div>
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 fill-amber-500" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span className="text-sm font-semibold text-amber-700">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
