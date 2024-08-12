import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';
import { Container } from '@mui/material';
import { motion } from 'framer-motion';
import Hero from '../../components/Hero';

export const Dashboard = () => {
	const {
		status,
		error,
		data: products,
	} = useQuery({
		queryKey: ['products', 'woman'],
		queryFn: () => getProducts('woman'),
	});

	if (status == 'pending') return <div>Loading...</div>;
	if (status === 'error') return <div>Error: {error.message}</div>;
	console.log(products);

	return (
		<Container maxWidth="xl">
			<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
				<Hero />
				<h1>Hello?</h1>
			</motion.div>
		</Container>
	);
};
