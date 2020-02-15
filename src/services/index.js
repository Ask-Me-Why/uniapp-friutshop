/*
 * @Author: askMeWhy
 * @Date:   2018-07-05 09:47:04
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2020-02-10 14:20:12
 */
import { merge, ajax } from '@/utils';
import API_CONFIG from './api.js';
import { API_DEFAULT_CONFIG } from './config.js';

/**
 * 接口类
 * @DateTime 2018-07-05
 * 向外暴露 server 和 info 属性
 *
 * 调用方式
 * import Api from '@/services'
 *
 * Api.server['namespace/name']()
 * 该属性使用API_CONFIG里的配置属性封装了请求方式 最终返回一个Promise
 * Api.info['namespace/name']
 * 该属性会直接返回API_CONFIG里的配置属性，并每个配置项会多返回completePath
 * completePath: 是baseUrl加上配置的path的完整路径
 *
 */
import store from '@/store';

class ServiceInstance {
    constructor(options) {
        this.server = {};
        this.info = {};
        this.baseUrl = options.BaseURL || '';
        this.apiBuild(options);
    }

    apiBuild({
        BaseURL = '',
        MockURL = '',
        config = {}
    }) {
        const _self = this;
        Object.keys(config).map(once => {
            const cur = config[once];
            const { name, params, method, path, namespace, mock, headers, setCommonParam } = cur;
            const apiName = `${namespace ? namespace + '/' : ''}${name}`;
            let url = '';
            if (mock !== void 0 && mock.open) {
                url = `${MockURL}${mock.path}`;
            } else {
                url = `${BaseURL}${path}`;
            }
            Object.defineProperty(this.server, apiName, {
                value(_params = { data: {}, headers: {}, params: {}, loader: true }) {
                    const _data = merge(true, {}, params, _params.data || {});
                    const _header = merge(true, {}, headers || {}, _params.headers || {});
                    let _url = url;
                    if (_self.hasUrlParams(_url)) {
                        _url = _self.buildUrlParams(url, _params.params, apiName);
                    }

                    if (setCommonParam) {
                        const user = store.getters.getUser;
                        if (user.isSignIn) {
                            _header['x-auth-token'] = user.auth.token;
                        }
                    }
                    return ajax({
                        method: method,
                        url: _url,
                        data: _data,
                        loader: _params.loader === void 0 ? true : _params.loader,
                        headers: {
                            ..._header
                        },
                        before: (r) => {},
                        complete: (r) => {}
                    });
                }
            });
            Object.defineProperty(this.info, apiName, {
                value: {
                    completePath: url,
                    ...cur
                }
            });
        });
    }

    hasUrlParams(url) {
        const reg = /\/:\w*/g;
        return url.match(reg) !== null;
    }

    buildUrlParams(url, params, apiName) {
        if (params === void 0) {
            throw Error(`请传入"${apiName}"已配置的params`);
        }
        const reg = /\/:\w*/g;
        const u = url.replace(reg, function(p, p2) {
            const key = p.substring(2);
            if (params[key] === void 0) {
                throw Error(`"${apiName}"必须包含已配置的"${key}"`);
            }
            return '/' + params[key];
        });
        return u;
    }
}

export default new ServiceInstance({
    config: API_CONFIG,
    ...API_DEFAULT_CONFIG
});
