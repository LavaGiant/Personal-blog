import { FC } from 'react'
import { Form, Input, Button,message } from 'antd';
import { getArticleList } from '@/api/user'
import './LoginForm.scss'
import { history } from 'umi';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 11, span: 2 },
};
const LoginForm: FC = () => {
  const onFinish = (value: any): void => {
    getArticleList({
      username: value.username,
      password: value.password
    }).then(res => {
      if(res.data.code) {
        localStorage.setItem('openId',res.data.openId)
        message.success('登陆成功');
        history.replace('/')
      }else{
        message.error('登陆失败');
      }
    })
  }
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" style={{ borderRadius: 6 }}>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
export default LoginForm