import React from 'react'
import { Card, Col, Rate } from 'antd'
import { useRate } from '../utils/hooks'
import { IOtherProductProps } from '../interfaces/interface'
import { useHistory } from 'react-router-dom'


const OtherProduct: React.FC<IOtherProductProps> = ({product}) => {
  const history = useHistory()

  // функция для высчитывания рейтинга продутка
  const {ratingLength, rate} = useRate(product?.rating)

  const onProductClick = () => history.push(`/product/${product._id}`)
  return (
    <Col md={4} lg={4} xl={4}>
      <Card
        hoverable 
        cover={<img onClick={onProductClick} src={product?.image} alt="img" style={{height: 240}} />}
        style={{height: 395}}
      >
        <div className="card-info">
          <div>
            <div className="card-info-name"><b>{product?.name}</b></div>
            <div className="card-info-name">{product?.author}</div>
            <div className="card-info-name">Seller: <b>{product?.owner.ownerName}</b></div>
            <div>
              <Rate allowHalf disabled value={rate} style={{fontSize: 12.5}} />&nbsp;({ratingLength})
            </div>
          </div>
          <div>
            <div className="card-info-buy-price">${product?.price}</div>
          </div>
        </div>
      </Card>
    </Col>
  )
}

export default OtherProduct
