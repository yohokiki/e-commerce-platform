import { computed, onUnmounted, ref } from 'vue';
import dayjs from 'dayjs';

export const useCountdown = () => {
  let timer = null
  // 初始时间
  const Time = ref(0)
  // 格式化时间
  const formatTime = computed(()=>dayjs.unix(Time.value).format('mm分ss秒'))
  const start = (currentTime)=>{
    Time.value = currentTime
    timer = setInterval(()=>{
      Time.value--
    },1000)
  }
  // 组件销毁时清除定时器
  onUnmounted(()=>{
    timer&& clearInterval(timer)
  })
  return {
    formatTime,
    start
  }

}