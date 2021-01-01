<template>

  <div id="app">
    
    
    <div class="container">
      <br>
      <h3>Usuários</h3>      
      <table  class="table table-hover">
        
        <thead>

          <tr>
            <th @click="listar('id')" class="pointer">ID <i class="fas fa-sort-down"></i></th>
            <th @click="listar('nome')" class="pointer">NOME <i class="fas fa-sort-down"></i></th>
            <th>CPF</th>
            <th>DATA DE NASCIMENTO</th>
            <th>GÊNERO</th>
            <th>CARGO</th>
            <th>DATA DO CADASTRO</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="usuario of usuarios" :key="usuario.id">

            <td>{{ usuario.id }}</td>
            <td>{{ usuario.nome }}</td>
            <td>{{ usuario.cpf }}</td>
            <td>{{ usuario.dataNascimento.split('-').reverse().join('/') }}</td>             
            <td>{{ usuario.sexo }}</td>
            <td>{{ usuario.cargo.cargo }}</td>
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
        usuarios: [],
        ordem:'id'
      }
    },

    mounted(){     
      this.listar(this.ordem)
    },

    methods:{

      listar(ordem){
        this.ordem = ordem
        Usuario.listar(ordem).then(resposta => {      
            this.usuarios = resposta.data
        })
      },    

      alterar(usuario){
        this.usuario = usuario
      },

      apagar(usuario){       
        if(confirm("Deseja excluir o usuário: "+usuario.nome+"?"))  
          Usuario.apagar(usuario).then(resposta =>{
            this.listar(this.ordem)
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
