import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import LearningLeaders from '../views/LearningLeaders.vue'
import SkilledLeaders from '../views/SkilledLeaders.vue'
import NotFound from '../views/NotFound.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    names: 'Login',
    component: Login
  },
  {
    path: '/signup',
    names: 'Signup',
    component: Signup
  },
  {
    path: '/leaders/learning',
    names: 'Learning Leaders',
    component: LearningLeaders
  },
  {
    path: '/leaders/skilled',
    names: 'Skilled Leaders',
    component: SkilledLeaders
  },
  {
    path: '*',
    names: 'Not found',
    component: NotFound
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
