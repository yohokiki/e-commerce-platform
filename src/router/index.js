import { createRouter, createWebHistory } from "vue-router";
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategroy from '@/views/SubCategory/index.vue'
import Detatil from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import CheckOut from '@/views/CheckOut/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from "@/views/Pay/component/PayBack.vue";
import Member from "@/views/Member/index.vue"
import UserInfo from "@/views/Member/component/userInfo.vue";
import UserOrder from "@/views/Member/component/UserOrder.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'category/:id',
          name: 'category',
          component: Category
        },
        {
          path: 'category/sub/:id',
          name: 'sub',
          component: SubCategroy
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: Detatil
        },
        {
          path: 'cartlist',
          name: 'cartlist',
          component: CartList
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: CheckOut
        },
        {
          path: 'pay',
          name: 'pay',
          component: Pay
        },
        {
          path: 'paycallback',
          name: 'paycallback',
          component: PayBack
        },
        {
          path: 'member',
          name: 'member',
          component: Member,
          redirect:'/member/user',
          children: [
            {
              path: 'user',
              name: 'user',
              component: UserInfo
            },
            {
              path: 'order',
              name: 'order',
              component: UserOrder
            }
          ]
        },

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})
export default router