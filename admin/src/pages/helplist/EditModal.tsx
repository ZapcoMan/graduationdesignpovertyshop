import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Col, Form, Row, message } from 'antd';
import dayjs from 'dayjs';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { request } from 'umi';

import UploadMultiple from '@/components/UploadMultiple';
import UserSelect from '@/components/UserSelect';

const EditModal = ({ handleQuery }: any, ref: any) => {
  const formRef = useRef<ProFormInstance>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  useImperativeHandle(ref, () => ({
    openModal: (item: any) => {
      setData(item);
      setModalVisible(true);
    },
  }));

  const handleSubmit = async (values: any) => {
    request('/helplist/edit', {
      method: 'POST',
      data: { ...data, ...values, updateTime: dayjs().toDate(), createTime: dayjs().toDate(), status: '待帮助' },
    })
      .then((res: any) => {
        if (res?.code == 200) {
          message.success(res?.msg || '成功!');
          formRef.current?.resetFields();
          setModalVisible(false);
          handleQuery && handleQuery();
        } else {
          message.error(res?.msg || '失败！');
        }
      })
      .catch((err: any) => {
        message.error(err?.message || '失败！');
      });
  };

  return (
    modalVisible && (
      <ModalForm
        width={960}
        layout="horizontal"
        labelWrap={true}
        labelAlign="right"
        labelCol={{ span: 4 }}
        title={data?.id ? '编辑' : '添加'}
        formRef={formRef}
        open={modalVisible}
        onOpenChange={setModalVisible}
        submitter={{
          searchConfig: {
            resetText: '取消',
          },
          resetButtonProps: {
            onClick: () => {
              formRef.current?.resetFields();
              setData({});
              setModalVisible(false);
            },
          },
        }}
        initialValues={data}
        onFinish={handleSubmit}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="求助用户"
              name="userinfo"
              labelCol={{ span: 6 }}
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <UserSelect />
            </Form.Item>
            <ProFormText
              labelCol={{ span: 6 }}
              rules={[{ required: true, message: '不能为空' }]}
              name="phone"
              label="联系电话"
              placeholder="请输入"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              labelCol={{ span: 6 }}
              rules={[{ required: true, message: '不能为空' }]}
              name="name"
              label="求助标题"
              placeholder="请输入"
            />
          </Col>
        </Row>
        <ProFormTextArea
          labelCol={{ span: 3 }}
          rules={[{ required: true, message: '不能为空' }]}
          name="content"
          label="求助内容"
          placeholder="请输入"
        />
        <Form.Item labelCol={{ span: 3 }} name="pic" label="求助图片" rules={[{ required: true, message: '不能为空' }]}>
          <UploadMultiple />
        </Form.Item>
      </ModalForm>
    )
  );
};

export default forwardRef(EditModal);
