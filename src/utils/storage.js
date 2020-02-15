/**
 *
 * uni-app的Storage在不同端的实现不同：
 *
 *    H5端为localStorage，浏览器限制5M大小，是缓存概念，可能会被清理
 *    App端为原生的plus.storage，无大小限制，不是缓存，是持久化的
 *    各个小程序端为其自带的storage api，数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。
 *    微信小程序单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
 *    支付宝小程序单条数据转换成字符串后，字符串长度最大200*1024。同一个支付宝用户，同一个小程序缓存总上限为10MB。
 *    百度、头条小程序文档未说明大小限制
 * @type {Object}
 */
export const uniStorage = {
    getItem(key) {
        let _r = uni.getStorageSync(key);
        if (/^\{.*\}$/.test(_r)) _r = JSON.parse(_r);
        return _r;
    },
    setItem(key, value) {
        if (typeof value === typeof {}) value = JSON.stringify(value);
        uni.setStorageSync(key, value);
    },
    removeItem(key) {
        if (Object.prototype.toString.call(key) === '[object String]') {
            uni.removeStorageSync(key);
            return;
        }
        if (Object.prototype.toString.call(key) === '[object Array]' && key.length === 0) {
            uni.removeStorageSync(key);
        } else {
            key.map(index => {
                uni.removeStorageSync(index);
            });
        }
    }
};

// h5端使用
export const sessionStorage = {
    getItem(key) {
        let _r = window.sessionStorage.getItem(key);
        if (/^\{.*\}$/.test(_r)) _r = JSON.parse(_r);
        return _r;
    },
    setItem(key, value) {
        if (typeof value === typeof {}) value = JSON.stringify(value);
        window.sessionStorage.setItem(key, value);
    },
    removeItem(key) {
        if (Object.prototype.toString.call(key) === '[object String]') {
            window.sessionStorage.removeItem(key);
            return;
        }
        if (Object.prototype.toString.call(key) === '[object Array]' && key.length === 0) {
            window.sessionStorage.removeItem(key);
        } else {
            key.map(index => {
                window.sessionStorage.removeItem(index);
            });
        }
    }
};
