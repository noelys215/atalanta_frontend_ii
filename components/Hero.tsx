import React from 'react';
import { Box, Typography } from '@mui/material';

const Hero: React.FC = () => {
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
				{/* Name */}
				<Typography
					variant="h3"
					component="h1"
					fontFamily={'Cinzel'}
					textAlign="center"
					width={'100%'}>
					Atalanta Athletic Club
				</Typography>
				<Typography
					variant="body1"
					fontSize={'1.3rem'}
					gutterBottom
					textAlign={'center'}
					fontFamily={'Source Code Pro'}
					width={'75%'}>
					<q>
						The race continued as I hammered up the trail, passing rocks and trees as if
						they were standing still.
					</q>
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					mb: 15,
				}}>
				<video controls={true} autoPlay={true} loop={true} muted width={'100%'} playsInline>
					<source
						src={
							'https://res.cloudinary.com/dshviljjs/video/upload/v1670986486/Atalanta%20Uploads/STATIC/running_z2wwab.mp4'
						}
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>
			</Box>
		</>
	);
};

export default Hero;
