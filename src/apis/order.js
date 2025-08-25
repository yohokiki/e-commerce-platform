import httpInstance from "@/utils/http";

/**
 * 获取用户订单
 * @param {object} params {orderState:0,page:1,pageSize:2}
 * @returns 用户订单列表
 */
export const getUserOrder = (params)=>{
  return httpInstance({
    url:'/member/order',
    method:'GET',
    params
  })
}