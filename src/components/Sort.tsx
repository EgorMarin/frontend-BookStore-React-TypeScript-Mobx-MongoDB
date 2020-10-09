import React from 'react'
import { Row, Cascader } from 'antd'
import { fieldOptions, orderOptions } from '../utils/utils'
import { CascaderValueType } from 'antd/lib/cascader'

interface ISortProps {
  field: string,
  order: string,
  fieldHandler: (value: CascaderValueType) => void,
  orderHandler: (value: CascaderValueType) => void
}

const Sort: React.FC<ISortProps> = ({field, order, fieldHandler, orderHandler}) => {
  return <Row className="content-products-list-sort">
    <div>
      <span><b>Sort by: </b></span>
      <Cascader options={fieldOptions} onChange={fieldHandler}>
        <a href="!#">{field === '_id' ? 'default' : field}</a>
      </Cascader>
    </div>
    <Cascader options={orderOptions} onChange={orderHandler}>
      <a href="!#">{order === 'asc' ? 'from lowest to highest' : 'from highest to lowest'}</a>
    </Cascader>
  </Row>
}

export default Sort
