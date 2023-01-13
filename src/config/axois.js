import axios from 'axios'
import baseURL from './config'

const axiosInstance = axios.create(baseURL);

axiosInstance.interceptors.request.use(
	async (cfg) => {
		const token = localStorage.getItem('token');
		if (token) {
			cfg.headers['Authorization'] = `Bearer ${token}`;
		}
		return cfg;
	},
	(error) => {
		Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error && error.response && error.response.status === 401) {
			// logout
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
