import { Button, Form, Image, Input, Popconfirm, Space, Table, Tag, Typography, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { request } from 'umi';

import SourceData from '@/components/SourceData';
import UserSelect from '@/components/UserSelect';
import EditModal from './EditModal';

const { Column } = Table;
const { Paragraph } = Typography;

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

    request('/helplist/list', { method: 'POST', data: _formData }).then((res: any) => {
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
    request('/helplist/delete', { method: 'POST', data: { id: item.id } }).then((res: any) => {
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
        <Form.Item label="标题" name="name" rules={[{ required: false, message: '不能为空！' }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="发布用户" name="userinfo" rules={[{ required: false, message: '不能为空！' }]}>
          <UserSelect />
        </Form.Item>
        <Form.Item label="接单用户" name="acceptor" rules={[{ required: false, message: '不能为空！' }]}>
          <UserSelect />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button ghost type="primary" onClick={() => handleEdit({})}>
            发布求助
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
        <Column
          title="求助用户"
          dataIndex="userinfo"
          width={200}
          render={(_value: any, record: Record<string, any>) => (
            <SourceData id={_value} keyParams="username" table="userinfo" />
          )}
        />
        <Column title="标题" dataIndex="name" width={200} />
        <Column
          title="图片"
          dataIndex="pic"
          align="center"
          width={200}
          render={(_value: any, record: Record<string, any>) =>
            _value && _value?.split(',')?.map((_src: string, index: number) => <Image key={index} height="100px" src={_src} />)
          }
        />
        <Column
          title="求助详情"
          dataIndex="content"
          width={200}
          render={(_value: any, record: Record<string, any>) => (
            <Paragraph ellipsis={{ rows: 1, expandable: false, tooltip: true }} style={{ marginBottom: 0 }}>
              {_value}
            </Paragraph>
          )}
        />
        <Column title="联系电话" dataIndex="phone" width={100} />
        <Column
          title="帮助者"
          dataIndex="acceptor"
          width={200}
          render={(_value: any, record: Record<string, any>) => (
            <SourceData id={_value} keyParams="username" table="userinfo" />
          )}
        />
        <Column title="帮助者电话" dataIndex="bzphone" width={100} />
        <Column
          title="接受时间"
          dataIndex="receiveTime"
          align="center"
          width={200}
          render={(_value, record: Record<string, any>) => _value && dayjs(_value).format('YYYY-MM-DD HH:mm')}
        />
        <Column
          title="完成时间"
          dataIndex="finishTime"
          align="center"
          width={200}
          render={(_value, record: Record<string, any>) => _value && dayjs(_value).format('YYYY-MM-DD HH:mm')}
        />
        <Column
          title="帮助详情"
          dataIndex="results"
          align="center"
          width={200}
          render={(_value: any, record: Record<string, any>) => (
            <Paragraph ellipsis={{ rows: 1, expandable: false, tooltip: true }} style={{ marginBottom: 0 }}>
              {_value}
            </Paragraph>
          )}
        />
        <Column
          title="求助状态"
          dataIndex="status"
          align="center"
          width={100}
          render={(_value, record: Record<string, any>) => <Tag color="#2db7f5">{_value || '-'}</Tag>}
        />
        <Column
          title="创建时间"
          dataIndex="updateTime"
          align="center"
          width={200}
          render={(_value, record: Record<string, any>) => _value && dayjs(_value).format('YYYY-MM-DD HH:mm')}
        />
        <Column
          title="更新时间"
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
