import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { payOrder } from '../actions/payOrder';
import { SerializedError } from '@reduxjs/toolkit';

interface OrderPayState {
	success: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: OrderPayState = {
	success: false,
	loading: false,
	error: null,
};

export const orderPaySlice = createSlice({
	name: 'orderPay',
	initialState,
	reducers: {
		payReset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(payOrder.pending, (state) => {
				console.log('Paid Order Pending');
				state.loading = true;
			})
			.addCase(payOrder.fulfilled, (state) => {
				console.log('Paid Order Fulfilled');
				state.loading = false;
				state.success = true;
			})
			.addCase(
				payOrder.rejected,
				(
					state,
					action: PayloadAction<
						unknown,
						string,
						{
							arg: unknown;
							requestId: string;
							requestStatus: 'rejected';
							aborted: boolean;
							condition: boolean;
						} & ({ rejectedWithValue: true } | ({ rejectedWithValue: false } & {})),
						SerializedError
					>
				) => {
					console.log('Paid Order Rejected');
					state.loading = false;
					state.error = (action.payload as string) || 'Payment failed';
				}
			);
	},
});

export const { payReset } = orderPaySlice.actions;

export default orderPaySlice.reducer;
