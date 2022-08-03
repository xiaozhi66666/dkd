import Layout from '@/layout'

export default {
  path: '/acountmoney',
  component: Layout,
  children: [
    {
      path: 'acountmoney',
      component: () => import('@/views/acountmoney'),
      meta: { title: '对账统计', icon: 'acountMoney' }
    }
  ]
}
