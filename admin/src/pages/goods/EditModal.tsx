import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { Col, Form, Row, message } from 'antd';
import dayjs from 'dayjs';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { request } from 'umi';

import CategorySelect from '@/components/CategorySelect';
import UploadButton from '@/components/UploadButton';

const EditModal = ({ handleQuery }: any, ref: any) => {
  const formRef = useRef<ProFormInstance>();
  const quillRef = useRef<any>(null);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  useImperativeHandle(ref, () => ({
    openModal: (item: any) => {
      setData(item);
      setModalVisible(true);
    },
  }));

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: () => {
          const input = document.createElement('input');
          input.type = 'file';
          input.onchange = () => {
            const file = input?.files && input?.files[0];
            file && handleUpload(file);
          };
          input.click();
        },
      },
    },
  };

  const handleUpload = (file: File) => {
    const quill = quillRef?.current?.getEditor(); //获取到编辑器本身
    let cursorPosition = quill?.getSelection().index; //获取当前光标位置

    const _formData = new FormData();
    _formData.append('file', file);

    request('/uploadimage', { data: _formData, method: 'POST' }).then((res) => {
      const _list: string[] = res?.data?.list || [];
      _list.forEach((_url) => {
        quill?.insertEmbed(cursorPosition, 'image', _url, true, { maxWidth: 640 }); //插入图片
        cursorPosition += 1;
        quill?.setSelection(cursorPosition); //光标位置+1
      });
    });
  };

  const handleSubmit = async (values: any) => {
    request('/goods/edit', {
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
        <Form.Item labelCol={{ span: 3 }} name="thumbnail" label="商品图片" rules={[{ required: true, message: '不能为空' }]}>
          <UploadButton />
        </Form.Item>
        <ProFormText
          labelCol={{ span: 3 }}
          rules={[{ required: true, message: '不能为空' }]}
          name="name"
          label="商品名称"
          placeholder="请输入"
        />
        <Row>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name="category"
              label="所属分类"
              rules={[{ required: true, message: '不能为空' }]}
            >
              <CategorySelect />
            </Form.Item>
          </Col>
          <Col span={12}>
            <ProFormDigit
              labelCol={{ span: 6 }}
              min={0}
              rules={[{ required: true, message: '不能为空' }]}
              name="price"
              label="商品价格"
              placeholder="请输入"
            />
          </Col>
        </Row>
        <Form.Item labelCol={{ span: 3 }} label="商品详情" name="content" rules={[{ required: true, message: '内容不能为空' }]}>
          <ReactQuill ref={quillRef} theme="snow" value={data.content} modules={modules} formats={formats} />
        </Form.Item>
      </ModalForm>
    )
  );
};

export default forwardRef(EditModal);
