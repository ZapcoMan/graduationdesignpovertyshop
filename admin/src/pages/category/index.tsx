import { Button, Form, Input, Popconfirm, Space, Table, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { request } from 'umi';

import EditModal from './EditModal';

const { Column } = Table;

const UserinfoPage: React.FC = () => {
  const [queryParams, setQueryParams] = useState<any>({ pageSize: 20, current: 1, total: 0 });
  const [list, setList] = useState<Record<string, any>[]>([]);

  const editModalRef = useRef<any>(null);

  useEffect(() => {
    fetchData(queryParams);
  }, []);

  const fetchData = (values: any) => {
    const { total, ...rest } = values;
    request('/generalapi/list', { method: 'POST', data: { ...rest, table: 'category' } }).then((res: any) => {
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
    request('/generalapi/delete', { method: 'POST', data: { id: item.id, table: 'category' } }).then((res: any) => {
      if (res?.code == 200) {
        message.success(res?.msg || '成功!');
        fetchData(queryParams);
      } else {
        message.error(res?.msg || '删除失败！');
      }
    });
  };

  const handleEdit = (item: Record<string, any>) => {
    editModalRef.current?.openModal(item);
  };

  return (
    <div>
      <Form layout="inline" onFinish={(val) => handleQuery({ ...queryParams, ...val })} autoComplete="off">
        <Form.Item label="名称" name="name" rules={[{ required: false, message: '不能为空！' }]}>
          <Input allowClear />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button ghost type="primary" onClick={() => handleEdit({})}>
            添加
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
        <Column title="名称" dataIndex="name" />
        <Column
          title="创建时间"
          dataIndex="updateTime"
          align="center"
          width={200}
          render={(_value, record: Record<string, any>) => _value && dayjs(_value).format('YYYY-MM-DD HH:mm')}
        />
        <Column
          title="操作"
          key="action"
          fixed="right"
          align="center"
          width={140}
          render={(_: any, record: Record<string, any>) => (
            <Space>
              <Button size="small" ghost type="primary" onClick={() => handleEdit(record)}>
                修改
              </Button>
              <Popconfirm onConfirm={() => handleDelete(record)} title="温馨提示" description="确认要删除吗？">
                <Button size="small" ghost danger>
                  删除
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>

      <EditModal ref={editModalRef} handleQuery={() => fetchData(queryParams)} />
    </div>
  );
};

export default UserinfoPage;
