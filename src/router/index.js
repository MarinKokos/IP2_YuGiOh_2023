import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardSearch from '../components/CardSearch.vue';
import AboutView from '../views/AboutView.vue'




Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Search',
    name: 'CardSearch',
    component: CardSearch,
  },
  {
    path: '/About',
    name: 'About',
    component: AboutView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
