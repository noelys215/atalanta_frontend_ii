import axios from 'axios';

export function getProducts(department: string, category: string) {
	return axios
		.get(
			`${import.meta.env.VITE_API_URL}/products?department=${department}&category=${category}`
		)
		.then((response) => response.data)
		.catch((error) => {
			throw new Error(`Failed to fetch products: ${error.message}`);
		});
}

export function getProductBySlug(slug: string) {
	return axios
		.get(`${import.meta.env.VITE_API_URL}/products/slug/${slug}`)
		.then((response) => response.data)
		.catch((error) => {
			throw new Error(`Failed to fetch product: ${error.message}`);
		});
}
