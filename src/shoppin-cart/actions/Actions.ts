import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = ():{ [id: string]: number } => { //retorna un objeto: clave strings y los valores son números 
  if (hasCookie("cart")) {
    //si existe una cookie llamada 'cart'
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}"); // confirmacion de que la cookie sea un string
    return cookieCart;
  }

  return {};
};

export const addProductToCart = (id:string) => {
    const cookieCart = getCookieCart() //obtengo el contenido actual de cookieCart
    if(cookieCart[id]){ //verifica si el producto ya existe en el carrito, si existe, incrementa su cantidad en 1
        cookieCart[id] +=  1
    }else{
      //si no, Agrega el producto al carrito con una cantidad de 1.
      cookieCart[id] = 1;
    }
    setCookie('cart', JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id:string) => {
  const cookieCart = getCookieCart() //obtengo el contenido actual de cookieCart
  delete cookieCart[id] //elimina el producto del carrito
  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeSingleItemFromCart = (id:string) => {
  const cookieCart = getCookieCart() //obtengo el contenido actual de cookieCart
  if(cookieCart[id] <= 1){
    delete cookieCart[id] //elimina el producto del carrito
  }else{
    cookieCart[id] -= 1 //decrementa la cantidad del producto en 1
  }
  setCookie('cart', JSON.stringify(cookieCart))

}