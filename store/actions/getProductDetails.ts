import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProductDetails = createAsyncThunk(
	'products/getProductDetails',
	async (id: any, { getState, rejectWithValue }: any) => {
		try {
			const { data }: any = await axios.get(`${process.env.API_URL}/products/${id}`);
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
