/*
 * @Author: AskMeWhy
 * @Date:   2019-09-05 17:21:28
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2019-09-10 18:28:23
 */

import ErrorImg from '@/assets/error_img.svg';
import LoadImg from '@/assets/load_img.svg';
// import { ObserverEvent } from '@/utils';
const LazyQueue = [];
export const AskLazyImage = {
    bind: function(el, binding, vnode) {
        const lazyImage = new LazyImage({ el, binding, vnode });
        LazyQueue.push(lazyImage);
    },
    update: function(el, binding, vnode, oldVnode) {
        const src = vnode.data.attrs['data-src'] || '';
        const oldSrc = oldVnode.data.attrs['data-src'] || '';
        if (src === oldSrc) {
            return;
        }

        const _index = LazyQueue.findIndex(lazy => lazy.el === el);
        if (_index === -1) {
            return;
        }

        LazyQueue[_index].update({ el, binding });
    }
};
class LazyImage {
    constructor({ el, binding, vnode }) {
        this.el = null;
        this.binding = binding;
        this.vnode = vnode;
        this.update({ el, binding });
        // this.registerEventListener();
    }

    update({ el, binding }) {
        this.el = el;
        if (el.tagName !== 'IMG') {
            throw new Error('v-ask-lazy-image 只能用于img');
        }
        // this.checkIntoView();
        const sourceImage = new SourceImage({ el });
        const proxyImage = new ProxyImage({ sourceImage });
        // let _src = el.attributes.src.value || "";
        const src = sourceImage.getSrc();
        if (!src) {
            sourceImage.setSrc(sourceImage.getErrorImage());
            return;
        }
        proxyImage.setSrc(src);
    }
}

/* class LazyImageScroll {
    constructor({ el, binding, update }) {
        this.el = el;
        this.update = update;
        this.binding = binding;
        this.scrollEvent = null;
        this.registerEventListener();
    }
    registerEventListener() {
        let parentNode = this.scrollNode = getScrollParent(this.el);
        this.scrollEvent = ObserverEvent(parentNode, 'scroll', (e) => {
            this.update({ this.el, this.binding });
        });
        // el.getBoundingClientRect()
    }
    getRect(el) {
        return el.getBoundingClientRect();
    }

    checkIntoView() {
        // let imgRect = this.getRect(this.el);
        // let scrollRect = this.getRect(this.scrollNode);
        // if (rect.top >= 0 && rect.bottom) {}
    }
} */

class SourceImage {
    constructor({ el }) {
        this.imgNode = el;
    }

    setSrc(src) {
        this.imgNode.src = src;
    }

    getSrc() {
        return this.imgNode.getAttribute('data-src') || '';
    }

    getErrorImage() {
        return this.imgNode.getAttribute('data-error') || ErrorImg;
    }

    getLoadImage() {
        return this.imgNode.getAttribute('data-load') || LoadImg;
    }

    imageLoadTransition() {
        this.imgNode.style.opacity = '.2';
        this._enforceStyleRecalculation(this.imgNode);
        const timer = setTimeout(() => {
            clearTimeout(timer);
            this.imgNode.style.transition = 'opacity 300ms linear';
            this.imgNode.style.opacity = '1';
        }, 300);
    }

    _enforceStyleRecalculation(element) {
        // 让浏览器强制重新布局
        window.getComputedStyle(element).getPropertyValue('opacity');
    }
}
class ProxyImage {
    constructor({ sourceImage }) {
        this.sourceImage = sourceImage;
    }

    setSrc(src) {
        this.sourceImage.setSrc(this.sourceImage.getLoadImage());
        loadImageAsync(src).then(data => {
            this.sourceImage.setSrc(data.src);
            this.sourceImage.imageLoadTransition();
        }).catch(r => {
            this.sourceImage.setSrc(this.sourceImage.getErrorImage());
            this.sourceImage.imageLoadTransition();
        });
    }
}
const loadImageAsync = (src) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = function() {
            resolve({
                src: this.src
            });
        };
        image.onerror = function(e) {
            reject(e);
        };
    });
};


/* const getScrollParent = (element) => {
    let parent = element.parentNode;

    if (!parent) { // 没有父级
        return element;
    }

    if (parent === window.document) {
        // Firefox 会将 scrollTop的判断放置的 `documentElement` 而非 `body` 上
        // 我们将判断二者谁大于0来返回正确的元素
        if (window.document.body.scrollTop) {
            return window.document.body;
        } else {
            return window.document.documentElement;
        }
    }

    // Firefox 要求我们也要检查 `-x` 以及 `-y`
    if (
        ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow')) !== -1 ||
        ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-x')) !== -1 ||
        ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-y')) !== -1
    ) {
        // 如果检测到的 scrollParent 是 body，我们将对其父元素做一次额外的检测
        // 这样在 Chrome 系的浏览器中会得到 body，其他情况下会得到 documentElement
        return parent;
    }
    return getScrollParent(element.parentNode);
};


const getStyleComputedProperty = (element, property) => {
    // 注：这里会访问 DOM
    let css = window.getComputedStyle(element, null);
    return css[property];
};
*/
