<template>
  <!-- <TabMenu :model="items" /> -->
    <!-- <router-view /> -->
  <div id="app">
    
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cargos</a>
      </div>
    </nav>

    <div class="container">

      <form @submit.prevent="salvar">

          <label>CARGO</label>
          <input type="text" placeholder="Cargo" v-model="cargo.cargo">
          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>CARGO</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="cargo of cargos" :key="cargo.id">

            <td>{{ cargo.id }}</td>
            <td>{{ cargo.cargo }}</td>
           
            <td>
              <button @click="alterar(cargo)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="apagar(cargo)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

  import Cargo from './services/cargos'
  // import TabMenu from 'primevue/tabmenu'

  

  export default{
    data(){
      return {
         items: [
            {label: 'Home', icon: 'pi pi-fw pi-home', to: '/tabmenu'},
            {label: 'Calendar', icon: 'pi pi-fw pi-calendar', to: '/tabmenu/calendar'},
            {label: 'Edit', icon: 'pi pi-fw pi-pencil', to: '/tabmenu/edit'},
            {label: 'Documentation', icon: 'pi pi-fw pi-file', to: '/tabmenu/documentation'},
            {label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/tabmenu/settings'}
        ],

        cargo:{
          id:'',
          cargo:''
        },
        cargos: []
      }
    },

    mounted(){     
      this.listar()
    },

    methods:{

      listar(){
        Cargo.listar().then(resposta => {      
            this.cargos = resposta.data
        })
      },

      salvar(){
        //antes de salvar o cargo vamos verificar se ele já não esta cadastrado

        // Cargo.buscaCargoDescricao(this.cargo).then(resposta => {
        //   console.log(resposta)
        // })
     

        if(this.cargo.cargo != ""){
          if(!this.cargo.id){//aqui estamos salvando um novo cargo

            Cargo.salvar(this.cargo).then(resposta => {
              
            if(resposta.data.id){
              alert('Salvo com Sucesso!')
            }else{
              alert('Ocorreu um erro ao salvar o Cargo!')
            }
              this.cargo = {}
              this.listar()
              
            })

          }else{//aqui estamos alterando um cargo
             Cargo.alterar(this.cargo).then(resposta => {
                         
              alert('Cargo Alterado com Sucesso!')    

              this.cargo = {}
              this.listar()
              
            })
          }

        }else{
          alert("É necessário preencher o Cargo para salvar!")
        }    
      },

      alterar(cargo){
        this.cargo = cargo
      },

      apagar(cargo){       
        if(confirm("Deseja remover o cargo: "+cargo.cargo+"?"))  
          Cargo.apagar(cargo).then(resposta =>{
            this.listar()
            alert("Cargo Excluido com Sucesso!")
          }).catch(e =>{
            console.log(e)
            alert("Ocorreu um erro ao excluir o cargo!")
          })
      }
    }
  }

</script>

<style>


</style>
