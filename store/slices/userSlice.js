import Cookies from 'js-cookie';
import { createSlice, current } from '@reduxjs/toolkit';
import { registerUser } from '../actions/userActions';
import { loginUser } from '../actions/loginAction';
import { getUserProfile } from '../actions/getUserProfile';
import { updateUserProfile } from '../actions/updateUserProfile';
import { getUserList } from '../actions/getUserList';
import { deleteUser } from '../actions/deleteUser';
import { updateUser } from '../actions/updateUser';

const initialState = {
	cart: {
		cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
		shippingAddress: Cookies.get('shippingAddress')
			? JSON.parse(Cookies.get('shippingAddress'))
			: {},
		paymentMethod: Cookies.get('paymentMethod') ? Cookies.get('paymentMethod') : '',
	},
	userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
	users: [],
	loading: false,
	error: '',
	success: false,
};

export const userSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		reset: () => initialState,
		logoutUser: (state) => {
			Cookies.remove('userInfo');
			Cookies.remove('cartItems');
			Cookies.remove('shippingAddress');
			Cookies.remove('paymentMethod');
			return {
				...state,
				userInfo: null,
				cart: { cartItems: [], shippingAddress: {} },
			};
		},
	},
	extraReducers: {
		// Register User
		[registerUser.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			state.loading = false;
		},
		[registerUser.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		// Login User
		[loginUser.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.userInfo = payload; // login successful
		},
		[loginUser.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		// Get Single User Profile Reducer ...
		[getUserProfile.pending]: (state) => {
			state.loading = true;
		},
		[getUserProfile.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.userInfo = payload;
		},
		[getUserProfile.rejected]: (state, { payload }) => {
			state.loading = false;
		},
		// Update User Reducer ...
		[updateUserProfile.pending]: (state) => {
			state.loading = true;
		},
		[updateUserProfile.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.users = payload;
		},
		[updateUserProfile.rejected]: (state, { payload }) => {
			state.loading = false;
		},
		// Admin Update User Reducer ...
		[updateUser.pending]: (state) => {
			state.loading = true;
		},
		[updateUser.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
		},
		[updateUser.rejected]: (state, { payload }) => {
			state.loading = false;
		},
		// Delete User Reducer ...
		[deleteUser.pending]: (state) => {
			state.loading = true;
		},
		[deleteUser.fulfilled]: (state) => {
			state.loading = false;
			state.success = true;
		},
		[deleteUser.rejected]: (state, { payload }) => {
			state.loading = false;
		},
		// Get User List Reducer ...
		[getUserList.pending]: (state) => {
			state.loading = true;
		},
		[getUserList.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.users = payload;
		},
		[getUserList.rejected]: (state, { payload }) => {
			state.loading = false;
		},
	},
});

export const { logoutUser, reset } = userSlice.actions;

export default userSlice.reducer;
