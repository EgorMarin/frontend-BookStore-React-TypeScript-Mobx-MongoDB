import React from 'react'
import { Button, Col, Form, Input, message, Row, Select } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useProductStore } from '../store/ProductModel'
import { useHistory } from 'react-router-dom'

const { Option } = Select

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}

const AddProductPage = () => {
  const productStore = useProductStore()
  const history = useHistory()

  const onFinish = async (values: any) => {
    const response = await productStore.createProduct(values)
    if (response.success) {
      message.success(response.success)
      history.push('/products')
    }
  }

  return <div className='content-products'>
    <Col>
      <Row justify='center' style={{paddingTop: 20, paddingBottom: 20}}>
        <p className='p'>Add product</p>
      </Row>
      <Form onFinish={onFinish} {...layout}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name of the book!',
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="genre"
          label="Genre"
          rules={[
            {
              required: true,
              message: 'Please choose the genre of the book!',
            }
          ]}
        >
          <Select placeholder="Select a genre">
            <Option value='adventure'>Adventure</Option>
            <Option value='biography'>Biography</Option>
            <Option value='thriller'>Thriller</Option>
            <Option value='self-development'>Self-development</Option>
            <Option value='romance'>Romance</Option>
            <Option value='antiutopia'>Antiutopia</Option>
            <Option value='horror'>Horror</Option>
            <Option value='fiction'>Fiction</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="author"
          label="Author"
          rules={[
            {
              required: true,
              message: "Please input the author's name who has written the book!",
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image (url-link)"
          rules={[
            {
              required: true,
              message: "Please input the image of the book!",
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price ($)"
          rules={[
            {
              required: true,
              message: "Please input the price of the book!",
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="count"
          label="Count in stock (number)"
          rules={[
            {
              required: true,
              message: "Please input the product's count in stock!",
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Row justify="center">
          <Button type="primary"  htmlType="submit" icon={ <PlusCircleOutlined /> } size='large'>
            Add
          </Button>
        </Row>
      </Form>
    </Col>
  </div>
}

export default AddProductPage
