import React, { useState } from 'react'
import { Button, Cascader, Col, Form, Input, message, Row, Switch, Tooltip } from 'antd'
import { QuestionCircleOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { countriesOptions } from '../utils/utils';
import { useUserStore } from '../store/UserModel';
import { Link, useHistory } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}

const RegisterPage = () => {
  const userStore = useUserStore()

  const history = useHistory()
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState()

  // создает нового юзера в базе данных, если все окей - редирект на LoginPage
  const onFinish = async (values: any) => {
    message.loading({content: 'Action in progress..', key: 'updatable', duration: 1})
    const user = {
      name: values.nickname,
      email: values.email,
      password: values.password,
      country: values.country[0],
      city: values.country[1],
      address: values.address,
      postal: values.postal,
      isAdmin
    }
    const response = await userStore.register(user)
    if (response.error) return setError(response.error)
    if (response.success) {
      message.success({content: response.success, key: 'updatable'})
      history.push('/user/login')
    }
  }

  const onRoleSwitch = (value: boolean) => setIsAdmin(value)

  return <div className='content-products'>
    <Col>
      <Row justify='center' style={{paddingTop: 20, paddingBottom: 20}}>
        <p className='p'>Create an account</p>
      </Row>

      <Form onFinish={onFinish} {...layout}> 
        <Form.Item label="Register as seller">
          <Switch 
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={onRoleSwitch}
          />
        </Form.Item>
        <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
            hasFeedback
            validateStatus={error ? 'warning' : ''}
            help={error ? error : null}
          >
            <Input placeholder='google@gmail.com' />
          </Form.Item>

          <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              min: 8,
              message: 'Password must be at least 8 characters!',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder='********'/>
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              min: 8
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password placeholder='********'/>
        </Form.Item>

        {isAdmin 
          ? <Form.Item
              name="nickname"
              label="Store's name"
              rules={[{ required: true, message: "Please input your store's name!", whitespace: true, min: 3 }]}
              hasFeedback
            >
            <Input placeholder="Books&Hooks"/>
          </Form.Item>
          : <Form.Item
              name="nickname"
              label='Full Name'
              rules={[{ required: true, message: 'Please input your nickname!', whitespace: true, min: 3 }]}
              hasFeedback
            >
            <Input placeholder='Alexander Alisov'/>
          </Form.Item>
        }
        
        <Form.Item
          name="country"
          label="Country"
          rules={[
            { type: 'array', required: true, message: 'Please select your country!' },
          ]}
        >
          <Cascader options={countriesOptions} />
        </Form.Item>

        <Form.Item
          name="address"
          label={
            <span>
              Address&nbsp;
              <Tooltip title='"724 Alder St." or "67 st.Lomonosova"'>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[{ required: true, min: 4, message: 'Please input your address!', whitespace: true }]}
          hasFeedback
        >
          <Input placeholder='Baseina st. 68'/>
        </Form.Item>

        <Form.Item 
          name="postal"
          label={
            <span>
              Postal&nbsp;
              <Tooltip title='Your postal-code. Example: 03022'>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[{ required: true, message: 'Please input your postal!'}]}
        >
          <Input minLength={3} placeholder='03022'/>
        </Form.Item>

        <Row justify='center' align='top'>
          <Form.Item>
            <Button type="primary" htmlType="submit" size='large'>
              Confirm
            </Button>
          </Form.Item>
          <Button type="link" danger size='large' >
            <Link to="/user/login">
              Cancel
            </Link>
          </Button>
        </Row>
      </Form>
    </Col>
  </div>
}

export default RegisterPage