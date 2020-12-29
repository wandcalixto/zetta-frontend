<template>

  <div id="app">
    
    
    <div class="container">
      <br>
      <!-- <form @submit.prevent="salvar">

           <div class="mb-3">
            <label for="usuario" class="form-label">Pesquisar</label>
            <input type="text" class="form-control" id="pesquisa" placeholder="Nome" v-model="usuario.nome">
          </div>
          <button type="submit" class="btn btn-primary"><i class="fas fa-search"></i> Pesquisar</button>
         
      </form> -->
      <h3>Usuários</h3>      
      <table  class="table table-hover">
        
        <thead>

          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Gênero</th>
            <th>Data do Cadastro</th>
            <th>Opções</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="usuario of usuarios" :key="usuario.id">

            <td>{{ usuario.id }}</td>
            <td>{{ usuario.nome }}</td>
            <td>{{ usuario.cpf }}</td>
            <td>{{ usuario.dataNascimento.split('-').reverse().join('/') }}</td>             
            <td>{{ usuario.sexo }}</td>
            <td>{{ usuario.dataCadastro }}</td>

           
            <td>             
              <router-link :to="{name: 'cadastrarUsuarios', params: {usuario: usuario}}" tag="button" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></router-link>      
              <button @click="apagar(usuario)" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

  import Usuario from '../services/usuarios'

  

  export default{
    data(){
      return {        
        usuario:{
          id:'',
          nome:'',
          cpf:'',
          dataNascimento:'',
          sexo:'',
          dataCadastro:''
        },
        usuarios: []
      }
    },

    mounted(){     
      this.listar()
    },

    methods:{

      listar(){
        Usuario.listar().then(resposta => {      
            this.usuarios = resposta.data
        })
      },    

      alterar(usuario){
        this.usuario = usuario
      },

      apagar(usuario){       
        if(confirm("Deseja excluir o usuário: "+usuario.nome+"?"))  
          Usuario.apagar(usuario).then(resposta =>{
            this.listar()
            alert("Usuário Excluído com Sucesso!")
          }).catch(e =>{
            console.log(e)
            alert("Ocorreu um erro ao excluir o usuário!")
          })
      }
    }
  }

</script>

<style>


</style>
