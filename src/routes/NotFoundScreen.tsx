import React from 'react';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

const NotFoundScreen: React.FC = () => {
	return (
		<Layout title="Page Not Found">
			<Box mb={'auto'} display="flex" justifyContent="center" alignItems="flex-start" mt={8}>
				<Grid
					container
					maxWidth="sm"
					sx={{
						backgroundColor: '#fffcf7',
						padding: 5,
						borderRadius: 2,
						boxShadow: '0 0 10px rgba(0,0,0,0.1)',
						textAlign: 'center',
					}}>
					<Typography variant="h5" gutterBottom align="center" width="100%">
						404 - Page Not Found
					</Typography>

					<Typography sx={{ mt: 4, mb: 4, textAlign: 'center', width: '100%' }}>
						Sorry, the page you are looking for does not exist.
					</Typography>
					<Divider sx={{ mb: 4, justifySelf: 'center' }} />
					<Link to="/" style={{ textDecoration: 'none', width: '100%' }}>
						<Button
							fullWidth
							variant="contained"
							sx={{
								backgroundColor: 'rgb(68, 68, 68)',
							}}>
							Go Back to Home
						</Button>
					</Link>
				</Grid>
			</Box>
		</Layout>
	);
};

export default NotFoundScreen;
