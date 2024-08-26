import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
interface RegisterUserArgs {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	telephone: string;
	country: string;
	address: string;
	addressCont: string;
	state: string;
	city: string;
	postalCode: string;
}

interface ErrorResponse {
	message: string;
}

// Fetch User Profile Thunk
export const fetchUserProfile = createAsyncThunk(
	'user/fetchUserProfile',
	async (_, { rejectWithValue }) => {
		try {
			let token = Cookies.get('userToken');

			if (!token) {
				throw new Error('User is not authenticated');
			}

			// Remove any quotation marks around the token
			token = token.replace(/"/g, '');

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, config);

			return data;
		} catch (error) {
			const err = error as AxiosError<ErrorResponse>;
			console.error('Fetch user profile failed:', err.response || err.message);
			if (err.response && err.response.data && typeof err.response.data === 'object') {
				return rejectWithValue((err.response.data as ErrorResponse).message);
			} else {
				return rejectWithValue(err.message);
			}
		}
	}
);

// Register User Thunk
export const registerUser = createAsyncThunk(
	'user/register',
	async (
		{
			email,
			password,
			firstName,
			lastName,
			telephone,
			country,
			address,
			addressCont,
			state,
			city,
			postalCode,
		}: RegisterUserArgs,
		{ rejectWithValue }
	) => {
		try {
			const config = {
				headers: {
					'Access-Control-Allow-Credentials': true,
					crossorigin: true,
					'Content-Type': 'application/json',
				},
			};

			await axios.post(
				`${import.meta.env.VITE_API_URL}/register`,
				{
					email,
					password,
					firstName,
					lastName,
					telephone,
					country,
					address,
					addressCont,
					state,
					city,
					postalCode,
				},
				config
			);
		} catch (error) {
			const err = error as AxiosError<ErrorResponse>;
			if (err.response && err.response.data && typeof err.response.data === 'object') {
				return rejectWithValue((err.response.data as ErrorResponse).message);
			} else {
				return rejectWithValue(err.message);
			}
		}
	}
);
