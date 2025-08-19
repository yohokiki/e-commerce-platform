import httpInstance from "@/utils/http";

/**
 * 获取一级标题
 * id:一级标题页id
 */
export function getCategoryAPI(id){
  return httpInstance({
    url:'/category',
    params:{
      id
    }
  })
}

/**
 * 获取二级标题
 * 
 */
export const getCategoryFilterAPI=(id)=>{
  return httpInstance({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}

/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return httpInstance({
    url:'/category/goods/temporary',
    method:'POST',
    data
  })
}