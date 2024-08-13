import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface LoginPayload {
	email: string;
	password: string;
}

export const loginUser = createAsyncThunk(
	'user/login',
	async ({ email, password }: LoginPayload, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					'Access-Control-Allow-Credentials': true,
					crossorigin: true,
					'Content-Type': 'application/json',
				},
			};
			// make request to backend
			const { data } = await axios.post(
				`${process.env.API_URL}/users/login`,
				{ email, password },
				config
			);
			Cookies.set('userInfo', JSON.stringify(data));
			return data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				// Type assertion to specify that error.response.data is of the expected type
				const errorMessage = (error.response?.data as { message: string }).message;
				return rejectWithValue(errorMessage);
			} else {
				return rejectWithValue('An unexpected error occurred');
			}
		}
	}
);
