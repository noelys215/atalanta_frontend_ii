import React from 'react';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface HeroProps {
	slug: string;
}

const Hero: React.FC<HeroProps> = ({ slug }) => {
	const fetchHeroCard = async () => {
		const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/hero-cards/${slug}`);
		return data;
	};

	const {
		data: heroCard,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['heroCard', slug],
		queryFn: fetchHeroCard,
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>An error occurred: {error.message}</p>;

	return (
		<>
			<Box
				sx={{
					my: 6,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{/* Title */}
				<Typography
					variant="h3"
					component="h1"
					fontFamily={'Cinzel'}
					textAlign="center"
					width={'100%'}>
					{heroCard.title}
				</Typography>
				{/* Subtitle */}
				<Typography
					variant="body1"
					fontSize={'1.3rem'}
					gutterBottom
					textAlign={'center'}
					fontFamily={'Spectral'}
					width={'75%'}>
					<q>{heroCard.subtitle}</q>
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					mb: 15,
				}}>
				{heroCard.video_src ? (
					<video
						controls={true}
						autoPlay={true}
						loop={true}
						muted
						width={'100%'}
						playsInline>
						<source src={heroCard.video_src} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				) : (
					<img
						src={heroCard.image_src}
						alt={heroCard.title}
						style={{ width: '100%', height: 'auto' }}
					/>
				)}
			</Box>
		</>
	);
};

export default Hero;
