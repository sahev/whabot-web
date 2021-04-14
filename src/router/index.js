import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../pages/home/homepage.vue'
import Botspage from '../pages/bots/botspage.vue'
import Faqspage from '../pages/faqs/faqspage.vue'
import Workflowspage from '../pages/workflows/workflowspage.vue'
import Stagespage from '../pages/stages/stagespage.vue'
import Configspage from '../pages/configurations/configspage.vue'
import Helppage from '../pages/help/helppage.vue'

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
      component: Botspage,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/faqs',
      name: 'faqs',
      component: Faqspage,
      // meta: {
      //   requiresAuth: true
      // }
    },    
    {
      path: '/workflows',
      name: 'workflows',
      component: Workflowspage,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/stages/',
      name: 'stages',
      component: Stagespage,
      // meta: {
      //   requiresAuth: true
      // }
    },    
    {
      path: '/configs',
      name: 'configs',
      component: Configspage,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/help',
      name: 'help',
      component: Helppage,
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
