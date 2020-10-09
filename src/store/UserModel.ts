import { ProductModel } from './ProductModel';
import { createContext, useContext } from 'react';
import { types, flow, Instance } from 'mobx-state-tree'
import { message } from 'antd';
import { ICartProduct } from '../interfaces/interface';
import axios from 'axios'

const CartModel = types.model('Cart', {
  product: ProductModel,
  count: types.number
})

const ProfileModel = types.model('Profile', {
  name: types.string,
  country: types.string,
  city: types.string,
  address: types.string,
  postal: types.string
})

export const UserModel = types.model('User', {
  profile: ProfileModel,
  token: types.maybe(types.string),
  userId: types.maybe(types.string),
  isAdmin: types.maybe(types.boolean),
  cart: types.optional(types.array(CartModel), [])
})
.actions(self => ({
  getToken() {
    const {token, userId, isAdmin} = JSON.parse(localStorage.getItem('storage') || "{}")
    self.token = token 
    self.userId = userId
    self.isAdmin = isAdmin
  },
  logout() {
    localStorage.removeItem('storage')
    self.token = ''
    self.isAdmin = false
  }
})).actions(self => ({
  // регистрирует данные на сервере
  register: flow(function* (userInfo) {
    const {data} = yield axios.post('/api/user/register', userInfo)
    return data
  }),
  // проверяет правильность данных на сервере, если верно, то в 
  // localStorage помещает token, id юзера, параметр isAdmin: если true значит продавец,
  // если false значит покупатель
  login: flow(function* (userInfo) {
    const {data} = yield axios.post('/api/user/login', userInfo)
    localStorage.setItem('storage', JSON.stringify({
      token: data.token, userId: data.userId, isAdmin: data.isAdmin
    }))
    if (data.token && data.userId) {
      self.getToken()
      return {success: "You've successfuly logined"}
    }
    return data
  }),
  // возвращает данные (профиль) юзера
  getProfile: flow(function* () {
    self.getToken()
    const {data} = yield axios.get('/api/user/profile', { headers: {'authtoken': self.token}})
    if (data.error) return message.error(data.error)
    self.profile = data
  }),
  // возвращает корзину юзера
  getCart: flow(function* () {
    self.getToken()
    const {data} = yield axios.get('/api/user/cart', { headers: {'authtoken': self.token}})
    if (data.error) return message.error(data.error)
    self.cart.replace(data)
  }),
  // параметр: id продукта, добавляет продукт в корзину юзера
  addToCart: flow(function* (id) {
    message.loading({content: 'Action in progress..', key: 'updatable'})
    self.getToken()
    const {data} = yield axios.post(`/api/user/cart/add/${id}`, {}, { headers: {'authtoken': self.token}})
    if (data.error) return message.error(data.error)
    message.success({content: 'Product was added', key: 'updatable'})    
    self.cart.replace(data)
  }),
  // параметр: id продукта, вычитает по кол-ву 1 единица продукта из корзины юзера
  // если кол-во равно 0, тогда удаляет продукт из корзины
  removeFromCart: flow(function* (id) {
    message.loading({content: 'Action in progress..', key: 'updatable'})
    self.getToken()
    const {data} = yield axios.post(`/api/user/cart/remove/${id}`, {}, { headers: {'authtoken': self.token}})
    if (data.error) return message.error(data.error)
    message.info({content: 'Product was removed', key: 'updatable'})
    self.cart.replace(data)
  }),
  // параметр: id продукта, удаляет продукт из корзины юзера 
  deleteFromCart: flow(function* (id) {
    message.loading({content: 'Action in progress..', key: 'updatable'})
    self.getToken()
    const {data} = yield axios.post(`/api/user/cart/delete/${id}`, {}, { headers: {'authtoken': self.token}})
    if (data.error) return message.error(data.error)
    message.info({content: 'Product was removed from cart', key: 'updatable'})
    self.cart.replace(data)
  }),
  // оформление покупки продуктов:
  // Серверная часть:
  // - в каждом продукте из корзины в свойстве customers проверяется
  // наличие id данного юзера, если оно там хранится, то добавляется,
  // если же имеется то действие пропускается
  // - кол-во продукта (свойство count) вычитается из всего кол-ва 
  // (наличия на складе) продукта
  // - создается новый order из модели Order со свойствами(
  //  productId: id продукта, count: кол-во единиц купленого продукта, 
  //  customerId: id покупателя, sellerId: id продавца, status: cтатус доставки(по умолч. "getting order"))

  // Клиентская часть:
  // Очистить (заменить корзину на пустой массив)
  cartPurchase: flow(function* () {
    message.loading({content: 'Action in progress..', key: 'updatable'})
    self.getToken()
    const {data} = yield axios.post('/api/user/cart/purchase', {}, { headers: {'authtoken': self.token}})
    if (data.error) return message.error(data.error)
    self.cart.replace([])
    message.success({content: "The payment was succeeded!", key: 'updatable'})
  })
})).actions(self => ({
  // редактирование данных юзера, параметр info: обновленные поля(данные)
  editProfile: flow(function* (info) {
    self.getToken()
    const {data} = yield axios.post('/api/user/profile/edit', info, { headers: {'authtoken': self.token}})
    if (data.error) return message.error(data.error)
    message.success(data.success)
    self.getProfile()
  }),
  // удаление профиля юзера
  deleteProfile: flow(function* () {
    self.getToken()
    const {data} = yield axios.delete('/api/user/profile/delete', { headers: {'authtoken': self.token}})
    if (data.error) return message.error(data.error)
    message.success(data.success)
    self.logout()
  })
}))
.views(self => ({
  // подсчитывание общей суммы товаров в корзине
  get totalPrice(): number | undefined {
    let totalPrice = self.cart?.reduce((total: number, item: ICartProduct) => {
      return total += item.product.price * item.count
    }, 0)
    return +totalPrice.toFixed(2)
  },
  get cartLength(): number {
    return self.cart?.length
  }
}))

export const store = UserModel.create({
  profile: {
    name: '',
    country: '',
    city: '',
    address: '',
    postal: ''
  }
})


export const UserContext = createContext(store)
export type UserInstance = Instance<typeof UserModel>
export const useUserStore = () => useContext<UserInstance>(UserContext)
