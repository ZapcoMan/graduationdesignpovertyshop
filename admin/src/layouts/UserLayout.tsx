import { PropsWithChildren } from 'react';
import { Outlet } from 'umi';

const UserLayout: React.FC<PropsWithChildren> = (props) => {
  return <Outlet />;
};

export default UserLayout;
