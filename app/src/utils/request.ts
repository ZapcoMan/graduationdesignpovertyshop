import http from "firstui-uni/components/firstui/fui-request";
import { baseURL } from "./index";

//初始化请求配置项
http.create({
  //接口域名
  host: baseURL,
  header: {
    // 'content-type': 'application/x-www-form-urlencoded'
  },
});

//请求拦截
http.interceptors.request.use((config: any) => {
  //请求之前可在请求头中加入token等信息;
  let token = uni.getStorageSync("token");
  if (token) {
    if (config.header) {
      config.header["token"] = token;
    } else {
      config.header = {
        token: token,
      };
    }
  }

  return config;
});

//响应拦截
http.interceptors.response.use((response: any) => {
  return response?.data || {};
});

export default http;
