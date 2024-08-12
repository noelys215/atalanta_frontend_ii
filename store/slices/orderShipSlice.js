import { createSlice } from '@reduxjs/toolkit';
import { updateToShipped } from '../actions/updateToShipped';

const initialState = { success: false, loading: false, error: '' };

export const orderShipSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		shipReset: () => initialState,
	},
	extraReducers: {
		// pay order  reducer ...
		[updateToShipped.pending]: (state) => {
			state.loading = true;
		},
		[updateToShipped.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
		},
		[updateToShipped.rejected]: (state, { payload, error }) => {
			state.loading = false;
			state.error = payload;
			console.log(payload);
		},
	},
});

export const { shipReset } = orderShipSlice.actions;

export default orderShipSlice.reducer;
