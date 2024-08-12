import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';

export const Dashboard = () => {
	const {
		status,
		error,
		data: products,
	} = useQuery({
		queryKey: ['products', 'woman'],
		queryFn: () => getProducts('woman'),
	});

	if (status == 'pending') return <div>Loading...</div>;
	if (status === 'error') return <div>Error: {error.message}</div>;
	console.log(products);

	return (
		<div>
			<h1>Products for Women</h1>
			<ul></ul>
		</div>
	);
};
