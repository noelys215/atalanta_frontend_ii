import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateToShipped } from '../actions/updateToShipped';
import { SerializedError } from '@reduxjs/toolkit';

interface OrderShipState {
	success: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: OrderShipState = {
	success: false,
	loading: false,
	error: null,
};

export const orderShipSlice = createSlice({
	name: 'orderShip',
	initialState,
	reducers: {
		shipReset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateToShipped.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateToShipped.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(
				updateToShipped.rejected,
				(
					state,
					action: PayloadAction<
						unknown,
						string,
						{
							arg: void;
							requestId: string;
							requestStatus: 'rejected';
							aborted: boolean;
							condition: boolean;
						} & ({ rejectedWithValue: true } | { rejectedWithValue: false }),
						SerializedError
					>
				) => {
					state.loading = false;
					state.error =
						typeof action.payload === 'string' ? action.payload : 'An error occurred';
					console.log(action.payload);
				}
			);
	},
});

export const { shipReset } = orderShipSlice.actions;

export default orderShipSlice.reducer;
