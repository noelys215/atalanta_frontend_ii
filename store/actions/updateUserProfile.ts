import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the shape of the user data
interface UserProfileUpdate {
	firstName: string;
	lastName: string;
	email: string;
	telephone: string;
	country: string;
	address: string;
	addressCont?: string;
	state: string;
	city: string;
	postalCode: string;
	password?: string;
	confirmPassword?: string;
}

// Define the shape of the response data
export interface UserProfileResponse {
	user: {
		firstName: string;
		lastName: string;
		email: string;
		telephone: string;
		country: string;
		address: string;
		addressCont?: string;
		state: string;
		city: string;
		postalCode: string;
	};
	token: string;
}

// Define the shape of the error response
interface ErrorResponse {
	message: string;
}

export const updateUserProfile = createAsyncThunk<
	UserProfileResponse,
	UserProfileUpdate,
	{ rejectValue: string }
>('user/updateUserProfile', async (user, { rejectWithValue }) => {
	try {
		let userToken = Cookies.get('userToken');

		// Remove quotes from the token if they exist
		if (userToken) {
			userToken = userToken.replace(/"/g, ''); // Remove quotes
		}

		if (!userToken) throw new Error('User is not authenticated');

		console.log('Using token:', userToken);

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		};

		console.log('Request Headers:', config.headers);

		const { data } = await axios.put<UserProfileResponse>(
			`${import.meta.env.VITE_API_URL}/profile`,
			user,
			config
		);

		console.log('API Response:', data);

		return data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const errorMessage = (error.response.data as ErrorResponse).message;
			console.error('API Error:', errorMessage);
			return rejectWithValue(errorMessage);
		} else {
			console.error('Unexpected Error:', error);
			return rejectWithValue('An unexpected error occurred');
		}
	}
});
