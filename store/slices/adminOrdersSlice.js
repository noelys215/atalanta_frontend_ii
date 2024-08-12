import { createSlice, current } from '@reduxjs/toolkit';
import { getAdminOrderHistory } from '../actions/getAdminOrderHistory';

const initialState = { loading: false, error: '', orders: [] };
export const orderHistory = createSlice({
	name: 'order',
	initialState,
	extraReducers: {
		// Get order history reducer ...
		[getAdminOrderHistory.pending]: (state) => {
			console.log('Get Order History Pending');
			state.loading = true;
		},
		[getAdminOrderHistory.fulfilled]: (state, { payload }) => {
			console.log('Get Order History Fulfilled');
			state.orders = payload;
			state.loading = false;
		},
		[getAdminOrderHistory.rejected]: (state, { payload, error }) => {
			console.log('Get Order History Rejected');
			state.loading = false;
			state.error = payload;
		},
	},
});

export default orderHistory.reducer;
