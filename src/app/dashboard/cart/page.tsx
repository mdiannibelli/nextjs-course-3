import WidgetItem from '@/components/WidgetItem'
import { products, type Product } from '@/data/products'
import { ItemCard } from '@/shopping-cart/components/ItemCard'
import { cookies } from 'next/headers'
import React from 'react'

export const metadata = {
  title: 'Productos en carrito',
  description: 'Carrito de compras'
}

type ProductInCart = {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart:{[id:string]:number}) => {
  const productsInCart:ProductInCart[] = [];

  //? Obtengo el id de cada objeto de mi cart
  for(const id of Object.keys(cart)) {
    const producto = products.find((p) => p.id === id);
    if(producto) {
      productsInCart.push({product: producto, quantity: cart[id]})
    }
  }
  return productsInCart;
}

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as {[id:string]:number};
  const itemsInCart = getProductsInCart(cart)

  const totalToPay = itemsInCart.reduce( (prev, current) => (current.product.price * current.quantity) + prev, 0) // Inicia en 0

  return (
    <div>
      <h1 className='text-5xl'>Productos en el carrito</h1>
      <hr className='mb-2'/>

      <div className='flex flex-col sm:flex-row gap-2 w-full'>
        <div className='flex flex-col gap-2 w-full sm:w-8/12'>
          {
            itemsInCart.map(({product, quantity}) => (
              <ItemCard key={product.id} product={product} quantity={quantity}/>
            ))
          }
        </div>

          <div className='flex flex-col w-full sm:w-4/12'>
              <WidgetItem title='Total a pagar'>
                <div className='mt-2 flex justify-center gap-4'>
                  <h3 className='text-3xl font-bold text-gray-700'>${(totalToPay * 1.15).toFixed(2)}</h3>
                </div>
                  <span className='font-bold text-center text-gray-500'>Impuesto 15%: ${(totalToPay * 0.15).toFixed(2)}</span>
              </WidgetItem>
          </div>

      </div>
    </div>
  )
}
