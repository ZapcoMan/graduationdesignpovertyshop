import { Pie, PieConfig } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';
import { request } from 'umi';

import styles from './index.less';

const defaultConfig: PieConfig = {
  title: '捐赠类型分布',
  theme: 'academy',
  data: [
    { name: '分类一', value: 27 },
    { name: '分类二', value: 25 },
    { name: '分类三', value: 18 },
    { name: '分类四', value: 15 },
    { name: '分类五', value: 10 },
    { name: '其他', value: 5 },
  ],
  angleField: 'value',
  colorField: 'name',
  label: {
    text: 'value',
    style: {
      fontWeight: 'bold',
    },
  },
  legend: {
    color: {
      title: false,
      position: 'right',
      rowPadding: 5,
    },
  },
  height: 360,
};

const PageComponent: React.FC = () => {
  const [config, setConfig] = useState<PieConfig>(defaultConfig);

  const fetchData = () => {
    request('/analysis/getPie', { method: 'GET', data: {} }).then((res: any) => {
      setConfig({ ...defaultConfig, data: res?.data?.list || [] });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.block}>
      <Pie {...config} />
    </div>
  );
};

export default PageComponent;
