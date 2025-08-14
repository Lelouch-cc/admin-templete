/**
 * 延迟函数
 * @param ms 毫秒数
 */
export const sleep = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间(ms)
 */
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): ((...args: Parameters<T>) => void) => {
	let timeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};

/**
 * 节流函数
 * @param func 要节流的函数
 * @param limit 时间间隔(ms)
 */
export const throttle = <T extends (...args: any[]) => any>(func: T, limit: number): ((...args: Parameters<T>) => void) => {
	let inThrottle: boolean;
	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
};

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @param decimals 小数位数
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
	if (bytes === 0) return "0 B";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["B", "KB", "MB", "GB", "TB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/**
 * 生成随机字符串
 * @param length 长度
 */
export const generateRandomString = (length: number): string => {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 */
export const deepClone = <T>(obj: T): T => {
	if (obj === null || typeof obj !== "object") return obj;
	if (obj instanceof Date) return new Date(obj.getTime()) as T;
	if (obj instanceof Array) return obj.map((item) => deepClone(item)) as T;
	if (typeof obj === "object") {
		const clonedObj = {} as T;
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				clonedObj[key] = deepClone(obj[key]);
			}
		}
		return clonedObj;
	}
	return obj;
};

/**
 * 将对象转换为 URL 查询参数
 * @param obj 参数对象
 */
export const objectToQueryString = (obj: Record<string, any>): string => {
	const params = new URLSearchParams();

	Object.keys(obj).forEach((key) => {
		const value = obj[key];
		if (value !== null && value !== undefined && value !== "") {
			if (Array.isArray(value)) {
				value.forEach((item) => params.append(key, String(item)));
			} else {
				params.append(key, String(value));
			}
		}
	});

	return params.toString();
};

/**
 * 从 URL 查询参数解析对象
 * @param search 查询参数字符串
 */
export const queryStringToObject = (search: string): Record<string, string> => {
	const params = new URLSearchParams(search);
	const result: Record<string, string> = {};

	params.forEach((value, key) => {
		result[key] = value;
	});

	return result;
};

/**
 * 检查是否为移动设备
 */
export const isMobile = (): boolean => {
	if (typeof window === "undefined") return false;
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
	try {
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(text);
			return true;
		} else {
			const textArea = document.createElement("textarea");
			textArea.value = text;
			textArea.style.position = "fixed";
			textArea.style.left = "-999999px";
			textArea.style.top = "-999999px";
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			const success = document.execCommand("copy");
			textArea.remove();
			return success;
		}
	} catch (error) {
		console.error("复制到剪贴板失败:", error);
		return false;
	}
};

/**
 * 获取文件扩展名
 * @param filename 文件名
 */
export const getFileExtension = (filename: string): string => {
	return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

/**
 * 验证邮箱格式
 * @param email 邮箱地址
 */
export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

/**
 * 验证手机号格式（中国大陆）
 * @param phone 手机号
 */
export const isValidPhone = (phone: string): boolean => {
	const phoneRegex = /^1[3-9]\d{9}$/;
	return phoneRegex.test(phone);
};

/**
 * 格式化数字为千位分隔符
 * @param num 数字
 */
export const formatNumber = (num: number): string => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * 将数字转换为中文数字
 * @param num 数字 (0-99)
 */
export const numberToChinese = (num: number): string => {
	const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
	const units = ["", "十"];

	if (num === 0) return digits[0];
	if (num < 10) return digits[num];
	if (num === 10) return units[1];
	if (num < 20) return units[1] + digits[num - 10];

	const tens = Math.floor(num / 10);
	const ones = num % 10;

	if (ones === 0) {
		return digits[tens] + units[1];
	}

	return digits[tens] + units[1] + digits[ones];
};

/**
 * 判断两个数组是否相等
 * @param arr1 数组1
 * @param arr2 数组2
 */
export const arrayEqual = <T>(arr1: T[], arr2: T[]): boolean => {
	if (arr1.length !== arr2.length) return false;
	return arr1.every((value, index) => value === arr2[index]);
};

/**
 * 数组去重
 * @param arr 数组
 */
export const unique = <T>(arr: T[]): T[] => {
	return [...new Set(arr)];
};

/**
 * 数组按对象属性去重
 * @param arr 数组
 * @param key 属性名
 */
export const uniqueBy = <T>(arr: T[], key: keyof T): T[] => {
	const seen = new Set();
	return arr.filter((item) => {
		const value = item[key];
		if (seen.has(value)) {
			return false;
		}
		seen.add(value);
		return true;
	});
};

/**
 * 数组分组
 * @param arr 数组
 * @param key 分组依据的属性名
 */
export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
	return arr.reduce((groups, item) => {
		const group = String(item[key]);
		if (!groups[group]) {
			groups[group] = [];
		}
		groups[group].push(item);
		return groups;
	}, {} as Record<string, T[]>);
};

/**
 * 首字母大写
 * @param str 字符串
 */
export const capitalize = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * 驼峰转连字符
 * @param str 驼峰字符串
 */
export const camelToKebab = (str: string): string => {
	return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

/**
 * 连字符转驼峰
 * @param str 连字符字符串
 */
export const kebabToCamel = (str: string): string => {
	return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * 格式化时间
 * @param date 日期对象或时间戳
 * @param format 格式字符串，如 'YYYY-MM-DD HH:mm:ss'
 */
export const formatDate = (date: Date | number, format: string = "YYYY-MM-DD HH:mm:ss"): string => {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	const hours = String(d.getHours()).padStart(2, "0");
	const minutes = String(d.getMinutes()).padStart(2, "0");
	const seconds = String(d.getSeconds()).padStart(2, "0");

	return format
		.replace("YYYY", String(year))
		.replace("MM", month)
		.replace("DD", day)
		.replace("HH", hours)
		.replace("mm", minutes)
		.replace("ss", seconds);
};

/**
 * 获取相对时间描述
 * @param date 日期对象或时间戳
 */
export const getRelativeTime = (date: Date | number): string => {
	const now = new Date().getTime();
	const targetTime = new Date(date).getTime();
	const diff = now - targetTime;

	const minute = 60 * 1000;
	const hour = 60 * minute;
	const day = 24 * hour;
	const week = 7 * day;
	const month = 30 * day;
	const year = 365 * day;

	if (diff < minute) return "刚刚";
	if (diff < hour) return `${Math.floor(diff / minute)}分钟前`;
	if (diff < day) return `${Math.floor(diff / hour)}小时前`;
	if (diff < week) return `${Math.floor(diff / day)}天前`;
	if (diff < month) return `${Math.floor(diff / week)}周前`;
	if (diff < year) return `${Math.floor(diff / month)}个月前`;
	return `${Math.floor(diff / year)}年前`;
};

/**
 * 生成UUID
 */
export const generateUUID = (): string => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};
