import { Button, CircularProgress, Divider, Grid, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CheckoutWizard from '../../components/CheckoutWizard';
import { getError } from '../../utils/error';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { createOrder } from '../../store/actions/createOrder';
import { payOrder } from '../../store/actions/payOrder';
import { cartClear } from '../../store/slices/cartSlice';
import { reset } from '../../store/slices/orderSlice';
import { Helmet } from 'react-helmet-async';
import { PayPalButton } from 'react-paypal-button-v2';
import Cookies from 'js-cookie';
import { CartItem } from '../../store/slices/cartSlice';

const PlaceOrderScreen: React.FC = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [sdkReady, setSdkReady] = useState(false);
	const dispatch = useDispatch<AppDispatch>();

	const { userInfo } = useSelector((state: RootState) => state.userInfo);
	const { cartItems = [] } = useSelector((state: RootState) => state.cart || {});
	const { shippingAddress } = useSelector((state: RootState) => state.payment.cart);

	const paymentMethod = Cookies.get('paymentMethod');

	// Cart Totals
	const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
	const shippingPrice = itemsPrice > 200 ? 0 : 15;
	const taxPrice = itemsPrice * 0.15;
	const totalPrice = itemsPrice + shippingPrice + taxPrice;

	useEffect(() => {
		if (cartItems.length === 0) {
			navigate('/cart');
		}
		if (!paymentMethod) {
			navigate('/payment');
		}
	}, [cartItems, paymentMethod, navigate]);

	useEffect(() => {
		// Load PayPal script
		const addPayPalScript = async () => {
			const clientId = `${import.meta.env.VITE_PAYPAL_CLIENT_ID}`;
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => setSdkReady(true);
			document.body.appendChild(script);
		};

		if (!window.paypal) {
			addPayPalScript();
		} else {
			setSdkReady(true);
		}
	}, []);

	const placeOrderHandler = async () => {
		try {
			setLoading(true);
			const order = await dispatch(
				createOrder({
					orderItems: cartItems,
					shippingAddress,
					paymentMethod: paymentMethod || '',
					itemsPrice,
					shippingPrice,
					taxPrice,
					totalPrice,
					user: userInfo,
				})
			).unwrap();
			navigate(`/order/${order._id}`);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast(getError(error));
		}
	};

	const successPaymentHandler = async (paymentResult: any) => {
		try {
			setLoading(true);
			await dispatch(payOrder({ orderId: order._id, paymentResult })).unwrap();
			dispatch(cartClear({}));
			dispatch(reset());
			navigate(`/order/${order._id}`);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast(getError(error));
		}
	};

	return (
		<>
			{loading && <CircularProgress />}
			<Box
				maxWidth="lg"
				sx={{
					p: 2,
					m: 'auto',
					mt: 10,
					ml: 'auto',
					mr: 'auto',
					backgroundColor: '#fffcf7',
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
				}}>
				<Helmet>
					<title>Place Order - Atalanta A.C.</title>
				</Helmet>
				<Box mt={10}>
					<CheckoutWizard activeStep={3} />
				</Box>

				{/* Shipping Address */}
				<Grid
					item
					md={12}
					sm={12}
					xs={12}
					sx={{ width: { md: '90%', xs: '100%' } }}
					m={'auto'}>
					<Typography sx={{ mt: 4 }}>Shipping Address</Typography>
					<Divider sx={{ mb: 1, justifySelf: 'center' }} />
					<List>
						<ListItem>
							<Typography>Shipping Address:</Typography>
						</ListItem>
						<ListItem sx={{ whiteSpace: 'pre-line' }}>
							{`${shippingAddress?.firstName} ${shippingAddress?.lastName}
						${shippingAddress?.address} 
						${shippingAddress?.city} ${shippingAddress?.state}
						${shippingAddress?.postalCode} 
						${shippingAddress?.country}`}
						</ListItem>
						<ListItem>
							<Button
								fullWidth
								type="button"
								onClick={() => navigate('/shipping')}
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Edit
							</Button>
						</ListItem>
					</List>
				</Grid>

				{/* Payment Method */}
				<Grid
					item
					md={12}
					sm={12}
					xs={12}
					sx={{ width: { md: '90%', xs: '100%' } }}
					m={'auto'}>
					<Divider sx={{ mb: 1, justifySelf: 'center' }} />
					<List>
						<ListItem>
							<Typography>Payment Method:</Typography>
						</ListItem>
						<ListItem sx={{ whiteSpace: 'pre-line' }}>{paymentMethod}</ListItem>
						<ListItem>
							<Button
								fullWidth
								type="button"
								onClick={() => navigate('/payment')}
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Edit
							</Button>
						</ListItem>
					</List>
				</Grid>

				{/* Ordered Items */}
				<Grid
					item
					md={12}
					sm={12}
					xs={12}
					sx={{ width: { md: '90%', xs: '100%' } }}
					m={'auto'}>
					<Divider sx={{ mb: 1, justifySelf: 'center' }} />
					<List>
						<ListItem>
							<Typography>Ordered Items:</Typography>
						</ListItem>

						<Grid container>
							{cartItems.map((item: CartItem) => (
								<Grid
									item
									md={4}
									sm={12}
									xs={12}
									key={item?._key}
									display={'flex'}
									sx={{ cursor: 'pointer' }}
									mb={2}>
									<Link to={item?.path}>
										<Box>
											<img
												src={item?.image}
												width={180}
												height={180}
												alt={item?.name}
											/>
										</Box>
									</Link>

									<Box ml={2.5} width={'60%'}>
										<Typography variant="body1" gutterBottom>
											<q>{item?.name}</q>
										</Typography>
										<Typography variant="body2">
											Size: {item?.selectedSize}
										</Typography>
										<Typography variant="body2">
											Quantity: {item?.quantity}
										</Typography>
										<Typography variant="body2">
											Price: {`$${item?.price}`}
										</Typography>
										<Typography variant="body2">Color: Black</Typography>
									</Box>
								</Grid>
							))}
						</Grid>

						<ListItem>
							<Button
								fullWidth
								type="button"
								onClick={() => navigate('/cart')}
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Edit
							</Button>
						</ListItem>

						{/* Place Order */}
						<ListItem>
							<Button
								fullWidth
								type="submit"
								disabled={loading}
								onClick={placeOrderHandler}
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Place Order
							</Button>
						</ListItem>

						{/* PayPal Button */}
						{!sdkReady ? (
							<ListItem>
								<CircularProgress />
							</ListItem>
						) : (
							<ListItem>
								<PayPalButton
									amount={totalPrice}
									onSuccess={successPaymentHandler}
									onError={(err) => toast(getError(err))}
								/>
							</ListItem>
						)}

						{loading && (
							<ListItem>
								<CircularProgress />
							</ListItem>
						)}
					</List>
				</Grid>
			</Box>
		</>
	);
};

export default PlaceOrderScreen;
