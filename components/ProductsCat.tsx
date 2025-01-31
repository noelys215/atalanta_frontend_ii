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
import { Link } from 'react-router-dom';
import Sort from '../components/Sort';
import { SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent

interface ProductCatProps {
	products?: Product[];
	title?: string;
	type?: string;
	cat?: string;
	department?: string;
	sort?: string;
}

interface Product {
	name: string;
	price: number;
	slug: string;
	image: string[];
	department: string;
}

const ProductsCat: React.FC<ProductCatProps> = ({ products = [], title = '', cat = '' }) => {
	const [loading, setLoading] = useState(false);
	const [sort, setSort] = useState<string>('');

	const handleSort = (event: SelectChangeEvent) => {
		setSort(event.target.value);
	};

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
						.sort((a, b) => {
							if (sort === 'Lowest') {
								return a.price - b.price;
							} else if (sort === 'Highest') {
								return b.price - a.price;
							} else {
								return 0;
							}
						})
						.map((product) => (
							<Grid item md={2.5} sm={5} lg={2.5} key={product.slug}>
								<Link
									to={`/${product.department}/${cat}/${product.slug}`}
									onClick={() => setLoading(true)}>
									<Card sx={{ width: '100%' }}>
										<CardActionArea>
											<CardMedia
												component="img"
												image={`${product.image[0]}`}
												title={product.name}
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
											<Typography variant="body1">{`$${product.price}`}</Typography>
										</CardContent>
									</Card>
								</Link>
							</Grid>
						))}
				</Grid>
			</Box>
		</>
	);
};

export default ProductsCat;
