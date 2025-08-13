import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// 请求拦截器
instance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 在请求发送前做一些处理，比如添加 token
		const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
instance.interceptors.response.use(
	(response: AxiosResponse) => {
		// 对响应数据做一些处理
		return response.data;
	},
	(error) => {
		// 处理响应错误
		if (error.response?.status === 401 && typeof window !== "undefined") {
			// token 过期，跳转到登录页
			localStorage.removeItem("token");
			window.location.href = "/login";
		}

		return Promise.reject(error);
	}
);

export default instance;
