import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import { Dashboard } from './routes/Dashboard';
import Contact from './routes/Contact';
import App from './App';
import { QueryClient } from '@tanstack/react-query';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout queryClient={new QueryClient()} />,
		children: [
			{ path: '/', element: <App /> },
			{ path: '/dashboard', element: <Dashboard /> },
			{ path: '/contact', element: <Contact /> },
		],
	},
]);
