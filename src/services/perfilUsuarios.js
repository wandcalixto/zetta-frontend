import {http} from './config'

export default{

    listar:(ordem) => {
        return http.get('perfilUsuarios/'+ordem)
    },

    salvar:(perfilUsuario) => { 
        return http.post('perfilUsuario',perfilUsuario)
    },

    alterar:(perfilUsuario) => {
        return http.put('perfilUsuario', perfilUsuario)
    },

    apagar:(perfilUsuario) => {
        return http.delete('perfilUsuario',{data: perfilUsuario})
    },

    buscaPerfilUsuarioNomePerfilUsuario: (nomePerfilUsuario) => {
        return http.get('perfilUsuario/nomePerfilUsuario/'+nomePerfilUsuario)
        
    },

    buscaperfilUsuarioId: (perfilUsuario) => {
        var result = http.get('perfilUsuario/'+perfilUsuario);    
        return result
        
    }


    
    
}