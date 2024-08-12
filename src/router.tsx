import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Dashboard } from './routes/Dashboard';
import Contact from './routes/Contact';

export const router = createBrowserRouter([
	{ path: '/', element: <App /> },
	{ path: '/dashboard', element: <Dashboard /> },
	{ path: '/contact', element: <Contact /> },
]);
