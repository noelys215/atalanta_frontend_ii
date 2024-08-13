import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAdminOrderHistory } from '../actions/getAdminOrderHistory';
import { SerializedError } from '@reduxjs/toolkit';

interface Order {
	_id: string;
	createdAt: string;
	totalPrice: number;
	isPaid: boolean;
	// Add other relevant fields here
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
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAdminOrderHistory.pending, (state) => {
				console.log('Get Order History Pending');
				state.loading = true;
			})
			.addCase(getAdminOrderHistory.fulfilled, (state, action: PayloadAction<Order[]>) => {
				console.log('Get Order History Fulfilled');
				state.orders = action.payload;
				state.loading = false;
			})
			.addCase(
				getAdminOrderHistory.rejected,
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
					console.log('Get Order History Rejected');
					state.loading = false;
					state.error =
						typeof action.payload === 'string' ? action.payload : 'An error occurred';
				}
			);
	},
});

export default orderHistory.reducer;
