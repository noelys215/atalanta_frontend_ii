import Cookies from 'js-cookie';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from '../actions/userActions';
import { loginUser } from '../actions/loginAction';
import { updateUserProfile, UserProfileResponse } from '../actions/updateUserProfile';

interface CartItem {
	_id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	selectedSize: string;
}

export interface ShippingAddress {
	firstName: string;
	lastName: string;
	phone: string;
	country: string;
	address: string;
	addressCont?: string;
	state: string;
	city: string;
	postalCode: string;
}

interface UserInfo {
	last_name: string;
	first_name: string;
	id: string;
	telephone: string;
	name: string;
	email: string;
	token: string;
	address: string;
	addressCont: string;
	country: string;
	state: string;
	city: string;
	postal_code: string;
}

interface UserState {
	cart: {
		cartItems?: CartItem[];
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
		shippingAddress: {},
		paymentMethod: Cookies.get('paymentMethod') || '',
	},
	userInfo: null, // No longer stored in cookies
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
			Cookies.remove('userToken');
			Cookies.remove('cartItems');
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
			// Update User Profile Reducer
			.addCase(updateUserProfile.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				updateUserProfile.fulfilled,
				(state, action: PayloadAction<UserProfileResponse>) => {
					state.loading = false;

					// Transform UserProfileResponse into UserInfo
					const updatedUserInfo: UserInfo = {
						last_name: action.payload.user.lastName,
						first_name: action.payload.user.firstName,
						id: state.userInfo?.id || '', // Preserve id if it's already in state
						telephone: action.payload.user.telephone,
						name: `${action.payload.user.firstName} ${action.payload.user.lastName}`,
						email: action.payload.user.email,
						token: action.payload.token,
						address: action.payload.user.address,
						addressCont: action.payload.user.addressCont || '',
						country: action.payload.user.country,
						state: action.payload.user.state,
						city: action.payload.user.city,
						postal_code: action.payload.user.postalCode,
					};

					state.userInfo = updatedUserInfo;
				}
			)
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Update failed';
			});
	},
});

export const { logoutUser, reset } = userSlice.actions;

export default userSlice.reducer;
