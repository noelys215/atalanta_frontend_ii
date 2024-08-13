import React from 'react';
import Container from '@mui/material/Container';
import Hero from '../../components/Hero';
import ProductsGrid from '../../components/ProductsGrid';
import { SeasonalCard } from '../../components/SeasonalCard';
import { FeaturedItems } from '../../components/FeaturedItems';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
	return (
		<Container maxWidth="xl">
			<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
				<Hero />
			</motion.div>
			{/* Spring Collection */}
			<motion.div
				whileInView={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}>
				<SeasonalCard
					title={'Spring is in the air!'}
					quote={`Spring is far more than just a changing of seasons; it's a rebirth of the spirit`}
					desc={`Daffodils are blooming and the evenings are getting longer, after the seemingly never-ending winter, spring is finally here.`}
					linkTitle={'Discover the 2022 Womens Spring Collection'}
					linkToSeasonal={'/woman'}
					imgSrc={'/assets/nobullrunning.webp'}
				/>
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
				<SeasonalCard
					title={'Chase the Sun'}
					quote={'The tans will fade, but the memories will last forever'}
					desc={`You can't change a 90-degree day, 100 percent humidity, or the dread of logging miles in both. But you can outfit yourself in whisper-weight, sweat-wicking apparel that helps make summer runs feel like the good kind of hot.`}
					linkTitle={'Shop the heat 🔥'}
					linkToSeasonal={'/man/tops/tops'}
					imgSrc={'/assets/mantyingshoe.jpg'}
				/>
			</motion.div>
			{/* Featured Items */}
			<FeaturedItems />
			{/* Accessories */}
			<motion.div
				whileInView={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}>
				<SeasonalCard
					title={'Sail away'}
					quote={'When you come to a fork in the road, take it.'}
					desc={`Beach towels, pareos, cushions and tote bags… bringing you all the essentials for a day by the sea.`}
					linkTitle={'Explore Accessories'}
					linkToSeasonal={'/accessories/all/accessories'}
					imgSrc={'/assets/accHero.jpg'}
				/>
			</motion.div>
		</Container>
	);
};

export default Home;
