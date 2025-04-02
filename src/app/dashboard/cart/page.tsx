import { Product, products } from "@/prodcuts/data/product";
import { ItemCard } from "@/shoppin-cart";
import { useCookiesNext } from "cookies-next";
import { cookies } from "next/headers";

export const metadata = {
  title: "Detalles de carrito",
  description: "Detalles de carrito",
};

interface Products {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }) => {
  const productsInCart: Products[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((product) => product.id === id);
    if (product) {
      productsInCart.push({
        product,
        quantity: cart[id],
      });
    }
  }
  return productsInCart;
};

export default async function CartPage() {
  const cookieStore = await cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}");
  const productsInCart = getProductsInCart(cart);

  return (
    <div>
      <h1 className="text-5xl text-center">Detalles del carrito de compras</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
        {
            productsInCart.map(({ product, quantity }) => (
              <ItemCard key={product.id} product={product} quantity={quantity} />
            ))
        }
        </div>
      </div>
    </div>
  );
}
