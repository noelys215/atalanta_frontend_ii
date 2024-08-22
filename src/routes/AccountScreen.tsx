import React, { useEffect, useState } from 'react';
import {
	Button,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { getError } from '../../utils/error';
import { updateUserProfile } from '../../store/actions/updateUserProfile';
import { RootState, AppDispatch } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/Layout';

interface RegisterProps {
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	confirmPassword?: string;
	telephone: string;
	country: string;
	address: string;
	addressCont?: string;
	state: string;
	city: string;
	postalCode: string;
}

const AccountScreen: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [edit, setEdit] = useState(false);
	const [values, setValues] = useState({ password: '', showPassword: false });

	// Access user info from Redux state
	const { userInfo } = useSelector((state: RootState) => state.userInfo);

	// Wrapper function to update user profile using the dispatch
	const updateUserProfileWrapper = async (userData: RegisterProps) => {
		return dispatch(updateUserProfile(userData)).unwrap();
	};

	// Mutation for updating user profile
	const mutation = useMutation({
		mutationFn: updateUserProfileWrapper,
		onSuccess: () => {
			toast.success('Profile Updated');
			setEdit(false);
		},
		onError: (error: unknown) => {
			toast.error(getError(error));
		},
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<RegisterProps>({
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
	}, [userInfo, setValue]);

	const submitHandler = (data: RegisterProps) => {
		if (data.password && data.password !== data.confirmPassword) {
			toast.error("Passwords don't match");
			return;
		}
		mutation.mutate(data);
	};

	const handleClickShowPassword = () => {
		setValues((prevValues) => ({
			...prevValues,
			showPassword: !prevValues.showPassword,
		}));
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<Layout title={`${userInfo?.last_name || 'Account'}`}>
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
									error={Boolean(errors.firstName)}
									helperText={
										errors.firstName
											? errors.firstName.type === 'minLength'
												? 'Invalid Name'
												: 'First Name Required'
											: ''
									}
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
									error={Boolean(errors.lastName)}
									helperText={
										errors.lastName
											? errors.lastName.type === 'minLength'
												? 'Invalid Name'
												: 'Last Name Required'
											: ''
									}
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
										'& 	.Mui-focused': {
											width: '500 !important',
										},
										'& 	.MuiInput-root': {
											width: 500,
										},
									}}
									className="register"
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
						{/* Password */}
						<Controller
							name="password"
							control={control}
							rules={{
								validate: (value) =>
									value === '' ||
									(value?.length ?? 0) > 5 ||
									'Password Too Short',
							}}
							render={({ field }) => (
								<TextField
									placeholder={'*************'}
									disabled={!edit}
									sx={{ mb: 2.5 }}
									id="password"
									label="Password"
									className="register"
									type={values.showPassword ? 'text' : 'password'}
									autoComplete="current-password"
									error={Boolean(errors.password)}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}>
													{values.showPassword ? (
														<Visibility />
													) : (
														<VisibilityOff />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
									helperText={errors.password ? 'Password Too Short' : ''}
									{...field}
								/>
							)}
						/>
						{/* Confirm Password */}
						<Controller
							name="confirmPassword"
							control={control}
							rules={{
								validate: (value) =>
									value === '' ||
									(value?.length ?? 0) > 5 ||
									'Password length is greater than 5',
							}}
							render={({ field }) => (
								<TextField
									placeholder={'*************'}
									disabled={!edit}
									sx={{ mb: 2.5 }}
									id="confirmPassword"
									label="Confirm Password"
									className="register"
									type={values.showPassword ? 'text' : 'password'}
									autoComplete="current-password"
									error={Boolean(errors.confirmPassword)}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}>
													{values.showPassword ? (
														<Visibility />
													) : (
														<VisibilityOff />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
									helperText={
										errors.confirmPassword
											? 'Password length is greater than 5'
											: ''
									}
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
									error={Boolean(errors.telephone)}
									helperText={
										errors.telephone
											? errors.telephone.type === 'minLength'
												? 'Invalid Telephone'
												: 'Telephone Required'
											: ''
									}
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
									error={Boolean(errors.country)}
									helperText={
										errors.country
											? errors.country.type === 'minLength'
												? 'Invalid Country'
												: 'Country Required'
											: ''
									}
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
									error={Boolean(errors.address)}
									helperText={
										errors.address
											? errors.address.type === 'minLength'
												? 'Invalid Address'
												: 'Address Required'
											: ''
									}
									{...field}
								/>
							)}
						/>
						{/* Address Cont */}
						<Controller
							name="addressCont"
							control={control}
							rules={{
								minLength: 1,
							}}
							render={({ field }) => (
								<TextField
									disabled={!edit}
									sx={{ mb: 2.5 }}
									id="addressCont"
									label="Address Cont.."
									className="register"
									inputProps={{ type: 'text' }}
									error={Boolean(errors.addressCont)}
									helperText={
										errors.addressCont
											? errors.addressCont.type === 'minLength'
												? 'Invalid Address'
												: ''
											: ''
									}
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
									error={Boolean(errors.state)}
									helperText={
										errors.state
											? errors.state.type === 'minLength'
												? 'Invalid State'
												: 'State Required'
											: ''
									}
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
										error={Boolean(errors.city)}
										helperText={
											errors.city
												? errors.city.type === 'minLength'
													? 'Invalid City'
													: 'City Required'
												: ''
										}
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
										error={Boolean(errors.postalCode)}
										helperText={
											errors.postalCode
												? errors.postalCode.type === 'pattern'
													? 'Invalid Postal Code'
													: 'Postal Code Required'
												: ''
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
		</Layout>
	);
};

export default AccountScreen;
