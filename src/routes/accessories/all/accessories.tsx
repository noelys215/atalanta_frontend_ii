import React from 'react';
import { Box, Container, Divider, Typography, Button, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Layout from '../../../../components/Layout';
import ProductsCat from '../../../../components/ProductsCat';
import { getProducts } from '../../../api/products';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Accessories: React.FC = () => {
	const navigate = useNavigate();

	const {
		data: accessories = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['products', 'accessories', 'all'],
		queryFn: () => getProducts('accessories', 'all'),
	});

	if (isLoading)
		return (
			<Container maxWidth="xl" sx={{ mb: 'auto' }}>
				<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
					<CircularProgress />
				</Box>
			</Container>
		);

	if (isError)
		return (
			<Container maxWidth="xl" sx={{ mb: 'auto' }}>
				<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
					<Typography>Error loading products.</Typography>
				</Box>
			</Container>
		);

	return (
		<Layout title="Accessories">
			<Container maxWidth="xl" sx={{ mb: 'auto' }}>
				{/* Title */}
				<Box display={'flex'} justifyContent={'space-between'}>
					<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
						<Button onClick={() => navigate(-1)}>
							{/* Navigate back */}
							<ArrowBackIcon sx={{ p: 0 }} />
						</Button>
						<Typography variant="h5" mb={1}>
							Accessories
						</Typography>
					</Box>
				</Box>

				<Divider />

				{/* Product Category */}
				<ProductsCat
					department="accessories"
					title="All Accessories"
					products={accessories}
					type={'accessories'}
					cat={'all'}
				/>
			</Container>
		</Layout>
	);
};

export default Accessories;
