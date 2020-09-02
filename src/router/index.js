import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@c/Login'
import Home from '@c/Home'
import Welcome from '@c/Welcome'
import User from '@c/users/User'
import Right from '@c/power/Right'
import Roles from '@c/power/Roles'
import Cate from '@c/good/Cate'
import Params from '@c/good/Params'
import GoodList from '@c/good/GoodList'
import Add from '@c/good/Add'
import Orders from '@c/order/Orders'
import Report from '@c/report/Report'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/home',
        name: 'home',
        redirect: '/welcome',
        component: Home,
        children: [{
            path: '/welcome',
            component: Welcome
        }, {
            path: '/user',
            component: User
        }, {
            path: '/right',
            component: Right
        }, {
            path: '/roles',
            component: Roles
        }, {
            path: '/categories',
            component: Cate
        }, {
            path: '/params',
            component: Params
        }, {
            path: '/goodList',
            component: GoodList
        }, {
            path: '/goods/add',
            component: Add
        }, {
            path: '/orders',
            component: Orders
        }, {
            path: '/report',
            component: Report
        }]
    }
]

const router = new VueRouter({
    routes
})

//未路由设置导航守卫，判断用户是否登陆过
router.beforeEach((to, form, next) => {
    //放行跳转到登陆界面的路由
    if (to.path == '/login') next();
    //获取token并判断是否有zhi
    let token = window.sessionStorage.getItem('token');
    //没有token值跳转到登陆界面
    if (!token) next('/login');
    //有值放行
    next();
})

export default router