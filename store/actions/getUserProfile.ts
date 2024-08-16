import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jsCookie from 'js-cookie';

export const getUserProfile = createAsyncThunk(
	'user/getUserProfile',
	async (id: string, { rejectWithValue }: any) => {
		try {
			// Retrieve the token from the cookie
			const userToken = jsCookie.get('userToken');
			console.log(userToken);

			// If the token does not exist, throw an error
			if (!userToken) {
				throw new Error('No token found');
			}

			// Configure the authorization header with the token
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userToken}`,
				},
			};

			// Make the API request to retrieve the profile data
			const { data }: any = await axios.get(
				`${import.meta.env.VITE_API_URL}/profile`,
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
