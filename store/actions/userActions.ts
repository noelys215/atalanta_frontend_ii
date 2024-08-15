import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
				`${process.env.VITE_API_URL}/users/`,
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
