import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IParamTypes } from '../interfaces/interface'
import ProductInfo from '../components/ProductInfo'
import OtherProducts from '../components/OtherProducts'
import ProductReviews from '../components/ProductReviews'
import { Row, Spin } from 'antd'
import { useStore } from '../store/StoreModel'


const ProductPage = () => {
  const {id} = useParams<IParamTypes>()
  
  const store = useStore()
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      await store.fetchProduct(id)
      setLoading(false)
    }
    fetchProduct()
    // eslint-disable-next-line
  }, [id])

  return (
    <div className='content-products'>
    {loading 
      ? <Row justify='center'>
          <Spin size="large" tip='Loading...' style={{marginTop: '30vh'}}/>
        </Row>
      : <> 
        <ProductInfo/>
        <ProductReviews/>
        <OtherProducts/>
      </>
    }
    </div>
  )
}

export default ProductPage