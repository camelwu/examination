# 项目说明

`normalize.css` 做兼容，`flexible` && `postcss-px2rem` 做移动端适配;  
路由从`/`直接到`/exam/:num`，解析`explain/:num`，监听路由变化`@src/exam/index.vue`中`watch`； 最后结果为`/result?courseId&paperId`这种query方式；  

打开spa后，由App直接调用`dataToJs`句柄，js接收App的句柄`dataFromApp`。vue中有：
```
getMsg // js唤起App方法，拿到数据
getAppData // App唤起js方法
clickUploadImg // 打开Native相册
```

```
./
├── README.md
├── babel.config.js
├── dist
│   ├── favicon.ico
│   ├── img
│   ├── index.html
│   └── js
├── node_modules
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── camera.png
│   │   ├── global.css
│   │   └── left.png
│   ├── components
│   │   ├── answer
│   │   │   └── index.vue
│   │   ├── footer
│   │   │   └── index.vue
│   │   ├── header
│   │   │   └── index.vue
│   │   ├── paper
│   │   │   └── index.vue
│   │   └── title
│   │       └── index.vue
│   ├── main.js
│   ├── plugins
│   ├── router.js
│   ├── store
│   ├── store.js
│   └── views
│   │   ├── exam
│   │   │   └── index.vue
│   │   ├── result
│   │   │   └── index.vue
│   │   └── user
│   │       └── index.vue
├── vue.config.js
└── yarn.lock
```
## 组件：  
answer - 答题区 （[1,2,3,4,5]5种类型题，根据baseType判断显示方式）  
footer - 底部 （上下题、解析、查看结果三个按钮）  
paper  - 解析 （答案对比、解析文字）  
title  - 标题 （蓝色、总数、标题文字）  

## 页面：  
exam   - 题和解析 （文章, title, 题干, answer, paper, footer）  
result - 答题结果 （title, 答案类型, 答案列表, footer） 

## 本地：  
`@src/exam/index.vue`中的部分代码：  
```javascript
created() {
    // 组件创建完后获取数据，先从App获取token等
    this.num = parseInt(this.$route.params.num.toString()) || 1;
    this.getMsg();
    this.getAppData();
    // 如果本地mock数据，把下面的两行代码开启，上面的两行进行注释即可。
    // let res = {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZSI6IjEzNTAyMTQ1OTQzIiwiZXhwIjoxNTg5Mjk3MzExfQ.ou2kwcf9hdARATIJn75jfX-rtJFih02FV3QKAvHIC0M","id":1251131102261739521,"courseId":1240774211639824386};
    // this.data2Storage(res);
  },
```

## Project setup
```
yarn install
&& 
// vue/cli3 脚手架，或下面的命令行都可以
vue ui
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
