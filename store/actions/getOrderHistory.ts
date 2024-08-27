import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../store'; // Adjust the import path if necessary

interface Order {
	_id: string;
	createdAt: string;
	totalPrice: number;
	isPaid: boolean;
}

// Define the shape of the error response
interface ErrorResponse {
	message: string;
}

export const getOrderHistory = createAsyncThunk<Order[], void, { rejectValue: string }>(
	'user/getOrderHistory',
	async (_, { getState, rejectWithValue }) => {
		try {
			const {
				userInfo: { userInfo },
			} = getState() as RootState;

			const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

			const { data } = await axios.get<Order[]>(
				`${import.meta.env.VITE_API_URL}/orders/myorders`,
				config
			);

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
