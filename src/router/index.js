import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
import NotFound from '@/views/error/404'
import Home from '@/views/home'
import cleanTaskList from '@/views/clean/taskList'
import cleanTaskTransform from '@/views/clean/cleanTaskTransform'
import cleanTaskReader from '@/views/clean/cleanTaskReader'
import cleanTaskSuccess from '@/views/clean/cleanTaskSuccess'
import cleanTaskError from '@/views/clean/cleanTaskError'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: '',
      children: [
        { path: '/clean/task_list', component: cleanTaskList, name: '清洗任务列表' },
        { path: '/clean/task/reader', component: cleanTaskReader, name: '清洗任务读取数据' },
        { path: '/clean/task/tranform', component: cleanTaskTransform, name: '清洗规则配置' },
        { path: '/clean/task/success_writer', component: cleanTaskSuccess, name: '清洗正确数据' },
        { path: '/clean/task/error_writer', component: cleanTaskError, name: '清洗错误数据' },
    ]
    },
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
    }
  ]
})
