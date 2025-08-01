import axios from 'axios';
import { message } from 'antd';
import { getToken, removeToken } from '@/utils/token';

// 创建axios实例
const request = axios.create({
  baseURL: process.env.UMI_APP_API_URL || '/api',
  timeout: 10000,
});

// 请求拦截器(自动添加token到请求头)
request.interceptors.request.use(
  (config) => {
    // 确保headers对象存在
    config.headers = config.headers || {};
    
    // 自动添加token到请求头（如果存在）
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 可以在这里添加其他通用请求头
    // config.headers['Content-Type'] = 'application/json';
    // config.headers['X-Requested-With'] = 'XMLHttpRequest';
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器(处理响应数据,获取数据，处理错误)
request.interceptors.response.use(
  (response) => {
    const { data } = response;
    
    // 根据业务状态码处理响应
    if (data.success) {
      return data;
    } else {
      // 业务错误处理
      message.error(data.message || '请求失败');
      return Promise.reject(new Error(data.message || '请求失败'));
    }
  },
  (error) => {
    // HTTP状态码错误处理
    if (error.response?.status === 401) {
      // token过期或无效
      message.error('登录已过期，请重新登录');
      removeToken();
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      message.error('没有权限访问');
    } else if (error.response?.status === 500) {
      message.error('服务器内部错误');
    } else {
      message.error(error.message || '网络错误');
    }
    return Promise.reject(error);
  }
);

export default request;