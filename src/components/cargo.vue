<template>

  <div id="app">
    
    
    <div class="container">
      <br>
      <h3>Cargos</h3>
      <form @submit.prevent="salvar">

           <div class="mb-3">
            <label for="cargo" class="form-label">Cadastrar Novo Cargo</label>
            <input type="text" class="form-control" id="cargo" placeholder="Cargo" v-model="cargo.cargo">
          </div>
          <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Salvar</button>
         
      </form>

      <table  class="table table-hover">

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
              <button @click="alterar(cargo)" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></button>
              <button @click="apagar(cargo)" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

  import Cargo from '../services/cargos'

  

  export default{
    data(){
      return {        
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
    
      

       
     
       
        if(this.cargo.cargo != "" && this.cargo.cargo != null){
          if(!this.cargo.id){//aqui estamos salvando um novo cargo
            Cargo.buscaCargoDescricao(this.cargo.cargo).then(cargoExistente => {//verificamos se o novo cargo ja não existe, a função de inserção também verifica
             
               if(cargoExistente.data == null || cargoExistente.data == ""){              
                    Cargo.salvar(this.cargo).then(resposta => {
                    
                        if(resposta.data.id){
                        alert('Salvo com Sucesso!')
                        }else{
                        alert('Ocorreu um erro ao salvar o Cargo!')
                        }
                        this.cargo = {}
                        this.listar()                        
                    })
               }else{
                   alert('Esse cargo já está cadastrado no sistema com o id: '+cargoExistente.data.id)
               }

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
