import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from 'umi';

import AreaComponent from './AreaComponent';
import ChartsColumnComponent from './ChartsColumnComponent';
import PieComponent from './PieComponent';

const HomePage: React.FC = () => {
  const [list, setList] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    request('/goods/list', { method: 'POST', data: {} }).then((res: any) => {
      setList(res?.data?.list || []);
    });
  };

  return (
    <div style={{ marginTop: 24 }}>
      <Row gutter={12}>
        <Col span={16}>
          <ChartsColumnComponent />
        </Col>
        <Col span={8}>
          <PieComponent />
        </Col>
      </Row>

      <AreaComponent />
    </div>
  );
};

export default HomePage;
