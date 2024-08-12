import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// userAction.js
export const registerUser = createAsyncThunk(
	// action type string
	'user/register',
	// callback function
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
		},
		{ rejectWithValue }
	) => {
		try {
			// configure header's Content-Type as JSON

			const config = {
				headers: {
					'Access-Control-Allow-Credentials': true,
					crossorigin: true,
					'Content-Type': 'application/json',
				},
			};
			// make request to backend
			await axios.post(
				`${process.env.API_URL}/users/`,
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
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
