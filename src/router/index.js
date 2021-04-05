import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../pages/homepage/homepage.vue'
import Bots from '../pages/bots/bots.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/bots',
      name: 'bots',
      component: Bots,
      // meta: {
      //   requiresAuth: true
      // }
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.getItem('token') === null) {
//       next({
//         path: '/'
//       })
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// })

export default router;
