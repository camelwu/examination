/** 
* baseUrl: 域名地址 
* routerMode: 路由模式
*/
 
let baseUrl = 'http://62.234.101.207:8090/jeecg-boot/';
let routerMode = 'history';
if (process.env.NODE_ENV == 'development') {  
    baseUrl = 'http://62.234.101.207:8090/jeecg-boot/';
}else{  
    baseUrl = 'http://62.234.101.207:8090/jeecg-boot/';
}
 
export { baseUrl, routerMode }