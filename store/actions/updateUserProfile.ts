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
		// Get the user token from the cookies and remove quotes
		let userToken = Cookies.get('userToken');

		// Remove the surrounding quotes, if present
		if (userToken) {
			userToken = userToken.replace(/"/g, ''); // Removes any quotes
		}

		if (!userToken) throw new Error('User is not authenticated');

		// Configure the authorization header with the user's token
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		};

		// Make the API call to update the user profile
		const { data } = await axios.put<UserProfileResponse>(
			`${import.meta.env.VITE_API_URL}/profile`,
			user,
			config
		);

		// Optionally, update the userInfo in the cookies or state if needed
		Cookies.set('userInfo', JSON.stringify(data.user));

		return data;
	} catch (error) {
		// Handle Axios errors with explicit typing
		if (axios.isAxiosError(error) && error.response) {
			const errorMessage = (error.response.data as ErrorResponse).message;
			return rejectWithValue(errorMessage);
		} else {
			return rejectWithValue('An unexpected error occurred');
		}
	}
});
