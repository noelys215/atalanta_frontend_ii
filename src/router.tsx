import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import WomanTops from './routes/woman/tops/tops';
import ProductScreen from '../components/ProductScreen';
import WomanBottoms from './routes/woman/bottoms/bottoms';
import WomanFootwear from './routes/woman/footwear/footwear';

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
