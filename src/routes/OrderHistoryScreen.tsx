import {
	Alert,
	Button,
	CircularProgress,
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//Redux Toolkit
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getOrderHistory } from '../../store/actions/getOrderHistory';
import { Helmet } from 'react-helmet';

const OrderHistoryScreen: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, orders }: any = useSelector((state: RootState) => state.orderHistory);
	const { userInfo } = useSelector((state: RootState) => state.userInfo);

	useEffect(() => {
		if (!userInfo) navigate('/register');
		dispatch(getOrderHistory({}));
	}, [navigate, userInfo, dispatch]);

	return (
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
			<Helmet>
				<title>Order History - Atalanta A.C.</title>
			</Helmet>
			<Divider sx={{ mb: 4, justifySelf: 'center' }} />
			<Grid item md={12} sm={12} xs={12}>
				<Box sx={{ width: { md: '80%', sm: '100%' }, m: 'auto' }}>
					<Typography variant="h6" sx={{ mt: 4 }}>
						Order History
					</Typography>
					<Divider sx={{ mb: 4, justifySelf: 'center' }} />
				</Box>
				{loading ? (
					<CircularProgress sx={{ display: 'flex', justifyContent: 'center' }} />
				) : error ? (
					<Alert sx={{ width: { md: '20%', sm: '90%' }, m: 'auto', fontSize: '1.3rem' }}>
						No orders 😔
					</Alert>
				) : (
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
									<TableCell>DELIVERY</TableCell>
									<TableCell>ACTIONS</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orders.map((order: any) => (
									<TableRow key={order._id}>
										<TableCell>{order._id}</TableCell>
										<TableCell>
											{new Date(order.createdAt).toLocaleDateString()}
										</TableCell>
										<TableCell>$ {order.totalPrice}</TableCell>
										<TableCell>
											{order.isPaid
												? `Paid on: ${new Date(
														order.paidAt
												  ).toLocaleDateString()}`
												: 'Not Paid'}
										</TableCell>
										<TableCell>
											{order.isDelivered
												? `Delivered on: ${new Date(
														order.deliveredAt
												  ).toLocaleDateString()}`
												: 'Not Delivered'}
										</TableCell>
										<TableCell>
											<Button
												variant="contained"
												onClick={() => navigate(`/order/${order._id}`)}>
												Details
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Grid>
		</Box>
	);
};

export default OrderHistoryScreen;
