import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAdminOrderHistory = createAsyncThunk(
	'user/getOrderHistory',
	async (user: any, { getState, rejectWithValue }: any) => {
		try {
			const {
				userInfo: { userInfo },
			} = getState();
			const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

			const { data }: any = await axios.get(`${process.env.API_URL}/orders`, config);

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
