import { createSlice, current } from '@reduxjs/toolkit';
import { getOrderHistory } from '../actions/getOrderHistory';

const initialState = { loading: false, error: '', orders: [] };
export const orderHistory = createSlice({
	name: 'order',
	initialState,
	extraReducers: {
		// Get order history reducer ...
		[getOrderHistory.pending]: (state) => {
			console.log('Get Order History Pending');
			state.loading = true;
		},
		[getOrderHistory.fulfilled]: (state, { payload }) => {
			console.log('Get Order History Fulfilled');
			state.orders = payload;
			state.loading = false;
		},
		[getOrderHistory.rejected]: (state, { payload, error }) => {
			console.log('Get Order History Rejected');
			state.loading = false;
			state.error = payload;
		},
	},
});

export default orderHistory.reducer;
