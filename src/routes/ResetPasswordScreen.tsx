import React, { useEffect, useState } from 'react';
import {
	Button,
	Divider,
	FormControl,
	Grid,
	TextField,
	Typography,
	IconButton,
	InputAdornment,
} from '@mui/material';
import { Box } from '@mui/system';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import Layout from '../../components/Layout';

interface ResetPasswordProps {
	token: string;
	email: string;
	password: string;
	password_confirmation: string;
}

const ResetPasswordScreen: React.FC = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		handleSubmit,
		control,
		formState: { errors, isValid },
		setValue,
		watch,
	} = useForm<ResetPasswordProps>({
		mode: 'onChange', // Ensures validation is triggered on each change
		defaultValues: {
			token: '',
			email: '',
			password: '',
			password_confirmation: '',
		},
	});

	// Set the token value from the URL in the form state
	useEffect(() => {
		if (token) {
			setValue('token', token);
		}
	}, [token, setValue]);

	// Get password and confirmation password values for comparison
	const password = watch('password');
	// const password_confirmation = watch('password_confirmation');

	const submitHandler = async (data: ResetPasswordProps) => {
		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URL}/reset-password`, {
				token: data.token,
				email: data.email,
				password: data.password,
				password_confirmation: data.password_confirmation,
			});

			if (response.status === 200) {
				toast.success('Password reset successfully.');
			}
		} catch {
			toast.error('Failed to reset password. Please try again.');
		}
	};

	const handleClickShowPassword = () => setShowPassword((prev) => !prev);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<Layout title="Reset Password">
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
						Reset Password
					</Typography>

					<FormControl fullWidth>
						<form onSubmit={handleSubmit(submitHandler)}>
							<Typography sx={{ mt: 4 }}>Enter your new password</Typography>
							<Divider sx={{ mb: 4, justifySelf: 'center' }} />

							{/* Token (hidden field) */}
							<Controller
								name="token"
								control={control}
								defaultValue={token || ''}
								rules={{ required: true }}
								render={({ field }) => <input type="hidden" {...field} />}
							/>

							{/* Email */}
							<Controller
								name="email"
								control={control}
								rules={{
									required: 'Email is required',
									pattern: {
										value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
										message: 'Invalid email address',
									},
								}}
								render={({ field }) => (
									<TextField
										sx={{ mb: 2.5, width: '100%' }}
										required
										id="email"
										label="Email"
										inputProps={{ type: 'email' }}
										error={Boolean(errors.email)}
										helperText={errors.email?.message}
										{...field}
									/>
								)}
							/>

							{/* Password */}
							<Controller
								name="password"
								control={control}
								rules={{
									required: 'Password is required',
									minLength: {
										value: 6,
										message: 'Password must be at least 6 characters',
									},
								}}
								render={({ field }) => (
									<TextField
										sx={{ mb: 2.5, width: '100%' }}
										required
										id="password"
										label="New Password"
										type={showPassword ? 'text' : 'password'}
										error={Boolean(errors.password)}
										helperText={errors.password?.message}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}>
														{showPassword ? (
															<Visibility />
														) : (
															<VisibilityOff />
														)}
													</IconButton>
												</InputAdornment>
											),
										}}
										{...field}
									/>
								)}
							/>

							{/* Confirm Password */}
							<Controller
								name="password_confirmation"
								control={control}
								rules={{
									required: 'Please confirm your password',
									validate: (value) =>
										value === password || 'Passwords do not match',
								}}
								render={({ field }) => (
									<TextField
										sx={{ mb: 2.5, width: '100%' }}
										required
										id="password_confirmation"
										label="Confirm New Password"
										type={showConfirmPassword ? 'text' : 'password'}
										error={Boolean(errors.password_confirmation)}
										helperText={errors.password_confirmation?.message}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowConfirmPassword}
														onMouseDown={handleMouseDownPassword}>
														{showConfirmPassword ? (
															<Visibility />
														) : (
															<VisibilityOff />
														)}
													</IconButton>
												</InputAdornment>
											),
										}}
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

export default ResetPasswordScreen;
