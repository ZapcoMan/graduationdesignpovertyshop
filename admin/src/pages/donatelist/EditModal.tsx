import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormDateTimePicker, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { request } from 'umi';

import DonateTypeSelect from '@/components/DonateTypeSelect';
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
    request('/donate/edit', {
      method: 'POST',
      data: { ...data, ...values, updateTime: dayjs().toDate() },
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
        <Form.Item label="用户" name="userinfo" rules={[{ required: false, message: '不能为空！' }]}>
          <UserSelect disabled />
        </Form.Item>
        <Form.Item label="捐赠类型" name="donatetype" rules={[{ required: false, message: '不能为空！' }]}>
          <DonateTypeSelect disabled />
        </Form.Item>
        <ProFormTextArea
          disabled
          rules={[{ required: false, message: '不能为空' }]}
          name="info"
          label="捐赠情况"
          placeholder="请输入"
        />
        <ProFormDateTimePicker
          disabled
          rules={[{ required: false, message: '不能为空' }]}
          name="startTime"
          label="开始时间"
          width="xl"
        />
        <ProFormDateTimePicker
          disabled
          rules={[{ required: false, message: '不能为空' }]}
          name="endTime"
          label="结束"
          width="xl"
        />
        <ProFormText rules={[{ required: true, message: '不能为空' }]} name="status" label="项目状态" placeholder="请输入" />
      </ModalForm>
    )
  );
};

export default forwardRef(EditModal);
