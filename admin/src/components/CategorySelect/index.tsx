import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';

const UploadButton = ({ value, onChange, ...rest }: any) => {
  const [list, setList] = useState<any[]>([]);

  const handleChange = (value: any) => {
    onChange?.(value);
  };

  const fetchData = (_name: string) => {
    request('/generalapi/list', {
      method: 'POST',
      data: { pageSize: 1000, current: 1, name: _name, table: 'category' },
    }).then((res: any) => {
      setList(res?.data?.list || []);
    });
  };

  useEffect(() => {
    fetchData('');
  }, []);

  const handleSearch = (_value: string) => {
    fetchData(_value);
  };

  return (
    <Select
      {...rest}
      showSearch
      allowClear
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ minWidth: '200px', width: '100%' }}
    >
      {list.map((item, index) => (
        <Select.Option key={index} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default UploadButton;
