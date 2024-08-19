import {
	Alert,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	CircularProgress,
	Container,
	Divider,
	Grid,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

interface Product {
	_id: string;
	name: string;
	slug: string;
	category: string;
	department: string;
	brand: string;
	gender: string;
	image: string[];
	price: number;
}

const fetchProducts = async (searchQuery: string): Promise<Product[]> => {
	const { data } = await axios.get(
		`${import.meta.env.VITE_API_URL}/products?search=${searchQuery}`
	);
	return data;
};

export default function SearchScreen() {
	const location = useLocation();
	const navigate = useNavigate();
	const query = new URLSearchParams(location.search).get('query') || '';

	const {
		data: products = [],
		isLoading,
		isError,
		error,
	} = useQuery<Product[]>({
		queryKey: ['products', query],
		queryFn: () => fetchProducts(query),
		enabled: query !== '',
	});

	return (
		<>
			<Helmet>
				<title>Results - Atalanta A.C.</title>
			</Helmet>
			<Container maxWidth="xl" sx={{ mb: 'auto' }}>
				<Box
					sx={{
						backgroundColor: '#fff',
						height: '4rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Typography ml={1} variant="h5" display={'flex'}>
						{query === ''
							? 'Looking for something? Start your search here!'
							: `${products.length !== 0 ? products.length : 'No'} Results ${
									query !== '' ? `: ${query}` : ''
							  }`}
						{query !== '' ? (
							<Button onClick={() => navigate('/search')}>X</Button>
						) : null}
					</Typography>
				</Box>
				<Divider sx={{ mb: 2 }} />
				{isLoading ? (
					<CircularProgress />
				) : isError ? (
					<Alert severity="error">{(error as Error).message}</Alert>
				) : (
					<Box>
						<Grid container spacing={3} justifyContent="center">
							{products.map((product) => (
								<Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
									<Link
										to={`/${product.department.toLowerCase()}/${
											product.category === 'shirts' ||
											product.category === 'tanks' ||
											product.category === 'jackets'
												? 'tops'
												: product.category === 'shorts' ||
												  product.category === 'pants'
												? 'bottoms'
												: 'all'
										}/${product.slug}`}>
										<Card sx={{ height: '100%' }}>
											<CardActionArea>
												<CardMedia
													component="img"
													image={product.image[0]}
													title={product.name}
													sx={{ height: 300 }}
												/>
												<CardContent>
													<Typography variant="h6" noWrap>
														{product.name}
													</Typography>
													<Typography
														variant="body2"
														color="textSecondary">
														{`(${product.department})`}
													</Typography>
													<Typography variant="body1" fontWeight="bold">
														{`$${product.price}`}
													</Typography>
												</CardContent>
											</CardActionArea>
										</Card>
									</Link>
								</Grid>
							))}
						</Grid>
					</Box>
				)}
			</Container>
		</>
	);
}
