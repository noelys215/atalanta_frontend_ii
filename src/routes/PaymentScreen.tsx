import {
	Button,
	Divider,
	FormControl,
	FormControlLabel,
	Grid,
	List,
	ListItem,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, FormEvent } from 'react';
import toast from 'react-hot-toast';
import CheckoutWizard from '../../components/CheckoutWizard';
// Redux Toolkit
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { savePaymentMethod } from '../../store/slices/paymentSlice';

const PaymentScreen: React.FC = () => {
	const [paymentMethod, setPaymentMethod] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { shippingAddress } = useSelector((state: RootState) => state.payment.cart);

	useEffect(() => {
		if (!shippingAddress) {
			navigate('/shipping');
		} else {
			setPaymentMethod(Cookies.get('paymentMethod') || '');
		}
	}, [navigate, shippingAddress]);

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (!paymentMethod) {
			toast('Payment method is required');
		} else {
			// Save payment method to Redux state and cookie
			dispatch(savePaymentMethod(paymentMethod));
			Cookies.set('paymentMethod', paymentMethod);
			navigate('/placeorder');
		}
	};

	return (
		<Box
			maxWidth="lg"
			sx={{
				p: 2,
				minHeight: '43.75rem',
				m: 'auto',
				mt: 10,
				ml: 'auto',
				mr: 'auto',
				backgroundColor: '#fffcf7',
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
			}}>
			<CheckoutWizard activeStep={2} />

			<Grid item md={12} sm={12} xs={12} sx={{ width: { md: '70%', xs: '100%' } }} m={'auto'}>
				<Typography sx={{ mt: 4 }}>Payment Method</Typography>
				<Divider sx={{ mb: 4, justifySelf: 'center' }} />
				<form onSubmit={submitHandler}>
					<List>
						<ListItem>
							<FormControl component="fieldset">
								<RadioGroup
									aria-label="Payment Method"
									name="paymentMethod"
									value={paymentMethod}
									onChange={(e) => setPaymentMethod(e.target.value)}>
									<FormControlLabel
										label="PayPal"
										value="PayPal"
										control={<Radio />}
									/>
									<FormControlLabel
										label="Stripe"
										value="Stripe"
										control={<Radio />}
									/>
								</RadioGroup>
							</FormControl>
						</ListItem>
						<ListItem>
							<Button
								fullWidth
								type="submit"
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Continue
							</Button>
						</ListItem>
						<ListItem>
							<Button
								fullWidth
								onClick={() => navigate('/shipping')}
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Go Back
							</Button>
						</ListItem>
					</List>
				</form>
			</Grid>
		</Box>
	);
};

export default PaymentScreen;
