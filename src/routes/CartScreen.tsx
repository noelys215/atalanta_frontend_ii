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
import { cartAddItem, CartItem, cartRemoveItem, StockItem } from '../../store/slices/cartSlice';

const CartScreen: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const updateCartHandler = async (item: CartItem, quantity: number) => {
		dispatch(
			cartAddItem({
				_id: item._id,
				_key: item._key,
				name: item.name,
				countInStock: item.countInStock,
				slug: item.slug,
				price: item.price,
				image: item.image,
				path: item.path,
				selectedSize: item.selectedSize,
				quantity,
			})
		);
		toast(`${item.name} UPDATED`);
	};

	const removeItemHandler = (item: CartItem) => {
		dispatch(cartRemoveItem(item));
		toast(`${item.name} REMOVED`);
	};

	const { cartItems } = useSelector((state: RootState) => state.cart.cart);
	const { userInfo } = useSelector((state: RootState) => state.userInfo);

	return (
		<Container
			maxWidth="xl"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-evenly',
				alignItems: 'center',
				mb: 'auto',
			}}>
			<Typography variant="h6" fontWeight={'bold'} mr={'auto'} gutterBottom>
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
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 1.5,
							}}>
							{cartItems.map((item: CartItem) => (
								<Card
									key={item._key}
									elevation={0}
									sx={{
										display: 'flex',
										backgroundColor: '#fffcf7',
									}}>
									<Box mb={-1}>
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
												className="cartSelect"
												value={item?.quantity}
												onChange={(e) =>
													updateCartHandler(item, Number(e.target.value))
												}>
												{[
													...Array(
														+item?.countInStock
															.filter(
																(c: StockItem) =>
																	c?.size ===
																		+item?.selectedSize ||
																	c?.size === item?.selectedSize
															)
															.map((d: StockItem) => d?.quantity)
													).keys(),
												].map((x) => (
													<MenuItem key={x + 1} value={x + 1}>
														{x + 1}
													</MenuItem>
												))}
											</Select>

											<Button
												variant="contained"
												onClick={() => removeItemHandler(item)}>
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
										{userInfo ? (
											<>
												<Button
													fullWidth
													variant="contained"
													onClick={() => navigate('/shipping')}>
													Checkout as Registered User
												</Button>
												<Button
													fullWidth
													variant="outlined"
													onClick={() => navigate('/shipping')}>
													Checkout as Guest
												</Button>
											</>
										) : (
											<>
												<Button
													fullWidth
													variant="contained"
													onClick={() => navigate('/shipping')}>
													Checkout as Guest
												</Button>
												<Button
													fullWidth
													variant="outlined"
													onClick={() => navigate('/register')}>
													Register to Checkout
												</Button>
											</>
										)}
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
