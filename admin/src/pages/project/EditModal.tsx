import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormDateTimePicker, ProFormText } from '@ant-design/pro-components';
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
    request('/project/edit', {
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
        <Form.Item labelCol={{ span: 3 }} name="thumbnail" label="缩略图" rules={[{ required: true, message: '不能为空' }]}>
          <UploadButton />
        </Form.Item>

        <ProFormText
          labelCol={{ span: 3 }}
          rules={[{ required: true, message: '不能为空' }]}
          name="name"
          label="项目名称"
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

            <ProFormText
              labelCol={{ span: 6 }}
              rules={[{ required: true, message: '不能为空' }]}
              name="intro"
              label="项目简介"
              placeholder="请输入"
            />
            <ProFormDateTimePicker
              labelCol={{ span: 6 }}
              rules={[{ required: false, message: '不能为空' }]}
              name="startTime"
              label="开始时间"
              width="lg"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              labelCol={{ span: 6 }}
              rules={[{ required: false, message: '不能为空' }]}
              name="user"
              label="管理者"
              placeholder="请输入"
            />
            <ProFormText
              labelCol={{ span: 6 }}
              rules={[{ required: false, message: '不能为空' }]}
              name="status"
              label="状态"
              placeholder="请输入"
            />
            <ProFormDateTimePicker
              labelCol={{ span: 6 }}
              rules={[{ required: false, message: '不能为空' }]}
              name="endTime"
              label="结束时间"
              width="lg"
            />
          </Col>
        </Row>

        <Form.Item
          labelCol={{ span: 3 }}
          label="项目内容"
          name="content"
          rules={[{ required: true, message: '项目内容不能为空' }]}
        >
          <ReactQuill ref={quillRef} theme="snow" value={data.content} modules={modules} formats={formats} />
        </Form.Item>
      </ModalForm>
    )
  );
};

export default forwardRef(EditModal);
