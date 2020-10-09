import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Input, Popconfirm, Row, Spin, Statistic } from 'antd'
import { CheckOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined, DollarOutlined, QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { useUserStore } from '../store/UserModel'
import { observer } from 'mobx-react'
import { useStore } from '../store/StoreModel'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

const AccountPage = () => {
  const store = useStore()
  const userStore = useUserStore()
  
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    store.fetchOrders()
    userStore.getProfile()
    // eslint-disable-next-line
  }, [])

 
  const onFinish = (values: any) => {
    userStore.editProfile(values)
    setVisible(false)
  }

  const onOpenEditing = () => setVisible(true)
  const onDeleteAccount = () => userStore.deleteProfile()
  
  return <div className='content-products'>
    {userStore.isAdmin 
      ? <Row style={{paddingTop: 40}}>
          <Col offset={1} span={10}>
            <Card hoverable>
              <Row justify="space-between">
                <h3>Personal info</h3>
                {visible ? <div></div> : <Button onClick={onOpenEditing} icon={<EditOutlined />} size='small'>Edit</Button>}
              </Row>

              {userStore.profile.name 
                ? <Form 
                  {...layout}
                  onFinish={onFinish}
                  initialValues={userStore.profile}
                >
                  <Form.Item
                    name="name"
                    key='name'
                    label="Store's name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input the store name!',
                      }
                    ]}
                  >
                    <Input bordered={visible} disabled={!visible} />
                  </Form.Item>
                  <Form.Item
                    name="country"
                    label="Country"
                    rules={[
                      {
                        required: true,
                        message: "Please input the country!",
                      }
                    ]}
                  >
                    <Input bordered={visible} disabled={!visible}/>
                  </Form.Item>
                  <Form.Item
                    name="city"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: "Please input the city!",
                      }
                    ]}
                  >
                    <Input bordered={visible} disabled={!visible}/>
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                      {
                        required: true,
                        message: "Please input the address!",
                      }
                    ]}
                  >
                    <Input bordered={visible} disabled={!visible}/>
                  </Form.Item>
                  <Form.Item
                    name="postal"
                    label="Postal"
                    rules={[
                      {
                        required: true,
                        message: "Please input the postal!",
                      }
                    ]}
                  >
                    <Input bordered={visible} disabled={!visible}/>
                  </Form.Item>
                  <Row justify="center">
                    {visible ? <Button htmlType="submit" icon={<CheckOutlined />}>Confirm</Button> : null}
                  </Row>
                </Form> 
                : <Row justify='center' align="middle" style={{marginTop: '10vh'}}>
                  <Spin tip='...Loading' />
                </Row>
              }
            </Card>
          </Col>
          <Col offset={1} span={10}> 
            <Row gutter={16}>
              <Col span={8}>
                <Card hoverable>
                  <Statistic
                    title="Sale's income"
                    value={store.getIncome}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="$"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card hoverable>
                  <Statistic
                    title="Store's taxes"
                    value={15}
                    valueStyle={{ color: '#cf1322' }} 
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card hoverable>
                  <Statistic
                    title="Net Profit"
                    value={store.getNetProfit}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    suffix="$"
                  />
                </Card>
              </Col>
            </Row>
            <Row justify="center" style={{paddingTop: 50}}>
              <Col span={4}>
                <Popconfirm
                  title="Are you sure delete this account?"
                  icon={<QuestionCircleOutlined />} 
                  style={{ color: 'red' }} 
                  onConfirm={onDeleteAccount}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon={<DeleteOutlined />} type="primary" size="large" danger>Delete account</Button>
                </Popconfirm>
              </Col>
            </Row>
          </Col>
        </Row>
      : <Row style={{paddingTop: 40}}>
          <Col offset={4} span={11}>
            <Card hoverable>
              <Row justify="space-between">
                <h3>Personal info</h3>
                {visible ? <div></div> : <Button onClick={onOpenEditing} icon={<EditOutlined />} size='small'>Edit</Button>}
              </Row>

              {userStore.profile.name 
                ? <Form 
                  {...layout}
                  onFinish={onFinish}
                  initialValues={userStore.profile}
                >
                  <Form.Item
                    name="name"
                    key='name'
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input the name!',
                      }
                    ]}
                  >
                    <Input bordered={visible} disabled={!visible} />
                  </Form.Item>
                  <Form.Item
                    name="country"
                    label="Country"
                    rules={[
                      {
                        required: true,
                        message: "Please input the country!",
                      }
                    ]}
                  >
                    <Input bordered={visible} disabled={!visible}/>
                  </Form.Item>
                  <Form.Item
                    name="city"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: "Please input the city!",
                      }
                    ]}
                  >
                    <Input bordered={visible} disabled={!visible}/>
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                      {
                        required: true,
                        message: "Please input the address!",
                      }
                    ]}
                  >
                    <Input bordered={visible} disabled={!visible}/>
                  </Form.Item>
                  <Form.Item
                    name="postal"
                    label="Postal"
                    rules={[
                      {
                        required: true,
                        message: "Please input the postal!",
                      }
                    ]}
                  >
                    <Input bordered={visible} disabled={!visible}/>
                  </Form.Item>
                  <Row justify="center">
                    {visible ? <Button htmlType="submit" icon={<CheckOutlined />}>Confirm</Button> : null}
                  </Row>
                </Form> 
                : <Row justify='center' align="middle" style={{marginTop: '10vh'}}>
                  <Spin tip='...Loading' />
                </Row>
              }
            </Card>
          </Col>
          <Col span={6}>
            <Row justify="center" style={{paddingTop: 120}}>
                <Col span={4}>
                  <Popconfirm
                    title="Are you sure delete this account?"
                    icon={<QuestionCircleOutlined />} 
                    style={{ color: 'red' }} 
                    onConfirm={onDeleteAccount}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button icon={<DeleteOutlined />} type="primary" size="large" danger>Delete account</Button>
                  </Popconfirm>
                </Col>
              </Row>
          </Col>
      </Row>
    }
  </div>
}

export default observer(AccountPage)
