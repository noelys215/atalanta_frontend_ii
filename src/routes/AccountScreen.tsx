import React, { useEffect, useState } from 'react';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import { updateUserProfile } from '../../store/actions/updateUserProfile';
import { fetchUserProfile } from '../../store/actions/userActions';
import { RootState, AppDispatch } from '../../store/store';

interface RegisterProps {
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

const AccountScreen: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [edit, setEdit] = useState(false);

	// Access user info from Redux state
	const { userInfo } = useSelector((state: RootState) => state.userInfo);

	// Log userInfo for debugging
	console.log('Current userInfo in component:', userInfo);

	// Mutation for updating user profile
	const mutation = useMutation({
		mutationFn: async (userData: RegisterProps) => {
			return dispatch(updateUserProfile(userData)).unwrap();
		},
		onSuccess: () => {
			toast.success('Profile Successfully Updated');
			setEdit(false);

			// Fetch the latest user profile to ensure state is up-to-date
			dispatch(fetchUserProfile())
				.unwrap()
				.then(() => {
					console.log('User profile successfully refetched');
				})
				.catch((error) => {
					console.error('Failed to refetch user profile:', error);
				});
		},
		onError: (error: unknown) => {
			toast.error('Error during profile update');
			console.error('Error during profile update:', error);
		},
	});

	const { handleSubmit, control, setValue } = useForm<RegisterProps>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			telephone: '',
			country: '',
			address: '',
			addressCont: '',
			state: '',
			city: '',
			postalCode: '',
			password: '',
			confirmPassword: '',
		},
	});

	// Prefill user data on form fields
	useEffect(() => {
		console.log('UserInfo before prefill:', userInfo);

		if (userInfo) {
			setValue('firstName', userInfo.first_name || '');
			setValue('lastName', userInfo.last_name || '');
			setValue('email', userInfo.email || '');
			setValue('telephone', userInfo.telephone || '');
			setValue('country', userInfo.country || '');
			setValue('address', userInfo.address || '');
			setValue('addressCont', userInfo.addressCont || '');
			setValue('state', userInfo.state || '');
			setValue('city', userInfo.city || '');
			setValue('postalCode', userInfo.postal_code || '');
		}

		console.log('Form values after prefill:', {
			firstName: userInfo?.first_name,
			lastName: userInfo?.last_name,
			email: userInfo?.email,
			telephone: userInfo?.telephone,
			country: userInfo?.country,
			address: userInfo?.address,
			addressCont: userInfo?.addressCont,
			state: userInfo?.state,
			city: userInfo?.city,
			postalCode: userInfo?.postal_code,
		});
	}, [userInfo, setValue]);

	const submitHandler = (data: RegisterProps) => {
		console.log('Form data submitted:', data);

		mutation.mutate(data);
	};

	return (
		<Layout title={`${userInfo?.last_name || 'Account'}`}>
			{userInfo ? (
				<Box
					mb={'auto'}
					maxWidth="lg"
					sx={{
						p: 2,
						minHeight: '62.5rem',
						mt: 10,
						ml: 'auto',
						mr: 'auto',
						backgroundColor: '#fffcf7',
						display: 'flex',
						flexDirection: 'column',
					}}>
					<Grid
						item
						md={12}
						sm={12}
						xs={12}
						sx={{ width: { md: '70%', sm: '90%' } }}
						m={'auto'}>
						<form onSubmit={handleSubmit(submitHandler)}>
							<Box display={'flex'} justifyContent="space-between">
								<Typography sx={{ mt: 4 }}>Shipping Address</Typography>
								<Button onClick={() => setEdit(!edit)}>
									<Typography sx={{ mt: 3 }}>Edit</Typography>
								</Button>
							</Box>
							<Divider sx={{ mb: 4, justifySelf: 'center' }} />
							{/* First Name */}
							<Controller
								name="firstName"
								control={control}
								rules={{
									required: true,
									minLength: 1,
								}}
								render={({ field }) => (
									<TextField
										disabled={!edit}
										sx={{ mb: 2.5 }}
										className="register"
										required
										id="firstName"
										label="First Name"
										inputProps={{ type: 'text' }}
										error={Boolean(field.value === '')}
										helperText={field.value === '' ? 'First Name Required' : ''}
										{...field}
									/>
								)}
							/>
							{/* Last Name */}
							<Controller
								name="lastName"
								control={control}
								rules={{
									required: true,
									minLength: 1,
								}}
								render={({ field }) => (
									<TextField
										disabled={!edit}
										sx={{ mb: 2.5 }}
										className="register"
										required
										id="lastName"
										label="Last Name"
										inputProps={{ type: 'text' }}
										error={Boolean(field.value === '')}
										helperText={field.value === '' ? 'Last Name Required' : ''}
										{...field}
									/>
								)}
							/>
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
										disabled={!edit}
										sx={{
											mb: 2.5,
											'& .MuiInput-input': {
												width: 500,
											},
											'& .Mui-focused': {
												width: '500 !important',
											},
											'& .MuiInput-root': {
												width: 500,
											},
										}}
										className="register"
										required
										id="email"
										label="Email"
										inputProps={{ type: 'email' }}
										error={Boolean(field.value === '')}
										helperText={field.value === '' ? 'Email Required' : ''}
										{...field}
									/>
								)}
							/>

							{/* Telephone */}
							<Controller
								name="telephone"
								control={control}
								rules={{
									required: true,
									minLength: 8,
								}}
								render={({ field }) => (
									<TextField
										value={field.value || ''}
										onChange={(e) => {
											const formatted = e.target.value
												.replace(/\D/g, '')
												.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
											field.onChange(formatted);
										}}
										disabled={!edit}
										sx={{ mb: 2.5 }}
										className="register"
										required
										id="telephone"
										label="Phone"
										inputProps={{ type: 'tel' }}
										error={Boolean(field.value === '')}
										helperText={field.value === '' ? 'Telephone Required' : ''}
									/>
								)}
							/>
							{/* Country */}
							<Controller
								name="country"
								control={control}
								rules={{
									required: true,
									minLength: 1,
								}}
								render={({ field }) => (
									<TextField
										disabled={!edit}
										sx={{ mb: 2.5 }}
										className="register"
										required
										id="country"
										label="Country"
										inputProps={{ type: 'text' }}
										error={Boolean(field.value === '')}
										helperText={field.value === '' ? 'Country Required' : ''}
										{...field}
									/>
								)}
							/>
							{/* Address */}
							<Controller
								name="address"
								control={control}
								rules={{
									required: true,
									minLength: 1,
								}}
								render={({ field }) => (
									<TextField
										disabled={!edit}
										sx={{ mb: 2.5 }}
										className="register"
										required
										id="address"
										label="Address"
										inputProps={{ type: 'text' }}
										helperText={field.value === '' ? 'Address' : ''}
										{...field}
									/>
								)}
							/>
							{/* Address Cont */}
							<Controller
								name="addressCont"
								control={control}
								render={({ field }) => (
									<TextField
										disabled={!edit}
										sx={{ mb: 2.5 }}
										id="addressCont"
										label="Address Cont.."
										className="register"
										inputProps={{ type: 'text' }}
										{...field}
									/>
								)}
							/>
							{/* State */}
							<Controller
								name="state"
								control={control}
								rules={{
									required: true,
									minLength: 2,
								}}
								render={({ field }) => (
									<TextField
										disabled={!edit}
										sx={{ mb: 2.5 }}
										className="register"
										required
										id="state"
										label="State"
										inputProps={{ type: 'text' }}
										error={Boolean(field.value === '')}
										helperText={field.value === '' ? 'State Required' : ''}
										{...field}
									/>
								)}
							/>
							<Box className="register" display={'flex'} gap={2.5}>
								{/* City */}
								<Controller
									name="city"
									control={control}
									rules={{
										required: true,
										minLength: 2,
									}}
									render={({ field }) => (
										<TextField
											disabled={!edit}
											sx={{ mb: 2.5 }}
											className="register"
											required
											id="city"
											label="City"
											inputProps={{ type: 'text' }}
											error={Boolean(field.value === '')}
											helperText={field.value === '' ? 'City Required' : ''}
											{...field}
										/>
									)}
								/>
								{/* Zip Code */}
								<Controller
									name="postalCode"
									control={control}
									rules={{
										minLength: 2,
										pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
									}}
									render={({ field }) => (
										<TextField
											disabled={!edit}
											sx={{ mb: 2.5 }}
											className="register"
											required
											id="postalCode"
											label="Postal Code"
											inputProps={{ type: 'text' }}
											error={Boolean(field.value === '')}
											helperText={
												field.value === '' ? 'Postal Code Required' : ''
											}
											{...field}
										/>
									)}
								/>
							</Box>
							<Button
								disabled={!edit}
								fullWidth
								type="submit"
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Update
							</Button>
						</form>
					</Grid>
				</Box>
			) : (
				<Typography>Loading user data...</Typography>
			)}
		</Layout>
	);
};

export default AccountScreen;
