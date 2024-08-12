import Cookies from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart: {
		cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
		shippingAddress: Cookies.get('shippingAddress')
			? JSON.parse(Cookies.get('shippingAddress'))
			: {},
		paymentMethod: Cookies.get('paymentMethod') ? Cookies.get('paymentMethod') : '',
	},
	userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		cartAddItem: (state, action) => {
			const newItem = action.payload;

			const existItem = state.cart.cartItems.find(
				(item) => item._key === newItem._key && item.selectedSize === newItem.selectedSize
			);

			const cartItems = existItem
				? state.cart.cartItems.map((item) =>
						item._key === existItem._key ? newItem : item
				  )
				: [...state.cart.cartItems, newItem];

			Cookies.set('cartItems', JSON.stringify(cartItems));

			return { ...state, cart: { ...state.cart, cartItems } };
		},
		cartRemoveItem: (state, action) => {
			const cartItems = state.cart.cartItems.filter(
				(item) => item._key !== action.payload._key
			);
			Cookies.set('cartItems', JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		},
		cartClear: (state, action) => {
			Cookies.remove('cartItems');
			return { ...state, cart: { ...state.cart, cartItems: [] } };
		},
	},
});

export const { cartAddItem, cartRemoveItem, cartClear } = cartSlice.actions;

export default cartSlice.reducer;
