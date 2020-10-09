import React from 'react'
import { Button, Form, Input, Row, Select } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { FormEditProps } from '../interfaces/interface'
import { layout } from '../utils/utils'

const { Option } = Select

const FormEdit: React.FC<FormEditProps> = ({product, onFinish}) => (
  <Form
    {...layout}
    onFinish={onFinish}
  >
    <Form.Item
      name="name"
      label="Name"
      initialValue={product.name}
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
      initialValue={product.genre}
      label="Genre"
      rules={[
        {
          required: true,
          message: 'Please choose the genre of the book!',
        }
      ]}
    >
      <Select style={{ width: 160 }}>
        <Option value="adventure">Adventure</Option>
        <Option value="biography">Biography</Option>
        <Option value="thriller">Thriller</Option>
        <Option value="self-development">Self-development</Option>
        <Option value="romance">Romance</Option>
        <Option value="antiutopia">Antiutopia</Option>
        <Option value="horror">Horror</Option>
        <Option value="fiction">Fiction</Option>
      </Select>
    </Form.Item>
    <Form.Item
      name="author"
      initialValue={product.author}
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
      initialValue={product.image}
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
      initialValue={product.price}
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
      initialValue={product.count}
      label="Count in stock"
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
      <Button htmlType="submit" icon={<CheckOutlined />}>Edit</Button>
    </Row>
  </Form>
)

export default FormEdit
