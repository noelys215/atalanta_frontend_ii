import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Button,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm, Controller } from 'react-hook-form';
import jsCookie from 'js-cookie';
import { getError } from '../../utils/error';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { registerUser } from '../../store/actions/userActions';

interface RegisterProps {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	telephone: string;
	country: string;
	address: string;
	addressCont: string;
	state: string;
	city: string;
	postalCode: string;
}

const RegisterScreen: React.FC = () => {
	// Toolkit
	const dispatch = useDispatch<AppDispatch>();
	const { userInfo } = useSelector((state: RootState) => state.userInfo);

	useEffect(() => {
		if (userInfo) {
			// Optionally handle user info here if needed
		}
	}, [userInfo]);

	const {
		handleSubmit,
		control,
		formState: { errors, isValid },
		reset, // Add this line
	} = useForm<RegisterProps>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			telephone: '',
			country: '',
			address: '',
			addressCont: '',
			state: '',
			city: '',
			postalCode: '',
		},
	});

	const [verified, setVerified] = useState(false);
	const [values, setValues] = useState({ password: '', showPassword: false });
	const [telephone, setTelephone] = useState('');

	const formatPhoneNumber = (value: string) => {
		if (!value) return '';

		const phoneNumber = value.replace(/[^\d]/g, '');
		const phoneNumberLength = phoneNumber.length;

		if (phoneNumberLength < 4) return phoneNumber;
		if (phoneNumberLength < 7) {
			return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
		}

		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(
			6,
			10
		)}`;
	};

	const handleTelephoneChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const formattedPhoneNumber = formatPhoneNumber(event.target.value);
		setTelephone(formattedPhoneNumber);
	};

	const submitHandler = async (data: RegisterProps) => {
		try {
			const payload = { ...data, addressCont: data.addressCont || '' };
			await dispatch(registerUser(payload));
			jsCookie.set('userInfo', JSON.stringify(payload));

			toast.success('Thank you! Please check your email to verify your account.');

			// Clear the form fields
			reset({
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				telephone: '',
				country: '',
				address: '',
				addressCont: '',
				state: '',
				city: '',
				postalCode: '',
			});

			setTelephone(''); // Clear telephone field
			setVerified(false); // Reset the reCAPTCHA
		} catch (error) {
			toast.error(getError(error));
		}
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<Layout title="Register">
			<Box mb={'auto'}>
				<Grid
					container
					maxWidth="lg"
					m="auto"
					sx={{ backgroundColor: '#fffcf7', pl: 5, pt: 5 }}>
					<Typography variant="h5" gutterBottom>
						Create An Account
					</Typography>
				</Grid>

				<Grid
					container
					maxWidth="lg"
					sx={{
						p: 2,
						minHeight: 1000,
						ml: 'auto',
						mr: 'auto',
						backgroundColor: '#fffcf7',
					}}>
					{/* Login Information */}
					<Grid
						item
						md={6}
						sm={12}
						xs={12}
						display={'flex'}
						flexDirection={'column'}
						alignItems={'center'}
						pr={3}
						pl={3}>
						<FormControl fullWidth>
							<form onSubmit={handleSubmit(submitHandler)}>
								<Typography sx={{ mt: 4 }}>Login Information</Typography>
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
										required: true,
										minLength: 6,
									}}
									render={({ field }) => (
										<TextField
											sx={{ mb: 2.5 }}
											className="register"
											required
											id="password"
											label="Password"
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
											helperText={
												errors.password
													? errors.password.type === 'minLength'
														? 'Password Too Short'
														: 'Password Required'
													: ''
											}
											{...field}
										/>
									)}
								/>
								<Typography sx={{ mt: 4 }}>Personal Information</Typography>
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
											value={telephone}
											onChange={(e) => {
												handleTelephoneChange(e);
												field.onChange(e);
											}}
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
							</form>
						</FormControl>
					</Grid>

					{/* Billing Info */}
					<Grid
						item
						md={6}
						sm={12}
						xs={12}
						display={'flex'}
						flexDirection={'column'}
						alignItems={'center'}
						pr={3}
						pl={3}>
						<FormControl fullWidth>
							<form onSubmit={handleSubmit(submitHandler)}>
								<Typography sx={{ mt: 4, ml: 3, mr: 3 }}>
									Billing Information
								</Typography>
								<Divider sx={{ mb: 4, ml: 3, mr: 3, justifySelf: 'center' }} />

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
											sx={{ mb: 2.5 }}
											className="register"
											id="addressCont"
											label="Address Cont.."
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
											required: true,
											minLength: 2,
										}}
										render={({ field }) => (
											<TextField
												sx={{ mb: 2.5 }}
												className="register"
												required
												id="postalCode"
												label="Postal Code"
												inputProps={{ type: 'text' }}
												error={Boolean(errors.postalCode)}
												helperText={
													errors.postalCode
														? errors.postalCode.type === 'minLength'
															? 'Invalid Postal Code'
															: 'Postal Code Required'
														: ''
												}
												{...field}
											/>
										)}
									/>
								</Box>

								<Box
									className="register"
									display={'flex'}
									mb={2.5}
									justifyContent={'center'}>
									<ReCAPTCHA
										badge="inline"
										sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
										onChange={() => setVerified(true)}
									/>
								</Box>

								<Button
									type="submit"
									disabled={!verified || !isValid}
									className="register"
									variant="contained"
									sx={{
										width: '75%',
										backgroundColor: 'rgb(68, 68, 68)',
										mb: 2,
									}}>
									Create Account
								</Button>
							</form>
						</FormControl>
					</Grid>
				</Grid>
			</Box>
		</Layout>
	);
};

export default RegisterScreen;
