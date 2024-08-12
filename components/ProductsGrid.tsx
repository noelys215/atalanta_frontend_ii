import { Backdrop, Box, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useEffect, useState, ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface Product {
	department: string;
	category: string;
	_id: string;
	name: string;
	price: number;
	slug: string;
	image: string[];
}

interface ProductProps {
	manShoes?: Product[];
	womanShoes?: Product[];
	loading?: boolean;
	error?: string;
}

const ProductsGrid: React.FC = (): ReactElement => {
	const [state, setState] = useState<ProductProps>({
		manShoes: [],
		womanShoes: [],
		error: '',
		loading: true,
	});

	const { manShoes, womanShoes, loading, error } = state;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get<Product[]>(
					`${process.env.REACT_APP_API_URL}/products`
				);
				const manShoes = data.filter(
					(prod) => prod.category === 'footwear' && prod.department === 'man'
				);

				const womanShoes = data.filter(
					(prod) => prod.category === 'footwear' && prod.department === 'woman'
				);

				setState({ manShoes, womanShoes, loading: false, error: '' });
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setState({ loading: false, error: err.message, manShoes: [], womanShoes: [] });
			}
		};

		fetchData();
	}, [error]);

	return (
		<>
			{loading && (
				<Backdrop
					sx={{ color: '#fff', opacity: 0.2, zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={loading}>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
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
					fontFamily={'Source Code Pro'}
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
					{manShoes?.slice(0, 4).map((p) => (
						<Grid item md={3} sm={4} xs={6} key={p._id}>
							<Link to={`/man/footwear/${p.slug}`}>
								<img
									onClick={() => setState({ ...state, loading: true })}
									src={p.image[0]}
									width={450}
									height={450}
									alt={p.name}
									style={{ width: '100%', height: 'auto' }}
								/>
							</Link>
							<Box p={1}>
								<Typography>{p.name}</Typography>
								<Typography>{`$${p.price.toFixed(2)}`}</Typography>
							</Box>
						</Grid>
					))}

					{womanShoes?.slice(0, 4).map((p) => (
						<Grid item md={3} sm={4} xs={6} key={p._id}>
							<Link to={`/woman/footwear/${p.slug}`}>
								<img
									onClick={() => setState({ ...state, loading: true })}
									src={p.image[0]}
									width={450}
									height={450}
									alt={p.name}
									style={{ width: '100%', height: 'auto' }}
								/>
							</Link>
							<Box p={1}>
								<Typography>{p.name}</Typography>
								<Typography>{`$${p.price.toFixed(2)}`}</Typography>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};

export default ProductsGrid;
