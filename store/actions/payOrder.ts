import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../../store/store'; // Adjust the import path based on your project structure

interface PayOrderInput {
	orderId: string;
	paymentResult: object;
}

interface PayOrderResponse {
	id: string;
}

export const payOrder = createAsyncThunk<
	PayOrderResponse,
	PayOrderInput,
	{ state: RootState; rejectValue: string }
>('order/payOrder', async (data: PayOrderInput, { getState, rejectWithValue }) => {
	const { orderId: id, paymentResult } = data;

	try {
		const {
			userInfo: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo?.token}`,
			},
		};

		const response = await axios.put<PayOrderResponse>(
			`${import.meta.env.VITE_API_URL}/orders/${id}/pay`,
			paymentResult,
			config
		);

		return response.data;
	} catch (error: unknown) {
		const axiosError = error as AxiosError<{ message: string }>;
		if (axiosError.response && axiosError.response.data.message) {
			return rejectWithValue(axiosError.response.data.message);
		} else {
			return rejectWithValue(axiosError.message);
		}
	}
});
