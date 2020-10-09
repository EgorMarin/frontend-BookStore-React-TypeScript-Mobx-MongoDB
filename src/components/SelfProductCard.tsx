import { Badge, Button, Card, Popconfirm, Rate, Row, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { ICardProps } from '../interfaces/interface'
import { useRate } from '../utils/hooks'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import FormEdit from './FormEdit'
import { useStore } from '../store/StoreModel'
import { observer } from 'mobx-react'


const SelfProductCard: React.FC<ICardProps> = ({product}) => {
  const {ratingLength, rate} = useRate(product?.rating) 
  const store = useStore()

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    product.soldProductCount()
  }, [product])

  const onEdit = async (values: any) => {
    product.editProduct(values)
    await store.fetchSelfProducts()
    setVisible(false)
  }
  const onDelete = () => product.deleteProduct()
  const onOpenModal = () => setVisible(true)
  const onCloseModal = () => setVisible(false)

  return (
    <Badge.Ribbon text={<p>Sold: {product?.sold}, Customers: {product.customers.length}</p>}>
      <Card
        className="card"
        size="small" 
        hoverable
        cover={<img src={product.image} className="card-image" alt="img"/>}
      >
        <div className="card-info">
          <div>
            <div className="card-info-name"><b>{product.name}</b></div>
            <div className="card-info-name">{product.author}</div>
            <Rate allowHalf disabled value={rate} style={{fontSize: 16}} />&nbsp;({ratingLength})
          </div>
          <div className="card-self-info-buy">  
            <div className="card-info-buy-price">Price: ${product.price}</div>
          </div>
          <Row justify='space-between' align='middle'>
            <Button onClick={onOpenModal} icon={<EditOutlined />} size="small">Edit</Button>

            <Modal
              title="Basic Modal"
              visible={visible}
              onCancel={onCloseModal}
              footer={[<Button key="back" onClick={onCloseModal}>Close</Button>]}
            >
              <FormEdit product={product} onFinish={onEdit}/>
            </Modal>
            
            <Popconfirm
              title="Are you sure delete this product?"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} size="small" danger>Delete</Button>
            </Popconfirm>
          </Row>
        </div>
      </Card>
    </Badge.Ribbon>
  )
}

export default observer(SelfProductCard)
