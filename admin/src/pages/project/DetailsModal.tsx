import { Button, Modal } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './index.less';

const EditModal = ({}: any, ref: any) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  useImperativeHandle(ref, () => ({
    openModal: (item: any) => {
      setData(item);
      setModalVisible(true);
    },
  }));

  return (
    modalVisible && (
      <Modal
        width={720}
        title={data.name}
        open={modalVisible}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            确定
          </Button>,
        ]}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <div className={styles.details} dangerouslySetInnerHTML={{ __html: data.content || '' }} />
      </Modal>
    )
  );
};

export default forwardRef(EditModal);
