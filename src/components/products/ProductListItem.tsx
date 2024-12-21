import { Product } from "../../types/product";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {product.catalogNumber}
          </h3>
          <p className="text-gray-600 mt-1">{product.description}</p>
          <div className="mt-2 space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {product.productGroup}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {product.uom}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">US List Price 2025</p>
          <p className="text-lg font-semibold text-gray-900">
            {product.usListPrice2025}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
