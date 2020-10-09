import { Col, List  } from 'antd'
import React, { useEffect, useState } from 'react'
import { useStore } from '../store/StoreModel'
import {IOtherProduct} from '../interfaces/interface'
import SelfProductCard from '../components/SelfProductCard'
import { observer } from 'mobx-react'

const SelfProductsPage = () => {
  const store = useStore()
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const fetchSelfProducts = async () => {
      setLoading(true)
      await store.fetchSelfProducts()
      setLoading(false)
    }
    fetchSelfProducts()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="content-products">
      <Col offset={2} span={20}>
        <List
          loading={loading}
          style={{paddingTop: 15}}
          grid={{
            gutter: 20,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 6,
            xl: 6,
          }}
          pagination={{pageSize: 12, defaultCurrent: 1, style: {paddingRight: '37vw', marginBottom: 20}}}
          dataSource={store.selfProducts?.slice()}
          renderItem={({product}: IOtherProduct) => {
            return (
            <List.Item>
              <SelfProductCard product={product}/>
            </List.Item>
          )}}
        />
      </Col>
    </div>
  )
}

export default observer(SelfProductsPage)
