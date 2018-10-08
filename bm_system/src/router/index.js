import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/login';
import changepassword from '@/components/changepassword';
import changeziliao from '@/components/changeziliao';
import goodsfenlei from '@/components/goodsfenlei';
import goodslist from '@/components/goodslist';
import NotFound from '@/components/404';
import home from '@/components/home';

Vue.use(Router);

let router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      hidden:true
    },
    {
      path: '/404',
      name: '',
      component: NotFound,
      hidden:true
     
    },
    {
        path: '/',
        component: home,
        // 需要认证（登录）才运行进入路由
        meta: { requiresAuth: true },
        name: '商品管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {path: '/goodsfenlei', name: '商品分类',meta: { requiresAuth: true }, component: goodsfenlei},
            {path: '/goodslist',name: '商品列表',meta: { requiresAuth: true },component: goodslist}
        ]
    },
    {
        path: '/',
        component: home,
        name: '用户管理',
        
         
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {path: '/changepassword',name: '修改密码',meta: { requiresAuth: true },component: changepassword},
            {path: '/changeziliao',name:'资料修改',meta: { requiresAuth: true },component: changeziliao}
        ]
    },
    // {
    //     path: '*',
    //     hidden: true,
        
    //     redirect: { path: '/404' }
    // }

    ]
  
})


// 路由拦截
// 导航卫士（钩子函数）
// 操作导航卫士时，路由处于暂停状态
router.beforeEach((to,from,next) =>{
    // 需要登录才允许进入路由
    if(to.meta.requiresAuth){
        // 判断是否登录
        if(sessionStorage.getItem('token')){
            next();
        }else{
            next({
                path:'/login'
            })
        }   
    }else{
        // 调用next()方法，放行路由跳转
        next();
    }
});


export default router;
