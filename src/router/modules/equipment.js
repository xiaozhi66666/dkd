import Layout from '@/layout'
export default {
  path: '/equipment',
  component: Layout,
  name: 'equipment',
  meta: {
    title: '设备管理',
    icon: 'equipment'
  },
  children: [
    {
      path: 'equipmentmanage',
      component: () => import('@/views/equipment/components/equipmentmanage'), // Parent router-view
      name: 'manage',
      meta: { title: '设备管理' }
    },
    {
      path: 'status',
      component: () => import('@/views/equipment/components/status'),
      name: 'status',
      meta: { title: '设备状态' }
    },
    {
      path: 'typemanage',
      component: () => import('@/views/equipment/components/typemanage'),
      name: 'typemanage',
      meta: { title: '设备类型管理' }
    }
  ]
}
