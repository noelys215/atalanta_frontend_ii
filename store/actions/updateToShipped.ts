import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateToShipped = createAsyncThunk(
	'orders/Ship',
	async (order: any, { getState, rejectWithValue }: any) => {
		// const { _id: id } = order;
		try {
			// get user data from store
			const {
				userInfo: { userInfo },
			} = getState();

			// configure authorization header with user's token
			const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

			const { data }: any = await axios.put(
				`${process.env.API_URL}/orders/${order._id}/ship`,
				{},
				config
			);
			return data;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				console.log(error.response.data.message);
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
