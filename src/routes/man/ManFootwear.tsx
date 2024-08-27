import React from 'react';
import { Box, Button, Divider, Typography, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Layout from '../../../components/Layout';
import ProductsCat from '../../../components/ProductsCat';
import { getProducts } from '../../api/products';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ManFootwear: React.FC = () => {
	const navigate = useNavigate();

	const {
		data: footwear = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['products', 'man', 'footwear'],
		queryFn: () => getProducts('man', 'footwear'),
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
		<Layout title={`MAN | FOOTWEAR`}>
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

			<ProductsCat department="man" title="FOOTWEAR" products={footwear} cat={'footwear'} />
		</Layout>
	);
};

export default ManFootwear;
