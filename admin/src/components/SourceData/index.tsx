import { useEffect, useState } from 'react';
import { request } from 'umi';

const SourceData = ({ id, keyParams, table }: any) => {
  const [list, setList] = useState<any[]>([]);

  const fetchData = () => {
    request('/generalapi/list', { method: 'POST', data: { pageSize: 10000, current: 1, id, table } }).then((res: any) => {
      setList(res?.data?.list || []);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return list.find((d) => d.id == id)?.[keyParams];
};

export default SourceData;
