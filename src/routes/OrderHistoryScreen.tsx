import {
	Alert,
	Button,
	CircularProgress,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
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

	if (isLoading) return <CircularProgress color="primary" />;
	if (isError || !orders || orders.length === 0)
		return <Alert severity="error">No orders found.</Alert>;

	return (
		<Layout title="Order History">
			<Box
				mb={'auto'}
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

				<TableContainer>
					<Table
						sx={{
							width: { md: '80%', sm: '100%' },
							whiteSpace: 'nowrap',
							m: 'auto',
						}}>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>DATE</TableCell>
								<TableCell>TOTAL</TableCell>
								<TableCell>PAID</TableCell>
								<TableCell>ACTIONS</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders.map((order: Order) => (
								<TableRow key={order.id}>
									<TableCell>{order.id}</TableCell>
									<TableCell>
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
									</TableCell>
									<TableCell>$ {order.total_price}</TableCell>
									<TableCell>
										{order.status === 'complete' ? 'Paid' : 'Not Paid'}
									</TableCell>
									<TableCell>
										<Button
											variant="contained"
											onClick={() =>
												navigate(`/return?session_id=${order.id}`)
											}>
											Details
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Layout>
	);
};

export default OrderHistoryScreen;
