import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  // 定义一个配置对象，类型为PowerPartial<EggAppConfig>，用于部分配置Egg应用
  const config: PowerPartial<EggAppConfig> = {
    // 配置JWT认证，包括密钥等信息
    jwt: {
      // JWT的密钥，用于签名和验证JWT
      secret: '5ebe2294ecd0e0f08eab7690d2a6ee69',
    },
    // 安全相关配置
    security: {
      // CSRF保护配置
      csrf: {
        // 禁用CSRF保护，因为可能在API服务中不需要此项
        enable: false,
      },
    },
    // 跨域资源共享(CORS)配置
    cors: {
      // 任何地址都可以访问
      origin: '*',
      // 允许的跨域请求方法
      allowMethods: 'GET,PUT,POST,DELETE',
      // 允许跨域请求带上用户凭证(cookie)
      credentials: true,
    },
  };

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1709567203262_9446';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
