import { Button, Form, Input, Popconfirm, Space, Table, Typography, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { request } from 'umi';

const { Paragraph } = Typography;

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

    const _formData = { ...rest };

    request('/studentinformation/list', { method: 'POST', data: _formData }).then((res: any) => {
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
    request('/studentinformation/delete', { method: 'POST', data: { id: item.id } }).then((res: any) => {
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
        <Form.Item label="学号" name="studentnumber" rules={[{ required: false, message: '不能为空！' }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="身份证号" name="idCard" rules={[{ required: false, message: '不能为空！' }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="姓名" name="name" rules={[{ required: false, message: '不能为空！' }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="手机号" name="phone" rules={[{ required: false, message: '不能为空！' }]}>
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
        <Column title="学号" align="center" dataIndex="studentnumber" width={200} />
        <Column title="身份证号" dataIndex="idCard" width={200} />
        <Column title="姓名" dataIndex="name" width={200} />
        <Column title="性别" dataIndex="sex" width={200} />
        <Column title="手机号" dataIndex="phone" width={200} />
        <Column title="地址" dataIndex="address" width={200} />
        <Column
          title="家庭情况"
          dataIndex="family"
          width={200}
          render={(_value: any, record: Record<string, any>) => (
            <Paragraph ellipsis={{ rows: 1, expandable: false, tooltip: true }} style={{ marginBottom: 0 }}>
              {_value}
            </Paragraph>
          )}
        />
        <Column
          title="创建时间"
          dataIndex="updateTime"
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
