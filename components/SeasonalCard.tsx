import { Box, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface SeasonalCardProps {
	title: string;
	desc: string;
	linkToSeasonal: string;
	linkTitle: string;
	imgSrc: string;
	quote?: string;
}

export const SeasonalCard: React.FC<SeasonalCardProps> = ({
	title,
	desc,
	linkToSeasonal,
	linkTitle,
	imgSrc,
	quote,
}) => {
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
			<Typography variant="h2" fontSize={'1.875rem'} gutterBottom textAlign={'center'}>
				{title}
			</Typography>
			<Typography
				lineHeight={1.5}
				variant="body2"
				// component="body"
				fontSize={'1.1rem'}
				gutterBottom
				textAlign={'center'}
				width={'80%'}>
				<q>{quote}</q>
			</Typography>
			<Typography
				lineHeight={1.5}
				variant="body2"
				// component="body"
				fontSize={'1.1rem'}
				gutterBottom
				textAlign={'center'}
				width={'80%'}>
				{desc}
			</Typography>
			<Link href={linkToSeasonal} passHref>
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
					{linkTitle}
				</Typography>
			</Link>
			<Box
				sx={{
					width: '65%',
				}}>
				<Image src={imgSrc} alt="Person running up stairs" width={2400} height={1583} />
			</Box>
		</Paper>
	);
};
