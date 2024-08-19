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
import CartScreen from './routes/CartScreen';
import Accessories from './routes/accessories/all/Accessories';
import ShippingScreen from './routes/ShippingScreen';
import PaymentScreen from './routes/PaymentScreen';
import PlaceOrderScreen from './routes/PlaceOrderScreen';
import RegisterScreen from './routes/RegisterScreen';
import AccountScreen from './routes/AccountScreen';
import SearchScreen from './routes/Search';
import OrderDetailsScreen from './routes/OrderDetailsScreen';
import OrderHistoryScreen from './routes/OrderHistoryScreen';

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
			{ path: '/cart', element: <CartScreen /> },
			{ path: '/shipping', element: <ShippingScreen /> },
			{ path: '/payment', element: <PaymentScreen /> },
			{ path: '/placeorder', element: <PlaceOrderScreen /> },
			{ path: '/register', element: <RegisterScreen /> },
			{ path: '/account', element: <AccountScreen /> },
			{ path: '/search', element: <SearchScreen /> },
			{ path: '/orderhistory', element: <OrderHistoryScreen /> },
			{
				path: '/:department/:category/:slug',
				element: <ProductScreen />,
			},
			{
				path: '/return', // The route for the OrderDetailsScreen
				element: <OrderDetailsScreen />,
			},
		],
	},
]);
