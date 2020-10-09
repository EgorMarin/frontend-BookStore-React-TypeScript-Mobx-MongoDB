export const useRate = (array: any[] | undefined) => {
  const ratingLength = array?.length
  const rate = ratingLength && Math.round(array?.reduce((acc: any, item: any) => acc + item.rate, 0)/ratingLength! * 2)/2
  return {ratingLength, rate}
}