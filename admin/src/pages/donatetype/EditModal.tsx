import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
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
    request('/donatetype/edit', { method: 'POST', data: { ...data, ...values, updateTime: dayjs().toDate() } })
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
        <ProFormText name="name" label="捐赠名称" placeholder="请输入" rules={[{ required: true, message: '不能为空' }]} />
        <ProFormRadio.Group
          label="是否在线支付"
          name="isOnlinePayment"
          options={[
            { label: '是', value: 1 },
            { label: '否', value: 0 },
          ]}
        />
        <ProFormRadio.Group
          label="是否启用"
          name="isEnable"
          options={[
            { label: '是', value: 1 },
            { label: '否', value: 0 },
          ]}
        />
      </ModalForm>
    )
  );
};

export default forwardRef(EditModal);
