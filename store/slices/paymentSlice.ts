import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShippingAddress {
	firstName: string;
	lastName: string;
	[key: string]: string;
}

interface CartState {
	cartItems: []; // Assuming this will be managed elsewhere
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

// Initialize the state with types
const initialState: PaymentState = {
	cart: {
		cartItems: [], // Initialize with an empty array
		shippingAddress: {
			firstName: '',
			lastName: '',
		}, // Initialize with an empty object
		paymentMethod: '', // Initialize with an empty string
	},
	userInfo: null, // Initialize with null
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
