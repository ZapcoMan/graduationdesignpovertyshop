import { baseURL } from '@/utils';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useState } from 'react';

const UploadButton = ({ value, onChange, ...rest }: any) => {
  const [loading, setLoading] = useState(false);

  const handleChange = ({ file }: any) => {
    if (file.response?.data?.list) {
      setLoading(true);
      onChange?.(file.response?.data?.list[0]);
    } else {
      setLoading(true);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </button>
  );

  return (
    <Upload {...rest} listType="picture" showUploadList={false} action={`${baseURL}/uploadimage`} onChange={handleChange}>
      {value ? <img src={value} alt="avatar" style={{ width: '100%', maxHeight: '120px' }} /> : uploadButton}
    </Upload>
  );
};

export default UploadButton;
