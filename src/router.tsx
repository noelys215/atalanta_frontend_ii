import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import WomanTops from './routes/woman/WomanTops';
import ProductScreen from '../components/ProductScreen';
import WomanBottoms from './routes/woman/WomanBottoms';
import WomanFootwear from './routes/woman/WomanFootwear';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/woman/tops', element: <WomanTops /> },
			{ path: '/woman/bottoms', element: <WomanBottoms /> },
			{ path: '/woman/footwear', element: <WomanFootwear /> },
			{
				path: '/:department/:category/:slug',
				element: <ProductScreen />,
			},
		],
	},
]);
