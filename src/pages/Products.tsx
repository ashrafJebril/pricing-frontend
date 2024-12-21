import ProductList from "../components/products/ProductList";
import { useProducts } from "../hooks/useProducts";

const Products = () => {
  const { products, isLoading } = useProducts();

  return (
    <div className="space-y-6 ">
      <h1 className="text-2xl font-bold text-gray-900">Products</h1>

      <ProductList products={products} isLoading={isLoading} />

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
    </div>
  );
};

export default Products;
