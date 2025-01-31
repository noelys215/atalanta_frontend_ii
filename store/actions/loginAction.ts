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

			const { data } = await axios.post(
				`${import.meta.env.VITE_API_URL}/login`,
				{ email, password },
				config
			);

			Cookies.set('userToken', JSON.stringify(data.token)); // Store only token in cookies

			return data.user; // Return userInfo to store in Redux state
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorMessage = (error.response?.data as { message: string }).message;
				return rejectWithValue(errorMessage);
			} else {
				return rejectWithValue('An unexpected error occurred');
			}
		}
	}
);
