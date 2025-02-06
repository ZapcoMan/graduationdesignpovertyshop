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
