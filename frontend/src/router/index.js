import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Helper from '../views/Helper.vue';
import NProgress from 'nprogress';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/help',
    name: 'Help',
    component: Helper
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  // {
  //   path: '/todos',
  //   name: 'todos',
  //   component: () => import('../views/todos/TodoList.vue')
  // },
  {
    path: '/todo/create',
    name: 'todo Create',
    component: () => import('../views/todos/TodoCreate.vue')
  },
  {
    path: '/todo/edit/:id',
    name: 'todoEdit',
    component: () => import('../views/todos/TodoEdit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
});

export default router
