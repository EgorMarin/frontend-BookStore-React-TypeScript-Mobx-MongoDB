import React, { useState } from 'react'
import { Button, Checkbox, Col, Form, Input, message, Row } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useUserStore } from '../store/UserModel'
import { Link, useHistory } from 'react-router-dom'

const LoginPage = () => {
  const userStore = useUserStore()
  const history = useHistory()

  const [error, setError] = useState()

  // проверяет правильность данных, если все окей - редирект на главную страницу
  const onFinish = async (values: any) => {
    message.loading({content: 'Action in progress..', key: 'updatable'})
    const response = await userStore.login(values)
    if (response.error) return setError(response.error)
    if (response.success) {
      message.success({content: response.success, key: 'updatable'})
      history.push('/products')
    }
  }

  return (
    <div className='content-products'>
      <Row justify='center' style={{paddingTop: 20}}>
        <Col md={8} lg={6} xl={6} >
          <Row justify='center' style={{paddingBottom: 30}}>
            <p className='p'>Log in</p>
          </Row>
          <Form
            name="normal_login"
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your Username!' },
                { type: 'email', message: 'The input is not valid E-mail!'}
              ]}
              hasFeedback
              validateStatus={error ? 'error' : ''}
              help={error ? error : null}
            >
              <Input prefix={<UserOutlined/>} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Password must be at least 8 characters!', min: 8 }]}
            >
              <Input
                prefix={<LockOutlined/>}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="!#">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <div className="login-form-link">
                Don't have an account? <Link to="/user/register">Register now!</Link>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      
    </div>
  )
}

export default LoginPage
