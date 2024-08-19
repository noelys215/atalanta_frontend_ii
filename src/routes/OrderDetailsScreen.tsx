import { CircularProgress, Divider, Grid, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Layout from '../../components/Layout';

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
	shipping_address: {
		address: Address;
		name: string;
	};
	order_date: number;
	order_details: OrderDetails;
}

const fetchOrderDetails = async (sessionId: string): Promise<Order> => {
	const { data } = await axios.post(
		`${import.meta.env.VITE_API_URL}/stripe/retrieve-checkout-session`,
		{
			session_id: sessionId,
		}
	);
	return data;
};

const OrderDetailsScreen = () => {
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

	if (isLoading) return <CircularProgress color="primary" variant="determinate" />;
	if (isError) return <Typography variant="h6">Failed to load order details</Typography>;

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
						p: 5,
						minHeight: 1000,
						mt: 10,
						ml: 'auto',
						mr: 'auto',
						backgroundColor: '#fffcf7',
					}}>
					<Grid item md={12} sm={12} xs={12}>
						<Typography variant="h6" sx={{ mt: 4 }}>
							Order Summary: #{sessionId?.toUpperCase()}
						</Typography>
						<Divider sx={{ mb: 4, justifySelf: 'center' }} />
					</Grid>
					<Grid item md={6} sm={12} xs={12}>
						<Typography sx={{ mt: 4 }}>Order Date</Typography>
						<Divider sx={{ mb: 2, justifySelf: 'center' }} />
						<Typography>{orderDate}</Typography>
					</Grid>
					<Grid item md={6} sm={12} xs={12}>
						<Typography sx={{ mt: 4 }}>Shipping Address</Typography>
						<Divider sx={{ mb: 2, justifySelf: 'center' }} />
						<List>
							<ListItem>{order?.shipping_address?.name}</ListItem>
							<ListItem>{order?.shipping_address?.address.line1}</ListItem>
							<ListItem>
								{order?.shipping_address?.address.city},{' '}
								{order?.shipping_address?.address.state}{' '}
								{order?.shipping_address?.address.postal_code}
							</ListItem>
							<ListItem>{order?.shipping_address?.address.country}</ListItem>
							<ListItem>
								Status:{' '}
								{order?.status === 'complete' ? 'Delivered' : 'Not delivered'}
							</ListItem>
						</List>
					</Grid>
					<Grid item md={6} sm={12} xs={12}>
						<Typography sx={{ mt: 4 }}>Payment Method</Typography>
						<Divider sx={{ mb: 2, justifySelf: 'center' }} />
						<List>
							<ListItem>Credit Card</ListItem>
							<ListItem>
								Status: {order?.status === 'complete' ? 'Paid' : 'Not paid'}
							</ListItem>
						</List>
					</Grid>
					<Grid item md={12} sm={12} xs={12}>
						<Typography sx={{ mt: 4 }}>Ordered Items</Typography>
						<Divider sx={{ mb: 2, justifySelf: 'center' }} />
					</Grid>
					{order?.order_details?.line_items.map((item, index) => (
						<Grid item md={4} sm={12} xs={12} key={index} display={'flex'} mb={2}>
							<Box>
								<img
									src={item.image}
									alt={item.description}
									width={180}
									height={180}
								/>
							</Box>

							<Box ml={2.5} width={'60%'}>
								<Typography variant="body1" gutterBottom>
									<q>{item.description}</q>
								</Typography>
								<Typography variant="body2">Quantity: {item.quantity}</Typography>
								<Typography variant="body2">
									Price: ${item.price.toFixed(2)}
								</Typography>
							</Box>
						</Grid>
					))}
					<Grid item md={12} sm={12} xs={12}>
						<Typography sx={{ mt: 4 }}>Order Summary</Typography>
						<Divider sx={{ mb: 2, justifySelf: 'center' }} />
						<Grid container gap={3} justifyContent={'center'} height={'auto'}>
							<Grid item md={4} sm={12} xs={12}>
								<List>
									<ListItem>
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
									<ListItem>
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
									<ListItem>
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
									<ListItem>
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
