import axios from 'axios'

const API = axios.create({
    baseURL: 'https://sevahome-backend-production.up.railway.app'
})

export default API