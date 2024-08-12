import axios from 'axios';

export function getProducts() {
	return axios
		.get('http://127.0.0.1:8000/api/products')
		.then((response) => console.log(response.data));
}
