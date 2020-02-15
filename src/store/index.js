/*
 * @Author: askMeWhy
 * @Date:   2017-12-29 14:44:52
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2020-02-11 10:27:27
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { merge } from '../utils/tool.kit.js';
import { uniStorage } from '../utils/storage.js';

import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';
Vue.use(Vuex);
const storeGetters = () => {
    let obj = {};
    Object.keys(getters).forEach((key) => {
        obj = merge(true, obj, getters[key]);
    });
    return obj;
};
const storeMutations = () => {
    let obj = {};
    Object.keys(mutations).forEach((key) => {
        obj = merge(true, obj, mutations[key]);
    });
    return obj;
};
const storeActions = () => {
    let obj = {};
    Object.keys(actions).forEach((key) => {
        obj = merge(true, obj, actions[key]);
    });
    return obj;
};

export default new Vuex.Store({
    strict: true,
    state: {
        ajaxLoader: false,
        ajaxLoaderIndex: 0,
        user: {
            userInfo: (() => {
                const userInfo = uniStorage.getItem('userInfo');
                return userInfo || null;
            })(),
            auth: (() => {
                const auth = uniStorage.getItem('auth');
                return auth || null;
            })(),
            isSignIn: (() => {
                const auth = uniStorage.getItem('auth');
                return !!(auth && auth.token && auth.refreshToken);
            })()
        }
    },
    getters: storeGetters(),
    mutations: storeMutations(),
    actions: storeActions(),
    modules: {}
});
