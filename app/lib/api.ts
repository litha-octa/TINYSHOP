import { Product, Category, ApiResponse } from '@/app/types/product'

const API_BASE = 'https://dummyjson.com'

export async function getAllProducts(page = 1, perPage = 30): Promise<Product[]> {
  const skip = Math.max(0, (page - 1) * perPage)
  const res = await fetch(`${API_BASE}/products?limit=${perPage}&skip=${skip}`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  
  if (!res.ok) throw new Error('Failed to fetch products')
  
  const data: ApiResponse = await res.json()
  return data.products
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) throw new Error('Failed to fetch product')
  
  return res.json()
}

export async function getProductByName(name: string, page = 1, perPage = 30): Promise<Product[]> {
  const skip = Math.max(0, (page - 1) * perPage)
  const res = await fetch(`${API_BASE}/products/search?limit=${perPage}&skip=${skip}&q=${name}`, {
    next: { revalidate: 3600 }
  })
    
  if (!res.ok) throw new Error('Failed to fetch products')
  
    const data: ApiResponse = await res.json()
  return data.products

}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/products/categories`, {
    next: { revalidate: 86400 } // Cache for 24 hours
  })
  
  if (!res.ok) throw new Error('Failed to fetch categories')
  
  const categories = await res.json()
  
  // Transform to include both slug and name
  return categories.map((cat: any) => ({
    slug: cat.slug,
    name: cat.name
  }))
}

export async function getProductsByCategory(category: string, p0?: number, perPage?: number): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products/category/${category}`, {
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) throw new Error('Failed to fetch products')
  
  const data: ApiResponse = await res.json()
  return data.products
}
