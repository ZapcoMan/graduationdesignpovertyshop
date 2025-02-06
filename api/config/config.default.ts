import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    jwt: {
      secret: '5ebe2294ecd0e0f08eab7690d2a6ee69',
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    cors: {
      // 任何地址都可以访问
      origin: '*',
      allowMethods: 'GET,PUT,POST,DELETE',
      // cookie跨域配置
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
