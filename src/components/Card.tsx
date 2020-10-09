import React from 'react'
import { Col, Card, Button, Rate} from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ICardProps } from '../interfaces/interface'
import { useHistory } from 'react-router-dom';
import { useRate } from '../utils/hooks';
import { useUserStore } from '../store/UserModel';

const CardComponent: React.FC<ICardProps> = ({product}) => {
  const history = useHistory()
  const userStore = useUserStore()

  // функция для высчитывания рейтинга продутка
  const {ratingLength, rate} = useRate(product?.rating) 

  const onProductClick = () => history.push(`/product/${product._id}`)
  const onAddToCart = () => userStore.addToCart(product?._id)
    

  return <Col xs={20} sm={12} md={8} lg={6} xl={4}>
    <Card
      className="card"
      size="small" 
      hoverable
      bordered={false}
      cover={<img onClick={onProductClick} src={product.image} className="card-image" alt="img"/>}
    >
      <div className="card-info">
        <div>
          <div className="card-info-name"><b>{product.name}</b></div>
          <div className="card-info-name">{product.author}</div>
          <div>Seller: <b>{product.owner.ownerName}</b></div>
          <Rate allowHalf disabled value={rate} style={{fontSize: 16}} />&nbsp;({ratingLength})
        </div>
        <div className="card-info-buy">
          <div className="card-info-buy-price">${product.price}</div>
          <Button onClick={onAddToCart} icon={<ShoppingCartOutlined/>} shape="round" size="large" />
        </div>
      </div>
    </Card>
  </Col>
}

export default CardComponent