import { Box, Button, Divider, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductsCat from '../../../components/ProductsCat';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Layout from '../../../components/Layout';
import { getProducts } from '../../api/products';

const WomanTops: React.FC = () => {
	const navigate = useNavigate();

	const {
		data: tanks = [],
		isLoading: isLoadingTanks,
		isError: isErrorTanks,
	} = useQuery({
		queryKey: ['products', 'woman', 'tanks'],
		queryFn: () => getProducts('woman', 'tanks'),
	});

	const {
		data: shirts = [],
		isLoading: isLoadingShirts,
		isError: isErrorShirts,
	} = useQuery({
		queryKey: ['products', 'woman', 'shirts'],
		queryFn: () => getProducts('woman', 'shirts'),
	});

	const {
		data: jackets = [],
		isLoading: isLoadingJackets,
		isError: isErrorJackets,
	} = useQuery({
		queryKey: ['products', 'woman', 'jackets'],
		queryFn: () => getProducts('woman', 'jackets'),
	});

	if (isLoadingTanks || isLoadingShirts || isLoadingJackets)
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
				<CircularProgress />
			</Box>
		);

	if (isErrorTanks || isErrorShirts || isErrorJackets)
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
				<Typography>Error loading products.</Typography>
			</Box>
		);

	return (
		<Layout title={`WOMAN | TOPS`}>
			{/* Title */}
			<Box display={'flex'} justifyContent={'space-between'}>
				<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
					<Button onClick={() => navigate(-1)}>
						<ArrowBackIcon sx={{ p: 0 }} />
					</Button>
					<Typography variant="h5">{`WOMAN`}</Typography>
				</Box>
			</Box>

			<Divider />

			{/* Product Categories */}
			<ProductsCat title="TANKS" products={tanks} cat={'tops'} />
			<ProductsCat title="SHIRTS" products={shirts} cat={'tops'} />
			<ProductsCat title="JACKETS / OUTERWEAR" products={jackets} cat={'tops'} />
		</Layout>
	);
};

export default WomanTops;
