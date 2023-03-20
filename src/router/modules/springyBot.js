import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/telegram',
    component: Layout,
    redirect: '/telegram/springyBot',
    meta: { title: '机器人管理', icon: 'el-icon-s-promotion' },
    alwayShow: true,
    children: [
      {
        path: 'springyBot',
        component: createNameComponent(() => import('@/views/main/springyBot/index.vue')),
        meta: { title: '运作状态', cache: true, roles: ['admin'] }
      }
    ]
  }
]

export default route