import httpInstance from "@/utils/http";


// 获取轮播图片
export function getBannerAPI(){
  return httpInstance({
    url:"/home/banner"
  })
}

// 最新上架
export function findNewAPI(){
  return httpInstance({
    url:"/home/new"
  })
}

// 人气商品
export function findHotAPI(){
  return httpInstance({
    url:"/home/hot"
  })
}

// 商品模块
export function findGoodsAPI(){
  return httpInstance({
    url:"/home/goods"
  })
}