/** 
* baseUrl: 域名地址 
* routerMode: 路由模式
*/
 
let baseUrl = '';
let routerMode = 'history';
if (process.env.NODE_ENV == 'development') {  
    baseUrl = 'http://localhost:3000';
}else{  
    baseUrl = 'http://xxxx这里是线上地址xxx';
}
 
export { baseUrl, routerMode }