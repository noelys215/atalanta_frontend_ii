import Cookies from 'js-cookie';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for the state
interface ShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

interface CartState {
	cartItems: [];
	shippingAddress: ShippingAddress | object;
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
		cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems') as string) : [],
		shippingAddress: Cookies.get('shippingAddress')
			? JSON.parse(Cookies.get('shippingAddress') as string)
			: {},
		paymentMethod: Cookies.get('paymentMethod') || '',
	},
	userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo') as string) : null,
};

export const paymentSlice = createSlice({
	name: 'payment',
	initialState,
	reducers: {
		saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
			Cookies.set('shippingAddress', JSON.stringify(action.payload));
			state.cart.shippingAddress = action.payload;
		},
		savePaymentMethod: (state, action: PayloadAction<string>) => {
			Cookies.set('paymentMethod', action.payload);
			state.cart.paymentMethod = action.payload;
		},
	},
});

export const { saveShippingAddress, savePaymentMethod } = paymentSlice.actions;

export default paymentSlice.reducer;
