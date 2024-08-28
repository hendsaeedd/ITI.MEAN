export interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  brand: string
  category: string
  rating: number
  stock: number
}

export interface ProductResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
