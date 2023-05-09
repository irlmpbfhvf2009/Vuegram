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
        meta: { title: '运作状态', cache: true, roles: ['ADMIN'] }
      },
      {
        path: 'groupAndChannelManagement',
        component: createNameComponent(() => import('@/views/main/springyBot/groupAndChannelManagement/index.vue')),
        meta: { title: '机器人所在群组、频道', cache: true, roles: ['ADMIN'] }
      },
      {
        path: 'jobManagement',
        component: createNameComponent(() => import('@/views/main/springyBot/jobManagement/index.vue')),
        meta: { title: '招聘和求职信息管理', cache: true, roles: ['ADMIN'] }
      },
    ]
  }
]

export default route