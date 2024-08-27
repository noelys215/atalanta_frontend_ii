import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../store';

interface UserInfo {
	token: string;
}

interface OrderDetails {
	id: string;
}

interface ErrorResponse {
	message: string;
}

// Get Order Details Thunk
export const getOrderDetails = createAsyncThunk<OrderDetails, string, { rejectValue: string }>(
	'user/getOrderDetails',
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

			const { data } = await axios.get<OrderDetails>(
				`${import.meta.env.VITE_API_URL}/orders/${id}`,
				config
			);

			Cookies.set('orders', JSON.stringify(data));
			return data;
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
