1. 我们之前编写的服务器都是传统的服务器，服务器的结构是基于MVC模式
    - Model -- 数据模型
    - View -- 视图，用来呈现
    - Controller -- 控制器，复杂加载数据并选择视图来呈现数据
      - 传统的服务器是直接为客户端返回一个页面
      - 但是传统的服务器并不能适用于现在的应用场景

2. 现在的应用场景，一个应用通常都会有多个客户端（client）存在
    - web端    移动端（app）    pc端  
    - 如果服务器直接返回html页面，那么服务器就只能为web端提供服务
        其他类型的客户端还需要单独开发服务器，这样就提高了开发和维护的成本

3. 如何解决这个问题？
    - 传统的服务器需要做两件事情，第一个加载数据，第二个要将模型渲染进视图
    - 解决方案就将渲染视图的功能从服务器中剥离出来，
        服务器只负责向客户端返回数据，渲染视图的工作由客户端自行完成
    - 分离以后，服务器只提供数据，一个服务器可以同时为多种客户端提供服务器
        同时将视图渲染的工作交给客户端以后，简化了服务器代码的编写

4. Rest
    - REpresentational State Transfer 
    - 表示层状态的传输
    - Rest实际上就是一种服务器的设计风格
    - 它的主要特点就是，服务器只返回数据
    - 服务器和客户端传输数据时通常会使用JSON作为数据格式
    - 请求的方法：
        GET    加载数据
        POST   新建或添加数据
        PUT    添加或修改数据
        PATCH  修改数据
        DELETE 删除数据
        OPTION 由浏览器自动发送，检查请求的一些权限
    - API（接口） Endpoint（端点）
        GET /user
        POST /user
        DELETE /user/:id
        ...

5. postman
    - 这是一个软件，通过它可以帮助向服务器发送各种请求
        帮助我们测试API

AJAX



####  跨域的问题( https://segmentfault.com/a/1190000011145364 )

- 请求（只有不含请求体的get请求能）到达服务器,但也获取不了响应数据，响应的是跨域错误。

- 保护服务器收到攻击

- 解决方式

  - 在服务器中设置一个允许跨域的头(Cross-Origin Resource Sharing **跨域资源共享**)

    > Access-Control-Allow-Origin：*

    只能设置一个。如果设置多个则需要服务器代码手动去匹配。

    > 将可能的 `Access-Control-Allow-Origin` 值限制在一组允许的源，需要服务器端的代码检查 [`Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin) 请求标头的值，将其与允许的来源列表进行比较，如果 [`Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin) 值在列表中，将 `Access-Control-Allow-Origin` 设置为与 [`Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin) 标头相同的值。

​				在服务器发请求前会做一个options预检请求（PreFlight），该请求				会嗅探当前资源是否可以访问（一个 CORS 预检请求是用于检查服务				器是否支持 [CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS) 即跨域资源共享。）。

### Ajax（https://blog.csdn.net/weixin_38664300/article/details/131008513）

​	Ajax是一种技术方案，但并不是一种新技术。它依赖现有的CSS/HTML/JavaScript，而其中最核心的依赖是浏览器提供的XMLHttpRequest对象，是这个对象使得浏览器可以发出HTTP请求与接收HTTP响应。实现了**在页面不刷新个情况下和服务器进行数据交互**。

### Fetch

### Axios



### 跨站请求伪造（ 检测 refer字段）

### Cookie技术和Session技术（https://blog.csdn.net/qq_43688587/article/details/104998015，

### https://zhuanlan.zhihu.com/p/622560321）



- 登录检查 中间件（放在需要检测用户是否登录的地方）

- token一般放在请求头

   headers:{

  Authentication：bearer（一种验证方案） xxx

  }

