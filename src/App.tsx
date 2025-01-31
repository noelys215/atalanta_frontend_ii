import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from './theme';
import createEmotionCache from './createEmotionCache';
import TopBar from '../components/TopBar';
import Copyright from '../components/Copyright';
import '../styles/globals.css';
import { Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider

const clientSideEmotionCache = createEmotionCache();

const App: React.FC = () => {
	const [showChild, setShowChild] = useState(false);

	useEffect(() => {
		setShowChild(true);
	}, []);

	if (!showChild) return null;

	return (
		<CacheProvider value={clientSideEmotionCache}>
			<HelmetProvider>
				{' '}
				{/* Wrap the app with HelmetProvider */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						height: '100vh',
					}}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Provider store={store}>
							<Toaster
								position="bottom-center"
								gutter={8}
								toastOptions={{
									duration: 5000,
									style: {
										background: '#363636',
										color: '#fff',
									},
								}}
							/>
							<TopBar />
							<Outlet />
						</Provider>
						<Copyright />
					</ThemeProvider>
				</Box>
			</HelmetProvider>
		</CacheProvider>
	);
};

export default App;
