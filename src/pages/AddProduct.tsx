import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addNewProduct } from "../store/slices/productsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store"; // Import AppDispatch type from your store

interface AddProductFormInputs {
  catalogNumber: string;
  description: string;
  uom: string;
  productGroup: string;
  quantityBreak: string;
  usListPrice2025: number;
  distributorTransferPrice2025: number;
}

const AddProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormInputs>();

  const onSubmit: SubmitHandler<AddProductFormInputs> = async (data) => {
    try {
      await dispatch(addNewProduct(data)).unwrap();
      alert("Product added successfully!");
      reset(); // Reset the form
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Catalog Number
          </label>
          <input
            {...register("catalogNumber", {
              required: "Catalog Number is required",
            })}
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors.catalogNumber && (
            <p className="absolute text-red-500 text-sm mt-1 -bottom-5">
              {errors.catalogNumber.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            {...register("description", {
              required: "Description is required",
            })}
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors.description && (
            <p className="absolute text-red-500 text-sm mt-1 -bottom-5">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            UOM (Unit of Measure)
          </label>
          <input
            {...register("uom", { required: "UOM is required" })}
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors.uom && (
            <p className="absolute text-red-500 text-sm mt-1 -bottom-5">
              {errors.uom.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Product Group
          </label>
          <input
            {...register("productGroup", {
              required: "Product Group is required",
            })}
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors.productGroup && (
            <p className="absolute text-red-500 text-sm mt-1 -bottom-5">
              {errors.productGroup.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Quantity Break
          </label>
          <input
            {...register("quantityBreak", {
              required: "Quantity Break is required",
            })}
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors.quantityBreak && (
            <p className="absolute text-red-500 text-sm mt-1 -bottom-5">
              {errors.quantityBreak.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            2025 US List Price
          </label>
          <input
            {...register("usListPrice2025", {
              required: "US List Price is required",
              valueAsNumber: true,
            })}
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors.usListPrice2025 && (
            <p className="absolute text-red-500 text-sm mt-1 -bottom-5">
              {errors.usListPrice2025.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            2025 Distributor Transfer Price
          </label>
          <input
            {...register("distributorTransferPrice2025", {
              required: "Distributor Transfer Price is required",
              valueAsNumber: true,
            })}
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors.distributorTransferPrice2025 && (
            <p className="absolute text-red-500 text-sm mt-1 -bottom-5">
              {errors.distributorTransferPrice2025.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
