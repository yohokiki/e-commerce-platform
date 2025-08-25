import httpInstance from "@/utils/http";

export const loginAPI = ({ account, password }) => {
  return httpInstance({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}

// 获取可能喜欢商品列表
export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url: "/goods/relevant",
    params: {
      limit
    }
  })
}