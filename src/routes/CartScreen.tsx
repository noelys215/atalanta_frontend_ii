import React from 'react';
import {
	Box,
	Typography,
	Grid,
	Container,
	Select,
	MenuItem,
	Button,
	Card,
	ListItem,
	List,
	Divider,
} from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CachedIcon from '@mui/icons-material/Cached';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { cartAddItem, CartItem, cartRemoveItem } from '../../store/slices/cartSlice';

const CartScreen: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { cartItems = [] } = useSelector((state: RootState) => state.cart || {});
	const { userInfo } = useSelector((state: RootState) => state.userInfo);

	const createCheckoutSession = async () => {
		try {
			const lineItems = cartItems.map((item) => ({
				price_data: {
					currency: 'usd',
					product_data: {
						name: item.name,
						images: [item.image],
						metadata: {
							slug: item.slug,
							selectedSize: item.selectedSize,
						},
					},
					unit_amount: Math.round(item.price * 100),
				},
				quantity: item.quantity,
			}));

			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/stripe/create-checkout-session`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ line_items: lineItems, user_info: userInfo || null }),
				}
			);

			const data = await response.json();

			const sessionId = data.sessionId;
			const clientSecret = data.clientSecret;

			if (!sessionId || !clientSecret) {
				throw new Error('Session ID or Client Secret not found in response');
			}

			navigate(`/placeorder?sessionId=${sessionId}`, {
				state: { clientSecret },
			});
		} catch (error) {
			console.error('Failed to create checkout session:', error);
			toast.error('Failed to create checkout session. Please try again.');
		}
	};

	return (
		<Container maxWidth="xl" sx={{ mb: 'auto' }}>
			<Typography variant="h6" fontWeight={'bold'} gutterBottom>
				You have {cartItems.reduce((a, c) => a + c.quantity, 0)} items in your cart.
			</Typography>
			{cartItems.length === 0 ? (
				<Box>
					<Typography>
						Cart is Empty. <Link to={'/'}>Go Shopping</Link>
					</Typography>
				</Box>
			) : (
				<Grid container gap={2} sx={{ justifyContent: 'space-between' }}>
					<Grid item md={7} sm={12} xs={12}>
						<Divider />
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
							{cartItems.map((item: CartItem) => (
								<Card
									key={item.slug}
									elevation={0}
									sx={{ display: 'flex', backgroundColor: '#fffcf7' }}>
									<Box>
										<Link to={item.path}>
											<img
												src={item.image}
												width={180}
												height={180}
												alt={item.name}
											/>
										</Link>
									</Box>
									<Box ml={2.5} mb={'auto'} mt={'auto'} width={'60%'}>
										<Typography variant="body1" gutterBottom>
											<q>{item.name}</q>
										</Typography>
										<Typography variant="body2">
											Size: {item.selectedSize}
										</Typography>
										<Typography variant="body2">
											Price: {`$${item.price}`}
										</Typography>
										<Typography variant="body2">Color: Black</Typography>

										<Box
											sx={{
												display: 'flex',
												flexDirection: 'row',
												alignItems: 'center',
												gap: 1,
												mt: 2.5,
											}}>
											<Select
												value={item?.quantity}
												onChange={(e) => {
													if (
														item &&
														item.selectedSize &&
														item.countInStock
													) {
														dispatch(
															cartAddItem({
																...item,
																quantity: Number(e.target.value),
															})
														);
													}
												}}>
												{item?.countInStock?.length ? (
													[
														...Array(
															item.countInStock.find(
																(c) => c.size === item.selectedSize
															)?.quantity || 0
														).keys(),
													].map((_, x) => (
														<MenuItem key={x + 1} value={x + 1}>
															{x + 1}
														</MenuItem>
													))
												) : (
													<MenuItem value={0} disabled>
														Out of Stock
													</MenuItem>
												)}
											</Select>

											<Button
												variant="contained"
												onClick={() => dispatch(cartRemoveItem(item))}>
												X
											</Button>
										</Box>
									</Box>
								</Card>
							))}
						</Box>
					</Grid>

					<Grid item md={4} xs={12}>
						<Card sx={{ backgroundColor: '#fffcf7', mb: 2 }} elevation={0}>
							<List>
								<ListItem>
									<Typography variant="h6" m={'auto'}>
										Subtotal: $
										{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
									</Typography>
								</ListItem>
								<ListItem>
									<Box
										sx={{
											width: '100%',
											display: 'flex',
											flexDirection: 'column',
											gap: 2,
										}}>
										<Button
											fullWidth
											variant="contained"
											onClick={createCheckoutSession}>
											Proceed to Checkout
										</Button>
									</Box>
								</ListItem>
							</List>
						</Card>

						<Card sx={{ backgroundColor: '#fffcf7', p: 1 }} elevation={0}>
							<List
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									textAlign: 'center',
								}}>
								<ListItem
									sx={{
										display: 'flex',
										flexDirection: 'column',
										textAlign: 'center',
									}}>
									<LocalShippingIcon />
									<Typography variant="body2">Free Shipping</Typography>
								</ListItem>
								<ListItem
									sx={{
										display: 'flex',
										flexDirection: 'column',
										textAlign: 'center',
									}}>
									<CachedIcon />
									<Typography variant="body2">Free Returns</Typography>
								</ListItem>
								<ListItem
									sx={{
										display: 'flex',
										flexDirection: 'column',
										textAlign: 'center',
									}}>
									<LockOpenOutlinedIcon />
									<Typography variant="body2">Shop Securely</Typography>
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			)}
		</Container>
	);
};

export default CartScreen;
