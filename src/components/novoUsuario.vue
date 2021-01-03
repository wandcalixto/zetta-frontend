<template>

  <div id="app">

       
    <div class="container">
        <br>
    <form class="row g-3 needs-validation form" novalidate  @submit.prevent="salvar">
          <h3>{{titulo}}</h3> 
          <div class="col-md-4">
              <label for="nome" class="form-label">Nome completo <i class="obrigatorio">*</i></label>
              <input type="text" class="form-control" id="nome" required v-model="usuario.nome">                             
              <div class="invalid-feedback">
                  É necessário preencher o nome.
              </div>        
          </div>
          <div class="col-md-4">
              <label for="cpf" class="form-label">CPF <i class="obrigatorio">*</i></label>
              <input type="text"  v-mask="'###.###.###-##'" class="form-control" id="cpf"  required @change="exibeMensagemCPf" v-model="usuario.cpf"> 
              
               {{this.mensagemcpf}}        
               <div class="invalid-feedback">
               É necessário preencher o cpf.            
              </div>              
          </div>
          
          <div class="col-md-4 div-break">
              <label for="nascimento" class="form-label">Nascimento</label>
              <input type="date" class="form-control" id="nascimento" v-model="usuario.dataNascimento">
              <div class="invalid-feedback">
              É necessário preencher a data de nascimento.
              </div>
          </div>
          <div class="col-md-4">
              <label for="sexo" class="form-label">Gênero</label>
              <select class="form-select" id="sexo" v-model="usuario.sexo">
              <option selected disabled value="">Selecione...</option>
              <option value='Masculino'>Masculino</option>
              <option value='Feminino'>Feminino</option>
              <option value='Homem Transgênero'>Homem Transgênero</option>
              <option value='Mulher Transgênero'>Mulher Transgênero</option>
              <option value='Homem Transexual'>Homem Transexual</option>
              <option value='Mulher Transexual'>Mulher Transexual</option>
              <option value='Cisgênero'>Cisgênero</option>
              <option value='Não sei responder'>Não sei responder</option>
              <option value='Prefiro não responder'>Prefiro não responder</option>
              <option value='Outros'>Outros</option>
              </select>
              <div class="invalid-feedback">
                Selecione o gênero.
              </div>
          </div>

          <div class="col-md-4">
              <label for="cargo" class="form-label">Cargo <i class="obrigatorio">*</i></label>
              <select class="form-select" id="cargo" v-model="usuario.cargo.id" required>
              <option selected disabled value="">Selecione...</option>
              <option v-for="cargo of cargos" :key="cargo.id" :value="cargo.id">{{cargo.cargo}}</option>

              </select>
              <div class="invalid-feedback">
                É necessário selecionar o cargo.
              </div>
          </div>
         <h4>Perfis de Usuário</h4> 
        <div class="col-md-4">
          {{MensagemSemPerfilUsuario}}
          <div class="form-check form-switch pointer" v-for="perfilUsuario of perfilUsuarios" :key="perfilUsuario.id" >
            <input class="form-check-input pointer" type="checkbox" v-bind:id="'perfilUsuario'+perfilUsuario.id" :value="perfilUsuario" v-model="usuario.perfilUsuarios">
            <label class="form-check-label pointer" v-bind:for="'perfilUsuario'+perfilUsuario.id">{{perfilUsuario.nomePerfilUsuario}}</label>
          </div>
        </div>

        
          
          <div class="col-12">
              <button class="btn btn-danger" @click="voltar()"  type="button"><i class="fas fa-times"></i> Cancelar</button>&nbsp;
              <button class="btn btn-primary" type="submit"><i class="fas fa-save"></i> Salvar</button>
          </div>
         
    </form>

    </div>

  </div>
</template>

<script>

  import Usuario from '../services/usuarios'
  import Cargo from '../services/cargos'
  import PerfilUsuario from '../services/perfilUsuarios'



  

  export default{
    data(){
      return {        
        usuario:{
          id:'',
          nome:'',
          cpf:'',
          dataNascimento:'',
          sexo:'',        
          cargo: {
            id:'',
            cargo: ''
          },
          perfilUsuarios:[
           
          ]
        },
        cargo:{
          id:'',
          cargo:''
        },
        perfilUsuarios:{
          id:'',
          nomePerfilUsuario:''
        },
        usuarios: [],
        mensagemcpf:'',
        cargos: [],
        titulo:'Cadastro de Usuário',
        MensagemSemPerfilUsuario: ''
      }
    },

    mounted(){
      this.listarCargos();
      this.listarPerfilUsuarios();
      if(this.$route.params.usuario){
          this.usuario = this.$route.params.usuario;
      }     
      if(this.usuario.id){
        this.titulo = 'Alterar Usuário';
      }
    },

    methods:{
      voltar(){
        window.location.href='../#/usuarios';
      },
      listarPerfilUsuarios(){
       PerfilUsuario.listar().then(resposta => {   
            if(!resposta.data.length){
              this.MensagemSemPerfilUsuario = 'Não existem perfis de usuários cadastrados para associar!';
            }
            this.perfilUsuarios = resposta.data;
            
        })
     },
     listarCargos(){
       Cargo.listar().then(resposta => {         
            this.cargos = resposta.data 
        })
     },

      salvar(){
        
        var forms = document.querySelectorAll('.needs-validation');
        var camposIncompletos =false;
        
        // verificando cada input
        Array.prototype.slice.call(forms).forEach(function (form) {              
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    camposIncompletos = true;
                }
                form.classList.add('was-validated')

            })

        if(!camposIncompletos){
          if(this.validarCPF()){
            if(!this.usuario.id){//entre se não houver id, significa que é um usuario novo
              //agora que já validamos os campos e o formato do cpf vamos consultar o banco de dados para saber o o cpf ja nao está cadastrado
              Usuario.buscaUsuarioCpf(this.usuario.cpf).then(cpfExistente => {              
                if(cpfExistente.data == null || cpfExistente.data == ""){      
                      console.log(this.usuario);                         
                      Usuario.salvar(this.usuario).then(resposta => {                      
                          if(resposta.data.id){
                            alert('Salvo com Sucesso!')
                            window.location.href="../#/usuarios";
                          }else{
                            alert('Ocorreu um erro ao salvar o usuário!')
                          }                                           
                      })
                }else{
                    alert('O cpf digitado já está cadastrado no sistema para outro usuário!')
                }

              })
            }else{
               Usuario.alterar(this.usuario).then(resposta => {                         
                alert('Usuário alterado com Sucesso!')    
                window.location.href="../#/usuarios";
              })
            }

          }else{
            alert("É necessário digitar um cpf válido para salvar!");
          }
        }else{
          alert("Preencha os campos obrigatórios para salvar!");
        }
        
       
     
    
      },
      
       validarCPF() {
          var soma = 0;
          var i;
          var resto;
          var inputCPF = this.usuario.cpf;
          inputCPF = inputCPF.replace(".", "").replace(".", "").replace("-", "");
         
          if (inputCPF == "00000000000") return false;
          for (i = 1; i <= 9; i++)
            soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
          resto = (soma * 10) % 11;

          if (resto == 10 || resto == 11) resto = 0;
          if (resto != parseInt(inputCPF.substring(9, 10))) return false;

          soma = 0;
          for (i = 1; i <= 10; i++)
            soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
          resto = (soma * 10) % 11;

          if (resto == 10 || resto == 11) resto = 0;
          if (resto != parseInt(inputCPF.substring(10, 11))) return false;
          return true;   
        },
        exibeMensagemCPf(){

          if(this.validarCPF()){
            this.mensagemcpf = "Cpf Válido!";
          
          }else{
            this.mensagemcpf = "Cpf Inválido!";
        
          }
        }


    }
  }

</script>

<style>
 .obrigatorio{
   color:red;
 }
 .form{
   width: 100%;
 }
 .pointer{
   cursor:pointer;
 }

</style>
