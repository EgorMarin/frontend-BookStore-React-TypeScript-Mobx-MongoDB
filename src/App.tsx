import React from 'react';
import Navbar from './components/Navbar';
import AllProductsPage from './pages/AllProductsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AddProductPage from './pages/AddProductPage';
import { useUserStore } from './store/UserModel'
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd'
import { observer } from 'mobx-react';
import ProductPage from './pages/ProductPage';
import OrdersPage from './pages/OrdersPage';
import SelfProductsPage from './pages/SelfProductsPage';
import AccountPage from './pages/AccountPage';
const { Content } = Layout

const App = () => {
  const store = useUserStore()

  return (
    <Layout>
      <Navbar />
      <Content>
        {store.isAdmin 
          ? <Switch>
            <Route path="/products" component={AllProductsPage} exact />
            <Route path="/product/:id" component={ProductPage} exact/>
            <Route path="/self/products" component={SelfProductsPage} exact/>
            <Route path="/orders" component={OrdersPage} exact />
            <Route path="/add/product" component={AddProductPage} exact />
            <Route path="/user/account" component={AccountPage} exact/>
            <Redirect to="/products" exact/>
          </Switch> 
            
          : store.token
            ? <Switch>
              <Route path="/products" component={AllProductsPage} exact />
              <Route path="/product/:id" component={ProductPage} exact/>
              <Route path="/orders" component={OrdersPage} exact />
              <Route path="/user/account" component={AccountPage} exact/>
              <Redirect to="/products" exact/>
            </Switch>

            : <Switch>
              <Route path="/products" component={AllProductsPage} exact />
              <Route path="/product/:id" component={ProductPage} exact/>
              <Route path="/user/register" component={RegisterPage} exact />
              <Route path="/user/login" component={LoginPage} exact />
              <Redirect to="/products" exact/>
            </Switch>
        }
      </Content>
    </Layout>
  )
}

export default observer(App);
