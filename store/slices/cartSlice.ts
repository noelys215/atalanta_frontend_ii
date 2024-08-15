import Cookies from 'js-cookie';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StockItem {
	size: string | number;
	quantity: number;
}

export interface CartItem {
	_id: number;
	_key: string;
	name: string;
	slug: string;
	price: number;
	path: string;
	countInStock: StockItem[];
	image: string;
	quantity: number;
	selectedSize: string;
	department?: string;
	category?: string;
}

export interface ShippingAddress {
	firstName: string;
	lastName: string;
	[key: string]: string;
}

interface CartState {
	cartItems: CartItem[];
	cart: {
		cartItems: CartItem[];
		shippingAddress: ShippingAddress;
		paymentMethod: string;
	};
	userInfo: unknown;
}

const initialState: CartState = {
	cart: {
		cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')!) : [],
		shippingAddress: Cookies.get('shippingAddress')
			? JSON.parse(Cookies.get('shippingAddress')!)
			: {},
		paymentMethod: Cookies.get('paymentMethod') || '',
	},
	userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')!) : null,
	cartItems: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		cartAddItem: (state, action: PayloadAction<CartItem>) => {
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

			state.cart.cartItems = cartItems;
		},
		cartRemoveItem: (state, action: PayloadAction<CartItem>) => {
			const cartItems = state.cart.cartItems.filter(
				(item) => item._key !== action.payload._key
			);
			Cookies.set('cartItems', JSON.stringify(cartItems));
			state.cart.cartItems = cartItems;
		},
		cartClear: (state) => {
			Cookies.remove('cartItems');
			state.cart.cartItems = [];
		},
	},
});

export const { cartAddItem, cartRemoveItem, cartClear } = cartSlice.actions;

export default cartSlice.reducer;
