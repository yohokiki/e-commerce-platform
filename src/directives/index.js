import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app){
    // 定义全局指令
app.directive('img-lazy', {
  mounted(el, binding) {
    // el:被指令绑定的元素 img
    // bingding: bingding.value 指令等号后面绑定的表达式的值  url
    console.log(el, binding.value)
    const {stop} = useIntersectionObserver(
      el,
      ([ {isIntersecting} ]) => {
        console.log(isIntersecting,'我是isIntersecting');
        if(isIntersecting){
          // 进入视窗
          el.src = binding.value
          stop()
        }
      },
    )
  }
})
  }
}