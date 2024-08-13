import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Layout from '../../../../components/Layout';
import ProductsCat from '../../../../components/ProductsCat';
import { getProducts } from '../../../api/products';

const WomanTops: React.FC = () => {
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

	if (isLoadingTanks || isLoadingShirts || isLoadingJackets) return <div>Loading...</div>;

	if (isErrorTanks || isErrorShirts || isErrorJackets) return <div>Error loading products.</div>;

	return (
		<Layout title={`WOMAN | TOPS`}>
			<Box display={'flex'} justifyContent={'space-between'}>
				<Typography variant="h5" mb={1}>
					{`WOMAN | TOPS`}
				</Typography>
			</Box>

			<Divider />

			<ProductsCat title="TANKS" products={tanks} cat={'tops'} />
			<ProductsCat title="SHIRTS" products={shirts} cat={'tops'} />
			<ProductsCat title="JACKETS / OUTERWEAR" products={jackets} cat={'tops'} />
		</Layout>
	);
};

export default WomanTops;
