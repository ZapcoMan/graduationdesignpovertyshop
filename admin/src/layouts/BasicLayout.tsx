import {
  AreaChartOutlined,
  CodepenOutlined,
  CommentOutlined,
  DesktopOutlined,
  DropboxOutlined,
  GroupOutlined,
  RadarChartOutlined,
  ReadOutlined,
  RedditOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Navigate, Outlet, history } from 'umi';

import Footer from '@/components/Footer';
import { useState } from 'react';

export default function Layout() {
  const token = localStorage.getItem('token');

  const [pathname, setPathname] = useState(history.location.pathname);

  if (!token) return <Navigate to="/auth/login" />;

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.replace('/auth/login');
  };

  const route = {
    path: '/',
    routes: [
      {
        path: '/',
        name: '首页',
        icon: <AreaChartOutlined />,
      },
      {
        path: '/assist',
        name: '贫困生帮扶',
        icon: <RedditOutlined />,
        routes: [
          {
            path: '/assist/studentinformation',
            name: '学生信息管理管理',
            icon: <TeamOutlined />,
          },
          {
            path: '/assist/project',
            name: '帮扶项目',
            icon: <RadarChartOutlined />,
          },
        ],
      },
      {
        path: '/donate',
        name: '捐赠管理',
        icon: <DropboxOutlined />,
        routes: [
          {
            path: '/donate/donatetype',
            name: '捐赠类型',
            icon: <GroupOutlined />,
          },
          {
            path: '/donate/donatelist',
            name: '捐赠管理',
            icon: <ShopOutlined />,
          },
        ],
      },
      {
        path: '/shop',
        name: '校园物品义卖',
        icon: <ShoppingCartOutlined />,
        routes: [
          {
            path: '/shop/goods',
            name: '商品管理',
            icon: <ShoppingOutlined />,
          },
          {
            path: '/shop/orderlist',
            name: '订单管理',
            icon: <ShoppingCartOutlined />,
          },
        ],
      },
      {
        path: '/help',
        name: '校内求助',
        icon: <CodepenOutlined />,
        routes: [
          {
            path: '/help/helplist',
            name: '求助管理',
            icon: <CommentOutlined />,
          },
        ],
      },
      {
        path: '/system',
        name: '系统管理',
        icon: <SettingOutlined />,
        routes: [
          {
            path: '/system/carousel',
            name: '轮播图',
            icon: <DesktopOutlined />,
          },
          {
            path: '/system/userinfo',
            name: '用户管理',
            icon: <UserOutlined />,
          },
          {
            path: '/system/category',
            name: '系统分类',
            icon: <ReadOutlined />,
          },
        ],
      },
    ],
  };

  return (
    <ProLayout
      logo="/favicon.png"
      title="贫困生义卖管理系统"
      layout="mix"
      menu={{ type: 'group' }}
      route={route}
      siderWidth={216}
      footerRender={() => <Footer />}
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        title: 'Admin',
        size: 'small',
      }}
      location={{ pathname }}
      actionsRender={() => [<div onClick={handleLogout}>退出</div>]}
      menuItemRender={(item, dom) => (
        <div
          onClick={() => {
            setPathname(item?.path || '');
            item?.path && history.replace(item?.path);
          }}
        >
          {dom}
        </div>
      )}
    >
      <PageContainer>
        <ProCard>
          <Outlet />
        </ProCard>
      </PageContainer>
    </ProLayout>
  );
}
