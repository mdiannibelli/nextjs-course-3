'use client';
import Image from "next/image"
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5"
import Star from "./Star"
import { addProductToCart, removeProductFromCart } from "@/shopping-cart/actions/actions"
import { useRouter } from "next/navigation";

interface Props {
    id: string,
    name: string,
    price: number,
    rating: number,
    image: string
}

export default function ProductCard({id, name, price, rating, image}: Props) {
    const router = useRouter()
    const addToCart = () => {
        addProductToCart(id)
        router.refresh()
    }

    const deleteToCart = () => {
        removeProductFromCart(id)
        router.refresh()
    }
  return (
    <div key={id} className="shadow rounded-lg max-w-sm ">
      
      {/* Product Image */}
      <div className="p-2">
        <Image
            width={500}
            height={500}
            className="rounded" 
            src={image} 
            alt={name} />
      </div>
      
      {/* Title */}
      <div className="px-5 pb-5">
        <a href="#">
          <h3 className="font-semibold text-xl tracking-tight ">{name}</h3>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          

          {/* Stars */}
          {
            Array(rating).fill(0).map((value, i) => (
                <Star key={i}/>
            ))
          }

          {/* Rating Number */}
          <span className=" text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  ml-3">
            {rating.toFixed(2)}
          </span>
        </div>


        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 ">${price.toFixed(2)}</span>
          
          <div className="flex">
            <button
            onClick={addToCart}
              className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <IoAddCircleOutline size={25} />
            </button>
            <button
            onClick={deleteToCart}
              className="text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                <IoTrashOutline size={20} />
            </button>
          </div>
          
        </div>


      </div>
    </div>
  )
}
