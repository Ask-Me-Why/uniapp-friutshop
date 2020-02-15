/*
* @Author: AskMeWhy
* @Date:   2019-09-10 16:27:05
* @Last Modified by:   AskMeWhy
* @Last Modified time: 2020-02-10 14:31:26
*/
import Api from 'services';

// import { askPlus, askMinus, askTimes, askDiv, keepState } from '@/utils';
// import { askLoader } from '@core/ask-loader/index.js';
// import { AskLazyImage } from '@/directive';

export default {
    install: (Vue, options) => {
        // const loader = askLoader();
        // Object.defineProperty(Vue.prototype, '$askLoader', {
        //     get() { return loader.loader; }
        // });

        Object.defineProperty(Vue.prototype, '$server', {
            get() { return Api.server; }
        });
        Object.defineProperty(Vue.prototype, '$info', {
            get() { return Api.info; }
        });

        // Object.defineProperty(Vue.prototype, '$keepState', {
        //     get() {
        //         const _path = this.$route.path;
        //         return {
        //             setKs(...payload) {
        //                 if (payload.length >= 2) {
        //                     keepState.setKs(payload[0], payload[1]);
        //                 } else {
        //                     keepState.setKs(_path, payload[0]);
        //                 }
        //             },
        //             removeKs(path) {
        //                 keepState.removeKs(path || _path);
        //             },
        //             getKs(path) {
        //                 return keepState.getKs(path || _path);
        //             }
        //         };
        //     }
        // });
        // Vue.directive('ask-lazy-image', AskLazyImage);
        // 需要挂载的都放在这里
    }
};

/* Number.prototype.$plus = function(num) {
    return askPlus(this, num);
};
Number.prototype.$minus = function(num) {
    return askMinus(this, num);
};
Number.prototype.$times = function(num) {
    return askTimes(this, num);
};
Number.prototype.$div = function(num) {
    return askDiv(this, num);
};
String.prototype.$plus = function(num) {
    if (isNaN(Number(this)) || isNaN(Number(num))) {
        throw Error('String.$plus的值不是合法数值');
    }
    return askPlus(Number(this), num);
};
String.prototype.$minus = function(num) {
    if (isNaN(Number(this)) || isNaN(Number(num))) {
        throw Error('String.$minus的值不是合法数值');
    }
    return askMinus(Number(this), num);
};
String.prototype.$times = function(num) {
    if (isNaN(Number(this)) || isNaN(Number(num))) {
        throw Error('String.$times的值不是合法数值');
    }
    return askTimes(Number(this), num);
};
String.prototype.$div = function(num) {
    if (isNaN(Number(this)) || isNaN(Number(num))) {
        throw Error('String.$div的值不是合法数值');
    }
    return askDiv(Number(this), num);
}; */
// let n1 = 1, n2 = 2;
// // console.log('res=>now',n1.$times(n2));
// // console.log('res=>old',n1*n2);
// console.log('res=>now',n1.$div(n2));
// console.log('res=>old',n1/n2);
