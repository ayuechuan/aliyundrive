import { Button, Checkbox, Form, Input } from 'antd';
import './login.less';
import { useNavigate } from 'react-router-dom';
import { User, useAuth } from '../../contexts';

export const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <div className="login">
      <main>
        <div className="left">
          <img
            style={{
              width: '54vw',
              height: '33vw'
            }}
            src="https://gw.alicdn.com/imgextra/i1/O1CN01TTBSmJ1xggW7xkRiR_!!6000000006473-2-tps-2172-1368.png" alt="" />
        </div>
        <div className="right">
          <img style={{ width: 216 }} src="https://gw.alicdn.com/imgextra/i2/O1CN012zI3pB1XLS21rJ9Je_!!6000000002907-55-tps-108-24.svg" alt="" />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              username: 'admin',
              password: '123456',
              remember: true
            }}
            onFinish={(values) => {
              console.log("🚀 ~ file: login.tsx:23 ~ Login ~ values:", values)
              auth.updateUser(new User({ name: values.username, userid: values.password }))
              navigate('/file');
            }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button style={{
                width: '100%'
              }} type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
          </Form>
        </div>
      </main>
      <footer>下载</footer>
    </div>
  )
}