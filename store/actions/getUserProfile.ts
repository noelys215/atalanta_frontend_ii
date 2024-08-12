import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jsCookie from 'js-cookie';

export const getUserProfile = createAsyncThunk(
	'user/getUserProfile',
	async (id: string, { getState, rejectWithValue }: any) => {
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
			const { data }: any = await axios.get(`${process.env.API_URL}/users/${id}`, config);
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
