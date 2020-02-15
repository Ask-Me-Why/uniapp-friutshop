/*
 * @Author: askMeWhy
 * @Date:   2018-07-05 09:57:40
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2020-02-10 14:58:30
 */
export const API_DEFAULT_CONFIG = {
    BaseURL: process.env.NODE_ENV === 'development' ? '' : process.env.VUE_APP_SERVER_API,
    MockURL: ''
};
