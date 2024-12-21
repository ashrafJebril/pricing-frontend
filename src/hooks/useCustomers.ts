import { useState, useCallback } from "react";

// Sample customer data
const sampleCustomers = [
  {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    companyName: "Doe Enterprises",
    location: "New York, USA",
  },
  {
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "987-654-3210",
    companyName: "Smith Consulting",
    location: "London, UK",
  },
  {
    fullName: "Mike Johnson",
    email: "mike.johnson@example.com",
    phoneNumber: "555-678-1234",
    companyName: "Johnson Tech",
    location: "Sydney, Australia",
  },
  {
    fullName: "Emily Davis",
    email: "emily.davis@example.com",
    phoneNumber: "444-222-1111",
    companyName: "Davis Corp",
    location: "Toronto, Canada",
  },
  {
    fullName: "Chris Lee",
    email: "chris.lee@example.com",
    phoneNumber: "333-777-8888",
    companyName: "Lee Innovations",
    location: "Tokyo, Japan",
  },
  // Add more sample customers as needed
];

export const useCustomers = () => {
  const [customers, setCustomers] = useState(sampleCustomers); // Store the sample data
  const [isLoading, setIsLoading] = useState(false); // Simulate loading state
  const [page, setPage] = useState(1); // Current page
  const limit = 10; // Items per page
  const totalPages = Math.ceil(customers.length / limit); // Calculate total pages

  // Simulate loading new page of data
  const loadPage = useCallback((pageNumber: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setPage(pageNumber);
      setIsLoading(false);
    }, 500); // Simulate loading delay
  }, []);

  // Paginate customers
  const paginatedCustomers = customers.slice((page - 1) * limit, page * limit);

  return {
    customers: paginatedCustomers,
    isLoading,
    page,
    totalPages,
    loadPage,
  };
};
