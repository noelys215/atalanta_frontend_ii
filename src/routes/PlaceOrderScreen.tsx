import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Divider, Grid, Typography, Modal, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout'; // Import the Layout component

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

const PlaceOrderScreen: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [open, setOpen] = useState(true);

	const sessionId = new URLSearchParams(location.search).get('sessionId');
	const clientSecret = location.state?.clientSecret;

	useEffect(() => {
		if (!sessionId || !clientSecret) {
			toast.error('Missing sessionId or clientSecret.');
			navigate('/cart');
		}
	}, [sessionId, clientSecret, navigate]);

	const handleClose = () => setOpen(false);

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

					{/* Modal for Dummy Credit Card Details */}
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-title"
						aria-describedby="modal-description">
						<Box
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								width: 400,
								bgcolor: 'background.paper',
								boxShadow: 24,
								p: 4,
								borderRadius: 2,
							}}>
							<Typography id="modal-title" variant="h6" component="h2" gutterBottom>
								Test Card Details
							</Typography>
							<Divider sx={{ mb: 2 }} />
							<Typography id="modal-description" sx={{ mb: 2 }}>
								Please use the following dummy credit card details for testing:
							</Typography>
							<Typography sx={{ mb: 1 }}>
								<strong>Credit Card Number:</strong> 4242 4242 4242 4242
							</Typography>
							<Typography sx={{ mb: 1 }}>
								<strong>Expiry Date:</strong> Any future date
							</Typography>
							<Typography sx={{ mb: 2 }}>
								<strong>CVC:</strong> Any three digits
							</Typography>
							<Button
								onClick={handleClose}
								variant="contained"
								sx={{ width: '100%' }}>
								Got it!
							</Button>
						</Box>
					</Modal>
				</Box>
			)}
		</Layout>
	);
};

export default PlaceOrderScreen;
