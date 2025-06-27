import axios from "axios"

const port=8000
const baseURL = `http://localhost:${port}/`

export const createUser = async (name,email,password) => {
    try{
        const res = await axios.post(`${baseURL}auth/signup`,{"name":name,"email":email,"password":password})
        console.log(res.data)
        return res.data
    }catch(error){
        console.error(error)
        return false
    }
}

export const login = async (email,password) => {
    try{
        const res = await axios.post(`${baseURL}auth/login`,{"email":email,"password":password})
        return res.data
    }catch(error){
        console.error(error)
        return false
    }
}