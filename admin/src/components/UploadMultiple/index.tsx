import { baseURL } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useEffect, useState } from 'react';

const UploadMultiple = ({ value, onChange, ...rest }: any) => {
  const [fileList, setFileList] = useState<any>([]);

  useEffect(() => {
    const _list =
      value?.split(',')?.map((url: string) => {
        return { url };
      }) || [];
    setFileList(_list);
  }, []);

  const handleChange = ({ file, fileList }: any) => {
    setFileList(fileList);
    if (file?.status == 'done' || file?.status == 'removed') {
      const _list: string[] = fileList?.map((v: any) => {
        return v.url || v.response?.data?.list?.[0];
      });
      onChange?.(_list.join(','));
    }
  };

  return (
    <Upload
      {...rest}
      multiple={true}
      fileList={fileList}
      listType="picture-card"
      showUploadList={true}
      action={`${baseURL}/uploadimage`}
      onChange={handleChange}
    >
      <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传</div>
      </button>
    </Upload>
  );
};

export default UploadMultiple;
