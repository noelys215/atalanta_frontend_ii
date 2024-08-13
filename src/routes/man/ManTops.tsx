import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Layout from '../../../components/Layout';
import ProductsCat from '../../../components/ProductsCat';
import { getProducts } from '../../api/products';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ManTops: React.FC = () => {
	const navigate = useNavigate();

	const {
		data: tanks = [],
		isLoading: isLoadingTanks,
		isError: isErrorTanks,
	} = useQuery({
		queryKey: ['products', 'man', 'tanks'],
		queryFn: () => getProducts('man', 'tanks'),
	});

	const {
		data: shirts = [],
		isLoading: isLoadingShirts,
		isError: isErrorShirts,
	} = useQuery({
		queryKey: ['products', 'man', 'shirts'],
		queryFn: () => getProducts('man', 'shirts'),
	});

	const {
		data: jackets = [],
		isLoading: isLoadingJackets,
		isError: isErrorJackets,
	} = useQuery({
		queryKey: ['products', 'man', 'jackets'],
		queryFn: () => getProducts('man', 'jackets'),
	});

	if (isLoadingTanks || isLoadingShirts || isLoadingJackets) return <div>Loading...</div>;

	if (isErrorTanks || isErrorShirts || isErrorJackets) return <div>Error loading products.</div>;

	return (
		<Layout title={`MAN | TOPS`}>
			<Box display={'flex'} justifyContent={'space-between'}>
				<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
					<Button onClick={() => navigate(-1)}>
						{/* Navigate back */}
						<ArrowBackIcon sx={{ p: 0 }} />
					</Button>
					<Typography variant="h5" mb={1}>
						{`MAN`}
					</Typography>
				</Box>
			</Box>

			<Divider />

			<ProductsCat department="man" title="TANKS" products={tanks} cat={'tops'} />
			<ProductsCat department="man" title="SHIRTS" products={shirts} cat={'tops'} />
			<ProductsCat
				department="man"
				title="JACKETS / OUTERWEAR"
				products={jackets}
				cat={'tops'}
			/>
		</Layout>
	);
};

export default ManTops;
