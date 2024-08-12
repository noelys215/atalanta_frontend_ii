import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './routes/Home'; // Assuming Home is the equivalent of your Next.js index.tsx
import Contact from './routes/Contact';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/contact', element: <Contact /> },
		],
	},
]);
