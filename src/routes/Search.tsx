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
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Link from '../Link';

// Define Product Type
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

const fetchProducts = async (): Promise<Product[]> => {
	const { data } = await axios.get(`${process.env.API_URL}/products`);
	return data;
};

export default function SearchScreen() {
	const location = useLocation();
	const navigate = useNavigate();
	const query = new URLSearchParams(location.search).get('query') || 'all';

	const {
		data: products = [],
		isLoading,
		isError,
		error,
	} = useQuery<Product[]>({
		queryKey: ['products'],
		queryFn: fetchProducts,
		select: (data) => {
			if (query === 'all') return data;
			return data.filter(
				(prod) =>
					prod.category.toLowerCase() === query.toLowerCase() ||
					prod.department.toLowerCase() === query.toLowerCase() ||
					prod.brand.toLowerCase() === query.toLowerCase() ||
					prod.name.toLowerCase() === query.toLowerCase()
			);
		},
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
						{products.length !== 0 ? products.length : 'No'} Results
						{query !== 'all' && query !== '' && ' : ' + query}
						{query !== 'all' && query !== '' ? (
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
						<Grid container gap={3} justifyContent="center" width={'auto'}>
							{products.map((product) => (
								<Link
									href={`/${product.department.toLowerCase()}/${
										product.category === 'shirts' ||
										product.category === 'tanks' ||
										product.category === 'jackets'
											? 'tops'
											: product.category === 'shorts' ||
											  product.category === 'pants'
											? 'bottoms'
											: 'all'
									}/${product.slug}`}
									key={product._id}>
									<Grid item md={2.5} sm={5} lg={2}>
										<Card sx={{ width: '100%', p: 0.5 }}>
											<CardActionArea>
												<CardMedia
													component="img"
													image={product.image[0]}
													title={product.name}
												/>
											</CardActionArea>
											<CardContent
												sx={{
													height: {
														md: 'auto',
														lg: 170,
													},
												}}>
												<Typography variant="h6">{product.name}</Typography>
												<Typography variant="body1">
													({product.gender})
												</Typography>
												<Typography variant="body1">{`$${product.price.toFixed(
													2
												)}`}</Typography>
											</CardContent>
										</Card>
									</Grid>
								</Link>
							))}
						</Grid>
					</Box>
				)}
			</Container>
		</>
	);
}
