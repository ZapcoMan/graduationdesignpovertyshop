import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

export default () => (
  <DefaultFooter
    copyright="2024 Kigo_Zou出品"
    links={[
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://gitee.com/yatan8',
        blankTarget: true,
      },
    ]}
  />
);
