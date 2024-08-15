import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteProduct } from '../actions/deleteProduct';
import { createProduct } from '../actions/createProduct';
import { updateProduct } from '../actions/updateProduct';
import { getProductDetails } from '../actions/getProductDetails';

// Define the types for the product and state
interface Product {
	_id: string;
	name: string;
	price: number;
	// Add other properties as needed
}

interface ProductState {
	loading: boolean | 'Fulfilled';
	createSuccess: boolean;
	deleteSuccess: boolean;
	products: Product[];
	error: string;
	product: Product | object;
}

// Initial state
const initialState: ProductState = {
	loading: false,
	createSuccess: false,
	deleteSuccess: false,
	products: [],
	error: '',
	product: {},
};

// Fetch Products AsyncThunk
export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
	const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
	return data;
});

// Product Slice
export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			// Fetch Products Reducers
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
				state.loading = 'Fulfilled';
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state) => {
				state.loading = false;
				state.error = 'Error occurred';
			})
			// Get Product Details Reducers
			.addCase(getProductDetails.pending, (state) => {
				state.loading = true;
			})
			.addCase(getProductDetails.fulfilled, (state, action: PayloadAction<Product>) => {
				state.loading = false;
				state.product = action.payload;
			})
			.addCase(getProductDetails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch product details';
			})
			// Delete Product Reducers
			.addCase(deleteProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteProduct.fulfilled, (state) => {
				state.loading = false;
				state.deleteSuccess = true;
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to delete product';
			})
			// Create Product Reducers
			.addCase(createProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
				state.loading = false;
				state.createSuccess = true;
				state.product = action.payload;
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to create product';
			})
			// Update Product Reducers
			.addCase(updateProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
				state.loading = false;
				state.createSuccess = true;
				state.product = action.payload;
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to update product';
				console.log(action.error.message);
			});
	},
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;
