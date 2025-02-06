import { Button, Form, Input, Popconfirm, Space, Table, Tag, Typography, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { request } from 'umi';

import GoodSelect from '@/components/GoodSelect';
import SourceData from '@/components/SourceData';
import UserSelect from '@/components/UserSelect';
import DeliverGoodsModal from './DeliverGoodsModal';

const { Column } = Table;
const { Paragraph } = Typography;

const PageComponent: React.FC = () => {
  const [queryParams, setQueryParams] = useState<any>({ pageSize: 20, current: 1, total: 0 });
  const [list, setList] = useState<Record<string, any>[]>([]);

  const deliverGoodsModal = useRef<any>(null);

  useEffect(() => {
    fetchData(queryParams);
  }, []);

  const fetchData = (values: any) => {
    const { total, ...rest } = values;

    const _formData = { ...rest, table: 'orderlist' };

    request('/generalapi/list', { method: 'POST', data: _formData }).then((res: any) => {
      setList(res?.data?.list || []);
      setQueryParams({ ...values, total: res?.data?.total || 0 });
    });
  };

  //第一页开始查询
  const handleQuery = (values: any) => {
    const _queryParams = { ...values, current: 1 };
    setQueryParams(_queryParams);
    fetchData(_queryParams);
  };

  //删除
  const handleDelete = (item: Record<string, any>) => {
    request('/generalapi/delete', { method: 'POST', data: { id: item.id, table: 'orderlist' } }).then((res: any) => {
      if (res?.code == 200) {
        message.success(res?.msg || '成功!');
        fetchData(queryParams);
      } else {
        message.error(res?.msg || '删除失败！');
      }
    });
  };

  // 发货
  const handleDeliverGoods = (item: Record<string, any>) => {
    if (item.isPay) {
      deliverGoodsModal.current?.openModal(item);
    } else {
      message.error('用户未支付，不能发货！');
    }
  };

  const handleCancel = (item: Record<string, any>, _queryParams: any) => {
    if (item.kddh) {
      message.error('已发货订单不能取消');
    } else {
      request('/generalapi/edit', {
        method: 'POST',
        data: { ...item, updateTime: dayjs().toDate(), status: '已取消', table: 'orderlist' },
      })
        .then((res: any) => {
          fetchData(_queryParams);
          message.success('订单取消成功');
        })
        .catch((err: any) => {
          message.error(err?.message || '失败！');
        });
    }
  };

  return (
    <div>
      <Form layout="inline" onFinish={(val) => handleQuery({ ...queryParams, ...val })} autoComplete="off">
        <Form.Item label="订单号" name="orderNumber" rules={[{ required: false, message: '不能为空！' }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="下单用户" name="userinfo" rules={[{ required: false, message: '不能为空！' }]}>
          <UserSelect />
        </Form.Item>
        <Form.Item label="下单商品" name="goods" rules={[{ required: false, message: '不能为空！' }]}>
          <GoodSelect />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>

      <Table
        rowKey="id"
        bordered
        style={{ marginTop: 24 }}
        dataSource={list}
        pagination={queryParams}
        size="small"
        onChange={(_pagination) => fetchData({ ...queryParams, ..._pagination })}
        scroll={{ x: 800, y: 800 }}
      >
        <Column title="订单号" dataIndex="orderNumber" width={200} />
        <Column
          title="用户"
          dataIndex="userinfo"
          width={200}
          render={(_value: any, record: Record<string, any>) => (
            <SourceData id={_value} keyParams="username" table="userinfo" />
          )}
        />
        <Column
          title="购买商品"
          align="center"
          dataIndex="goods"
          width={200}
          render={(_value: any, record: Record<string, any>) => <SourceData id={_value} keyParams="name" table="goods" />}
        />
        <Column title="商品金额" align="center" dataIndex="price" width={100} />
        <Column
          title="下单时间"
          dataIndex="createTime"
          align="center"
          width={200}
          render={(_value, record: Record<string, any>) => _value && dayjs(_value).format('YYYY-MM-DD HH:mm')}
        />
        <Column
          title="是否支付"
          dataIndex="isPay"
          align="center"
          width={200}
          render={(_value: any, record: Record<string, any>) =>
            _value ? <Tag color="#87d068">已支付</Tag> : <Tag color="#f50">未支付</Tag>
          }
        />
        <Column title="邮寄地址" align="center" dataIndex="address" width={200} />
        <Column title="快递公司" align="center" dataIndex="kdgs" width={100} />
        <Column title="快递单号" align="center" dataIndex="kddh" width={200} />
        <Column
          title="更新时间"
          dataIndex="updateTime"
          align="center"
          width={200}
          render={(_value, record: Record<string, any>) => _value && dayjs(_value).format('YYYY-MM-DD HH:mm')}
        />
        <Column
          title="订单状态"
          dataIndex="status"
          align="center"
          width={100}
          render={(_value, record: Record<string, any>) => <Tag color="#2db7f5">{_value || '-'}</Tag>}
        />
        <Column
          title="操作"
          key="action"
          fixed="right"
          align="center"
          width="240px"
          render={(_: any, record: Record<string, any>) => (
            <Space>
              <Button size="small" ghost type="primary" onClick={() => handleDeliverGoods(record)}>
                发货
              </Button>
              <Popconfirm onConfirm={() => handleCancel(record, queryParams)} title="温馨提示" description="确认要取消订单吗？">
                <Button size="small" ghost type="primary">
                  取消订单
                </Button>
              </Popconfirm>
              <Popconfirm onConfirm={() => handleDelete(record)} title="温馨提示" description="确认要删除吗？">
                <Button size="small" ghost danger>
                  删除订单
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <DeliverGoodsModal ref={deliverGoodsModal} handleQuery={() => fetchData(queryParams)} />
    </div>
  );
};

export default PageComponent;
