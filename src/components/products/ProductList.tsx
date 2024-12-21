import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useProducts } from "../../hooks/useProducts";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import { Link } from "react-router-dom";

const Products = () => {
  const { products, isLoading, loadPage, totalPages, page } = useProducts();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(10); // Number of rows per page

  // Handle pagination change
  const onPageChange = (event: any) => {
    const newPage = event.page + 1; // PrimeReact uses 0-based index
    setCurrentPage(newPage);
    loadPage(newPage); // Fetch products for the new page
  };

  useEffect(() => {
    loadPage(currentPage); // Initial load
  }, [currentPage, loadPage]);

  return (
    <div className="p-4">
      <div className="flex justify-end mb-2">
        <Link to="/product/add-product">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Product
          </button>
        </Link>
      </div>
      <DataTable
        value={products}
        paginator
        rows={rowsPerPage}
        className="p-datatable-gridlines"
        totalRecords={totalPages * rowsPerPage}
        lazy
        loading={isLoading}
        onPage={onPageChange}
        first={(currentPage - 1) * rowsPerPage}
      >
        <Column field="id" header="ID" sortable></Column>
        <Column field="catalogNumber" header="Catalog Number" sortable></Column>
        <Column field="description" header="Description" sortable></Column>
        <Column field="uom" header="UOM" sortable></Column>
        <Column field="productGroup" header="Product Group" sortable></Column>
        <Column
          field="usListPrice2025"
          header="Price (2025)"
          sortable
          body={(rowData) => `$${rowData.usListPrice2025}`}
        ></Column>
      </DataTable>
    </div>
  );
};

export default Products;
