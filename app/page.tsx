import { getAllProducts, getCategories } from "./lib/api";
import ProductGrid from "./components/ProductGrid";

export default async function Home() {
  // Fetch data on the server
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[--accent]/5 via-transparent to-amber-500/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold font-display mb-6 text-[--text-primary] tracking-tight">
              TINYSHOP
            </h1>
            <p className="text-xl md:text-2xl text-[--text-secondary] mb-4 text-balance">
              Curated collection of exceptional products
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[--accent] to-transparent mx-auto"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid initialProducts={products} categories={categories} />
      </main>

      {/* Footer */}
      <footer className="border-t border-[--text-secondary]/10 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-[--text-secondary] font-display">
            Built with Next.js 14 + TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}
