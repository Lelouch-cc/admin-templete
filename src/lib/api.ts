import axios from "./axios";

// API 响应数据结构
export interface ApiResponse<T = any> {
	code: number;
	data: {
		code: number;
		data: T;
		error_msg?: string;
	};
	message: string;
}

class ApiService {
	// GET 请求
	async get<T = any>(url: string, params?: any): Promise<ApiResponse<T>> {
		return axios.get(url, { params });
	}

	// POST 请求
	async post<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
		return axios.post(url, data);
	}

	// PUT 请求
	async put<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
		return axios.put(url, data);
	}

	// DELETE 请求
	async delete<T = any>(url: string): Promise<ApiResponse<T>> {
		return axios.delete(url);
	}

	// PATCH 请求
	async patch<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
		return axios.patch(url, data);
	}

	// 上传文件
	async upload<T = any>(url: string, formData: FormData): Promise<ApiResponse<T>> {
		return axios.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	}
}

// 导出单例实例
export const apiService = new ApiService();

// 导出默认实例
export default apiService;
