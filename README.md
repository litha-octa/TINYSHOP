# 🛍️ TINYSHOP - Next.js 14 TypeScript Product Catalog

Aplikasi katalog produk modern yang dibangun dengan **Next.js 14**, **TypeScript**, featuring SSR, type safety, optimasi performa, dan design yang unik.

## ✨ Features

### Core Features

- ✅ **Product Listing** - Display produk dari REST API dengan lazy loading
- ✅ **Type-Safe** - Full TypeScript untuk better DX dan fewer bugs
- ✅ **Filtering** - Filter produk berdasarkan kategori
- ✅ **Sorting** - Sort produk by price (ascending/descending)
- ✅ **Product Detail** - Halaman detail dengan image carousel
- ✅ **Responsive Design** - Mobile-first, works di semua device

### Performance Optimizations

- ⚡ **Server-Side Rendering (SSR)** - Faster initial page load
- 🎯 **Static Site Generation (SSG)** - Pre-render top 20 products
- 🖼️ **Next.js Image Optimization** - Automatic image optimization
- 💾 **Data Caching** - API responses cached dengan revalidation
- 🚀 **Lazy Loading** - Images loaded on-demand
- ⏱️ **Performance Metrics** - Optimized untuk TTFB, FCP, TTI
- 📦 **Tree Shaking** - Only import what you need

### TypeScript Benefits

- 🔒 **Type Safety** - Catch errors at compile time
- 🎯 **IntelliSense** - Better autocomplete dan documentation
- 🛡️ **Refactoring** - Safe code refactoring
- 📚 **Self-Documenting** - Types serve as documentation

### Design Features

- 🎨 **Unique Aesthetic** - Editorial magazine style dengan Space Mono & Crimson Text fonts
- ✨ **Smooth Animations** - Staggered reveals dan hover effects
- 🔍 **Glass Morphism** - Modern backdrop blur effects
- 🎯 **Accessibility** - Semantic HTML dan ARIA labels

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Project Structure

```
product-catalog-nextjs/
├── app/
│   ├── types/
│   │   └── product.ts             # TypeScript interfaces & types
│   ├── components/
│   │   ├── ProductCard.tsx        # Product card component
│   │   ├── ProductGrid.tsx        # Grid dengan filtering/sorting
│   │   ├── FilterBar.tsx          # Filter & sort controls
│   │   └── ImageCarousel.tsx      # Image carousel untuk detail
│   ├── lib/
│   │   └── api.ts                 # API service functions (typed)
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx           # Dynamic product detail page
│   ├── layout.tsx                 # Root layout dengan fonts
│   ├── page.tsx                   # Homepage dengan product grid
│   └── globals.css                # Global styles & animations
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # Tailwind CSS config
├── tsconfig.json                  # TypeScript configuration
└── package.json
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Space Mono, Crimson Text)
- **Image Optimization**: Next.js Image component
- **API**: DummyJSON REST API

## 🔧 TypeScript Configuration

### Strict Mode Enabled

- `strict: true` untuk maximum type safety
- `noEmit: true` karena Next.js handle compilation
- Path aliases dengan `@/*` untuk cleaner imports

### Type Definitions

Semua types defined di `app/types/product.ts`:

```typescript
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  // ... more fields
}
```

## 🔧 Configuration

### API Caching

API calls di-cache dengan revalidation periods:

- Products: 1 hour (3600s)
- Categories: 24 hours (86400s)

### Image Optimization

Next.js automatically optimizes images dengan:

- Responsive sizes
- Modern formats (WebP)
- Lazy loading
- Blur placeholders

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: 1024px - 1280px (3 columns)
- **Large**: > 1280px (4 columns)

## 🎯 Performance Metrics

Aplikasi ini dioptimasi untuk:

- **TTFB (Time to First Byte)**: < 200ms dengan SSR caching
- **FCP (First Contentful Paint)**: < 1.5s dengan optimized assets
- **TTI (Time to Interactive)**: < 3s dengan lazy loading
- **Bundle Size**: Optimized dengan tree shaking

## 🔗 API Reference

Menggunakan DummyJSON API:

- Products: `https://dummyjson.com/products`
- Categories: `https://dummyjson.com/products/categories`
- Product Detail: `https://dummyjson.com/products/{id}`

## 🏗️ Build & Deployment

### Production Build

```bash
npm run build
```

### Deployment Options

- **Vercel** - Recommended (zero-config)
- **Netlify** - Works great
- **Docker** - Self-hosted option
- **AWS/GCP** - Cloud platforms

## 📝 TypeScript Tips

### Import Types

```typescript
import { Product, Category } from "@/app/types/product";
```

### Component Props

```typescript
interface ProductCardProps {
  product: Product;
  index: number;
}
```

### API Functions

```typescript
async function getProductById(id: string): Promise<Product> {
  // implementation
}
```

## 🐛 Common Issues

### TypeScript Errors

```bash
# Clean build
rm -rf .next
npm run build
```

### Type Errors

Check `tsconfig.json` dan pastikan semua dependencies installed

## 📝 License

MIT License - bebas digunakan untuk project apapun

## 🙋‍♂️ Support

Kalau ada issue atau pertanyaan, feel free to reach out!

---

**Built with ❤️ using Next.js 14 + TypeScript**
