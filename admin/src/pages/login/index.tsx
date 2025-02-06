import Footer from '@/components/Footer';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import React, { useState } from 'react';
import { Link, history, request } from 'umi';

import styles from './index.less';

const LoginPage: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    const { username, password, autoLogin } = values;
    const _formData = { username, password };
    setSubmitting(true);
    request('/account/login-by-username', { method: 'POST', data: _formData })
      .then((res) => {
        if (res?.code == 200) {
          message.success(res?.msg || '登录成功！');
          localStorage.setItem('token', res?.data?.token);
          if (autoLogin) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
          } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
          }
          history.replace('/');
        } else {
          message.error(res?.msg || '登录失败！');
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/favicon.png" />
              <span className={styles.title}>贫困生义卖管理系统</span>
            </Link>
          </div>
          <div className={styles.desc}>西南地区最具影响力的管理系统</div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: false,
              username: localStorage.getItem('username'),
              password: localStorage.getItem('password'),
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="用户名"
              rules={[{ required: true, message: '请输入用户名！' }]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="密码"
              rules={[{ required: true, message: '请输入密码！' }]}
            />

            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a style={{ float: 'right' }}>忘记密码</a>
            </div>
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
