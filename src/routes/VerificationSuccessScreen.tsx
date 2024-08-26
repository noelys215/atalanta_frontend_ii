import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const VerificationSuccessScreen: React.FC = () => {
	const navigate = useNavigate();

	const handleLoginRedirect = () => {
		navigate('/');
	};

	return (
		<Layout title="Email Verified">
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				mt={8}
				minHeight="60vh">
				<Typography variant="h4" gutterBottom textAlign={'center'}>
					Email Verified Successfully!
				</Typography>
				<Typography variant="body1" gutterBottom textAlign={'center'}>
					Thank you for verifying your email address. You can now log in.
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={handleLoginRedirect}
					sx={{ mt: 3 }}>
					Home Page
				</Button>
			</Box>
		</Layout>
	);
};

export default VerificationSuccessScreen;
