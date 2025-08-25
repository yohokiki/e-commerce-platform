import httpInstance from "@/utils/http";

// 生成订单结算页
export const getCheckInfoAPI = () => {
  return httpInstance({
    url: '/member/order/pre'
  })
}

// 提交订单
export const commitOrderAPI = (data) => {
  return httpInstance({
    url: "/member/order",
    method:"POST",
    data

  })
}

// 提交新增的收货地址
export const addNewAddressesAPI = (data) => {
  return httpInstance({
    url: '/member/address',
    method:'POST',
    data
  })
}