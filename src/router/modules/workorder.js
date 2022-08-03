import Layout from '@/layout'
export default {
  path: '/workorder',
  component: Layout,
  name: 'orkorder',
  meta: { title: '工单管理', icon: 'workOrder' },
  children: [
    {
      path: 'operation',
      name: 'operation',
      component: () => import('@/views/workorder/components/operation'),
      meta: { title: '运营工单' }
    },
    {
      path: 'manenge',
      name: 'manenge',
      component: () => import('@/views/workorder/components/maintain'),
      meta: { title: '运维工单' }
    }
  ]
}
