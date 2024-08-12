import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (order: any, { getState, rejectWithValue }: any) => {
		try {
			// get user data from store
			const {
				userInfo: { userInfo },
			} = getState();

			// configure authorization header with user's token
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			// create post request with order data
			const { data }: any = await axios.post(`${process.env.API_URL}/orders`, order, config);

			Cookies.set('orders', JSON.stringify(order));
			return data;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
