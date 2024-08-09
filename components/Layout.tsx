import { Container } from '@mui/material';
import Head from 'next/head';

const Layout = ({ children, title }: any) => {
	return (
		<>
			<Container maxWidth="xl" sx={{ mb: 'auto' }}>
				<Head>
					<title>{title} - Atalanta</title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				{children}
			</Container>
		</>
	);
};

export default Layout;
