import { merge } from '@/utils';
import store from '@/store';

export default async(options) => {
    let opt = {
        url: '',
        proxy: '',
        method: 'GET',
        data: {},
        loader: true,
        headers: {}
    };
    opt = merge(true, opt, options);
    opt.method = opt.method.toUpperCase();
    requestHanlder(opt);
    const response = await uni.request({
        method: opt.method,
        url: opt.url,
        data: opt.data,
        timeout: 30000,
        dataType: 'json',
        header: {
            ...opt.headers
        }
    });
    console.log(response);
    return responseHanlder(response[1], opt);
};

const requestHanlder = (opt) => {
    if (opt.loader) {
        store.dispatch('ajaxRequestStart');
    }
};
const responseHanlder = (res, opt) => {
    console.log(res);
    if (opt.loader) {
        store.dispatch('ajaxRequestEnd');
    }

    if (res === void 0 || (res.message.indexOf('Network') !== -1 && res.message.indexOf('Error') !== -1)) {
        // console.log('服务器地址不存在！');
        return Promise.reject(new Error('服务器地址不存在！'));
    }

    if (res.statusCode === 200) {
        return Promise.resolve(res);
    }
    const _status = res.statusCode;
    switch (_status) {
    case 400:
        res.message = '错误的请求';
        break;
    case 403:
        res.message = '拒绝访问';
        break;
    case 404:
        res.message = `错误的地址: ${opt.url}`;
        break;
    case 408:
        res.message = '请求超时';
        break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505:
        res.message = '服务器错误';
        break;
    default:
        res.message = '未知错误';
        break;
    }
    return Promise.reject(new Error(res.message));
};
