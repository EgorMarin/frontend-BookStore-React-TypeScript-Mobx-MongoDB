import React, { useState } from 'react'
import { Col, Pagination, Row } from 'antd'
import { observer } from 'mobx-react'
import { IOtherProduct } from '../interfaces/interface'
import { useStore } from '../store/StoreModel'
import OtherProduct from './OtherProduct'

const OtherProducts = () => {
  const { product, otherProducts } = useStore()

  const [page, setPage] = useState(0)

  const pageHandler = (value: number) => setPage(value - 1)
  const getOtherProducts = () => otherProducts?.slice(page * 6, page * 6 + 6)

  return <div style={{marginTop: 40, marginBottom: 40}}>
    <Row>
      <Col offset={2} span={8}>
        <h1>Other products in <b>{product?.owner.ownerName}</b>:</h1>
      </Col>
    </Row>
    <Row justify='center'>
      <Col md={19} lg={19} xl={19}>
        <Row gutter={16}>
          {getOtherProducts()?.map(({product}: IOtherProduct) => (
            <OtherProduct product={product}  key={product.name}/>
          ))}
        </Row>
      </Col>
    </Row>
    <Row justify="center" style={{marginTop: 10}}>
      <Pagination onChange={pageHandler} pageSize={6} total={otherProducts?.length} current={page + 1}/>
    </Row>
  </div>
}

export default observer(OtherProducts)
