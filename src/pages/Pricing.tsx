import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  searchProduct,
  clearSearchedProduct,
} from "../store/slices/productsSlice";
import { RootState } from "../store";
import ProductDialog from "../components/products/PricingDialog";

const Pricing = () => {
  const dispatch = useDispatch();
  const { products, searchedProduct, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const sampleCustomers = [
    { name: "John Doe", id: 1 },
    { name: "Jane Smith", id: 2 },
    { name: "Mike Johnson", id: 3 },
    { name: "Emily Davis", id: 4 },
  ];
  //   const searchedProducts = useSelector((state: RootState) => state.products.searchedProduct);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [choosed, setChoosed] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      dispatch(clearSearchedProduct());
      dispatch(fetchProducts({ page: 1, limit: 50 }));
    } else {
      dispatch(clearSearchedProduct());
    }
  }, [dispatch, searchTerm]);

  const handleSearch = () => {
    if (searchTerm) {
      dispatch(searchProduct(searchTerm));
    }
  };
  const cancelSearch = () => {
    console.log("log");
    fetchProducts({ page: 1, limit: 50 });
  };
  const openDialog = (data) => {
    console.log("open");
    setChoosed(data);
    setIsDialogVisible(true);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
  };
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Pricing</h1>

      {/* Search Field */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700">
          Search by Catalog Number
        </label>
        <div className="flex gap-4 mt-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter catalog number"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Search
          </button>
          <div onClick={cancelSearch}>Cancel</div>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {isLoading && <p className="text-gray-500 text-center">Loading...</p>}

        {searchedProduct ? (
          <div
            onClick={() => openDialog(searchedProduct)}
            key={searchedProduct.catalogNumber}
            className="bg-white p-4 cursor-pointer rounded-lg shadow-md border border-gray-200 hover:border-blue-500 hover:shadow-lg transition duration-300"
          >
            <h6 className="text-[14px] font-semibold text-gray-800">
              {searchedProduct.description}
            </h6>
            <p className="text-gray-500 mt-2">
              <span className="text-[12px]">Catalog Number:</span>{" "}
              <span className="text-black text-[13px] font-bold">
                {searchedProduct.catalogNumber}
              </span>
            </p>
            <p className="text-gray-500">
              <span className="text-[12px]">Unit of Measure:</span>{" "}
              <span className="text-black text-[13px] font-bold">
                {searchedProduct.uom}
              </span>
            </p>
            <p className="text-gray-500">
              <span className="text-[12px]">Product Group:</span>{" "}
              <span className="text-black text-[13px] font-bold">
                {searchedProduct.productGroup}
              </span>
            </p>
            <p className="text-gray-500">
              <span className="text-[12px]">Quantity Break:</span>{" "}
              <span className="text-black text-[13px] font-bold">
                {searchedProduct.quantityBreak}
              </span>
            </p>
            <p className="text-gray-500">
              <span className="text-[12px]">US List Price 2025:</span>
              <span className="text-black text-[13px] font-bold">
                ${searchedProduct.usListPrice2025}
              </span>
            </p>
          </div>
        ) : (
          products.map((product) => (
            <div
              onClick={() => openDialog(product)}
              key={product.catalogNumber}
              className="bg-white p-4 cursor-pointer rounded-lg shadow-md border border-gray-200 hover:border-blue-500 hover:shadow-lg transition duration-300"
            >
              <h6 className="text-[14px] font-semibold text-gray-800">
                {product.description}
              </h6>
              <p className="text-gray-500 mt-2">
                <span className="text-[12px]">Catalog Number:</span>{" "}
                <span className="text-black text-[13px] font-bold">
                  {product.catalogNumber}
                </span>
              </p>
              <p className="text-gray-500">
                <span className="text-[12px]">Unit of Measure:</span>{" "}
                <span className="text-black text-[13px] font-bold">
                  {product.uom}
                </span>
              </p>
              <p className="text-gray-500">
                <span className="text-[12px]">Product Group:</span>{" "}
                <span className="text-black text-[13px] font-bold">
                  {product.productGroup}
                </span>
              </p>
              <p className="text-gray-500">
                <span className="text-[12px]">Quantity Break:</span>{" "}
                <span className="text-black text-[13px] font-bold">
                  {product.quantityBreak}
                </span>
              </p>
              <p className="text-gray-500">
                <span className="text-[12px]">US List Price 2025:</span>
                <span className="text-black text-[13px] font-bold">
                  ${product.usListPrice2025}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
      <ProductDialog
        visible={isDialogVisible}
        onClose={closeDialog}
        product={choosed}
        customers={sampleCustomers}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />

      {/* No Results */}
      {!isLoading && !searchedProduct && products.length === 0 && (
        <p className="text-gray-500 text-center">
          No products found for the search term.
        </p>
      )}
    </div>
  );
};

export default Pricing;
