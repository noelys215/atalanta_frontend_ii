import React, { useState } from 'react';
import {
	Backdrop,
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	CircularProgress,
	Divider,
	Grid,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import Sort from '../components/Sort';

interface ProductCatProps {
	products?: any[];
	title?: string;
	type?: any;
	cat?: string;
	department?: any;
	sort?: any;
}

const ProductsCat: React.FC<ProductCatProps> = ({ products, title, cat }) => {
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState<ProductCatProps>({
		sort: '',
	});

	const handleSort = (e: any) => {
		return setState({ sort: e.target.value });
	};

	const { sort } = state;

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
					backgroundColor: '#fff',
					height: '4rem',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					mb: 1.2,
				}}>
				<Typography ml={1} variant="h4">
					{title}
				</Typography>
			</Box>
			<Box>
				<Sort handleSort={handleSort} />
			</Box>
			<Divider sx={{ mb: 2 }} />

			{/* Product Grid */}
			<Box>
				<Grid container gap={2} justifyContent="center" mb={10}>
					{products
						?.sort((a, b): any => {
							if (sort === 'Lowest') {
								return a.price - b.price;
							} else if (sort === 'Highest') {
								return b.price - a.price;
							} else {
								return;
							}
						})
						.map((product) => (
							<Link
								passHref
								href={{
									pathname: `/${product?.department}/${cat}/${product?.slug}`,
								}}
								key={product?.slug}>
								<Grid item md={2.5} sm={5} lg={2.5}>
									<Card sx={{ width: '100%' }} onClick={() => setLoading(true)}>
										<CardActionArea>
											<CardMedia
												component="img"
												image={`${product.image[0]}`}
												title={product?.name}
											/>
										</CardActionArea>
										<CardContent
											sx={{
												height: {
													md: 200,
													lg: 170,
												},
											}}>
											<Typography variant="h6">{product.name}</Typography>

											<Typography variant="body1">{`$${product?.price.toFixed(
												2
											)}`}</Typography>
										</CardContent>
									</Card>
								</Grid>
							</Link>
						))}
				</Grid>
			</Box>
		</>
	);
};

export default ProductsCat;
