import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Cargos from './components/cargo.vue';
import Usuarios from './components/usuarios.vue';
import PerfilUsuarios from './components/perfilUsuarios.vue';
import NovoUSuario from './components/novoUsuario.vue';
import Apresentacao from './components/apresentacao.vue';

import VMask from 'v-mask';






Vue.use(VMask);

Vue.use(VueRouter);


const router = new VueRouter({
  routes: [
    {
      path: '/apresentacao', name: 'apresentacao',  component: Apresentacao
    },
    {
      path: '/cargos', name: 'cargos',  component: Cargos
    },
    {
      path: '/usuarios', name: 'usuarios' ,   component: Usuarios
    },
    {
      path: '/usuarios/cadastrar', name: 'cadastrarUsuarios',  component: NovoUSuario
    },    
    
    {
      path: '/perfilUsuarios',  name: 'perfilUsuarios', component: PerfilUsuarios
    },
    {
      path:'', redirect: '/apresentacao'      
    }
    

  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
