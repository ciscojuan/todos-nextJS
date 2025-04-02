import { products } from "@/prodcuts/data/product";
import { ProductCard } from "@/prodcuts";



export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {/* Product Card */}
      {
        products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))

      }
    </div>
  );
}

