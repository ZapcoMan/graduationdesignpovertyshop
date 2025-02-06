# 项目说明
前后端 都是使用的 Ts 作为 语言 前端 vue + typescript 后端则是  Ts 项目  用的是 阿里出品的一款 node.js 后端 web 框架
~~~shell
Directory: C:\Users\Administrator\Desktop\graduation-design-poverty-shop-master

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           2024/4/29    10:45                admin  # 项目的后台管理
d----           2024/4/29    10:47                api    # ts 写的后端项目 或者说 后端接口更准确些
d----           2024/4/29    10:49                app    # vue + ts 做成 微信小程序
d----           2024/4/29    10:49                images
-a---           2024/4/18    20:11              1 .gitignore
-a---           2024/4/18    20:11         413391 07e0d4b32c0bf8e0c4eed3c98323b26.jpg
-a---           2024/4/18    20:11         365517 dab9db2c05e060d950bab0a81a50c20.jpg
-a---           2024/4/18    20:11            101 README.md # 说明文件
-a---           2024/4/18    20:11            101 README.md.back
-a---           2024/4/18    20:11          30823 shop.sql  #  数据库 sql 文件
~~~
* ts 全称 TypeScript 是一个 基于 JavaScript 的 超集  ts 是在 js 的 基础上 增加的一些新的特性 例如 静态类型检查 类 接口等等
* 在后台项目的 目录（api） 中 的 ```package.json``` 中可以看到 使用了 egg egg-mysql  egg-core 等插件
* json 部分代码
~~~json
"dependencies": {
    "@eggjs/tegg": "^3.5.2",
    "@eggjs/tegg-aop-plugin": "^3.5.2",
    "@eggjs/tegg-config": "^3.2.3",
    "@eggjs/tegg-controller-plugin": "^3.5.2",
    "@eggjs/tegg-eventbus-plugin": "^3.5.2",
    "@eggjs/tegg-plugin": "^3.5.2",
    "@eggjs/tegg-schedule-plugin": "^3.5.2",
    "dayjs": "^1.11.10",
    "egg": "^3.15.0",
    "egg-cors": "^3.0.0",
    "egg-jwt": "^3.1.7",
    "egg-multipart": "^3.3.0",
    "egg-mysql": "^4.0.0",
    "egg-scripts": "^2.17.0",
    "egg-tracer": "^2.0.0",
    "uuid": "^9.0.1"
  },
~~~
* egg 是阿里出品的一款 node.js 后端 web 框架
* egg-cors1: 这是一个用于处理跨域问题的 Egg.js 插件。它可以帮助你在 Egg.js 应用中轻松地解决跨域问题1。
* egg-jwt: 这是一个适配 Egg.js 的 JWT（JSON Web Token）鉴权插件。它可以生成 token，也可以解密 token 获取用户信息。
* egg-multipart: 这是 Egg.js 框架的一个插件，用于处理 multipart/form-data 类型的数据，通常用于文件上传。
* egg-mysql: 这是一个 Egg.js 插件，用于访问 MySQL 数据库。这个插件既可以访问普通的 MySQL 数据库，也可以访问基于 MySQL 协议的在线数据库服务。
* egg-scripts: 这是 Egg.js 框架的一个命令行工具，用于启动和管理 Egg.js 应用程序.
* egg-tracer: 是一个用于跟踪和记录 Egg.js 应用行为的插件。
# 项目目录 讲解
## 前端 
### admin 目录
* admin 目录 为后台管理 的 前端页面
~~~shell
Directory: C:\Users\Administrator\Desktop\graduation-design-poverty-shop-master\admin
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           2024/4/18    20:11                config
d----           2024/4/18    20:16                node_modules
d----           2024/4/18    20:11                public
d----           2024/4/29    10:05                src  # 项目 主要代码
-a---           2024/4/18    20:11             64 .eslintrc.js
-a---           2024/4/18    20:11            124 .gitignore
-a---           2024/4/18    20:11             42 .npmrc
-a---           2024/4/18    20:11             34 .prettierignore
-a---           2024/4/18    20:11            257 .prettierrc
-a---           2024/4/18    20:11             67 .stylelintrc.js
-a---           2024/4/18    20:16         638333 package-lock.json
-a---           2024/4/18    20:11           1078 package.json # 项目描述 项目启动 （依赖说明包
项目中使用了那些依赖这里都有写）
-a---           2024/4/18    20:11             44 tsconfig.json # ts的配置文件
-a---           2024/4/18    20:11             22 typings.d.ts
~~~
* 代码目录 src
~~~shell
Directory: C:\Users\Administrator\Desktop\graduation-design-poverty-shop-master\admin\src
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           2024/4/29    10:05                .umi
d----           2024/4/18    20:11                assets # 资源目录
d----           2024/4/18    20:11                components  # 组件 页面的组件 生成页面的组件 主要是可以重复利用
d----           2024/4/18    20:11                layouts 
d----           2024/4/18    20:11                pages # 页面 
d----           2024/4/18    20:11                utils # 工具
-a---           2024/4/18    20:11            518 app.ts 
-a---           2024/4/18    20:11             58 global.less
-a---           2024/4/18    20:11              0 global.ts
~~~
* 这里说一下 pages 目录
~~~shell
Directory: C:\Users\Administrator\Desktop\graduation-design-poverty-shop-master\admin\src\pages
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           2024/4/18    20:11                carousel
d----           2024/4/18    20:11                category
d----           2024/4/18    20:11                donatelist
d----           2024/4/18    20:11                donatetype
d----           2024/4/18    20:11                goods  # 货物
d----           2024/4/18    20:11                helplist # 帮助列表
d----           2024/4/18    20:11                home
d----           2024/4/18    20:11                login # 登录
d----           2024/4/18    20:11                orderlist
d----           2024/4/18    20:11                project 
d----           2024/4/18    20:11                studentinformation # 学生信息
d----           2024/4/18    20:11                userinfo # 用户信息
~~~
* 其实这里的目录的命名 基本都是根据 功能来命名的 一般翻译一下就知道目录是干什么的了很少遇到比较偏的命名
* 每个功能 最多无非就是 增删改查 也就是 crud 
* 以 userinfo 举例
~~~shell
 Directory: C:\Users\Administrator\Desktop\graduation-design-poverty-shop-master\admin\src\pages\userinfo
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           2024/4/18    20:11           2904 EditModal.tsx
-a---           2024/4/18    20:11              0 index.less # css 的 增强版 css 为 层叠样式表
-a---           2024/4/18    20:11           4170 index.tsx # 主页面 也可以理解为 著作逻辑
~~~
###  app 目录 
* app 目录 是 小程序端的 页面  本身是由 vue + ts 写的 但那是可以 “编译” 或者 说生成 小程序端可以使用的代码
~~~shell
Directory: C:\Users\Administrator\Desktop\graduation-design-poverty-shop-master\app
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           2024/4/29    10:47                cloudfunctions
d----           2024/4/29    10:38                dist # 生成的 小程序的 代码
d----           2024/4/29    10:47                node_modules # 需要的 模块
d----           2024/4/29    10:49                src # 源代码 目录
-a---           2024/4/18    20:11            208 .gitignore
-a---           2024/4/18    20:11            197 global.scss
-a---           2024/4/18    20:11            666 index.html # 主页 
-a---           2024/4/18    20:16         463611 package-lock.json
-a---           2024/4/18    20:11           3336 package.json # 和 admin下的一样 项目描述 项目启动 （依赖说明包 项目中使用了那些依赖这里都有写）
-a---           2024/4/18    20:11            204 shims-uni.d.ts
-a---           2024/4/18    20:11            507 tsconfig.json
-a---           2024/4/18    20:11            167 vite.config.ts
~~~
* app/src
~~~shell
Directory: C:\Users\Administrator\Desktop\graduation-design-poverty-shop-master\app\src

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           2024/4/29    10:38                components  # 组件 页面的组件 生成页面的组件 主要是可以重复利用
d----           2024/4/29    10:38                pages # 功能 页面
d----           2024/4/29    10:49                static # 静态资源页面 比如 页面要用的 图片 字体
d----           2024/4/29    10:49                utils #  工具 
-a---           2024/4/18    20:11            344 App.vue
-a---           2024/4/18    20:11            400 env.d.ts
-a---           2024/4/18    20:11            156 main.ts
-a---           2024/4/18    20:11           2408 manifest.json
-a---           2024/4/18    20:58           3775 pages.json
-a---           2024/4/18    20:11            139 shime-uni.d.ts
-a---           2024/4/18    20:11           2236 uni.scss
~~~
* app/src/utils
~~~shell
  Directory: C:\Users\Administrator\Desktop\graduation-design-poverty-shop-master\app\src\utils

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           2024/4/18    20:56             52 index.ts # 指定后台地址
-a---           2024/4/18    20:11            721 request.ts # 请求拦截器
~~~
## 后端
### api 目录
* 使用 阿里出品的 nodejs 的 后端框架
~~~shell
 Directory: C:\Users\Administrator\Desktop\graduation-design-poverty-shop-master\api

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           2024/4/29    10:45                app # 后端接口 目录
d----           2024/4/29    10:45                config # 配置目录
d----           2024/4/29    10:38                logs # 日志目录
d----           2024/4/29    10:45                node_modules
d----           2024/4/29    10:47                run 
d----           2024/4/29    10:38                typings # 说实话我也看不懂这里面 放的是什么 但似乎有很重要
-a---           2024/4/18    20:11             24 .eslintignore
-a---           2024/4/18    20:11            129 .eslintrc
-a---           2024/4/18    20:11            234 .gitignore
-a---           2024/4/18    20:11             12 .prettierignore
-a---           2024/4/18    20:11            192 .prettierrc
-a---           2024/4/18    20:15         474339 package-lock.json
-a---           2024/4/18    20:11           1637 package.json # 和前面的 一样 这里就不再复制了
-a---           2024/4/18    20:11            580 README.md # 说明文件
-a---           2024/4/18    20:11            167 tsconfig.json
~~~ 
* app 
~~~shell
Directory: C:\Users\Administrator\Desktop\graduation-design-poverty-shop-master\api\app
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           2024/4/29    10:45                controller # 后端控制层
d----           2024/4/29    10:38                public
-a---           2024/4/18    20:11           3307 router.ts # 后端路由

Directory: C:\Users\Administrator\Desktop\graduation-design-poverty-shop-master\api\app\controller

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           2024/4/18    20:11           2442 account.ts
-a---           2024/4/18    20:11            638 address.ts
-a---           2024/4/18    20:11           2715 analysis.ts
-a---           2024/4/18    20:11           1584 carousel.ts
-a---           2024/4/18    20:11           1595 donate.ts
-a---           2024/4/18    20:11           1599 donatetype.ts
-a---           2024/4/18    20:11           1566 generalapi.ts
-a---           2024/4/18    20:11           1572 goods.ts
-a---           2024/4/18    20:11           1575 helplist.ts
-a---           2024/4/18    20:11           2534 orderlist.ts
-a---           2024/4/18    20:11           1574 project.ts
-a---           2024/4/18    20:11           4647 recommend.ts
-a---           2024/4/18    20:11           1607 studentinformation.ts # 功能具体的 请求的地址  和 处理 
-a---           2024/4/18    20:11           1097 upload.ts
-a---           2024/4/18    20:11           1584 userinfo.ts
~~~
* Nodejs 的 框架 把正常的 三层框架 写在了一起 直接在 控制层 查询数据库
* 需要提一句的是 router.ts
* 这里写清楚了所有的请求的 接口地址 以及 处理的方法
* 前端也 应该是差不多的配置 功能命名也差不了太多
~~~js
export default (app) => {
  const { router, controller } = app;

  router.post('/uploadimage', app.middleware.multipart({ fileSize: '5mb' }), controller.upload.uploadFile);
  /**
   * 账号相关
   */
  router.post('/account/login-by-username', controller.account.login_by_username);
  router.post('/account/login-by-weixin', controller.account.login_by_weixin);
  router.get('/account/getUserInfo', controller.account.getUserInfo);
  router.post('/account/update', controller.account.update);
  /**
   * 用户信息
   */
  router.post('/userinfo/list', controller.userinfo.list);
  router.post('/userinfo/edit', controller.userinfo.edit);
  router.post('/userinfo/delete', controller.userinfo.delete);
  /**
   * 学生信息模块
   */
  router.post('/studentinformation/list', controller.studentinformation.list);
  router.post('/studentinformation/edit', controller.studentinformation.edit);
  router.post('/studentinformation/delete', controller.studentinformation.delete);
  /**
   * 帮扶项目
   */
  router.post('/project/list', controller.project.list);
  router.post('/project/edit', controller.project.edit);
  router.post('/project/delete', controller.project.delete);
  /**
   * 捐赠类型
   */
  router.post('/donatetype/list', controller.donatetype.list);
  router.post('/donatetype/edit', controller.donatetype.edit);
  router.post('/donatetype/delete', controller.donatetype.delete);
  /**
   * 捐赠记录
   */
  router.post('/donate/list', controller.donate.list);
  router.post('/donate/edit', controller.donate.edit);
  router.post('/donate/delete', controller.donate.delete);
  /**
   * 商品管理
   */
  router.post('/goods/list', controller.goods.list);
  router.post('/goods/edit', controller.goods.edit);
  router.post('/goods/delete', controller.goods.delete);
  /**
   * 订单管理
   */
  router.post('/orderlist/submitOrder', controller.orderlist.submitOrder);
  router.post('/orderlist/listByUser', controller.orderlist.listByUser);
  /**
   * 校内求助
   */
  router.post('/helplist/list', controller.helplist.list);
  router.post('/helplist/edit', controller.helplist.edit);
  router.post('/helplist/delete', controller.helplist.delete);
  /**
   * 轮播图
   */
  router.post('/carousel/list', controller.carousel.list);
  router.post('/carousel/edit', controller.carousel.edit);
  router.post('/carousel/delete', controller.carousel.delete);

  /**
   * 通用接口
   */
  router.post('/generalapi/list', controller.generalapi.list);
  router.post('/generalapi/edit', controller.generalapi.edit);
  router.post('/generalapi/delete', controller.generalapi.delete);

  //收货地址
  router.get('/address/get-by-user', controller.address.get_by_user);

  /**
   * 推荐
   */
  router.post('/recommend/listProject', controller.recommend.listProject);
  router.post('/recommend/listGoods', controller.recommend.listGoods);
  router.post('/recommend/listHelp', controller.recommend.listHelp);
  router.post('/recommend/add', controller.recommend.add);

  /**
   * 可视化
   */
  router.get('/analysis/getSysData', controller.analysis.getSysData);
  router.get('/analysis/getColumn', controller.analysis.getColumn);
  router.get('/analysis/getPie', controller.analysis.getPie);
  router.get('/analysis/getArea', controller.analysis.getArea);
};
~~~