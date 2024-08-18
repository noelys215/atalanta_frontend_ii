import React, { useEffect } from 'react';
import { Box, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
// import { RootState } from '../../store/store';
import CheckoutWizard from '../../components/CheckoutWizard';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

const PlaceOrderScreen: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	// const { cartItems = [] } = useSelector((state: RootState) => state.cart || {});
	// const { shippingAddress } = useSelector((state: RootState) => state.payment.cart);

	const sessionId = new URLSearchParams(location.search).get('sessionId');
	const clientSecret = location.state?.clientSecret;

	useEffect(() => {
		if (!sessionId || !clientSecret) {
			toast.error('Missing sessionId or clientSecret.');
			navigate('/cart');
		}
	}, [sessionId, clientSecret, navigate]);

	return (
		<>
			{!sessionId || !clientSecret ? (
				<CircularProgress />
			) : (
				<Box
					maxWidth="lg"
					sx={{
						p: 2,
						m: 'auto',
						mt: 10,
						backgroundColor: '#fffcf7',
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
					}}>
					<Helmet>
						<title>Checkout - Atalanta A.C.</title>
					</Helmet>
					<Box mt={10}>
						<CheckoutWizard activeStep={3} />
					</Box>

					<Grid
						item
						md={12}
						sm={12}
						xs={12}
						sx={{ width: { md: '90%', xs: '100%' } }}
						m={'auto'}>
						<Typography sx={{ mt: 4 }}>Ordered Items:</Typography>
						<Divider sx={{ mb: 1, justifySelf: 'center' }} />
						<EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
							<EmbeddedCheckout />
						</EmbeddedCheckoutProvider>
					</Grid>
				</Box>
			)}
		</>
	);
};

export default PlaceOrderScreen;
