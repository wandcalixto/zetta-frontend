import axios from 'axios'

export const http = axios.create({
    baseURL: "https://apirest-zetta.herokuapp.com/api"
})