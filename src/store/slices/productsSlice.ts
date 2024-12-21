import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  addProduct,
  searchByCatalogNumber,
  getProducts,
} from "../../services/productsService"; // Adjust the path
import { Product } from "../../types/product"; // Adjust the path

interface ProductState {
  products: Product[]; // Array of products
  isLoading: boolean; // Loading state
  error: string | null; // Error message
  page: number; // Current page
  totalPages: number; // Total pages
  searchedProduct: Product | null; // Product found by catalog number
}

const initialState: ProductState = {
  products: [], // Initial empty product array
  isLoading: false,
  error: null,
  page: 1,
  searchedProduct: null,
  totalPages: 1,
};

interface FetchProductsArgs {
  page: number;
  limit: number;
}

interface FetchProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Thunk for fetching products
export const fetchProducts = createAsyncThunk<
  FetchProductsResponse, // Return type
  FetchProductsArgs, // Argument type
  { rejectValue: string } // Rejection value type
>("products/fetchProducts", async ({ page, limit }, { rejectWithValue }) => {
  try {
    // Call the API service to fetch paginated products
    const response = await getProducts(page, limit);
    return response; // Return the paginated response
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return rejectWithValue(error.message || "Failed to fetch products");
  }
});

export const addNewProduct = createAsyncThunk<
  Product, // Return type of the thunk
  Product, // Argument type passed to the thunk
  { rejectValue: string } // Rejection value type
>("products/addNewProduct", async (product, { rejectWithValue }) => {
  try {
    // Call the addProduct service to send a POST request
    const response = await addProduct(product);
    return response; // Return the added product
  } catch (error: any) {
    console.error("Error adding product:", error);
    return rejectWithValue(error.message || "Failed to add product");
  }
});

export const searchProduct = createAsyncThunk<
  Product[], // Return type should be an array of products
  string, // Argument type
  { rejectValue: string } // Rejection type
>(
  "products/searchProduct",
  async (catalogNumber: string, { rejectWithValue }) => {
    try {
      const response = await searchByCatalogNumber(catalogNumber);
      return response; // Ensure this returns a Product[]
    } catch (error: any) {
      console.error("Error searching product:", error);
      return rejectWithValue(error.message || "Failed to find product");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState, // Use the typed initial state
  reducers: {
    resetProducts: (state) => {
      state.products = [];

      state.page = 1;
      state.totalPages = 1;
      state.error = null;
    },
    clearSearchedProduct: (state) => {
      state.searchedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Handle fulfilled state for adding a product
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload); // Add the new product to the list
      })
      // Handle rejected state for adding a product
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add product";
      })

      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<FetchProductsResponse>) => {
          const { data, page, totalPages } = action.payload;
          state.isLoading = false;
          console.log("dataaa", data);
          state.products = data; // Append new products
          state.page = page;
          state.totalPages = totalPages;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch products";
      })
      .addCase(searchProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchedProduct = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to find product";
      });
  },
});

export const { resetProducts, clearSearchedProduct } = productSlice.actions;
export default productSlice.reducer;
