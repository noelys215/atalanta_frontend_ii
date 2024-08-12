import React, { ReactNode } from 'react';
import { Container } from '@mui/material';
import { Helmet } from 'react-helmet';

interface LayoutProps {
	children: ReactNode;
	title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
	return (
		<Container maxWidth="xl" sx={{ mb: 'auto' }}>
			<Helmet>
				<title>{title} - Atalanta</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Helmet>
			{children}
		</Container>
	);
};

export default Layout;
