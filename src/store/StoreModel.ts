import { types, flow, Instance } from 'mobx-state-tree'
import { UserModel } from './UserModel'
import { ProductModel } from './ProductModel'
import { useContext, createContext } from 'react'
import { OrderModel } from './OrderModel'
import { message } from 'antd'
import axios from 'axios'

const otherProductModel = types.model({
  product: ProductModel
})

const StoreModel = types.model('Store', {
  user: UserModel,
  products: types.array(ProductModel),
  product: ProductModel,
  otherProducts: types.array(otherProductModel),
  orders: types.array(OrderModel),
  selfProducts: types.array(otherProductModel),

  // фильтрация и сортировка
  genre: types.optional(types.string, ''),
  page: types.optional(types.number, 0),
  field: types.optional(types.string, '_id'),
  order: types.optional(types.string, 'asc'),
  loading: types.optional(types.boolean, false),

  // range параметры
  minPrice: types.optional(types.number, 0),
  maxPrice: types.optional(types.number, 100),
  rangeFrom: types.optional(types.string, ''),
  rangeTo: types.optional(types.string, '')
})
.actions(self => ({
  getToken() {
    const {token} = JSON.parse(localStorage.getItem('storage') || "{}")
    return token
  },
  // сортирует массив продуктов по order(asc или desc) 
  // и по выбранному полю(по id продукта, по названию, по цене);
  // по умолчанию от меньшего к большему по полю id продукта
  sortBy() {
    const key = self.field as keyof Instance<typeof ProductModel>
    self.products.replace(self.products.slice().sort((a, b) => self.order === 'asc' ? a[key] > b[key] ? 1 : -1 : a[key] > b[key] ? -1 : 1))
  },
  // фетчит все продукты по выбранным фильтрам жанра или выбранного ценового диапазона
  // возвращает выбранные продукты и max,min цену существующих продуктов
  fetchProducts: flow(function* () {
    self.loading = true
    const {data} = yield axios.get(`/api/products?genre=${self.genre}&rangeFrom=${self.rangeFrom}&rangeTo=${self.rangeTo}`)
    self.products.replace(data.products)
    self.minPrice = data.minPrice
    self.maxPrice = data.maxPrice
    self.page = 0
    self.loading = false
  }),
  // возвращает продукт по его id, а так же остальные продукты у данного продавца, чей продукт мы хотим получить 
  fetchProduct: flow(function* (id) {
    const {data} = yield axios.get(`/api/products/${id}`)
    if (data.error) return message.error(data.error)
    self.product = data.product
    self.otherProducts.replace(data.otherProducts)
  })
})).actions(self => ({
  setPage(page: number) {
    self.page = page
  },
  setField(field: string) {
    self.page = 0
    self.field = field
    self.sortBy()
  },
  setOrder(order: string) {
    self.page = 0
    self.order = order
    self.sortBy()
  },
  setGenre(genre: string) {
    self.page = 0
    self.field = '_id'
    self.order = 'asc'
    self.genre = genre
    self.fetchProducts()
  },
  setRange(value: number[]) {
    if (value.length < 1) return 
    self.page = 0
    self.field = '_id'
    self.order = 'asc'
    self.rangeFrom = value[0].toString()
    self.rangeTo = value[1].toString()
    self.fetchProducts()
  },
  // выставить рейтинг продукту
  setRate: flow(function* (rate) {
    const token = self.getToken()
    const {data} = yield axios.post(`/api/products/add/rate/${self.product._id}`, {rate}, { headers: {'authtoken': token}})
    if (data.error) return message.error(data.error)
    self.fetchProduct(self.product._id)
    message.info(data.success)
  }),
  createComment: flow(function* (comment) {
    const token = self.getToken()
    const {data} = yield axios.post(`/api/products/add/comment/${self.product._id}`, comment, { headers: {'authtoken': token}})
    if (data.error) return message.error(data.error)
    self.fetchProduct(self.product._id)
    message.info(data.success)
  }),
  deleteComment: flow(function* (commentId) {
    const token = self.getToken()
    const {data} = yield axios.post(`/api/products/delete/comment/${self.product._id}`, {commentId}, { headers: {'authtoken': token}})
    if (data.error) return message.error(data.error)
    self.fetchProduct(self.product._id)
    message.info(data.success)
  }),
  // для продавца получение все заказов купленных у него книг
  // для покупателя получение всех продуктов, которые он оформил на сайте
  fetchOrders: flow(function* () {
    const token = self.getToken()
    const {data} = yield axios.get('/api/orders', { headers: {'authtoken': token}})
    if (data.error) return message.error(data.error)
    self.orders.replace(data)
  }),
  // для продавца, изменяет статус доставки 
  changeOrderStatus: flow(function* ({id, status}) {
    const token = self.getToken()
    const {data} = yield axios.post(`/api/orders/status/${id}`, {status}, { headers: {'authtoken': token}})
    if (data.error) return message.error(data.error)
    self.orders.replace(data)
    message.success("You changed the order's status")
  }),
  // для продавца, получение всех продуктов добавленных этим продавцом
  fetchSelfProducts: flow(function* () {
    const token = self.getToken()
    const {data} = yield axios.get('/api/products/self/products', { headers: {'authtoken': token}})
    if (data.error) return message.error(data.error)
    self.selfProducts.replace(data)
  })
}))
.views(self => ({
  // получение определенное кол-во продуктов, зависящее от текущей страницы(page)
  getProducts() {
    return self.products.slice(self.page * 12, self.page * 12 + 12)
  },
  getLength(): number {
    return self.products.length
  },
  // для продавца, возвращает общую сумму заработка всех заказов (без комиссии сайта) 
  get getIncome(): number {
    const income = self.orders.slice().reduce((total, order) => {
      return total += order.count * order.productId.price
    }, 0)
    return income
  }
})).views(self => ({
  get getNetProfit(): number {
    const income = self.getIncome
    const taxes = income * 15 / 100
    return income - taxes
  }
}))

export const store = StoreModel.create({
  user: {
    profile: {
      name: '',
      country: '',
      city: '',
      address: '',
      postal: ''
    },
    token: '', 
    userId: '', 
    isAdmin: false, 
    cart: []
  },
  product: {
    _id: '',
    name: '',
    author: '',
    genre: '',
    image: '',
    price: 0,
    count: 0,
    rating: [],
    comments: [],
    customers: [],
    owner: {ownerName: '', ownerId: ''},
    sold: 0
  },
  otherProducts: [],
  products: [],
  orders: [],
  selfProducts: []
})

export type StoreInstance = Instance<typeof StoreModel>

export const StoreContext = createContext(store)

export const useStore = () => useContext<StoreInstance>(StoreContext)
