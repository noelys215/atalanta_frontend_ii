import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Layout from '../../../components/Layout';
import ProductsCat from '../../../components/ProductsCat';
import { getProducts } from '../../api/products';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ManBottoms: React.FC = () => {
	const navigate = useNavigate();

	const {
		data: shorts = [],
		isLoading: isLoadingShorts,
		isError: isErrorShorts,
	} = useQuery({
		queryKey: ['products', 'man', 'shorts'],
		queryFn: () => getProducts('man', 'shorts'),
	});

	const {
		data: pants = [],
		isLoading: isLoadingPants,
		isError: isErrorPants,
	} = useQuery({
		queryKey: ['products', 'man', 'pants'],
		queryFn: () => getProducts('man', 'pants'),
	});

	if (isLoadingShorts || isLoadingPants) return <div>Loading...</div>;

	if (isErrorShorts || isErrorPants) return <div>Error loading products.</div>;

	return (
		<Layout title={`MAN | BOTTOMS`}>
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

			<ProductsCat department="man" title="SHORTS" products={shorts} cat={'bottoms'} />
			<ProductsCat department="man" title="PANTS" products={pants} cat={'bottoms'} />
		</Layout>
	);
};

export default ManBottoms;