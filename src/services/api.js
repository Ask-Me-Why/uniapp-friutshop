/*
 * @Author: askMeWhy
 * @Date:   2018-07-05 09:57:53
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2020-02-10 15:21:55
 */
/*
调用方式 [namespace/name]
有namespace=>[namespace/name]
无namespace=>[name]

{
    name: '', //函数名
    namespace: '', //命名空间
    setCommonParam: true, //设置公共参数 true：需要 false：不需要|默认值
    method:'GET', //请求方式
    params:{}, //本接口在未设置的时候请求带上的默认值
    path:'', //接口api地址
    desc:'' //接口描述信息
}
 */


const API_CONFIG = [{
        name: 'test',
        namespace: '',
        method: 'get',
        params: {},
        path: '/api',
        desc: '测试'
}];
export default API_CONFIG;
