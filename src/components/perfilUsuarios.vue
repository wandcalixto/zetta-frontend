<template>

  <div id="app">
    
    
    <div class="container">
      <br>
      <h3>Perfil de Usuário</h3>
      <form @submit.prevent="salvar">

           <div class="mb-3">
            <label for="nomePerfilUsuario" class="form-label">{{tituloCadastro}}</label>
            <input type="text" class="form-control" id="nomePerfilUsuario" placeholder="Nome" v-model="perfilUsuario.nomePerfilUsuario">
          </div>
          <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Salvar</button>
         
      </form>

      <table  class="table table-hover">

        <thead>

          <tr>
            <th @click="listar('id')" class="pointer">ID <i class="fas fa-sort-down"></i></th>
            <th @click="listar('nomePerfilUsuario')" class="pointer">NOME <i class="fas fa-sort-down"></i></th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="perfilUsuario of perfilUsuarios" :key="perfilUsuario.id">

            <td>{{ perfilUsuario.id }}</td>
            <td>{{ perfilUsuario.nomePerfilUsuario }}</td>
           
            <td>
              <button @click="alterar(perfilUsuario)" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></button>
              <button @click="apagar(perfilUsuario)" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

  import PerfilUsuario from '../services/perfilUsuarios'

  

  export default{
    data(){
      return {        
        perfilUsuario:{
          id:'',
          nomePerfilUsuario:''
        },
        perfilUsuarios: [],
        tituloCadastro:'Cadastrar Novo Perfil de Usuário',
        ordem: 'id'
      }
    },

    mounted(){     
      this.listar(this.ordem)
    },

    methods:{

      listar(ordem){
        this.ordem = ordem
        PerfilUsuario.listar(ordem).then(resposta => {      
            this.perfilUsuarios = resposta.data
        })
      },

      salvar(){
        //antes de salvar o perfil de usuario vamos verificar se ele já não esta cadastrado 
    
        if(this.perfilUsuario.nomePerfilUsuario != "" && this.perfilUsuario.nomePerfilUsuario != null){
          if(!this.perfilUsuario.id){//aqui estamos salvando um novo perfil de usuario
            PerfilUsuario.buscaPerfilUsuarioNomePerfilUsuario(this.perfilUsuario.nomePerfilUsuario).then(perfilUsuarioExistente => {//verificamos se o novo pefil de usuario ja não existe, a função de inserção também verifica
             
               if(perfilUsuarioExistente.data == null || perfilUsuarioExistente.data == ""){              
                    PerfilUsuario.salvar(this.perfilUsuario).then(resposta => {
                    
                        if(resposta.data.id){
                        alert('Salvo com Sucesso!')
                        }else{
                        alert('Ocorreu um erro ao salvar o Perfil de Usuário!')
                        }
                        this.perfilUsuario = {}
                        this.listar(this.ordem)                        
                    })
               }else{
                   alert('Esse perfil de usuário já está cadastrado no sistema com o id: '+perfilUsuarioExistente.data.id)
               }

             })

          }else{//aqui estamos alterando um perfil de usuário
             PerfilUsuario.alterar(this.perfilUsuario).then(resposta => {
                         
              alert('Perfil de Usuário Alterado com Sucesso!')    

              this.perfilUsuario = {}
              this.tituloCadastro = 'Cadastrar Novo Perfil de Usuário'
              this.listar(this.ordem)
              
            })
          }

        }else{
          alert("É necessário preencher o Nome do Perfil de Usuario para salvar!")
        }    
      },

      alterar(perfilUsuario){
        this.tituloCadastro = 'Alterar Perfil de Usuário'
        this.perfilUsuario = perfilUsuario
      },

      apagar(perfilUsuario){       
        if(confirm("Deseja remover o perfil de usuário: "+perfilUsuario.nomePerfilUsuario+"?"))  
          PerfilUsuario.apagar(perfilUsuario).then(resposta =>{
            this.listar(this.ordem)
            alert("Perfil de usuário Excluido com Sucesso!")
          }).catch(e =>{
            console.log(e)
            alert("Ocorreu um erro ao excluir o perfil de usuário!\nCertifique-se que ele não esta associado a nenhum usuario!")
          })
      } 
    }
  }

</script>

<style>


</style>
