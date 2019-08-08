import { extraUrl } from './env';
const axios = require('axios')
// import qs from 'qs';
import common from './common.js'
import Vue from 'vue'
// 弹框
// import {
// 	Message
// } from 'element-ui';
//路由配置
import router from '@/router'
// import store from '@/store'
// import eConfirm from '@/components/e-confirm'

// import Countly from 'countly-sdk-web';

/**
 * 封装的全局ajax请求
 */
class Axios {
  constructor() {
    this.init();
  };
  getUrl() {
    return extraUrl;
  };
  /**
   * 初始化
   */
  init() {
    // 全局的 axios 默认值
    axios.defaults.baseURL = extraUrl;
    // axios.defaults.withCredentials = true;
    axios.defaults.headers['Content-Type'] = 'application/json';
    // axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
    // 请求拦截器
    axios.interceptors.request.use(config => {
      if (!config.url) {
        console.log("请求地址出错", this, config);
      } else {
      }
      if (common.getSession("userData")) {
        let token = common.getSession("userData").memberToken;
        config.headers['memberToken'] = token;
        // config.headers['memberToken'] = '0661e63d-81da-4a50-be31-df502f74cba7';
      };
      // test
      // config.headers['memberToken'] = '0661e63d-81da-4a50-be31-df502f74cba7';

      return config
    }, err => {
      return Promise.reject(err)
    })

    // 响应拦截器  //由于返回状态不统一，code=200取消
    axios.interceptors.response.use(res => {
      if (res.data.code == 500) {  // 错误信息
        eConfirm.open({});
        return res;
        // return Promise.reject(res.data.msg);
        // alert(res.data.msg)
      } else if (res.data.code == 300) {  // 提示信息
        // Message.error(res.data.msg);
        alert(res.data.msg)
        return res;
      } else if (res.data.code == 301) {  // 提示信息
        console.log({
          msg: res.data.msg,
          type: 3,
          btnContent: "知道了"
        });
        // Message.warning(res.data.msg);
        alert(res.data.msg)
        return res;
      } else if (res.data.code == 303) {  // 提示信息(303暂时没用)
        console.log({
          msg: res.data.msg,
          type: 3,
          btnContent: "知道了"
        });
        return res;
      } else if (res.data.code == 305) {  // 提示信息(305)
        // Message.error(res.data.msg);
        alert(res.data.msg)
        return res;
      } else {
        return res;
      }
    })
  };

  _setUserInfo(data) {
    // 把请求的数据存入vuex
    // store.commit('LOGIN',data);
  }

  /**
   * 判断是否是登录请求
   * @param url
   * @returns {boolean}
   * @private
   */
  _isLogin(url) {
    if (url != '/user/webLogin/login') {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 判断是否返回数据
   * @param data 接收到的数据
   * @returns {boolean}
   * @private
   */
  _isStatus(data) {
    if (data.code == 1) {
      // Message.error(data.message || '请重新登录！');
      alert(data.message || '请重新登录！')
      let URL = window.location.href;
      if (URL.indexOf("check") > -1 || URL.indexOf("experience") > -1 || URL.indexOf("formal") > -1) {
        window.location.href = Vue.prototype.$loginUrl
      } else {
        Vue.prototype.$router.push('/');
      }
      // console.log(data.message || '请重新登录！');
      return false
    } else {
      return true
    }
  }
  // 是否是用户模块请求
  isUserModel(url) {
    if(url.indexOf("/extra/") == 0 || url.indexOf("extra/") == 0){
      axios.defaults.baseURL = extraUrl;
		}

    // Countly.q.push(['start_event', 'response']);
  };
  /**
   * countly记录接口响应
   */
  countlyMonitorResponse(url, type, code) {
  	// Countly.q.push(['end_event', {
  	// 	"key": "response",
  	// 	"count": 1,
  	// 	"segmentation": {
  	// 		"url": url,
  	// 		"type": type,
  	// 		"code": code
  	// 	}
  	// }]);
  };
  /**
   * GET 请求 {es6解构赋值}
   * @param type 包含url信息
   * @param data 需要发送的参数
   * @returns {Promise}
   * @constructor
   */
  get(url, urlData, data = 0) {
    this.isUserModel(url);
    let oUrl=url;
    // 创建一个promise对象
    // let data=JSON.stringify(datas);
    // if(data==undefined){
    this.promise = new Promise((resolve, reject) => {
      if (data == 0) {
        url += '?';
        for (const item in urlData) {
          // url += '/' + urlData[item];
          // url += '?' +item+'=' +urlData[item];
          url += item + '=' + urlData[item] + '&';
        };
      } else if (data == 1) {
        for (const item in urlData) {
          url += '/' + urlData[item];
          // url += '?' +item+'=' +urlData[item];
        };
      }

      axios.get(url).then((res) => {
        // debugger
		this.countlyMonitorResponse(oUrl, 'get', res.data.code);
        if (this._isStatus(res.data)) {
          resolve(res.data);
        }
      }).catch((err) => {
        // console.log(err);
        // Message.error(err);
      })
    })

    return this.promise;
  };
  /**
   * GET 请求(文件流格式) {es6解构赋值}
   * @param type 包含url信息
   * @param data 需要发送的参数
   * @returns {Promise}
   * @constructor
   */
  getBuffer(url, urlData, data = 0) {
    this.isUserModel(url);
    let oUrl=url;
    // 创建一个promise对象
    // let data=JSON.stringify(datas);
    // if(data==undefined){
    this.promise = new Promise((resolve, reject) => {
      if (data == 0) {
        url += '?';
        for (const item in urlData) {
          // url += '/' + urlData[item];
          // url += '?' +item+'=' +urlData[item];
          url += item + '=' + urlData[item] + '&';
        };
      } else if (data == 1) {
        for (const item in urlData) {
          url += '/' + urlData[item];
          // url += '?' +item+'=' +urlData[item];
        };
      }
      axios.get(url, {
				responseType: 'arraybuffer'
			}).then((res) => {
        // debugger
		    this.countlyMonitorResponse(oUrl, 'get', res.data.code);
        if (this._isStatus(res.data)) {
          resolve(res.data);
        }
      }).catch((err) => {
        console.log(err)
        // console.log(err);
        // Message.error(err);
      })
    })

    return this.promise;
  };

  /**
   * POST 请求
   * @param type Object 包含url信息
   * @param data Object 需要发送的参数
   * @param urlData Object 需要拼接到地址栏的参数
   * @returns {Promise}
   * @constructor
   */
  post(url, Data) {
    // this.isUserModel(url);
    let oUrl=url;
    this.promise = new Promise((resolve, reject) => {
      axios.post(url, Data).then((res) => {
		this.countlyMonitorResponse(oUrl, 'get', res.data.code);
        // 是否请求成功
        if (this._isStatus(res.data)) {
          // 是否需要存数据
          if (this._isLogin(url)) {
            this._setUserInfo(res.data)
          };
          resolve(res.data);
        };
      }).catch((err) => {
        // console.log(err);
      })
    })
    return this.promise;
  };
  /**
   * PUT 请求
   */
  put(url, Data) {
    // this.isUserModel(url);
    let oUrl=url;
    this.promise = new Promise((resolve, reject) => {
      axios.put(url, Data).then((res) => {
		this.countlyMonitorResponse(oUrl, 'get', res.data.code);
        // 是否请求成功
        if (this._isStatus(res.data)) {
          // 是否需要存数据
          if (this._isLogin(url)) {
            this._setUserInfo(res.data)
          };
          resolve(res.data);
        };
      }).catch((err) => {
        // console.log(err);
      })
    })
    return this.promise;
  };
  /**
   * DELETE 请求
   */
  delete(url, urlData, data = 0) {
    // this.isUserModel(url);
    let oUrl=url;
    this.promise = new Promise((resolve, reject) => {
      if (data == 0) {
        for (const item in urlData) {
          url += '/' + urlData[item];
        };
      }
      axios.delete(url).then((res) => {
		this.countlyMonitorResponse(oUrl, 'get', res.data.code);
        // 是否请求成功
        if (this._isStatus(res.data)) {
          // 是否需要存数据
          if (this._isLogin(url)) {
            this._setUserInfo(res.data)
          };
          resolve(res.data);
        };
      }).catch((err) => {
        // console.log(err);
      })
    })
    return this.promise;
  };
};
let ajax = new Axios();
export default ajax;
