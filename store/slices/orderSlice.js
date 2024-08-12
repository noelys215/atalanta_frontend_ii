import { createSlice, current } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { createOrder } from '../actions/createOrder';
import { getOrderDetails } from '../actions/getOrderDetails';

const initialState = {
	loading: false,
	order: {},
	error: '',
	success: false,
};
export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: {
		// Create order reducer ...
		[createOrder.pending]: (state) => {
			state.loading = true;
		},
		[createOrder.fulfilled]: (state, { payload }) => {
			state.order = payload;
			state.loading = false;
		},
		[createOrder.rejected]: (state, { payload, error }) => {
			console.log('Order Rejected');
			state.loading = false;
			state.error = payload;
		},
		// Get order details reducer ...
		[getOrderDetails.pending]: (state) => {
			state.loading = true;
		},
		[getOrderDetails.fulfilled]: (state, { payload }) => {
			state.order = payload;
			state.loading = false;
		},
		[getOrderDetails.rejected]: (state, { payload, error }) => {
			console.log('Get Order Rejected');
			state.loading = false;
			state.error = payload;
		},
	},
});

export const { reset } = orderSlice.actions;

export default orderSlice.reducer;
