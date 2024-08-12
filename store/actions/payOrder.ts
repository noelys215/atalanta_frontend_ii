import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const payOrder = createAsyncThunk(
	'order/payOrder',
	async (data: any, { getState, rejectWithValue }: any) => {
		const { orderId: id, paymentResult } = data;
		try {
			// get user data from store
			const {
				userInfo: { userInfo },
			} = getState();

			// configure authorization header with user's token
			const config = {
				'Content-Type': 'application/json',
				headers: { Authorization: `Bearer ${userInfo.token}` },
			};

			const { data }: any = await axios.put(
				`${process.env.API_URL}/orders/${id}/pay`,
				paymentResult,
				config
			);
			console.log(data);
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
