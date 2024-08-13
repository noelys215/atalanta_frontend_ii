import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import WomanTops from './routes/woman/WomanTops';
import ProductScreen from '../components/ProductScreen';
import WomanBottoms from './routes/woman/WomanBottoms';
import WomanFootwear from './routes/woman/WomanFootwear';
import ManTops from './routes/man/ManTops';
import ManBottoms from './routes/man/ManBottoms';
import ManFootwear from './routes/man/ManFootwear';
import Accessories from './routes/accessories/all/accessories';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/woman/tops', element: <WomanTops /> },
			{ path: '/woman/bottoms', element: <WomanBottoms /> },
			{ path: '/woman/footwear', element: <WomanFootwear /> },
			{ path: '/man/tops', element: <ManTops /> },
			{ path: '/man/bottoms', element: <ManBottoms /> },
			{ path: '/man/footwear', element: <ManFootwear /> },
			{ path: '/accessories/all', element: <Accessories /> },
			{
				path: '/:department/:category/:slug',
				element: <ProductScreen />,
			},
		],
	},
]);
