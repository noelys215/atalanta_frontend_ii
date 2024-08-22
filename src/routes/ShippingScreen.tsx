import { useEffect } from 'react';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CheckoutWizard from '../../components/CheckoutWizard';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// Redux Toolkit
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { saveShippingAddress } from '../../store/slices/paymentSlice';
import { ShippingAddress } from '../../store/slices/paymentSlice';
import Layout from '../../components/Layout';

export default function ShippingScreen() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<ShippingAddress>();

	const { userInfo } = useSelector((state: RootState) => state.userInfo);
	const { shippingAddress } = useSelector((state: RootState) => state.payment.cart);

	useEffect(() => {
		// Set form values based on existing shipping address or userInfo
		setValue('firstName', shippingAddress.firstName || userInfo?.first_name || '');
		setValue('lastName', shippingAddress.lastName || userInfo?.last_name || '');
		setValue('country', shippingAddress.country || userInfo?.country || '');
		setValue('address', shippingAddress.address || userInfo?.address || '');
		setValue('addressCont', shippingAddress.addressCont || userInfo?.addressCont || '');
		setValue('state', shippingAddress.state || userInfo?.state || '');
		setValue('city', shippingAddress.city || userInfo?.city || '');
		setValue('postalCode', shippingAddress.postalCode || userInfo?.postal_code || '');
	}, [setValue, userInfo, shippingAddress]);

	const submitHandler = (data: ShippingAddress) => {
		// Save shipping address to the Redux state
		dispatch(saveShippingAddress(data));
		// Navigate to the payment screen
		navigate('/payment');
	};

	return (
		<Layout title="Shipping">
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
				<Box mt={10}>
					<CheckoutWizard activeStep={1} />
				</Box>
				<Grid
					item
					md={12}
					sm={12}
					xs={12}
					sx={{ width: { md: '70%', sm: '90%' } }}
					m={'auto'}>
					<form onSubmit={handleSubmit(submitHandler)}>
						<Typography sx={{ mt: 4 }}>Shipping Address</Typography>
						<Divider sx={{ mb: 4, justifySelf: 'center' }} />

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

							<Controller
								name="postalCode"
								control={control}
								rules={{
									required: true,
									minLength: 2,
									pattern: /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/,
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
							fullWidth
							type="submit"
							variant="contained"
							sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
							Continue to payment
						</Button>
					</form>
				</Grid>
			</Box>
		</Layout>
	);
}
