import { Column, ColumnConfig } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

import { request } from 'umi';
import styles from './index.less';

const defaultConfig: ColumnConfig = {
  title: '最近15天捐赠趋势',
  data: [],
  xField: 'name',
  yField: 'value',
  group: true,
  style: {
    inset: 0,
  },
  height: 360,
};

const PageComponent: React.FC = () => {
  const [config, setConfig] = useState<ColumnConfig>(defaultConfig);

  const fetchData = () => {
    request('/analysis/getColumn', { method: 'GET', data: {} }).then((res: any) => {
      setConfig({ ...defaultConfig, data: res?.data?.list || [] });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.block}>
      <Column {...config} />
    </div>
  );
};

export default PageComponent;
