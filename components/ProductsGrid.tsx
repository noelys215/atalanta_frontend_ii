import { Backdrop, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { getProducts } from '../src/api/products';

interface Product {
	department: string;
	category: string;
	_id: string;
	name: string;
	price: number;
	slug: string;
	image: string[];
}

const ProductsGrid: React.FC = (): ReactElement => {
	const {
		data: manShoes = [],
		isLoading: isLoadingMan,
		isError: isErrorMan,
	} = useQuery<Product[]>({
		queryKey: ['products', 'man', 'footwear'],
		queryFn: () => getProducts('man', 'footwear'),
	});

	const {
		data: womanShoes = [],
		isLoading: isLoadingWoman,
		isError: isErrorWoman,
	} = useQuery<Product[]>({
		queryKey: ['products', 'woman', 'footwear'],
		queryFn: () => getProducts('woman', 'footwear'),
	});

	if (isLoadingMan || isLoadingWoman) {
		return (
			<Backdrop
				sx={{ color: '#fff', opacity: 0.2, zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={true}>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	}

	if (isErrorMan || isErrorWoman) {
		return (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					mb: 10,
				}}>
				<Typography
					variant="h3"
					component="h1"
					fontFamily={'Spectral'}
					textAlign="center"
					width={'100%'}
					gutterBottom>
					Error loading products
				</Typography>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				mb: 10,
			}}>
			<Typography
				variant="h3"
				component="h1"
				fontFamily={'Spectral'}
				textAlign="center"
				width={'100%'}
				gutterBottom>
				Celestial Shoe Rack
			</Typography>
			<Grid
				container
				spacing={2}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{manShoes.slice(0, 4).map((p) => (
					<Grid item md={3} sm={4} xs={6} key={p._id}>
						<Link to={`/man/footwear/${p.slug}`}>
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

				{womanShoes.slice(0, 4).map((p) => (
					<Grid item md={3} sm={4} xs={6} key={p._id}>
						<Link to={`/woman/footwear/${p.slug}`}>
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
	);
};

export default ProductsGrid;
