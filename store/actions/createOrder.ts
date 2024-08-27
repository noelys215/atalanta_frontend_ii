import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../store';

interface Order {
	items: Array<{
		productId: string;
		quantity: number;
	}>;
	shippingAddress: {
		address: string;
		city: string;
		postalCode: string;
		country: string;
	};
	paymentMethod: string;
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
}

interface UserInfo {
	token: string;
}

interface ErrorResponse {
	message: string;
}

// Create Order Thunk
export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (order: Order, { getState, rejectWithValue }) => {
		try {
			// Get user data from store
			const {
				userInfo: { userInfo },
			} = getState() as RootState & { userInfo: { userInfo: UserInfo } };

			// Configure authorization header with user's token
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			// Create post request with order data
			const { data } = await axios.post(
				`${import.meta.env.VITE_API_URL}/orders`,
				order,
				config
			);

			Cookies.set('orders', JSON.stringify(order));
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
