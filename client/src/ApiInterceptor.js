import axios from 'axios';

const api = (user) => {
	const token = user.token; //Update by masombu8ka
	const instance = axios.create({
		baseURL: 'http://localhost:5000/api/v1',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	instance.interceptors.response.use(
		(response) => response,
		(error) => {
			return Promise.reject(error);
		}
	);
	return instance;
};

export default api;
