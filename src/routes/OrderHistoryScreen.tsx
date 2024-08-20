import {
	Button,
	CircularProgress,
	Divider,
	Typography,
	Card,
	CardContent,
	Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Layout from '../../components/Layout';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface Order {
	id: string;
	created: number;
	total_price: number;
	status: string;
}

const fetchOrderHistory = async (email: string) => {
	const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/stripe/order-history`, {
		email,
	});
	return data;
};

const OrderHistoryScreen = () => {
	const navigate = useNavigate();
	const { userInfo } = useSelector((state: RootState) => state.userInfo);

	const {
		data: orders,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['orderHistory', userInfo?.email],
		queryFn: () => fetchOrderHistory(userInfo?.email as string),
		enabled: !!userInfo?.email,
	});

	if (isLoading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
				<CircularProgress color="primary" />
			</Box>
		);
	}

	return (
		<Layout title="Order History">
			<Box
				mb="auto"
				maxWidth="lg"
				sx={{
					p: 2,
					minHeight: '62.5rem',
					width: '100%',
					m: 'auto',
					mt: 10,
					backgroundColor: '#fffcf7',
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Typography variant="h6" sx={{ mt: 4 }}>
					Order History
				</Typography>
				<Divider sx={{ mb: 4, justifySelf: 'center' }} />

				{isError || !orders || orders.length === 0 ? (
					<Box
						sx={{
							width: { md: '80%', sm: '100%' },
							whiteSpace: 'nowrap',
							m: 'auto',
							backgroundColor: '#fff',
							borderRadius: 2,
							boxShadow: '0 0 10px rgba(0,0,0,0.1)',
							padding: 3,
							textAlign: 'center',
						}}>
						<Typography variant="body1" sx={{ color: 'rgb(68, 68, 68)' }}>
							No orders found.
						</Typography>
					</Box>
				) : (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
							width: { md: '80%', sm: '100%' },
							m: 'auto',
						}}>
						{orders.map((order: Order) => (
							<Card
								key={order.id}
								sx={{
									backgroundColor: '#fff',
									boxShadow: '0 0 10px rgba(0,0,0,0.1)',
								}}>
								<CardContent>
									<Typography
										variant="subtitle1"
										gutterBottom
										sx={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
										Order ID:
									</Typography>
									<Typography
										variant="subtitle2"
										gutterBottom
										sx={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
										{order.id}
									</Typography>
									<Typography variant="body2" gutterBottom>
										Date:{' '}
										{new Date(order.created * 1000).toLocaleDateString(
											'en-US',
											{
												weekday: 'long',
												year: 'numeric',
												month: 'long',
												day: 'numeric',
												hour: '2-digit',
												minute: '2-digit',
											}
										)}
									</Typography>
									<Typography variant="body2" gutterBottom>
										Total: $ {order.total_price}
									</Typography>
									<Typography variant="body2" gutterBottom>
										Status: {order.status === 'complete' ? 'Paid' : 'Not Paid'}
									</Typography>
									<Button
										variant="contained"
										fullWidth
										sx={{ mt: 2 }}
										onClick={() => navigate(`/return?session_id=${order.id}`)}>
										Details
									</Button>
								</CardContent>
							</Card>
						))}
					</Box>
				)}
			</Box>
		</Layout>
	);
};

export default OrderHistoryScreen;
