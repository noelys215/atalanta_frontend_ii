import React from 'react';
import Container from '@mui/material/Container';
import Hero from '../../components/Hero';
import ProductsGrid from '../../components/ProductsGrid';
import { SeasonalCard } from '../../components/SeasonalCard';
import { FeaturedItems } from '../../components/FeaturedItems';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';

const Home: React.FC = () => {
	return (
		<Layout title="Home">
			<Container maxWidth="xl">
				<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
					<Hero />
				</motion.div>

				{/* Spring Collection */}
				<motion.div
					whileInView={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}>
					<SeasonalCard slug="spring-is-in-the-air" />
				</motion.div>

				{/* Shoe Display */}
				<motion.div
					whileInView={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}>
					<ProductsGrid />
				</motion.div>

				{/* Summer Collection */}
				<motion.div
					whileInView={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}>
					<SeasonalCard slug="chase-the-sun" />
				</motion.div>

				{/* Featured Items */}
				<FeaturedItems />

				{/* Accessories */}
				<motion.div
					whileInView={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}>
					<SeasonalCard slug="gear-up-in-style" />
				</motion.div>
			</Container>
		</Layout>
	);
};

export default Home;
