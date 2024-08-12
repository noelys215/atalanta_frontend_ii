import { Box, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import spring from '../public/assets/springrunning.jpg';

const SpringCard: React.FC = () => {
	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: 750,
				backgroundColor: '#fffcf7',
				mb: 5,
			}}>
			<Typography variant="h4" gutterBottom textAlign={'center'}>
				Spring is in the air!
			</Typography>
			<Typography
				variant="body2"
				fontSize={'1.1rem'}
				gutterBottom
				textAlign={'center'}
				width={'60%'}>
				<q>
					Spring is far more than just a changing of seasons; it is a rebirth of the
					spirit
				</q>
			</Typography>
			<Link to={'/account'} style={{ textDecoration: 'none' }}>
				<Typography
					sx={{
						mb: 5,
						cursor: 'pointer',
						textDecoration: 'underline',
						'&:hover': {
							textDecoration: 'none',
						},
					}}>
					Discover the 2022 Spring Collection
				</Typography>
			</Link>
			<Box
				sx={{
					width: '60%',
				}}>
				<img
					src={spring}
					alt="Person running up stairs"
					style={{ width: '100%', height: 'auto' }}
				/>
			</Box>
		</Paper>
	);
};

export default SpringCard;
