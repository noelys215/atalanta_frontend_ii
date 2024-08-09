import { Backdrop, Box, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
interface ProductProps {
	manShoes?: string[];
	womanShoes?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
}

const ProductsGrid = (): ReactElement<ProductProps> => {
	const [state, setState] = useState<ProductProps>({
		manShoes: [],
		womanShoes: [],
		error: '',
		loading: true,
	});

	const { manShoes, womanShoes, loading, error } = state;

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(`${process.env.API_URL}/products`);
			try {
				const manShoes = data.filter(
					(prod: any) => prod.category === 'footwear' && prod.department === 'man'
				);

				const womanShoes = await data.filter(
					(prod: any) => prod.category === 'footwear' && prod.department === 'woman'
				);

				setState({ manShoes, womanShoes, loading: false });
			} catch (err: any) {
				setState({ loading: false, error: err.message });
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
					{manShoes?.slice(0, 4).map((p: any) => (
						<Grid item md={3} sm={4} xs={6} key={p?._id}>
							<Link href={`/man/footwear/${p?.slug}`}>
								<a>
									<Image
										onClick={() => setState({ loading: true })}
										src={p?.image[0]}
										width={450}
										height={450}
										alt={p?.name}
									/>
								</a>
							</Link>
							<Box p={1}>
								<Typography>{p?.name}</Typography>
								<Typography>{`$${p?.price.toFixed(2)}`}</Typography>
							</Box>
						</Grid>
					))}

					{womanShoes?.slice(0, 4).map((p: any) => (
						<Grid item md={3} sm={4} xs={6} key={p?._id}>
							<Link href={`/woman/footwear/${p?.slug}`}>
								<a>
									<Image
										onClick={() => setState({ loading: true })}
										src={p?.image[0]}
										width={450}
										height={450}
										alt={p?.name}
									/>
								</a>
							</Link>
							<Box p={1}>
								<Typography>{p?.name}</Typography>
								<Typography>{`$${p?.price.toFixed(2)}`}</Typography>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};

export default ProductsGrid;
