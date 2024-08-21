import { Button, Divider, FormControl, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

interface SearchProps {
	email: string;
	order_id: string;
}

const OrderSearchScreen: React.FC = () => {
	const navigate = useNavigate();

	const {
		handleSubmit,
		control,
		formState: { errors, isValid },
	} = useForm<SearchProps>({
		mode: 'onChange', // Ensures validation is triggered on each change
	});

	const submitHandler = async (data: SearchProps) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/stripe/order-by-email-and-id`,
				{
					email: data.email,
					order_id: data.order_id,
				}
			);

			if (response.data) {
				// Pass the short_order_id into the query string for fetching details
				navigate(`/return?session_id=${response.data.short_order_id}`);
			}
		} catch {
			toast.error('Order not found. Please check your details and try again.');
		}
	};

	return (
		<Box mb={'auto'} display="flex" justifyContent="center" alignItems="flex-start" mt={8}>
			<Grid
				container
				maxWidth="sm"
				sx={{
					backgroundColor: '#fffcf7',
					padding: 5,
					borderRadius: 2,
					boxShadow: '0 0 10px rgba(0,0,0,0.1)',
				}}>
				<Typography variant="h5" gutterBottom align="center" width="100%">
					Search Your Order
				</Typography>

				<FormControl fullWidth>
					<form onSubmit={handleSubmit(submitHandler)}>
						<Typography sx={{ mt: 4 }}>Search Order</Typography>
						<Divider sx={{ mb: 4, justifySelf: 'center' }} />

						{/* Email */}
						<Controller
							name="email"
							control={control}
							rules={{
								required: true,
								pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
							}}
							render={({ field }) => (
								<TextField
									sx={{ mb: 2.5, width: '100%' }}
									required
									id="email"
									label="Email"
									inputProps={{ type: 'email' }}
									error={Boolean(errors.email)}
									helperText={
										errors.email
											? errors.email.type === 'pattern'
												? 'Invalid Email'
												: 'Email Required'
											: ''
									}
									{...field}
								/>
							)}
						/>

						{/* Order ID */}
						<Controller
							name="order_id"
							control={control}
							rules={{
								required: true,
								minLength: 5,
							}}
							render={({ field }) => (
								<TextField
									sx={{ mb: 2.5, width: '100%' }}
									required
									id="order_id"
									label="Order ID"
									inputProps={{ type: 'text' }}
									error={Boolean(errors.order_id)}
									helperText={
										errors.order_id
											? errors.order_id.type === 'minLength'
												? 'Order ID Too Short'
												: 'Order ID Required'
											: ''
									}
									{...field}
								/>
							)}
						/>

						<Button
							type="submit"
							disabled={!isValid}
							variant="contained"
							sx={{
								width: '100%',
								backgroundColor: 'rgb(68, 68, 68)',
								mt: 4,
							}}>
							Search Order
						</Button>
					</form>
				</FormControl>
			</Grid>
		</Box>
	);
};

export default OrderSearchScreen;
