import {
	Chip,
	Divider,
	Drawer,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Link from '../src/Link';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
//Redux Toolkit
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { loginUser } from '../store/actions/loginAction';
import { logoutUser } from '../store/slices/userSlice';
import { reset } from '../store/slices/userSlice';
import { cartClear } from '../store/slices/cartSlice';

interface AccountProps {
	email?: string[];
	password?: string[];
	firstName?: string;
	lastName?: string;
}

const AccountDrawer = () => {
	const router = useRouter();
	const [openDrawer, setOpenDrawer] = useState(false);

	const [values, setValues] = React.useState({
		amount: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	});

	// Toolkit
	const dispatch = useDispatch<AppDispatch>();
	const { userInfo } = useSelector((state: RootState) => state.userInfo);

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ email, password }: AccountProps) => {
		try {
			if (userInfo) {
				return;
			} else {
				dispatch(loginUser({ email, password }));
			}
		} catch (error: any) {
			toast(error.message);
		}
	};

	// const handleChange = (prop: string) => (event: any) => {
	// 	setValues({ ...values, [prop]: event.target.value });
	// };

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event: any) => {
		event.preventDefault();
	};

	const signInHandler = () => {
		handleSubmit(submitHandler);
		setOpenDrawer(false);
	};

	const signOutHandler = () => {
		dispatch(logoutUser({}));
		setOpenDrawer(false);
		reset({});
		cartClear({});
		if (router.asPath !== '/') {
			router.push('/');
		}
	};

	return (
		<>
			<Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={() => setOpenDrawer(true)}>
				<PersonOutlineTwoToneIcon sx={{ mr: 1 }} />
				<Typography sx={{ display: { xs: 'none', md: 'flex' } }}>
					{userInfo ? userInfo.firstName : 'Account'}
				</Typography>
			</Box>

			<Drawer
				anchor="right"
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				PaperProps={{
					sx: {
						width: {
							xs: '100%', // theme.breakpoints.up('xs')
							sm: '100%', // theme.breakpoints.up('sm')
							md: 510, // theme.breakpoints.up('md')
							// lg: 400, // theme.breakpoints.up('lg')
							// xl: 500, // theme.breakpoints.up('xl')
						},
					},
				}}>
				<Box
					p={2}
					textAlign="center"
					role="presentation"
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 2,
					}}>
					<CloseIcon sx={{ cursor: 'pointer' }} onClick={() => setOpenDrawer(false)} />
					<Typography variant="h4" component="div">
						Account
					</Typography>
				</Box>
				{/* Form */}
				{userInfo === null ? (
					<form onSubmit={handleSubmit(submitHandler)}>
						<Box
							display={'flex'}
							flexDirection={'column'}
							width={'90%'}
							pl={'10%'}
							gap={1}>
							{/* Email */}
							<Controller
								name="email"
								defaultValue=""
								control={control}
								rules={{
									required: true,
									pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
								}}
								render={({ field }) => (
									<TextField
										disabled={userInfo !== null}
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
								defaultValue=""
								rules={{
									required: true,
									minLength: 6,
								}}
								render={({ field }) => (
									<TextField
										disabled={userInfo !== null}
										required
										id="password"
										label="Password"
										type={values.showPassword ? 'text' : 'password'}
										autoComplete="current-password"
										// onChange={handleChange('password')}
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

							<Link href={'/'}>
								<Typography textAlign={'center'}>Forgot your password?</Typography>
							</Link>

							<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
								<Button
									type="submit"
									onClick={signInHandler}
									variant="contained"
									sx={{ width: '75%', backgroundColor: 'rgb(68, 68, 68)' }}>
									Sign In
								</Button>
							</Box>
							<Divider sx={{ alignItems: 'flex-start', m: 2 }}>
								<Chip variant="outlined" label="Or" />
							</Divider>

							<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
								<Button
									onClick={() => {
										router.push('/register');
										setOpenDrawer(false);
									}}
									variant="contained"
									sx={{ width: '75%', backgroundColor: 'rgb(68, 68, 68)' }}>
									Create Account
								</Button>
							</Box>
							<Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{`
						With your Atalanta account, you will be able to:
						
						• Access your shopping cart
						• Save your billing and delivery information to order faster
						• Manage your address book
						• Access all your orders
						• Update your personal data
						
						`}</Typography>
						</Box>
					</form>
				) : (
					<>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Typography variant="h5" gutterBottom>
								{userInfo.firstName} {userInfo.lastName}
							</Typography>
						</Box>
						<Box
							sx={{
								marginLeft: 'auto',
								marginRight: 'auto',
								mb: 2,
							}}>
							<Link
								underline="hover"
								href={'/account'}
								onClick={() => setOpenDrawer(false)}>
								<Typography variant="h6" gutterBottom>
									<SettingsTwoToneIcon
										sx={{ verticalAlign: 'middle', fontSize: 'inherit' }}
									/>{' '}
									Account Information
								</Typography>
							</Link>

							{userInfo.isAdmin ? (
								<Link
									underline="hover"
									href={'/admin/orders'}
									onClick={() => setOpenDrawer(false)}>
									<Typography variant="h6" gutterBottom>
										<Inventory2TwoToneIcon
											sx={{ verticalAlign: 'middle', fontSize: 'inherit' }}
										/>{' '}
										Order List
									</Typography>
								</Link>
							) : (
								<Link
									underline="hover"
									href={'/order-history'}
									onClick={() => setOpenDrawer(false)}>
									<Typography variant="h6" gutterBottom>
										<Inventory2TwoToneIcon
											sx={{ verticalAlign: 'middle', fontSize: 'inherit' }}
										/>{' '}
										Order History
									</Typography>
								</Link>
							)}

							{userInfo.isAdmin && (
								<Link
									underline="hover"
									href={'/admin/user-list'}
									onClick={() => setOpenDrawer(false)}>
									<Typography variant="h6" gutterBottom>
										<ManageAccountsTwoToneIcon
											sx={{ verticalAlign: 'middle', fontSize: 'inherit' }}
										/>{' '}
										User List
									</Typography>
								</Link>
							)}

							{userInfo.isAdmin && (
								<Link
									underline="hover"
									href={'/admin/product-list'}
									onClick={() => setOpenDrawer(false)}>
									<Typography variant="h6" gutterBottom>
										<InventoryTwoToneIcon
											sx={{ verticalAlign: 'middle', fontSize: 'inherit' }}
										/>{' '}
										Product Management
									</Typography>
								</Link>
							)}
						</Box>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Button
								onClick={signOutHandler}
								variant="contained"
								sx={{ width: '75%', backgroundColor: 'rgb(68, 68, 68)', mb: 5 }}>
								Sign Out
							</Button>
						</Box>
						<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
							<Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
								{`
						Customer Service

						`}
								Call <Link href={'tel:800-825-5033'}>800-825-5033</Link>
								{`	
						Monday to Friday: 9am - 6pm EST
						Saturday: 10am - 6pm EST
						Send us an email
						
						`}
							</Typography>
						</Box>
					</>
				)}
			</Drawer>
		</>
	);
};

export default AccountDrawer;
