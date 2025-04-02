import { WidgetItem } from "@/components/WidgetItem";
import { Product, products } from "@/prodcuts/data/product";
import { ItemCard } from "@/shoppin-cart";
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
  const totalToPay = productsInCart.reduce((prev, current) => {
    return prev + current.product.price * current.quantity;
  }, 0);
  return (
    <div>
      <h1 className="text-5xl text-center">Detalles del carrito de compras</h1>
      <hr className="mb-2" />
      <div className="flex items-center justify-center flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>

        <div className="flex-flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">$ {totalToPay.toFixed(1)}</h3>
            </div>
            <span className="font-bold text-center text-gray-500">Impuesto 19%:$ {(totalToPay * 0.15).toFixed(2)}</span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
