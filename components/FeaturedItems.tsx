import { Backdrop, Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import sideImage from '../public/assets/joggingwoman.jpg';
import { ReactElement } from 'react';
import { getProducts } from '../src/api/products';

interface Product {
	_id: string;
	name: string;
	price: number;
	category: string;
	department: string;
	slug: string;
	image: string[];
}

export const FeaturedItems = (): ReactElement => {
	const {
		data: products = [],
		isLoading,
		isError,
	} = useQuery<Product[]>({
		queryKey: ['products', 'woman', 'tanks'],
		queryFn: () => getProducts('woman', 'tanks'),
	});

	if (isLoading) {
		return (
			<Container maxWidth="xl">
				<Backdrop
					sx={{
						color: '#fff',
						opacity: 0.2,
						zIndex: (theme) => theme.zIndex.drawer + 1,
					}}
					open={isLoading}>
					<CircularProgress color="inherit" />
				</Backdrop>
			</Container>
		);
	}

	if (isError) {
		return (
			<Container maxWidth="xl">
				<Typography color="error" variant="h6" textAlign="center" mt={5}>
					Failed to load products.
				</Typography>
			</Container>
		);
	}

	return (
		<>
			<Box display="flex" flexDirection="column" alignItems="center" mb={5}>
				{/* Title */}
				<Typography variant="h2" fontSize="1.875rem" gutterBottom textAlign="center">
					A Running Tradition
				</Typography>
				{/* Description */}
				<Typography
					lineHeight={1.5}
					variant="body2"
					fontSize="1.1rem"
					gutterBottom
					textAlign="center"
					width="80%">
					On warm summer days or hanging out at the gym, a good running tank or singlet is
					essential. Whether you need a racing singlet or a tank to show off the guns at
					the gym, we have cultivated the best running tanks and singlets for you to
					choose from.
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: {
						xs: 'column',
						md: 'row',
					},
					alignItems: 'center',
					width: '100%',
					height: 'auto',
					mb: 5,
				}}>
				{/* Side Image */}
				<Box sx={{ width: { lg: '45%' } }}>
					<img
						src={sideImage}
						alt="Jogging Woman"
						style={{ width: '100%', height: 'auto' }}
					/>
				</Box>
				{/* Four Products */}
				<Grid container gap={8} justifyContent="center" sx={{ width: { lg: '55%' } }}>
					{products.slice(0, 4).map((p) => (
						<Grid item md={5} xs={4} key={p.slug}>
							<Link to={`/woman/tops/${p.slug}`}>
								<img
									src={p.image[0]}
									width={450}
									height={450}
									alt={p.name}
									style={{ width: '100%', height: 'auto' }}
								/>
							</Link>
							<Box p={1}>
								<Typography>{p.name}</Typography>
								<Typography>{`$${p.price}`}</Typography>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};
