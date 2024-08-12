import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// userAction.js
export const loginUser = createAsyncThunk(
	// action type string
	'user/login',
	// callback function
	async ({ email, password }: any, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					'Access-Control-Allow-Credentials': true,
					crossorigin: true,
					'Content-Type': 'application/json',
				},
			};
			// make request to backend
			const { data }: any = await axios.post(
				`${process.env.API_URL}/users/login`,
				{ email, password },
				config
			);
			Cookies.set('userInfo', JSON.stringify(data));
			return data;
		} catch (error: any) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
