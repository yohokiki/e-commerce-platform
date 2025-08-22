import httpInstance from "@/utils/http";

/**
 * 登录状态下加入购物车
 * @param {string} skuId 规格id
 * @param {integer} count 商品数量
 * 
 * @returns {boolean}
 */
export const insertCartAPI=({skuId,count})=>{
  return httpInstance({
    url:'/member/cart',
    method:'POST',
    data:{
      skuId,
      count
    }
  })
}

/**
 * 登陆后，合并清空本地后，再从服务器获取此用户最新购物车列表
 * @returns 账户的购物车列表
 */
export const findNewCartListAPI = ()=>{
  return httpInstance({
    url:'/member/cart'
  })
}
/**
 * 删除id为ids的商品
 * @param {array[string]} ids 要删除的id
 * @returns 
 */
export const delCartAPI = (ids)=>{
  return httpInstance({
    url:"/member/cart",
    method:'DELETE',
    data:{
      ids
    }
  })
}

/**
 * 合并购物车，登录后需要把本地购物车合并然后清空本地购物车
 * @param {array} data [skuId:String,selected:String,count:integer]
 * @returns 
 */
export const mergeCartAPI = (data)=>{
  return httpInstance({
    url:'/member/cart/merge',
    method:'POST',
    data
  })
}