import Axios, { AxiosError, AxiosResponse, Canceler, InternalAxiosRequestConfig } from 'axios';
import { AxiosErrorModel } from './models/error.model';
import NProgress from 'nprogress';
import { RequestQueue } from './axios.queue';
import Cookies from 'js-cookie';
import { message as antdMessage } from 'antd';

export const axios = Axios.create({
  // baseURL: 
});

//  请求队列
const requestQueue = new RequestQueue();

axios.interceptors.request.use((config) => {
  NProgress.start();
  //  config
  let canceler!: Canceler;
  config = Object.assign({ timeout: 36000 } as InternalAxiosRequestConfig<any>, config, {
    withCredentials: true,
    headers: {
      ...config.headers,
      Authorization: config.headers?.Authorization ?? `Bearer ${Cookies.get('token')}`
    },
    cancelToken: new Axios.CancelToken((cancel) => {
      canceler = cancel;
    }),
    responseEncoding: 'utf8',
  } as InternalAxiosRequestConfig<any>);

  // 将请求加入请求队列
  requestQueue.addRequest('', { ...config, canceler });
  return config;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done();
    requestQueue.removeRequest(response.config.url!);
    return response.data;
  },
  (error: AxiosError<AxiosErrorModel>) => {
    return new Promise((resolve, reject) => {
      NProgress.done();
      const { message, response } = error;
      if (!response || message === 'Network Error') {
        if (navigator.onLine) {
          antdMessage.error('未知错误！');
        } else {
          antdMessage.error('网络异常！');
        }
      } else {
        if (response?.status === 503) {
          window.location.href = '/503';
          return;
        }

        if (response?.status === 401) {
          const getItemConfig = requestQueue.peddingRequests.get(String(Math.random() * 10));
          if (getItemConfig) {
            requestQueue.addRequest('', {
              resolveCallback: (configAfterUpdateAuthorization) => resolve(axios(configAfterUpdateAuthorization))
            })
          }
          return;
        }
        reject(new AxiosErrorModel({ ...response.data }));
      }
    })
  },
);


