import { Col, Image, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from 'umi';

import styles from './index.less';

const list_col = [
  {
    name: '系统注册用户',
    color: '#6831FF',
    icon: require('@/assets/user.png'),
    key: 'zcs',
  },
  {
    name: '捐赠条数据',
    color: '#09BE4F',
    icon: require('@/assets/juanzeng.png'),
    key: 'jzts',
  },
  {
    name: '校物总数',
    color: '#33d9b2',
    icon: require('@/assets/wupin.png'),
    key: 'xws',
  },
  {
    name: '校物订单数',
    color: '#ff3f34',
    icon: require('@/assets/order.png'),
    key: 'dds',
  },
];

const TopComponent: React.FC = () => {
  const [data, setData] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    request('/analysis/getSysData', { method: 'GET', data: {} }).then((res: any) => {
      setData(res?.data || {});
    });
  };

  return (
    <div>
      <Row gutter={12}>
        {list_col.map((item, index) => (
          <Col key={index} span={6}>
            <div className={styles.list_item} style={{ backgroundColor: item.color }}>
              <Image preview={false} height="100px" src={item.icon} />
              <div className={styles.list_item_content}>
                <div className={styles.list_item_value}>{data[item.key] || 0}</div>
                <div className={styles.list_item_name}>{item.name}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TopComponent;
