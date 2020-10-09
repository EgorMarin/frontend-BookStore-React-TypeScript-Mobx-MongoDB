import React, { useEffect, useState } from 'react'
import { Button, Modal, List, Input, Row, Avatar, Col, Result } from 'antd'
import { observer } from 'mobx-react'
import { useUserStore } from '../store/UserModel'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { ICartProduct } from '../interfaces/interface'
import PayPal from '../components/PayPal'
import { useHistory } from 'react-router-dom'


const CartPage = ({setVisible}: any) => {
  const userStore = useUserStore()

  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [purchased, setPurchased] = useState(false)

  useEffect(() => {
    const fetchCart = async() => {
      setLoading(true)
      await userStore.getCart()
      await userStore.getProfile()
      setLoading(false)
    }
    fetchCart()
    // eslint-disable-next-line
  }, [])

  const onCloseModal = () => setVisible(false)
  
  const onMakeOrder = () => {
    userStore.cartPurchase()
    setPurchased(true)
  }

  const onAfterResult = () => {
    history.push('/products')
    setVisible(false)
    setPurchased(false)
  }

  return (
    <Modal
      width={700}
      visible
      title="Cart"
      onCancel={onCloseModal}
      footer={[
        userStore.totalPrice
        ? <PayPal 
          total={userStore.totalPrice} 
          cart={userStore.cart} 
          userProfile={userStore.profile}
          onMakeOrder={onMakeOrder}
          key="checkout"
        />
        : <Button key="back" onClick={onCloseModal}>
          Close
        </Button>
      ]}
    >
      {!purchased 
        ? <><List
            loading={loading}
            itemLayout="horizontal"
            dataSource={userStore.cart?.slice()}
            renderItem={(item: ICartProduct) => (
              <List.Item
                actions={[
                  <h2>
                    ${item.product.price * item.count}
                  </h2>,
                  <span 
                    onClick={() => userStore.deleteFromCart(item.product._id)} 
                    style={{color: 'red', cursor: 'pointer'}}
                  >
                    &#10006;
                  </span>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.product.image} size='large'/>}
                  title={item.product.name}
                  description={`Store: ${item.product.owner.ownerName}`}
                />
                <div>
                  <Button 
                    onClick={() => userStore.removeFromCart(item.product._id)} 
                    disabled={item.count === 1 ? true : false}
                    type="link" 
                    icon={<MinusOutlined/>} 
                    size="small"
                  />
                  <Input 
                    value={item.count} 
                    size="small" 
                    style={{width: 35}} 
                  />
                  <Button 
                    onClick={() => userStore.addToCart(item.product._id)} 
                    disabled={item.count === item.product.count}
                    type="link" 
                    icon={<PlusOutlined/>} 
                    size="small"
                  />
                </div>
              </List.Item>
            )}
          /> 
          <Col span={23}>
            <Row justify='space-between'>
              <div></div>
              <div className="cart-price">Total price: <b>${userStore.totalPrice}</b></div>
            </Row>
          </Col>
        </> 
        : <Result
          status="success"
          title="Successfully Purchased!"
          subTitle="Thanks!"
          extra={[
            <Button onClick={onAfterResult} type="primary" key="console">
              Go buy again
            </Button>
          ]}
        />
      }
    </Modal>
  )
}

export default observer(CartPage)
