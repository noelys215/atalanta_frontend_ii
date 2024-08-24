import { Box, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface SeasonalCardProps {
	slug: string;
}

export const SeasonalCard: React.FC<SeasonalCardProps> = ({ slug }) => {
	const fetchSeasonalCard = async (slug: string) => {
		const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/seasonal-cards/${slug}`);
		return data;
	};

	const { data, isLoading, error } = useQuery({
		queryKey: ['seasonalCard', slug],
		queryFn: () => fetchSeasonalCard(slug),
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>An error occurred: {error.message}</p>;

	console.log(data);

	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: 'auto',
				backgroundColor: '#fffcf7',
				mb: 10,
				p: 2.5,
			}}>
			{/* Title */}
			<Typography variant="h2" fontSize={'1.875rem'} gutterBottom textAlign={'center'}>
				{data.title}
			</Typography>
			{/* Subtitle */}
			{data.subtitle && (
				<Typography
					lineHeight={1.5}
					variant="body2"
					fontSize={'1.1rem'}
					gutterBottom
					textAlign={'center'}
					width={'80%'}>
					<q>{data.subtitle}</q>
				</Typography>
			)}
			<Typography
				lineHeight={1.5}
				variant="body2"
				fontSize={'1.1rem'}
				gutterBottom
				textAlign={'center'}
				width={'80%'}>
				{data.description}
			</Typography>
			<Link to={data.link} style={{ textDecoration: 'none' }}>
				<Typography
					textAlign={'center'}
					sx={{
						mb: 5,
						cursor: 'pointer',
						textDecoration: 'underline',
						'&:hover': {
							textDecoration: 'none',
						},
					}}>
					{data.link_title}
				</Typography>
			</Link>
			<Box
				sx={{
					width: '65%',
				}}>
				<img
					src={data.image_src}
					alt={data.title}
					style={{ width: '100%', height: 'auto' }}
				/>
			</Box>
		</Paper>
	);
};
