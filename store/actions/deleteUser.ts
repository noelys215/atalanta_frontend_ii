import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../store';
interface UserInfo {
	token: string;
}

interface ErrorResponse {
	message: string;
}

// Delete User Thunk
export const deleteUser = createAsyncThunk(
	'user/deleteUser',
	async (id: string, { getState, rejectWithValue }) => {
		try {
			// Get user data from store
			const {
				userInfo: { userInfo },
			} = getState() as RootState & { userInfo: { userInfo: UserInfo } };

			// Configure authorization header with user's token
			const config = {
				headers: { Authorization: `Bearer ${userInfo.token}` },
			};

			await axios.delete(`/users/${id}`, config);
		} catch (error) {
			const err = error as AxiosError<ErrorResponse>;
			if (err.response && err.response.data.message) {
				return rejectWithValue(err.response.data.message);
			} else {
				return rejectWithValue(err.message);
			}
		}
	}
);

// TODO Orphaned code, will decide in the future on ways to implement this functionality
