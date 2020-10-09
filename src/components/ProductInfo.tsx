import React from 'react'
import { Button, Card, Col, Rate, Row } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useRate } from '../utils/hooks'
import { useUserStore } from '../store/UserModel'
import { observer } from 'mobx-react'
import { useStore } from '../store/StoreModel'


const ProductInfo = () => {
  const { product } = useStore()
  const { token, isAdmin, addToCart } = useUserStore()
  
  // функция для высчитывания рейтинга продутка
  const {ratingLength, rate} = useRate(product?.rating)

  const onAddToCart = () => addToCart(product?._id)
  
  return <>
    <Row style={{marginTop: 10}}>
      <Col offset={3} span={18}>
        <h1><b>{product?.name}</b></h1>
      </Col>
    </Row>
    <Row>
      <Col span={4} offset={3}>
        <img src={product?.image} style={{height: 335, width: 225}} alt="product"/>
      </Col>
      <Col span={6} offset={2}>
        <h3><b>Code: </b>{product?._id}</h3>
        <h3><b>Author: </b>{product?.author}</h3>
        <h3><b>Genre: </b>{product?.genre}</h3>
        <h3><b>Rating: </b> <Rate value={rate} allowHalf disabled/>&nbsp;({ratingLength})</h3>
      </Col>
      <Col span={4} offset={1}>
        <Card hoverable style={{backgroundColor: '#fff'}}>
          <h3>Store: <b>{product?.owner.ownerName}</b></h3>
          <h4>Left in stock: {product?.count} item(-s)</h4>
          <h1>Price: ${product?.price}</h1>
          <Button 
            onClick={onAddToCart} 
            icon={<ShoppingCartOutlined />} 
            size='large' 
            shape='round' 
            style={{margin: '10px 0px 0px 10px'}}
            disabled={!token || isAdmin}
          >
            Add to cart
          </Button>
        </Card>
      </Col>
    </Row>
  </>
}

export default observer(ProductInfo)
