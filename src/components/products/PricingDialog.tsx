import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";

export default function BasicDemo({
  visible,
  onClose,
  product: initialProduct,
  customers,
  selectedCustomer,
  setSelectedCustomer,
}) {
  const [product, setProduct] = useState(initialProduct);
  useEffect(() => {
    setProduct(initialProduct); // Update product when initialProduct changes
  }, [initialProduct]);

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value) || 0; // Ensure the input is a number
    setProduct((prevProduct) => ({
      ...prevProduct,
      usListPrice2025: newPrice,
    }));
  };

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={onClose}
      >
        <div className="p-4">
          <div className="mb-3">
            <label className="block font-semibold">Select Customer</label>
            <Dropdown
              value={selectedCustomer}
              options={customers}
              onChange={(e) => setSelectedCustomer(e.value)}
              optionLabel="name"
              placeholder="Select a Customer"
              className="w-full border"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold">Description</label>
            <input
              type="text"
              className="p-inputtext p-component w-full border p-2 rounded border p-2 rounded"
              value={product.description}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold">Catalog Number</label>
            <input
              type="text"
              className="p-inputtext p-component w-full border p-2 rounded"
              value={product.catalogNumber}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold">Unit of Measure</label>
            <input
              type="text"
              className="p-inputtext p-component w-full border p-2 rounded"
              value={product.uom}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold">Product Group</label>
            <input
              type="text"
              className="p-inputtext p-component w-full border p-2 rounded"
              value={product.productGroup}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold">US List Price 2025</label>
            <input
              type="number" // Change to number input
              className="p-inputtext p-component w-full border p-2 rounded"
              value={product.usListPrice2025}
              onChange={handlePriceChange} // Handle changes dynamically
            />
          </div>

          <div className="flex items-center gap-x-2">
            <div className="text-xl font-bold">Total</div>
            <div className="text-xl border px-4">
              {Math.ceil(
                product.usListPrice2025 * 0.71 + product.usListPrice2025 * 0.15
              )}
              JD
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-2">
          <button className="bg-green-500 rounded p-2 text-white">
            Send Quote
          </button>
          <button className="bg-blue-500 rounded p-2 text-white">
            View Quote
          </button>
        </div>
      </Dialog>
    </div>
  );
}
