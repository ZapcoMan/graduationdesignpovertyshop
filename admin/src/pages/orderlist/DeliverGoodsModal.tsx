import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
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
    request('/generalapi/edit', {
      method: 'POST',
      data: { ...data, ...values, updateTime: dayjs().toDate(), status: '已发货', table: 'orderlist' },
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
        title="发货"
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
        <ProFormText
          readonly
          rules={[{ required: false, message: '不能为空' }]}
          name="address"
          label="订单号"
          placeholder="请输入"
        />
        <ProFormText
          readonly
          rules={[{ required: false, message: '不能为空' }]}
          name="address"
          label="邮寄地址"
          placeholder="请输入"
        />
        <ProFormText rules={[{ required: true, message: '不能为空' }]} name="kdgs" label="快递公司" placeholder="请输入" />
        <ProFormText rules={[{ required: true, message: '不能为空' }]} name="kddh" label="快递单号" placeholder="请输入" />
      </ModalForm>
    )
  );
};

export default forwardRef(EditModal);
