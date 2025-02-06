export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', component: 'home' },

      //贫困生帮扶
      { path: '/assist/studentinformation', component: 'studentinformation' },
      { path: '/assist/project', component: 'project' },

      // 用户信息
      { path: '/system/userinfo', component: 'userinfo' },
      //轮播图
      { path: '/system/carousel', component: 'carousel' },
      //系统分类
      { path: '/system/category', component: 'category' },

      // 捐赠管理
      { path: '/donate/donatetype', component: 'donatetype' },
      { path: '/donate/donatelist', component: 'donatelist' },

      //校园物品义卖
      { path: '/shop/goods', component: 'goods' },
      { path: '/shop/orderlist', component: 'orderlist' },

      //校内求助
      { path: '/help/helplist', component: 'helplist' },
    ],
  },
  {
    path: '/auth',
    component: '@/layouts/UserLayout',
    routes: [{ path: '/auth/login', component: 'login' }],
  },
];
