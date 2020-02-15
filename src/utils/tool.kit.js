/**
 * 刷新标题
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 */
import { localStorage, sessionStorage } from './storage.js';
// 合并对象
export const merge = (...arg) => {
    if (arg.length === 0) {
        throw Error('merge error=>请传入需要合并的对象');
    }
    let target = arg[0] || {};
    let depath = false;
    const length = arg.length;
    let i = 1;

    if (Object.prototype.toString.call(target) === '[object Boolean]') {
        depath = target;
        target = arg[i];
        i++;
    }

    if (typeof target !== 'object') {
        target = {};
    }

    if (i === 2 && length <= 1) {
        throw Error('merge error=>请传入需要合并的对象');
    }

    for (; i < length; i++) {
        const source = arg[i] || {};
        if (source != null) {
            for (const key in source) {
                const src = target[key];
                const copy = source[key];
                if (target === copy) {
                    continue;
                }
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    if (depath && copy && (isObject(copy) || Array.isArray(copy))) {
                        let clone;
                        if (Array.isArray(copy)) {
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && isObject(src) ? src : {};
                        }
                        target[key] = merge(depath, clone, copy);
                    } else if (copy !== void 0) {
                        target[key] = copy;
                    }
                }
            }
        }
    }
    return target;
};

export const isObject = (target) => {
    return Object.prototype.toString.call(target) === '[object Object]';
};
export const isEmptyObject = (obj) => {
    for (const key in obj) {
        return false;
    }
    return true;
};

export const trim = (payload) => {
    let str = payload;
    const whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    for (let i = 0, len = str.length; i < len; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }
    for (let i = str.length - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
    // return payload == null ? "" : (payload + "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

export const getTransfrom = () => {
    let transform = '';
    // document.createElement() 创建元素节点，
    const divStyle = document.createElement('div').style; // 返回的是一组object对象，里面包含了transform
    // 可能涉及到的几种兼容性写法，通过循环，找出浏览器识别的那个
    // 依次为： 全部、Safari 和 Chrome、firefox、ie9、opera
    const transformArr = ['transfrom', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
    for (let i = 0; i < transformArr.length; i++) {
        if (transformArr[i] in divStyle) {
            // 找到以后立刻返回，结束函数
            transform = transformArr[i];
            return transform;
        }
    }
    return transform;
};

export const debounce = function(func, delay) {
    let timer = null;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            func.apply(context, args);
        }, delay);
    };
};

export const detectOrient = function(handlerHorizontal, handlerVertical) {
    const data = localStorage.getItem('J-recordOrientX');
    const cw = document.documentElement.clientWidth;
    let _Width = 0;
    let _Height = 0;
    if (!data) {
        const sw = window.screen.width;
        const sh = window.screen.height;

        // 2.在某些机型（如华为P9）下出现 srceen.width/height 值交换，所以进行大小值比较判断
        _Width = sw < sh ? sw : sh;
        _Height = sw >= sh ? sw : sh;
        localStorage.setItem('J-recordOrientX', { w: _Width, h: _Height });
    } else {
        _Width = data.w;
        _Height = data.h;
    }
    if (cw === _Width) {
        // 竖屏
        handlerVertical && handlerVertical();
        return;
    }
    if (cw === _Height) {
        // 横屏
        handlerHorizontal && handlerHorizontal();
    }
};

// swiper的观察者模式
export class ObserverClass {
    constructor(params = {}) {
        const self = this;
        self.params = params;
        // Events
        self.eventsListeners = {};
        if (self.params && self.params.on) {
            Object.keys(self.params.on).forEach((eventName) => {
                self.on(eventName, self.params.on[eventName]);
            });
        }
    }

    on(events, handler, priority) {
        const self = this;
        if (typeof handler !== 'function') return self;
        const method = priority ? 'unshift' : 'push';
        events.split(' ').forEach((event) => {
            if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
            self.eventsListeners[event][method](handler);
        });
        return self;
    }

    off(events, handler) {
        const self = this;
        if (!self.eventsListeners) return self;
        events.split(' ').forEach((event) => {
            if (typeof handler === 'undefined') {
                self.eventsListeners[event] = [];
            } else {
                self.eventsListeners[event].forEach((eventHandler, index) => {
                    if (eventHandler === handler) {
                        self.eventsListeners[event].splice(index, 1);
                    }
                });
            }
        });
        return self;
    }

    emit(...args) {
        const self = this;
        if (!self.eventsListeners) return self;
        let events;
        let data;
        let context;
        if (typeof args[0] === 'string' || Array.isArray(args[0])) {
            events = args[0];
            data = args.slice(1, args.length);
            context = self;
        } else {
            events = args[0].events;
            data = args[0].data;
            context = args[0].context || self;
        }
        const eventsArray = Array.isArray(events) ? events : events.split(' ');
        eventsArray.forEach((event) => {
            if (self.eventsListeners && self.eventsListeners[event]) {
                const handlers = [];
                self.eventsListeners[event].forEach((eventHandler) => {
                    handlers.push(eventHandler);
                });
                handlers.forEach((eventHandler) => {
                    eventHandler.apply(context, data);
                });
            }
        });
        return self;
    }
};

export const ObserverEvent = (el, eventType, fn, options) => {
    el.addEventListener(eventType, fn, options || false);

    function destoryObserver() {
        el.removeEventListener(eventType, fn);
    }
    return {
        destroy: destoryObserver
    };
};

export const randomString = (num = 10) => {
    const _s = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    const _r = [];
    for (let i = 0; i < num; i++) {
        const _l = Math.floor(Math.random() * _s.length);
        _r.push(_s.substring(_l, _l + 1));
    }
    return _r.join('');
};


/**
 * 通过字符串操作将一个数放大或缩小指定倍数
 * @num 被转换的数
 * @m   放大或缩小的倍数，为正表示小数点向右移动，表示放大；为负反之
 */
export const numScale = (num, m) => {
    let parts = num.toString().split('.');

    const integerLen = parts[0].length;

    const decimalLen = parts[1] ? parts[1].length : 0;

    // 放大，当放大的倍数比原来的小数位大时，需要在数字后面补零
    if (m > 0) {
        // 补多少个零：m - 原始值的小数位数
        let zeros = m - decimalLen;
        while (zeros > 0) {
            zeros -= 1;
            parts.push(0);
        }
        // 缩小，当缩小的倍数比原来的整数位大时，需要在数字前面补零
    } else {
        // 补多少个零：m - 原始值的整数位数
        let zeros = Math.abs(m) - integerLen;
        while (zeros > 0) {
            zeros -= 1;
            parts.unshift(0);
        }
    }

    // 小数点位置，也是整数的位数:
    //    放大：原始值的整数位数 + 放大的倍数
    //    缩小：原始值的整数位数 - 缩小的倍数
    const index = integerLen + m;
    // 将每一位都拆到数组里，方便插入小数点
    parts = parts.join('').split('');
    // 当为缩小时，因为可能会补零，所以使用原始值的整数位数
    // 计算出的小数点位置可能为负，这个负数应该正好是补零的
    // 个数，所以小数点位置应该为 0
    parts.splice(index > 0 ? index : 0, 0, '.');

    return parseFloat(parts.join(''));
};

/**
 * 获取小数位数
 */
export const getExponent = (num) => {
    return Math.floor(num) === num
        ? 0 : num.toString().split('.')[1].length;
};

/**
 * 两数相加
 */
export const askPlus = (num1, num2) => {
    const multiple = Math.max(getExponent(num1), getExponent(num2));
    return numScale(numScale(num1, multiple) + numScale(num2, multiple), multiple * -1);
};
/**
 * 两数相减
 */
export const askMinus = (num1, num2) => {
    const multiple = Math.max(getExponent(num1), getExponent(num2));
    return numScale(numScale(num1, multiple) - numScale(num2, multiple), multiple * -1);
};
/**
 * 两数相乘
 */
export const askTimes = (num1, num2) => {
    const multiple = Math.max(getExponent(num1), getExponent(num2));
    // const l1 = getExponent(num1);
    // const l2 = getExponent(num2);
    // return numScale((numScale(num1, multiple) * numScale(num2, multiple)) / Math.pow(10, l2 + l1),multiple * -1);
    return numScale((numScale(num1, multiple) * numScale(num2, multiple)), multiple * 2 * -1);
};
/**
 * 两数相除
 */
export const askDiv = (num1, num2) => {
    const multiple = Math.max(getExponent(num1), getExponent(num2));
    // const l1 = getExponent(num1);
    // const l2 = getExponent(num2);
    // return numScale((numScale(num1, multiple) / numScale(num2, multiple)) * Math.pow(10, l2 - l1),multiple * -1);
    return numScale(num1, multiple) / numScale(num2, multiple);
};

export const keepState = {
    setKs(path, payload) {
        const ks = sessionStorage.getItem('keepState' + path);
        if (ks) {
            sessionStorage.setItem('keepState' + path, merge(true, ks, payload));
        } else {
            sessionStorage.setItem('keepState' + path, payload);
        }
    },
    removeKs(path) {
        const ks = sessionStorage.getItem('keepState' + path);
        ks && sessionStorage.removeItem('keepState' + path);
    },
    getKs(path) {
        const ks = sessionStorage.getItem('keepState' + path);
        return ks;
    }
};
