import React, { useEffect } from 'react'
import { observer } from "mobx-react"
import { useStore } from '../store/StoreModel'
import { genreOptions, images } from '../utils/utils'
import { CascaderValueType } from 'antd/lib/cascader'
import { Row, Col, Pagination, Cascader, Spin, Carousel } from 'antd'
import { ProductInstance } from '../store/ProductModel'
import Range from '../components/Range'
import CardComponent from '../components/Card'
import Sort from '../components/Sort'

const AllProductsPage = () => {
  const store = useStore()

  useEffect(() => {
    store.fetchProducts()
    // eslint-disable-next-line
  }, [])

  const pageHandler = (value: number) => store.setPage(value - 1)
  const genreHandler = (value: CascaderValueType) => store.setGenre(value.join(''))
  const fieldHandler = (value: CascaderValueType) => store.setField(value.join(''))
  const orderHandler = (value: CascaderValueType) => store.setOrder(value.join(''))
  const rangeHandler = (value: number[]) => store.setRange(value)

  
  return <>
    <Row className="content-products">

      <Col xs={10} sm={8} md={6} lg={5} xl={4} className="content-products-filter">
        <div className='select-genre'>
          <b>Choose the genre:</b>
          <Cascader options={genreOptions} onChange={genreHandler} placeholder="All genres" size='large'/>
        </div>
        <Range minPrice={store.minPrice} maxPrice={store.maxPrice} rangeHandler={rangeHandler} loading={store.loading}/>
      </Col>

      <Col xs={14} sm={16} md={18} lg={19} xl={20} className="content-products-list" >
        {store.loading 
          ? <Row justify='center'>
              <Spin size="large"/>
            </Row>
          : <Row justify='center'>
            <Col xl={16} lg={16} md={16}>
              <Carousel dotPosition='top' autoplay className='carousel'>
                {images.map((image, index) => (
                  <div key={index}>
                    <img src={image.src} alt="img" className='carousel-image'/>
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        }
        <Row>
          <p className="p">{store.genre ? store.genre : 'all genres'}</p>
        </Row>
        <Sort 
          field={store.field}
          order={store.order}
          fieldHandler={fieldHandler}
          orderHandler={orderHandler}
        />        
        {store.loading 
          ? <Row justify='center'>
              <Spin tip='...Loading' size="large"/>
            </Row>
          : <>
            <Row gutter={[20, 20]}>
              {store.getProducts().map((product: ProductInstance) => (
                <CardComponent product={product} key={product._id} />
              ))}
            </Row>
            <Row justify='center'>
              <Pagination 
                current={store.page + 1}
                pageSize={12} 
                total={store.getLength()}
                onChange={pageHandler}
              />
            </Row>
          </>  
        }
      </Col>
    </Row>
  </>
}

export default observer(AllProductsPage)













































// const [rangeDB, setRangeDB] = useState<IRange>({minPriceProduct: 0, maxPriceProduct: 100})

// useEffect(() => {
  //   setPage(0)
  //   setField('_id')
  //   setOrder('asc')
  // }, [genre])

  // useEffect(() => {
  //   setPage(0)
  //   setOrder('asc')
  // }, [field])

  // useEffect(() => {
  //   setPage(0)
  // }, [order])

  // useEffect(() => {
  //   setPage(0)
  // }, [range])