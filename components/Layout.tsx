import React from 'react';
import { Container, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { Helmet } from 'react-helmet';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import TopBar from '../components/TopBar';
import Copyright from '../components/Copyright';
import createEmotionCache from '../src/createEmotionCache';
import theme from '../src/theme';
import { store } from '../store/store';

const clientSideEmotionCache = createEmotionCache();

const Layout = ({ children, title = 'Atalanta', queryClient }: any) => {
	return (
		<CacheProvider value={clientSideEmotionCache}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					height: '100vh',
				}}>
				<Helmet>
					<title>{title}</title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Helmet>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Provider store={store}>
						<TopBar />
						<PayPalScriptProvider deferLoading={true}>
							<QueryClientProvider client={queryClient}>
								<Container maxWidth="xl" sx={{ mb: 'auto' }}>
									{children}
								</Container>
								<ReactQueryDevtools />
							</QueryClientProvider>
						</PayPalScriptProvider>
					</Provider>
					<Copyright />
				</ThemeProvider>
			</Box>
		</CacheProvider>
	);
};

export default Layout;
