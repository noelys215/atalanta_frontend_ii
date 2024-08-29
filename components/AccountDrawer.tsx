import {
	Chip,
	Divider,
	Drawer,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	Button,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import HistoryTwoToneIcon from '@mui/icons-material/HistoryTwoTone';
import ContentPasteSearchTwoToneIcon from '@mui/icons-material/ContentPasteSearchTwoTone';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

// Redux Toolkit
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/loginAction';
import { logoutUser, reset } from '../store/slices/userSlice';
import { cartClear } from '../store/slices/cartSlice';
import { RootState } from '../store/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

interface LoginFormInputs {
	email: string;
	password: string;
}

const AccountDrawer = () => {
	const navigate = useNavigate();
	const [openDrawer, setOpenDrawer] = useState(false);

	const [values, setValues] = useState({
		password: '',
		showPassword: false,
	});

	// Toolkit
	const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
	const { userInfo } = useSelector((state: RootState) => state.userInfo);

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<LoginFormInputs>();

	const submitHandler: SubmitHandler<LoginFormInputs> = async ({ email, password }) => {
		try {
			if (userInfo) {
				return;
			} else {
				await dispatch(loginUser({ email, password }));
			}
		} catch (error) {
			console.error(error);
			toast('Login Failed');
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

	const signInHandler = async () => {
		try {
			await handleSubmit(submitHandler)();

			if (userInfo) {
				setOpenDrawer(false);
				navigate('/account');
			} else {
				toast.error('Login Failed: Invalid credentials');
			}
		} catch (error) {
			console.error('Sign-in error:', error);
			toast.error('Sign-in failed');
		}
	};

	const signOutHandler = () => {
		dispatch(logoutUser());
		dispatch(reset());
		dispatch(cartClear());
		setOpenDrawer(false);
		if (window.location.pathname !== '/') {
			navigate('/');
		}
	};

	return (
		<>
			<Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={() => setOpenDrawer(true)}>
				<PersonOutlineTwoToneIcon sx={{ mr: 1 }} />
				<Typography sx={{ display: { xs: 'none', md: 'flex' } }}>
					{userInfo ? userInfo.first_name : 'Account'}
				</Typography>
			</Box>

			<Drawer
				anchor="right"
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				PaperProps={{
					sx: {
						width: {
							xs: '100%',
							sm: '100%',
							md: 510,
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
					<Typography variant="h4" component="div">
						Account
					</Typography>
					<CloseIcon sx={{ cursor: 'pointer' }} onClick={() => setOpenDrawer(false)} />
				</Box>

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

							<Link to="/forgot-password" onClick={() => setOpenDrawer(false)}>
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
										navigate('/register');
										setOpenDrawer(false);
									}}
									variant="contained"
									sx={{ width: '75%', backgroundColor: 'rgb(68, 68, 68)' }}>
									Create Account
								</Button>
							</Box>

							<Divider sx={{ alignItems: 'flex-start', m: 2 }}></Divider>

							<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
								<Link to="/ordersearch" onClick={() => setOpenDrawer(false)}>
									<Typography variant="h6" gutterBottom>
										<ContentPasteSearchTwoToneIcon
											sx={{ verticalAlign: 'middle', fontSize: 'inherit' }}
										/>{' '}
										Search Orders
									</Typography>
								</Link>
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
								{userInfo.first_name} {userInfo.last_name}
							</Typography>
						</Box>
						<Box
							sx={{
								marginLeft: 'auto',
								marginRight: 'auto',
								mb: 2,
							}}>
							<Link to="/account" onClick={() => setOpenDrawer(false)}>
								<Typography variant="h6" gutterBottom>
									<SettingsTwoToneIcon
										sx={{ verticalAlign: 'middle', fontSize: 'inherit' }}
									/>{' '}
									Account Information
								</Typography>
							</Link>
							{/* New Order History Link */}
							<Link to="/orderhistory" onClick={() => setOpenDrawer(false)}>
								<Typography variant="h6" gutterBottom>
									<HistoryTwoToneIcon
										sx={{ verticalAlign: 'middle', fontSize: 'inherit' }}
									/>{' '}
									Order History
								</Typography>
							</Link>
							{/* New Order Search Link */}
							<Link to="/ordersearch" onClick={() => setOpenDrawer(false)}>
								<Typography variant="h6" gutterBottom>
									<ContentPasteSearchTwoToneIcon
										sx={{ verticalAlign: 'middle', fontSize: 'inherit' }}
									/>{' '}
									Search Orders
								</Typography>
							</Link>
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
								Call <a href="tel:800-825-5033">800-825-5033</a>
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
