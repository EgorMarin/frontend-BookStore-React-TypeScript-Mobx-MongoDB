import React, { useState } from 'react'
import { IRangeProps } from '../interfaces/interface'
import { Button, Row, Slider } from 'antd'

const Range: React.FC<IRangeProps> = ({minPrice, maxPrice, rangeHandler, loading}) => {
  const [activeRange, setActiveRange] = useState<number[]>()

  const onAfterChange = (value: number[]) => setActiveRange(value)
  
  const onClickHandler = () => {
    if (activeRange !== undefined) {
      rangeHandler(activeRange)
    } else {
      rangeHandler([minPrice, maxPrice])
    }
  }

  return <div className='range'>
    <b>Choose the price:</b>
    <div className='range-slider'>
      <Row justify='space-between'>
        <b>min</b>
        <b>max</b>
      </Row>
      <Slider     
        defaultValue={[minPrice, maxPrice]} 
        min={minPrice} 
        max={maxPrice + 1} 
        onAfterChange={onAfterChange} 
        range 
        marks={
          loading ? {} : {
            5: '5',
            10: '10',
            15: '15',
            20: '20',
            25: '25',
            30: '30',
            35: '35',
            40: '40',
            50: '50',
            55: '55',
            60: '60',
            65: '65',
            70: '70',
            75: '75',
            80: '80',
            85: '85',
            90: '90',
            95: '95',
            100: '100',
          }
        }
      />
      <Row justify='space-between' align='middle'>
        <Button onClick={onClickHandler} type="default" shape="round" size='middle' style={{marginLeft: 5}}>Select</Button>
        <div></div>
      </Row>
    </div>
  </div>
}

export default Range
