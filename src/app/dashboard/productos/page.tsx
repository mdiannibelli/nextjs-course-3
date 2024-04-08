
import { products } from '@/data/products'
import ProductCard from '@/Productos/components/ProductCard'
import React from 'react'

export default function ProductosPage() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
        {/* Product Card */}
        {
            products.map((producto) => (
                <ProductCard key={producto.id}
                 id={producto.id}
                 name={producto.name}
                 price={producto.price}
                 rating={producto.rating}
                 image={producto.image} />
            ))
        }
    </div>
  )
}
