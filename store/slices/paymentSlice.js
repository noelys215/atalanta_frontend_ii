import Cookies from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart: {
		cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
		shippingAddress: Cookies.get('shippingAddress')
			? JSON.parse(Cookies.get('shippingAddress'))
			: {},
		paymentMethod: Cookies.get('paymentMethod') || '',
	},
	userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
};

export const paymentSlice = createSlice({
	name: 'payment',
	initialState,
	reducers: {
		saveShippingAddress: (state, { payload }) => {
			Cookies.set('shippingAddress', JSON.stringify(payload));
			return {
				...state,
				cart: {
					...state.cart,
					shippingAddress: payload,
				},
			};
		},
		savePaymentMethod: (state, { payload }) => {
			Cookies.set('paymentMethod', payload);
			return {
				...state,
				cart: {
					...state.cart,
					paymentMethod: { payload },
				},
			};
		},
	},
});

export const { saveShippingAddress, savePaymentMethod } = paymentSlice.actions;

export default paymentSlice.reducer;
