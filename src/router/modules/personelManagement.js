import Layout from '@/layout'
export default {
  path: '/personelManagement',
  component: Layout,
  name: 'personelManagement',
  meta: {
    title: '人员管理',
    icon: 'personelManagement'
  },
  children: [
    {
      path: 'personlist',
      component: () =>
        import('@/views/personelManagement/components/personlist'), // Parent router-view
      name: 'personlist',
      meta: { title: '人员列表' }
    },
    {
      path: 'personacount',
      component: () =>
        import('@/views/personelManagement/components/personacount'),
      name: 'personacount',
      meta: { title: '人效统计' }
    },
    {
      path: 'worklist',
      component: () => import('@/views/personelManagement/components/worklist'),
      name: 'worklist',
      meta: { title: '工作量列表' }
    }
  ]
}
