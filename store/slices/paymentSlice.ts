import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShippingAddress {
	firstName: string;
	lastName: string;
	[key: string]: string;
}

interface CartState {
	cartItems: [];
	shippingAddress: ShippingAddress;
	paymentMethod: string;
}

interface UserInfo {
	id: string;
	name: string;
	email: string;
	token: string;
}

interface PaymentState {
	cart: CartState;
	userInfo: UserInfo | null;
}

const initialState: PaymentState = {
	cart: {
		cartItems: [],
		shippingAddress: {
			firstName: '',
			lastName: '',
		},
		paymentMethod: '',
	},
	userInfo: null,
};

export const paymentSlice = createSlice({
	name: 'payment',
	initialState,
	reducers: {
		saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
			state.cart.shippingAddress = action.payload;
		},
		savePaymentMethod: (state, action: PayloadAction<string>) => {
			state.cart.paymentMethod = action.payload;
		},
	},
});

export const { saveShippingAddress, savePaymentMethod } = paymentSlice.actions;

export default paymentSlice.reducer;
