import { Backdrop, Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import sideImage from '../public/assets/joggingwoman.jpg';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import React from 'react';

interface ProductProps {
	tanks: Product[];
	loading: boolean;
	error: string;
}

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
	const [state, setState] = useState<ProductProps>({
		tanks: [],
		error: '',
		loading: true,
	});

	const { tanks, loading } = state;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get<Product[]>(
					`${process.env.REACT_APP_API_URL}/products`
				);
				const filteredTanks = data.filter(
					(prod) => prod.category === 'tanks' && prod.department === 'woman'
				);
				setState({ tanks: filteredTanks, loading: false, error: '' });
			} catch (err) {
				setState({ loading: false, error: err.message, tanks: [] });
			}
		};
		fetchData();
	}, []);

	return (
		<>
			{loading ? (
				<Container maxWidth="xl">
					<Backdrop
						sx={{
							color: '#fff',
							opacity: 0.2,
							zIndex: (theme) => theme.zIndex.drawer + 1,
						}}
						open={loading}>
						<CircularProgress color="inherit" />
					</Backdrop>
				</Container>
			) : (
				<>
					<Box display="flex" flexDirection="column" alignItems="center" mb={5}>
						{/* Title */}
						<Typography
							variant="h2"
							fontSize="1.875rem"
							gutterBottom
							textAlign="center">
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
							On warm summer days or hanging out at the gym, a good running tank or
							singlet is essential. Whether you need a racing singlet or a tank to
							show off the guns at the gym, we have cultivated the best running tanks
							and singlets for you to choose from.
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
						<Box sx={{ width: 'auto' }}>
							<img
								src={sideImage}
								alt="Jogging Woman"
								style={{ width: '100%', height: 'auto' }}
							/>
						</Box>
						{/* Four Products */}
						<Grid container gap={8} justifyContent="center" width="auto">
							{tanks?.slice(0, 4).map((p) => (
								<Grid item md={5} xs={4} key={p._id}>
									<Link to={`/woman/tops/${p.slug}`}>
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
			)}
		</>
	);
};
