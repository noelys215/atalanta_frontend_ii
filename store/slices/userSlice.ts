import Cookies from 'js-cookie';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from '../actions/userActions';
import { loginUser } from '../actions/loginAction';
import { getUserProfile } from '../actions/getUserProfile';
import { updateUserProfile } from '../actions/updateUserProfile';
import { updateUser } from '../actions/updateUser';
import { ReactNode } from 'react';

interface CartItem {
	_id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	selectedSize: string;
}

interface ShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

interface UserInfo {
	isAdmin: unknown;
	lastName: ReactNode;
	firstName: ReactNode;
	id: string;
	name: string;
	email: string;
	token: string;
}

interface UserState {
	cart: {
		cartItems: CartItem[];
		shippingAddress: ShippingAddress | object;
		paymentMethod: string;
	};
	userInfo: UserInfo | null;
	users: UserInfo[];
	loading: boolean;
	error: string | null;
	success: boolean;
}

// Initial state
const initialState: UserState = {
	cart: {
		cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems') as string) : [],
		shippingAddress: Cookies.get('shippingAddress')
			? JSON.parse(Cookies.get('shippingAddress') as string)
			: {},
		paymentMethod: Cookies.get('paymentMethod') || '',
	},
	userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo') as string) : null,
	users: [],
	loading: false,
	error: null,
	success: false,
};

// User Slice
export const userSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		reset: (state) => {
			return Object.assign(state, initialState);
		},
		logoutUser: (state) => {
			Cookies.remove('userInfo');
			Cookies.remove('cartItems');
			Cookies.remove('shippingAddress');
			Cookies.remove('paymentMethod');
			return {
				...state,
				userInfo: null,
				cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
			};
		},
	},
	extraReducers: (builder) => {
		builder
			// Register User
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Registration failed';
			})
			// Login User
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
				state.loading = false;
				state.userInfo = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Login failed';
			})
			// Get Single User Profile Reducer
			.addCase(getUserProfile.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserProfile.fulfilled, (state, action: PayloadAction<UserInfo>) => {
				state.loading = false;
				state.userInfo = action.payload;
			})
			.addCase(getUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to load user profile';
			})
			// Update User Profile Reducer
			.addCase(updateUserProfile.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserInfo[]>) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Update failed';
			})
			// Admin Update User Reducer
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateUser.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Update failed';
			});
	},
});

export const { logoutUser, reset } = userSlice.actions;

export default userSlice.reducer;