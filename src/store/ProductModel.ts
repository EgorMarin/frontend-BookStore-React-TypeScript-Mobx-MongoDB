import { types, flow, Instance } from 'mobx-state-tree'
import { createContext, useContext } from 'react'
import { message } from 'antd'
import axios from 'axios'

export const OwnerModel = types.model('Owner', {
  ownerName: types.string,
  ownerId: types.string
})

const RateModel = types.model('Rate', {
  userId: types.string,
  rate: types.number
})

const CommentModel = types.model('Comment', {
  _id: types.string,
  userId: types.string,
  userName: types.string,
  text: types.string,
  dateTime: types.string
})

export const ProductModel = types.model('Product', {
  _id: types.string,
  name: types.string,
  author: types.string,
  genre: types.string,
  image: types.string,
  price: types.number,
  count: types.number,
  rating: types.array(RateModel),
  comments: types.array(CommentModel),
  customers: types.array(types.string),
  owner: OwnerModel,
  sold: types.maybe(types.number)
})
.actions(self => ({
  getToken() {
    const {token} = JSON.parse(localStorage.getItem('storage') || "{}")
    return token
  }
})).actions(self => ({
  createProduct: flow(function* (product) {
    const token = self.getToken()
    const {data} = yield axios.post('/api/products/add', product, { headers: {'authtoken': token}})
    if (data.error) return message.error(data.error)
    return data
  }),
  editProduct: flow(function* (product) {
    message.loading({content: 'Action in progress..', key: 'updatable'})
    const token = self.getToken()
    const {data} = yield axios.post(`/api/products/edit/${self._id}`, product, { headers: {'authtoken': token}})
    if (data.error) return message.error(data.error)
    if (data.success) message.info({content: data.success, key: 'updatable'})
  }),
  deleteProduct: flow(function* () {
    const token = self.getToken()
    const {data} = yield axios.delete(`/api/products/delete/${self._id}`, { headers: {'authtoken': token}})
    if (data.error) return message.error(data.error)
    if (data.success) message.info(data.success)
  }),
  // для продаца, для каждого продукта получение кол-во проданного продукта 
  soldProductCount: flow(function* () {
    const token = self.getToken()
    const {data} = yield axios.get(`/api/products/sold/${self._id}`, { headers: {'authtoken': token}})
    const sold = data.reduce((total: number, product: any) => total += product.count, 0)
    self.sold = sold
  })
}))


export const store = ProductModel.create({
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
  owner: {ownerName: '', ownerId: ''}
})


export type ProductInstance = Instance<typeof ProductModel>
export const ProductContext = createContext(store)
export const useProductStore = () => useContext<ProductInstance>(ProductContext)