import { createSlice } from '@reduxjs/toolkit';
import { payOrder } from '../actions/payOrder';

const initialState = { success: false, loading: false, error: '' };

export const orderPaySlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		payReset: (state, action) => {
			return {};
		},
	},
	extraReducers: {
		// pay order  reducer ...
		[payOrder.pending]: (state) => {
			console.log('Paid Order Pending');
			state.loading = true;
		},
		[payOrder.fulfilled]: (state, { payload }) => {
			console.log('Paid Order Fulfilled');
			state.loading = false;
			state.success = true;
		},
		[payOrder.rejected]: (state, { payload, error }) => {
			console.log('Paid Order Rejected');
			state.loading = false;
			state.error = payload;
			console.log(payload);
		},
	},
});

export const { payReset } = orderPaySlice.actions;

export default orderPaySlice.reducer;
