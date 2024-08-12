import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateProduct = createAsyncThunk(
	'products/updateProduct',
	async (product: any, { getState, rejectWithValue }: any) => {
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
			const { data } = await axios.put(
				`${process.env.API_URL}/products/${product._id}`,
				product,
				config
			);
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
