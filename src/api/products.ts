import axios from 'axios';

export function getProducts(department: string) {
	return axios
		.get(`http://127.0.0.1:8000/api/products?department=${department}`)
		.then((response) => response.data)
		.catch((error) => {
			throw new Error(`Failed to fetch products: ${error.message}`);
		});
}
