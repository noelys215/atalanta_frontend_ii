import React from 'react';
import { Button, Divider, FormControl, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout';

interface ForgotPasswordProps {
	email: string;
}

const ForgotPasswordScreen: React.FC = () => {
	const {
		handleSubmit,
		control,
		formState: { errors, isValid },
	} = useForm<ForgotPasswordProps>({
		mode: 'onChange',
		defaultValues: {
			email: '',
		},
	});

	const submitHandler = async (data: ForgotPasswordProps) => {
		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URL}/forgot-password`, {
				email: data.email,
			});

			if (response.status === 200) {
				toast.success('Password reset email sent.');
			}
		} catch {
			toast.error('User not found or error sending email.');
		}
	};

	return (
		<Layout title="Forgot Password">
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
						Forgot Password
					</Typography>

					<FormControl fullWidth>
						<form onSubmit={handleSubmit(submitHandler)}>
							<Typography sx={{ mt: 4 }}>Please enter your email</Typography>
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

							<Button
								type="submit"
								disabled={!isValid}
								variant="contained"
								sx={{
									width: '100%',
									backgroundColor: 'rgb(68, 68, 68)',
									mt: 4,
								}}>
								Reset Password
							</Button>
						</form>
					</FormControl>
				</Grid>
			</Box>
		</Layout>
	);
};

export default ForgotPasswordScreen;
