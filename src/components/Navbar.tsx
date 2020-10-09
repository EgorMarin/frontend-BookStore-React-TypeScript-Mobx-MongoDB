import React, { useEffect, useState } from 'react'
import { Menu, Layout, message, Badge } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { UserOutlined, LoginOutlined, PlusOutlined, LogoutOutlined, ShoppingCartOutlined, ShoppingOutlined, SolutionOutlined, DatabaseOutlined } from '@ant-design/icons'
import { useUserStore } from '../store/UserModel'
import { observer } from 'mobx-react'
import { useStore } from '../store/StoreModel'
import CartPage from '../pages/CartPage'
const { Header } = Layout

const Navbar = () => {
  const store = useUserStore()
  const history = useHistory()

  const { setRange, minPrice, maxPrice } = useStore()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    store.getToken()
    // eslint-disable-next-line
  }, [])

  const onLogoClick = () => {
    setRange([minPrice, maxPrice])
    history.push('/products')
  }

  const onLogout = () => {
    message.info("You are logouted!")
    store.logout()
  }

  const onCart = () => setVisible(true)

  return <>
    <Header className="header" style={{backgroundColor: '#fafafa'}}>
      <div className="logo" onClick={onLogoClick}/>
      {
        store.isAdmin 
        ? <Menu selectedKeys={['']} theme="light" mode="horizontal">
          <Menu.Item key="self-products" icon={<DatabaseOutlined />}><Link to="/self/products">My products</Link></Menu.Item>
            <Menu.Item key="orders" icon={<SolutionOutlined />}><Link to="/orders">Orders</Link></Menu.Item>
            <Menu.Item key='add' icon={<PlusOutlined />}><Link to="/add/product">Add product</Link></Menu.Item>
            <Menu.Item key='account' icon={<UserOutlined />}><Link to="/user/account">Account</Link></Menu.Item>
            <Menu.Item key='logout' onClick={onLogout} icon={<LogoutOutlined />}>Log out</Menu.Item>
          </Menu>

        : store.token
          ? <Menu selectedKeys={['']} theme="light" mode="horizontal"> 
            <Menu.Item key="orders" icon={<ShoppingOutlined />}><Link to="/orders">My orders</Link></Menu.Item>
            <Menu.Item key="cart" onClick={onCart} icon={<ShoppingCartOutlined />}>
              <Badge offset={[12, -1]}  count={store.cartLength}>Cart</Badge>
            </Menu.Item>
            <Menu.Item key='account' icon={<UserOutlined />}><Link to="/user/account">Account</Link></Menu.Item>
            <Menu.Item key='logout' onClick={onLogout} icon={<LogoutOutlined />}>Log out</Menu.Item>
          </Menu>

          : <Menu selectedKeys={['']} theme="light" mode="horizontal">
            <Menu.Item key='login' icon={<LoginOutlined />}><Link to="/user/login">Log in</Link></Menu.Item>
          </Menu>
      }
    </Header>
    {visible
      ? <CartPage setVisible={setVisible}/>
      : null
    }
  </>
}

export default observer(Navbar)
