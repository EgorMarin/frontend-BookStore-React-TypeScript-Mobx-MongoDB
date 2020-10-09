import { OwnerModel } from './ProductModel';
import { types, Instance } from 'mobx-state-tree'


const ProductIdModel = types.model({
  author: types.string,
  genre: types.string,
  image: types.string,
  name: types.string,
  price: types.number,
  owner: OwnerModel
})

const CustomerIdModel = types.model({
  address: types.string,
  city: types.string,
  country: types.string,
  name: types.string,
  postal: types.string
})

const SellerIdModel = types.model({
  address: types.string,
  city: types.string,
  country: types.string,
  postal: types.string
})

export const OrderModel = types.model('Order', {
  _id: types.string,
  count: types.number,
  productId: ProductIdModel,
  customerId: CustomerIdModel,
  sellerId: SellerIdModel,
  status: types.string
})


export const store = OrderModel.create({
  _id: '',
  count: 0,
  productId: {
    author: '',
    genre: '',
    image: '',
    name: '',
    price: 0,
    owner: {ownerName: '', ownerId: ''}
  },
  customerId: {
    address: '',
    city: '',
    country: '',
    name: '',
    postal: ''
  },
  sellerId: {
    address: '',
    city: '',
    country: '',
    postal: ''
  },
  status: ''
})

export type OrderInstance = Instance<typeof OrderModel>
