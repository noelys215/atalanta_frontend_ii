import { CircularProgress, Divider, Grid, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import { cartClear } from '../../store/slices/cartSlice';

// Define types for the expected order details structure
interface Address {
	city: string;
	country: string;
	line1: string;
	line2?: string | null;
	postal_code: string;
	state: string;
}

interface LineItem {
	description: string;
	quantity: number;
	size: string;
	price: number;
	image?: string;
}

interface OrderDetails {
	line_items: LineItem[];
	shipping_cost: number;
	tax: number;
	total_price: number;
}

interface Order {
	status: string;
	customer_name: string;
	customer_email: string;
	billing_address: Address;
	short_order_id: string;
	shipping_address: {
		address: Address;
		name: string;
	};
	order_date: number;
	order_details: OrderDetails;
}

const OrderDetailsScreen = () => {
	const dispatch = useDispatch();

	const fetchOrderDetails = async (sessionId: string) => {
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/stripe/retrieve-checkout-session`,
			{ session_id: sessionId }
		);

		if (response.headers['x-clear-cart'] === 'true') dispatch(cartClear());

		return response.data;
	};

	const location = useLocation();
	const sessionId = new URLSearchParams(location.search).get('session_id');

	const {
		data: order,
		isLoading,
		isError,
	} = useQuery<Order>({
		queryKey: ['orderDetails', sessionId],
		queryFn: () => fetchOrderDetails(sessionId as string),
		enabled: !!sessionId,
	});

	if (isLoading)
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
				<CircularProgress color="primary" />
			</Box>
		);

	if (isError)
		return (
			<Typography variant="h6" textAlign="center" mt={4}>
				Failed to load order details
			</Typography>
		);

	// Convert the Unix timestamp to a readable date format
	const orderDate = new Date((order?.order_date ?? 0) * 1000).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});

	return (
		<Layout title="Order Details">
			<Box display="flex">
				<Grid
					container
					maxWidth="lg"
					sx={{
						p: { xs: 2, sm: 3, md: 5 },
						minHeight: 1000,
						mt: 10,
						ml: 'auto',
						mr: 'auto',
						backgroundColor: '#fffcf7',
					}}>
					<Grid item xs={12}>
						<Box sx={{ wordWrap: 'break-word', wordBreak: 'break-all', mt: 4 }}>
							<Typography variant="h6">Order Summary:</Typography>
							<Typography variant="subtitle1">
								Order No:{' '}
								{order?.short_order_id || sessionId?.toUpperCase() || '[REDACTED]'}
							</Typography>
						</Box>
						<Divider sx={{ mb: 4, justifySelf: 'center' }} />
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography sx={{ mt: 4 }}>Order Date</Typography>
						<Divider sx={{ mb: 2, justifySelf: 'center' }} />
						<Typography>{orderDate}</Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography sx={{ mt: 4 }}>Shipping Address</Typography>
						<Divider sx={{ mb: 2, justifySelf: 'center' }} />
						<List>
							<ListItem disableGutters sx={{ py: 0, px: 0 }}>
								{order?.shipping_address?.name}
							</ListItem>
							<ListItem disableGutters sx={{ py: 0, px: 0 }}>
								{order?.shipping_address?.address.line1}
							</ListItem>
							<ListItem disableGutters sx={{ py: 0, px: 0 }}>
								{order?.shipping_address?.address.city},
								{order?.shipping_address?.address.state}
								{order?.shipping_address?.address.postal_code}
							</ListItem>
							<ListItem disableGutters sx={{ py: 0, px: 0 }}>
								{order?.shipping_address?.address.country}
							</ListItem>
							<ListItem disableGutters sx={{ py: 0, px: 0 }}>
								Status:
								{order?.status === 'complete' ? 'Delivered' : 'Not delivered'}
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography sx={{ mt: 4 }}>Payment Method</Typography>
						<Divider sx={{ mb: 2, justifySelf: 'center' }} />
						<List>
							<ListItem disableGutters sx={{ py: 0, px: 0 }}>
								Credit Card
							</ListItem>
							<ListItem disableGutters sx={{ py: 0, px: 0 }}>
								Status: {order?.status === 'complete' ? 'Paid' : 'Not paid'}
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12}>
						<Typography sx={{ mt: 4 }}>Ordered Items</Typography>
						<Divider sx={{ mb: 2, justifySelf: 'center' }} />
					</Grid>
					{order?.order_details?.line_items.map((item, index) => (
						<Grid
							item
							xs={12}
							sm={12}
							md={4}
							key={index}
							display="flex"
							mb={2}
							flexDirection={{ xs: 'column', md: 'row' }}>
							<Box>
								<img
									src={item.image}
									alt={item.description}
									width={180}
									height={180}
									style={{ maxWidth: '100%', height: 'auto' }}
								/>
							</Box>

							<Box ml={{ md: 2.5 }} width="100%" mt={{ xs: 1.5, md: 0 }}>
								<Typography variant="body1" gutterBottom>
									<q>{item.description}</q>
								</Typography>
								<Typography variant="body2">Quantity: {item.quantity}</Typography>
								<Typography variant="body2">Size: {item?.size}</Typography>
								<Typography variant="body2">
									Price: ${item.price.toFixed(2)}
								</Typography>
							</Box>
						</Grid>
					))}
					<Grid item xs={12}>
						<Typography sx={{ mt: 4 }}>Order Summary</Typography>
						<Divider sx={{ mb: 2, justifySelf: 'center' }} />
						<Grid container gap={3} justifyContent="center" height="auto">
							<Grid item xs={12} sm={12} md={4}>
								<List>
									<ListItem disableGutters sx={{ py: 0, px: 0 }}>
										<Grid container>
											<Grid item xs={6}>
												<Typography>Items Price: </Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography align="right">
													${' '}
													{order?.order_details?.line_items.reduce(
														(acc, item) => acc + item.price,
														0
													)}
												</Typography>
											</Grid>
										</Grid>
									</ListItem>
									<ListItem disableGutters sx={{ py: 0, px: 0 }}>
										<Grid container>
											<Grid item xs={6}>
												<Typography>Tax:</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography align="right">
													$ {order?.order_details?.tax}
												</Typography>
											</Grid>
										</Grid>
									</ListItem>
									<ListItem disableGutters sx={{ py: 0, px: 0 }}>
										<Grid container>
											<Grid item xs={6}>
												<Typography>Shipping:</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography align="right">
													$ {order?.order_details?.shipping_cost}
												</Typography>
											</Grid>
										</Grid>
									</ListItem>
									<ListItem disableGutters sx={{ py: 0, px: 0 }}>
										<Grid container>
											<Grid item xs={6}>
												<Typography>
													<strong>Total:</strong>
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography align="right">
													<strong>
														$ {order?.order_details?.total_price}
													</strong>
												</Typography>
											</Grid>
										</Grid>
									</ListItem>
								</List>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Layout>
	);
};

export default OrderDetailsScreen;
