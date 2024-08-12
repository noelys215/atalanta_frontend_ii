import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const getOrderDetails = createAsyncThunk(
	'user/getOrderDetails',
	async (id: string, { getState, rejectWithValue }: any) => {
		try {
			// get user data from store
			const {
				userInfo: { userInfo },
			} = getState();

			// configure authorization header with user's token
			const config = {
				headers: { Authorization: `Bearer ${userInfo.token}` },
			};

			const { data }: any = await axios.get(`${process.env.API_URL}/orders/${id}`, config);

			Cookies.set('orders', JSON.stringify(data));
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
