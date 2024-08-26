import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderHistory } from '../actions/getOrderHistory';
import { SerializedError } from '@reduxjs/toolkit';

interface Order {
	_id: string;
	createdAt: string;
	totalPrice: number;
	isPaid: boolean;
	// Add other relevant fields
}

interface OrderHistoryState {
	loading: boolean;
	error: string | null;
	orders: Order[];
}

const initialState: OrderHistoryState = {
	loading: false,
	error: null,
	orders: [],
};

export const orderHistory = createSlice({
	name: 'orderHistory',
	initialState,
	reducers: {}, // Provide an empty object here
	extraReducers: (builder) => {
		builder
			.addCase(getOrderHistory.pending, (state) => {
				state.loading = true;
			})
			.addCase(getOrderHistory.fulfilled, (state, action: PayloadAction<Order[]>) => {
				state.orders = action.payload;
				state.loading = false;
			})
			.addCase(
				getOrderHistory.rejected,
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
				}
			);
	},
});

export default orderHistory.reducer;
