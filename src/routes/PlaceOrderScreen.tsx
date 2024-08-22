import React, { useEffect } from 'react';
import { Box, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout'; // Import the Layout component

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

const PlaceOrderScreen: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const sessionId = new URLSearchParams(location.search).get('sessionId');
	const clientSecret = location.state?.clientSecret;

	useEffect(() => {
		if (!sessionId || !clientSecret) {
			toast.error('Missing sessionId or clientSecret.');
			navigate('/cart');
		}
	}, [sessionId, clientSecret, navigate]);

	return (
		<Layout title="Checkout">
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
					<Grid
						item
						md={12}
						sm={12}
						xs={12}
						sx={{
							width: {
								md: '100%',
								xs: '100%',
								borderRadius: 12,
							},
							border: 'solid black 1px',
							p: 1,
						}}
						m={'auto'}>
						<Typography sx={{ p: 1, fontSize: '1.3rem' }}>Ordered Items:</Typography>
						<Divider sx={{ mb: 1, justifySelf: 'center' }} />
						<EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
							<EmbeddedCheckout />
						</EmbeddedCheckoutProvider>
					</Grid>
				</Box>
			)}
		</Layout>
	);
};

export default PlaceOrderScreen;
