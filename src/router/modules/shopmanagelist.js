import Layout from '@/layout'
export default {
  path: '/shopmanagelist',
  component: Layout,
  name: 'shopmanagelist',
  meta: {
    title: '商品管理',
    icon: 'puzzle'
  },
  children: [
    {
      path: 'shoptype',
      component: () => import('@/views/shopmanagelist/components/shoptype'), // Parent router-view
      name: 'shoptype',
      meta: { title: '商品类型' }
    },
    {
      path: 'shopmanage',
      component: () => import('@/views/shopmanagelist/components/shopmanage'),
      name: 'shopmanage',
      meta: { title: '商品管理' }
    }
  ]
}
