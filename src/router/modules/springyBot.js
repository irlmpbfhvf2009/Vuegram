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
        path: 'groupAndChannelManagement',
        component: createNameComponent(() => import('@/views/main/springyBot/groupAndChannelManagement/index.vue')),
        meta: { title: '已加入群组、频道(开发中)', cache: true, roles: ['admin'] }
      },
      {
        path: 'jobManagement',
        component: createNameComponent(() => import('@/views/main/springyBot/jobManagement/index.vue')),
        meta: { title: '招聘和求职信息管理(尚未开发)', cache: true, roles: ['admin'] }
      },
      // {
      //   path: 'robotGroupManagement2',
      //   component: createNameComponent(() => import('@/views/main/springyBot/robotGroupManagement/index.vue')),
      //   meta: { title: '会员邀请人数统计(尚未开发)', cache: true, roles: ['admin'] }
      // },
      // {
      //   path: 'robotGroupManagement3',
      //   component: createNameComponent(() => import('@/views/main/springyBot/robotGroupManagement/index.vue')),
      //   meta: { title: '会员奖金分析(尚未开发)', cache: true, roles: ['admin'] }
      // },
    ]
  }
]

export default route