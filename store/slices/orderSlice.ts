import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createOrder } from '../actions/createOrder';
import { getOrderDetails } from '../actions/getOrderDetails';

// Define types for the state
interface Order {
	id: string;
	// Add more fields based on your order structure
}

interface OrderState {
	loading: boolean;
	order: Order | object;
	error: string | null;
	success: boolean;
}

// Initialize the state with types
const initialState: OrderState = {
	loading: false,
	order: {},
	error: null,
	success: false,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			// Create order reducer
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
			})
			.addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
				state.order = action.payload;
				state.loading = false;
				state.success = true;
			})
			.addCase(createOrder.rejected, (state, action: PayloadAction<unknown>) => {
				console.log('Order Rejected');
				state.loading = false;
				state.error =
					typeof action.payload === 'string' ? action.payload : 'Failed to create order';
			})
			// Get order details reducer
			.addCase(getOrderDetails.pending, (state) => {
				state.loading = true;
			})
			.addCase(getOrderDetails.fulfilled, (state, action: PayloadAction<Order>) => {
				state.order = action.payload;
				state.loading = false;
			})
			.addCase(getOrderDetails.rejected, (state, action: PayloadAction<unknown>) => {
				console.log('Get Order Rejected');
				state.loading = false;
				state.error =
					typeof action.payload === 'string'
						? action.payload
						: 'Failed to get order details';
			});
	},
});

export const { reset } = orderSlice.actions;

export default orderSlice.reducer;
