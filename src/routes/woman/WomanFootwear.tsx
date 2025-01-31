import { Box, Button, Divider, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductsCat from '../../../components/ProductsCat';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Layout from '../../../components/Layout';
import { getProducts } from '../../api/products';

const WomanFootwear: React.FC = () => {
	const navigate = useNavigate();

	const {
		data: footwear = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['products', 'woman', 'footwear'],
		queryFn: () => getProducts('woman', 'footwear'),
	});

	if (isLoading)
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
				<CircularProgress />
			</Box>
		);

	if (isError)
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
				<Typography>Error loading products.</Typography>
			</Box>
		);

	return (
		<Layout title={`WOMAN | FOOTWEAR`}>
			{/* Title */}
			<Box display={'flex'} justifyContent={'space-between'}>
				<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
					<Button onClick={() => navigate(-1)}>
						{/* Navigate back */}
						<ArrowBackIcon sx={{ p: 0 }} />
					</Button>
					<Typography variant="h5">{`WOMAN`}</Typography>
				</Box>
			</Box>

			<Divider />

			{/* Product Category */}
			<ProductsCat title="FOOTWEAR" products={footwear} cat={'footwear'} />
		</Layout>
	);
};

export default WomanFootwear;
