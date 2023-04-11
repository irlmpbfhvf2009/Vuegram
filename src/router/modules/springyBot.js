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
        component: createNameComponent(() => import('@/views/main/springyBot/operatingStatus/index.vue')),
        meta: { title: '运作状态', cache: true, roles: ['admin'] }
      },
      {
        path: 'robotGroupManagement',
        component: createNameComponent(() => import('@/views/main/springyBot/robotGroupManagement/index.vue')),
        meta: { title: 'Bot群组管理(尚未完成)', cache: true, roles: ['admin'] }
      },
      {
        path: 'robotChannelManagement',
        component: createNameComponent(() => import('@/views/main/springyBot/robotGroupManagement/index.vue')),
        meta: { title: 'Bot频道管理(尚未完成)', cache: true, roles: ['admin'] }
      },
      {
        path: 'jobManagement',
        component: createNameComponent(() => import('@/views/main/springyBot/jobManagement/index.vue')),
        meta: { title: '招聘和求职信息管理(尚未完成)', cache: true, roles: ['admin'] }
      },
    ]
  }
]

export default route