import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: 'login/Login', title: '登录' },
    {
      component: '@/layouts/index',
      wrappers:['@/utils/auth'],
      routes: [
        { path: '/', component: 'home/Home', title: '首页' },
        { path: '/addArticle', component: 'addArticle/AddArticle', title: '添加文章' },
        { path: '/articleList', component: 'articleList/ArticleList', title: '文章列表' }
      ]
    },
  ],
  fastRefresh: {},
  sass: {}
});
