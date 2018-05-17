## 安装依赖
进入draw文件夹，右键点击git bash here,输入`npm install`命令

## 启动前注意事项
因为项目使用webpack打包，代码中具有一个`MainWindow` 对象，浏览器没有这个对象，这个对象只能在QT上用，所以编译会报错，因此先将 `ensuring.component.ts` `waiting.component.ts` 的 `MainWindow` 先注释掉再启动项目或者打包

## 启动项目
`npm start` 或者 `ng serve`

## 启动项目事项
将`ensuring.component.ts` `waiting.component.ts` 文件的 `MainWindow`去掉注释，然后浏览器输入`http://localhost:4200`或者`本机IP:4200`即可访问到网页，此时网页跳转到`http://localhost:4200/#/waiting/1`

因为需要请求后台数据，所以通过webpack设置了代理，在draw文件夹下的proxy.config.js文件，需要切换目标地址的修改这个文件并重新`npm start` 或者 `ng serve`即可

`http://localhost:4200/#/waiting/1`:提讯功能

`http://localhost:4200/#/waiting/2`:离开功能

这里使用了hash路由，原因之后描述

## 打包
`ng build`
打包前注意事项如同启动前注意事项，打包完成后draw文件夹下会产生一个dist文件夹，先到dist文件夹下的main.bundle.js文件中去掉关于`MainWindow`的注释，然后将dist文件剪切到电脑E盘中

## 测试打包是否成功
因为draw项目涉及请求后台数据，所以需要nginx代理转发来测试
假如说你想通过
`http://本机IP/qt`或者`http://localhost/qt`

来访问网页，则你修改dist文件夹的index.html

`<base href="/">改为<base href="/qt/">`

同时假如你的接口类似

`http://192.168.35.29:8700/case/list/room/person`

`http://192.168.35.29:8700/case/list/free/room`

则nginx配置为
```
location /qt {
    alias  E:/dist;
    index  index.html;
    try_files $uri $uri/ /index.html;
    //页面为angular单页面应用，浏览器输入任何地址都重定向到dist文件的index.html
}
location /case {
    proxy_pass   http://192.168.35.29:8700;
    //浏览器遇到/case开头的请求则会转发到目标地址http://192.168.35.29:8700
}
```

访问以下网页则可测试打包成功与否
```
//提讯页面
http://localhost/qt/#/waiting/1 
//离开页面
http://localhost/qt/#/waiting/2
```

## 前端路由使用Hash路由的原因
Angular采用默认的LocationStrategy路由(普通路由，不带#)，项目打包发布到服务器端以后。当用户访问
`http://localhost/qt/waiting/1` 并刷新页面时，会产生一个HTTP请求，导致当前请求绕过前端路由，访问服务器端资源。如果服务器没有做相应处理。会导致404或者其他错误。解决的方法是，后端需要做重定向(如果使用这种方式的话)。

如果使用HashLocationStrateg路由
hash路由原理：

`http://localhost/qt/#/waiting/1`

在第一个#后面出现的任何字符，都会被浏览器解读为位置标识符。这意味着，这些字符都不会被发送到服务器端。
浏览器实际发出的请求是

```
GET /qt = HTTP/1.1
Host: localhost
Referer:http://localhost/qt/
```

这个时候Angular项目前端路由就可以读取#后的标志符`waiting/1`然后前端根据相应配置显示这个`waiting/1`页面的内容

```
//设置方式
draw/src/app.modules.ts

imports: [
  BrowserModule,
  HttpClientModule,
  RouterModule.forRoot(ROUTES,{useHash:true})//使用哈希路由
],

若不使用则是
imports: [
  BrowserModule,
  HttpClientModule,
  RouterModule.forRoot(ROUTES)//使用普通路由
],
```

## 注意事项
项目参数`serialNumber`暂时写死，对接时需要修改

