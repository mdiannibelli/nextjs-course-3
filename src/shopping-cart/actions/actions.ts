// 'use client' => NO hace falta especificar, esto es del lado del cliente

import { products } from "@/data/products";
import { getCookie, hasCookie, setCookie } from "cookies-next";

/* 
cookie : cart {
    'uuid-123-1': 1,
    'uuid-123-2': 2,
    'uuid-123-3': 4 
}
*/

export const getCookieCart = ():{[id:string]:number} => {
    if(hasCookie('cart')) {
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}')
        return cookieCart
    }
    return {};
}

export const addProductToCart = (id:string) => {
    const cookieCart = getCookieCart();
    if(cookieCart[id]) {
        cookieCart[id] = cookieCart[id] +  1;
    } else {
        cookieCart[id] = 1;
    }
    setCookie('cart', JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id:string) => {
    const cookieCart = getCookieCart();
    delete cookieCart[id];
    setCookie('cart', JSON.stringify(cookieCart))
}

export const removeSingleProductFromCart = (id:string) => {
    const cookieCart = getCookieCart();
    if(!cookieCart[id]) return;

    const itemsInCart = cookieCart[id] - 1;
    if(itemsInCart <= 0) {
        delete cookieCart[id];
    } else {
        cookieCart[id] = itemsInCart;
    }
    setCookie('cart', JSON.stringify(cookieCart))
}