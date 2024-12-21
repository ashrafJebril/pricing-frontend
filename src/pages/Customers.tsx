import CustomerList from "../components/customers/CustomerList";
import { useCustomers } from "../hooks/useCustomers";

const Customers = () => {
  const { customers, isLoading } = useCustomers();

  return (
    <div className="space-y-6 ">
      <h1 className="text-2xl font-bold text-gray-900">Products</h1>

      <CustomerList customers={customers} isLoading={isLoading} />

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
    </div>
  );
};

export default Customers;
