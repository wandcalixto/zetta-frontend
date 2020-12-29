<template>

  <div id="app">

       
    <div class="container">
        <br>
    <form class="row g-3 needs-validation form" novalidate  @submit.prevent="salvar">
          <h3>Cadastro de Usuário</h3> 
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
              <label for="cargo" class="form-label">Cargo</label>
              <select class="form-select" id="cargo" v-model="usuario.idCargo" required>
              <option selected disabled value="">Selecione...</option>
              <option v-for="cargo of cargos" :key="cargo.id" :value="cargo.id">{{cargo.cargo}}</option>

              </select>
              <div class="invalid-feedback">
                É necessário selecionar o cargo.
              </div>
          </div>
        
        
          
          <div class="col-12">
              <button class="btn btn-primary" type="submit"><i class="fas fa-save"></i> Salvar</button>
          </div>
         
    </form>

    </div>

  </div>
</template>

<script>

  import Usuario from '../services/usuarios'
  import Cargo from '../services/cargos'


  

  export default{
    data(){
      return {        
        usuario:{
          id:'',
          nome:'',
          cpf:'',
          dataNascimento:'',
          sexo:'',
          idCargo: ''
        },
        cargo:{
          id:'',
          cargo:''
        },
        usuarios: [],
        mensagemcpf:'',
        cargos: []
      }
    },

    mounted(){
      this.listarCargos();
      if(this.$route.params.usuario){
          this.usuario = this.$route.params.usuario;
      }     
    },

    methods:{

     listarCargos(){
       Cargo.listar().then(resposta => {      
            this.cargos = resposta.data
            console.log(this.cargos)
        })
     },

      salvar(){
        
        var forms = document.querySelectorAll('.needs-validation');
        var camposIncompletos =false;

        console.log(this.usuario.idCargo.idCargo)
        
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
                      Usuario.salvar(this.usuario).then(resposta => {                      
                          if(resposta.data.id){
                            alert('Salvo com Sucesso!')
                            window.location.href="../#/usuarios";
                          }else{
                            alert('Ocorreu um erro ao salvar o Cargo!')
                          }                                           
                      })
                }else{
                    alert('O cpf digitado já está cadastrado no sistema para outro usuário!')
                }

              })
            }else{
               Usuario.alterar(this.usuario).then(resposta => {                         
                alert('Usuario alterado com Sucesso!')    
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

</style>
