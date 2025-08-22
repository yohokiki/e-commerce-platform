import httpInstance from "@/utils/http";

/**
 * 获取商品详细信息
 * @param {Number} id 
 * @returns 商品详细信息
 */
export const getDetail = (id)=>{
  return httpInstance({
    url:'/goods',
    params:{
      id
    }
  })
}

/**
 * 
 * @param {Number} id 商品id
 * @param {Number} type 1是24小时热榜，2是周热榜
 * @param {number} limit
 * @returns 
 */
export const fetchHotGoodsAPI = ({id,type,limit=3})=>{
  return httpInstance({
    url:'/goods/hot',
    params:{
      id,
      type,
      limit
    }
  })
}

