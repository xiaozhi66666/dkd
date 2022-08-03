import Layout from '@/layout'
export default {
  path: '/position',
  component: Layout,
  meta: { title: '点位管理', icon: 'position' },
  children: [
    {
      path: 'area',
      name: 'area',
      component: () => import('@/views/position/components/area'),
      meta: { title: '区域管理' }
    },
    {
      path: 'point',
      name: 'point',
      component: () => import('@/views/position/components/point'),
      meta: { title: '点位管理' }
    },
    {
      path: 'partner',
      name: 'partner',
      component: () => import('@/views/position/components/partner'),
      meta: { title: '合作商管理' }
    }
  ]
}
