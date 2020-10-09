export const genreOptions = [
  {value: 'adventure', label: 'Adventure'},
  {value: 'biography', label: 'Biography'},
  {value: 'self-development', label: 'Self-development'},
  {value: 'romance', label: 'Romance'},
  {value: 'fiction', label: 'Fiction'},
  {value: 'antiutopia', label: 'Antiutopia'},
  {value: 'thriller', label: 'Thriller'},
  {value: 'horror', label: 'Horror'}
]

export const fieldOptions = [
  {value: '_id', label: 'default'},
  {value: 'name', label: 'name'},
  {value: 'price', label: 'price'}
]

export const orderOptions = [
  {value: 'asc', label: 'from lowest to highest'},
  {value: 'desc', label: 'from highest to lowest'}
]

export const countriesOptions = [
  {value: 'Russia', label: 'Russia', children: [
    {value: 'Moscow', label: 'Moscow'},
    {value: 'St.Petersburg', label: 'St.Petersburg'},
    {value: 'Rostov', label: 'Rostov'},
    {value: 'Sochi', label: 'Sochi'}
  ]},
  {value: 'Ukraine', label: 'Ukraine', children : [
    {value: 'Kyiv', label: 'Kyiv'},
    {value: 'Kharkiv', label: 'Kharkiv'},
    {value: 'Lviv', label: 'Lviv'}
  ]}
]

export const images = [
  {
    src: 'https://img.yakaboo.ua/media/easyslide/830_299_1_kn_13920.png'
  },
  {
    src: 'https://img.yakaboo.ua/media/easyslide/830_299_2_prav_26820.png'
  },
  {
    src: 'https://img.yakaboo.ua/media/easyslide/830_299_1_2_vud_13920.png'
  }
]

export const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

export const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}