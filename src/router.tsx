import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import WomanTops from './routes/woman/tops/tops';
import ProductScreen from '../components/ProductScreen';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/woman', element: <WomanTops /> },
			{
				path: '/:department/:category/:slug',
				element: <ProductScreen />,
			},
		],
	},
]);
