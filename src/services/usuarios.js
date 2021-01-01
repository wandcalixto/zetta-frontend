import {http} from './config'

export default{

    listar:(ordem) => {
        return http.get('usuarios/'+ordem)
    },

    salvar:(usuario) => { 
        return http.post('usuario',usuario)
    },

    alterar:(usuario) => {
        return http.put('usuario', usuario)
    },

    apagar:(usuario) => {
        return http.delete('usuario',{data: usuario})
    },

    buscaUsuarioCpf: (cpf) => {
        return http.get('usuario/cpf/'+cpf)
        
    }


    
    
}