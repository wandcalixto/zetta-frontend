import {http} from './config'

export default{

    listar:(ordem) => {
        return http.get('cargos/'+ordem)
    },

    salvar:(cargo) => { 
        return http.post('cargo',cargo)
    },

    alterar:(cargo) => {
        return http.put('cargo', cargo)
    },

    apagar:(cargo) => {
        return http.delete('cargo',{data: cargo})
    },

    buscaCargoDescricao: (cargo) => {
        return http.get('cargo/descricao/'+cargo)
        
    },

    buscaCargoId: (cargo) => {
        var result = http.get('cargo/'+cargo);    
        return result
        
    }


    
    
}