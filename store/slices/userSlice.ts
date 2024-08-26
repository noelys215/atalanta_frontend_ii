import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from '../actions/userActions';
import { loginUser } from '../actions/loginAction';
import { updateUserProfile, UserProfileResponse } from '../actions/updateUserProfile';
import { fetchUserProfile } from '../actions/userActions';

interface UserInfo {
	last_name: string;
	first_name: string;
	id: string;
	telephone: string;
	name: string;
	email: string;
	token: string;
	address: string;
	addressCont?: string;
	country: string;
	state: string;
	city: string;
	postal_code: string;
}

interface UserState {
	userInfo: UserInfo | null;
	loading: boolean;
	error: string | null;
}

// Initial state
const initialState: UserState = {
	userInfo: null,
	loading: false,
	error: null,
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
			return {
				...state,
				userInfo: null,
			};
		},
	},
	extraReducers: (builder) => {
		builder
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
					if (!action.payload || !action.payload.user) {
						console.error('Invalid API response:', action.payload);
						state.error = 'Invalid API response';
						state.loading = false;
						return;
					}

					const updatedUserInfo: UserInfo = {
						last_name: action.payload.user.lastName || state.userInfo?.last_name || '',
						first_name:
							action.payload.user.firstName || state.userInfo?.first_name || '',
						id: state.userInfo?.id || '',
						telephone: action.payload.user.telephone || state.userInfo?.telephone || '',
						name: `${action.payload.user.firstName || ''} ${
							action.payload.user.lastName || ''
						}`,
						email: action.payload.user.email || state.userInfo?.email || '',
						token: action.payload.token || state.userInfo?.token || '',
						address: action.payload.user.address || state.userInfo?.address || '',
						addressCont:
							action.payload.user.addressCont || state.userInfo?.addressCont || '',
						country: action.payload.user.country || state.userInfo?.country || '',
						state: action.payload.user.state || state.userInfo?.state || '',
						city: action.payload.user.city || state.userInfo?.city || '',
						postal_code:
							action.payload.user.postalCode || state.userInfo?.postal_code || '',
					};

					state.userInfo = updatedUserInfo;

					state.loading = false;
					state.error = null;
				}
			)
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Update failed';
			})
			.addCase(fetchUserProfile.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserInfo>) => {
				state.userInfo = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logoutUser, reset } = userSlice.actions;

export default userSlice.reducer;
