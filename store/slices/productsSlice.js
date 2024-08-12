import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteProduct } from '../actions/deleteProduct';
import { createProduct } from '../actions/createProduct';
import { updateProduct } from '../actions/updateProduct';
import { getProductDetails } from '../actions/getProductDetails';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	const { data } = await axios.get(`${process.env.API_URL}/products`);
	return data;
});

const initialState = {
	loading: false,
	createSuccess: false,
	deleteSuccess: false,
	products: [],
	error: '',
	product: {},
};

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: {
		[fetchProducts.pending]: (state) => {
			state.loading = true;
		},
		[fetchProducts.fulfilled]: (state, action) => {
			state.loading = 'Fulfilled';
			state.products = action.payload;
		},
		[fetchProducts.rejected]: (state, action) => {
			state.loading = false;
			state.error = 'Error occurred';
		},
		// Get Product Details Reducer ...
		[getProductDetails.pending]: (state = { product: {} }) => {
			state.loading = true;
		},
		[getProductDetails.fulfilled]: (state = { product: {} }, { payload }) => {
			state.loading = false;
			state.product = payload;
		},
		[getProductDetails.rejected]: (state = { product: {} }, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		// Delete Product Reducer ...
		[deleteProduct.pending]: (state) => {
			state.loading = true;
		},
		[deleteProduct.fulfilled]: (state) => {
			state.loading = false;
			state.deleteSuccess = true;
		},
		[deleteProduct.rejected]: (state, { payload }) => {
			state.loading = false;
		},
		// Create Product Reducer ...
		[createProduct.pending]: (state = {}) => {
			state.loading = true;
		},
		[createProduct.fulfilled]: (state = {}, { payload }) => {
			state.loading = false;
			state.createSuccess = true;
			state.product = payload;
		},
		[createProduct.rejected]: (state = {}, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		// Update Product Reducer ...
		[updateProduct.pending]: (state = { product: {} }) => {
			state.loading = true;
		},
		[updateProduct.fulfilled]: (state = { product: {} }, { payload }) => {
			state.loading = false;
			state.createSuccess = true;
			state.product = payload;
		},
		[updateProduct.rejected]: (state = { product: {} }, { payload }) => {
			state.loading = false;
			state.error = payload;
			console.log(payload);
		},
	},
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;
