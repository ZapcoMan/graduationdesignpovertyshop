import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';
import dayjs from 'dayjs';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { request } from 'umi';

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
    request('/studentinformation/edit', { method: 'POST', data: { ...data, ...values, updateTime: dayjs().toDate() } })
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
        width={640}
        layout="horizontal"
        labelWrap={true}
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
        <ProFormText rules={[{ required: true, message: '不能为空' }]} name="studentnumber" label="学号" placeholder="请输入" />
        <ProFormText rules={[{ required: true, message: '不能为空' }]} name="idCard" label="身份证号" placeholder="请输入" />
        <ProFormText rules={[{ required: true, message: '不能为空' }]} name="name" label="姓名" placeholder="请输入" />
        <ProFormRadio.Group label="性别" name="sex" options={['未知', '男', '女']} />
        <ProFormText rules={[{ required: false, message: '不能为空' }]} name="phone" label="手机号" placeholder="请输入" />
        <ProFormText rules={[{ required: false, message: '不能为空' }]} name="address" label="地址" placeholder="请输入" />
        <ProFormTextArea
          rules={[{ required: false, message: '不能为空' }]}
          name="family"
          label="家庭情况"
          placeholder="请输入"
        />
      </ModalForm>
    )
  );
};

export default forwardRef(EditModal);
