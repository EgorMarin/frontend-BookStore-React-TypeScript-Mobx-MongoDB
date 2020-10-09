import { ProductInstance } from "../store/ProductModel";

export interface IRangeProps {
  minPrice: number,
  maxPrice: number,
  rangeHandler: (value: any) => void,
  loading: boolean
}

export interface ICardProps {
  product: ProductInstance,
}

export interface IParamTypes {
  id: string
}

export interface IComment {
  _id: string,
  userId: string,
  userName: string,
  text: string,
  dateTime: string
}

export interface IOtherProduct {
  product: ProductInstance
}

export interface IOtherProductProps {
  product: ProductInstance
}

export interface ICartProduct {
  count: number,
  product: ProductInstance
}

export interface FormEditProps {
  product: ProductInstance,
  onFinish: (values: any) => void
}
