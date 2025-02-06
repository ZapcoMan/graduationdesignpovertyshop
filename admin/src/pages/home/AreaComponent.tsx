import { Area, AreaConfig } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

import { request } from 'umi';
import styles from './index.less';

const defaultConfig: AreaConfig = {
  title: '近30天订单趋势',
  theme: 'academy',
  data: [],
  xField: 'name',
  yField: 'value',
  shapeField: 'smooth',
  line: {
    style: {
      stroke: 'transparent',
    },
  },
  height: 360,
};

const PageComponent: React.FC = () => {
  const [config, setConfig] = useState<AreaConfig>(defaultConfig);

  const fetchData = () => {
    request('/analysis/getArea', { method: 'GET', data: {} }).then((res: any) => {
      setConfig({ ...defaultConfig, data: res?.data?.list || [] });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.block}>
      <Area {...config} />
    </div>
  );
};

export default PageComponent;
