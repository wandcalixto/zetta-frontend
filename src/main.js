import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Cargos from './components/cargo.vue';
import Usuarios from './components/usuarios.vue';
import PerfilUsuarios from './components/perfilUsuarios.vue';




Vue.use(VueRouter);


const router = new VueRouter({
  routes: [
    {
      path: '/cargos',
      component: Cargos
    },
    {
      path: '/usuarios',
      component: Usuarios
    },
    {
      path: '/perfilUsuarios',
      component: PerfilUsuarios
    }

  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
