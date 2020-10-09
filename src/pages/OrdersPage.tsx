import { Table, Tag, Row, Col, Input, Space, Button, Select, Image } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { OrderInstance } from '../store/OrderModel'
import { useStore } from '../store/StoreModel'
import { SearchOutlined } from '@ant-design/icons'
import { useUserStore } from '../store/UserModel'

const { Column } = Table
const { Option } = Select

const OrdersPage = () => {
  const store = useStore()
  const userStore = useUserStore()

  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      await store.fetchOrders()
      setLoading(false)
    }
    fetchOrders()
    // eslint-disable-next-line
  }, [])
 
  const onStatusSelect = (value: string) => {
    const option: string[] = value.split(', ')
    store.changeOrderStatus({id: option[1], status: option[0]})
  }

  // API AntDesign, функция для поиска продукта по id
  const handleSearch = (selectedKeys: any, confirm: any) => {
    confirm()
    setSearchText(selectedKeys[0])
  }

  const handleReset = (clearFilters: any) => {
    clearFilters()
    setSearchText('')
  }


  return <div className='content-products'>
    {userStore.isAdmin 
      ? <Table
          size="middle"
          bordered
          loading={loading}
          pagination={{ position: ['bottomCenter'] }}
          rowKey={record => record._id}
          dataSource={store.orders?.slice()}
          expandable={{
            expandedRowRender: (record: OrderInstance) => (
              <Row>
                <Col span={8} offset={3}>
                  <p>№ {record._id}</p>
                  <h3>Shipping address:</h3>
                  <div><b>Name: </b>{record.customerId.name}</div>
                  <div><b>Coutry/city: </b>{record.customerId.country}, {record.customerId.city}</div>
                  <div><b>Address: </b>{record.customerId.address}</div>
                  <div><b>Postal code: </b>{record.customerId.postal}</div>
                </Col>
                <Col span={13}>
                  <Row>
                    <Col span={4} offset={1}>
                      <Image src={record.productId.image} height={170} style={{cursor: 'pointer'}}/>
                    </Col>
                    <Col span={17} offset={2}>
                      <h3>{record.productId.name}</h3>
                      <div><b>Price: </b>${record.productId.price}</div>
                      <div><b>Quantity: </b>{record.count}</div>
                      <h1 style={{paddingTop: 15}}>Total price: ${record.count * record.productId.price}</h1>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          }}
        >
          <Column 
            title="Status/Change status" 
            width={'25%'} 
            render={(record: OrderInstance) => (
              <Row justify='space-between'>
                <Tag color={record.status === 'getting order' ? "geekblue" : record.status === 'sent' ? "cyan" : "green"}>
                  {record.status}
                </Tag>
                <Select
                  size="small"
                  style={{ width: 125 }}
                  placeholder="Change status"
                  optionFilterProp="children"
                  onChange={onStatusSelect}
                  filterOption={(input, option) =>
                    option?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  defaultValue={record.status}
                  disabled={record.status === 'delivered' ? true : false} 
                >
                  <Option value={`getting order, ${record._id}`}>getting order</Option>
                  <Option value={`sent, ${record._id}`}>sent</Option>
                  <Option value={`delivered, ${record._id}`}>delivered</Option>
                </Select>
              </Row>
            )} 
            onFilter={(value: any, record: OrderInstance) => record.status.indexOf(value) === 0} 
            filters={[
              {
                text: 'getting order',
                value: 'getting order',
              },
              {
                text: 'sent',
                value: 'sent',
              },
              {
                text: 'delivered',
                value: 'delivered',
              }
            ]}
            filterMultiple={false}
          />

          <Column 
            title="Order №" 
            dataIndex="_id" 
            width={'40%'}
            filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
              <div style={{ padding: 8 }}>
                <Input
                  placeholder={'Search id'}
                  value={selectedKeys[0]}
                  onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                  onPressEnter={() => handleSearch(selectedKeys, confirm)}
                  style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                  <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                  >
                    Search
                  </Button>
                  <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                  </Button>
                </Space>
              </div>
            )}
            filterIcon={filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />}
            onFilter={(value: any, record: OrderInstance) => record['_id'].toString().toLowerCase().includes(value.toLowerCase())}
            render={text =>
              <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
              />
            }
          />

          <Column 
            title="Quantity" 
            dataIndex="count"
            width={'15%'}
            sorter={(a: OrderInstance, b: OrderInstance) => a.count - b.count}
            sortDirections={['descend', 'ascend']}
          />

          <Column 
            title="Total price"
            width={'20%'}
            render={(record: OrderInstance) => <div className="order-fontsize">${record.count * record.productId.price}</div>}
            sorter={(a: OrderInstance, b: OrderInstance) => a.count * a.productId.price - b.count * b.productId.price}
            sortDirections={['descend', 'ascend']}
          />
        </Table>

      : <Table
          size="middle"
          bordered
          loading={loading}
          pagination={{ position: ['bottomCenter'] }}
          rowKey={record => record._id}
          dataSource={store.orders?.slice()}
          expandable={{
            expandedRowRender: (record: OrderInstance) => (
              <Row>
                <Col span={5} offset={1}>
                  <p>№ {record._id}</p>
                  <h3>Shipping address:</h3>
                  <div><b>Name: </b>{record.customerId.name}</div>
                  <div><b>Coutry/city: </b>{record.customerId.country}, {record.customerId.city}</div>
                  <div><b>Address: </b>{record.customerId.address}</div>
                  <div><b>Postal code: </b>{record.customerId.postal}</div>
                </Col>
                <Col span={5} offset={1}>
                  <h3 style={{paddingTop: 37}}>Shipping from:</h3>
                  <div><b>Coutry/city: </b>{record.sellerId.country}, {record.sellerId.city}</div>
                  <div><b>Address: </b>{record.sellerId.address}</div>
                  <div><b>Postal code: </b>{record.sellerId.postal}</div>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={4} offset={1}>
                      <Image src={record.productId.image} height={170} style={{cursor: 'pointer'}}/>
                    </Col>
                    <Col span={17} offset={2}>
                      <h3>{record.productId.name}</h3>
                      <div><b>Seller: </b>{record.productId.owner.ownerName}</div>
                      <div><b>Price: </b>${record.productId.price}</div>
                      <div><b>Quantity: </b>{record.count}</div>
                      <h1 style={{paddingTop: 15}}>Total price: ${record.count * record.productId.price}</h1>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          }}
        >
          <Column 
            title="Status" 
            dataIndex='status' 
            width={'15%'}
            render={status => (
              <Tag color={status === 'getting order' ? "geekblue" : status === 'sent' ? "cyan" : "green"}>
                {status}
              </Tag>
            )}  
            filters={[
              {
                text: 'getting order',
                value: 'getting order',
              },
              {
                text: 'sent',
                value: 'sent',
              },
              {
                text: 'delivered',
                value: 'delivered',
              }
            ]}
            filterMultiple={false}
            onFilter={(value: any, record: OrderInstance) => record.status.indexOf(value) === 0}
          />

          <Column 
            title="Order №" 
            dataIndex="_id" 
            width={'33%'}
            filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
              <div style={{ padding: 8 }}>
                <Input
                  placeholder={'Search id'}
                  value={selectedKeys[0]}
                  onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                  onPressEnter={() => handleSearch(selectedKeys, confirm)}
                  style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                  <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                  >
                    Search
                  </Button>
                  <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                  </Button>
                </Space>
              </div>
            )}
            filterIcon={filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />}
            onFilter={(value: any, record: OrderInstance) => record['_id'].toString().toLowerCase().includes(value.toLowerCase())}
            render={text =>
              <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
              />
            }
          />

          <Column 
            title="Seller" 
            width={'17%'}
            render={(record: OrderInstance) => record.productId.owner.ownerName}
            filters={[
              {
                text: 'iBook',
                value: 'iBook',
              },
              {
                text: 'BookShelf',
                value: 'BookShelf',
              },
              {
                text: 'Books&Hooks',
                value: 'Books&Hooks',
              }
            ]}
            onFilter={(value: any, record: OrderInstance) => record.productId.owner.ownerName.indexOf(value) === 0}
          />

          <Column 
            title="Quantity" 
            dataIndex="count"
            width={'15%'}
            sorter={(a: OrderInstance, b: OrderInstance) => a.count - b.count}
            sortDirections={['descend', 'ascend']}
          />

          <Column 
            title="Total price"
            width={'20%'}
            render={(record: OrderInstance) => <div className="order-fontsize">${record.count * record.productId.price}</div>}
            sorter={(a: OrderInstance, b: OrderInstance) => a.count * a.productId.price - b.count * b.productId.price}
            sortDirections={['descend', 'ascend']}
          />
      </Table>
    }
  </div>
}

export default observer(OrdersPage)
