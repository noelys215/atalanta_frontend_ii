import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StockItem {
	size: string | number;
	quantity: number;
}

export interface CartItem {
	_id: number;
	_key: string; // you may eventually remove this if unnecessary
	name: string;
	slug: string;
	price: number;
	path: string;
	countInStock: StockItem[];
	image: string;
	quantity: number;
	selectedSize: string;
	department: string;
	category: string;
}

interface CartState {
	cartItems: CartItem[];
	paymentMethod: string;
}

// Load cart items from localStorage if available
const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems') as string)
	: [];

const initialState: CartState = {
	cartItems: cartItemsFromStorage, // Initialize with items from localStorage
	paymentMethod: '',
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		cartAddItem: (state, action: PayloadAction<CartItem>) => {
			const newItem = action.payload;

			// Match based on slug and selected size
			const existItem = state.cartItems.find(
				(item) => item.slug === newItem.slug && item.selectedSize === newItem.selectedSize
			);

			if (existItem) {
				// Update the quantity of the existing item
				state.cartItems = state.cartItems.map((item) =>
					item.slug === existItem.slug && item.selectedSize === existItem.selectedSize
						? { ...item, quantity: newItem.quantity }
						: item
				);
			} else {
				// Add new item to the cart
				state.cartItems = [...state.cartItems, newItem];
			}

			// Save to localStorage
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		},
		cartRemoveItem: (state, action: PayloadAction<CartItem>) => {
			// Remove based on slug and selected size
			state.cartItems = state.cartItems.filter(
				(item) =>
					!(
						item.slug === action.payload.slug &&
						item.selectedSize === action.payload.selectedSize
					)
			);

			// Update localStorage
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		},
		cartClear: (state) => {
			state.cartItems = [];
			// Clear cart items from localStorage
			localStorage.removeItem('cartItems');
		},
		setPaymentMethod: (state, action: PayloadAction<string>) => {
			state.paymentMethod = action.payload;
			// Optionally, save payment method to localStorage
			localStorage.setItem('paymentMethod', action.payload);
		},
	},
});

export const { cartAddItem, cartRemoveItem, cartClear, setPaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;
