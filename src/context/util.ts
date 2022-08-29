import { IUser,Response } from "./types";
export async function LoginRequest(username:string,password:string):Promise<Response> {
    let URI = 'http://localhost:5000/api'
    let data = {username,password};
    try {
        
        let response = await fetch(`${URI}/login`,{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
       
        let datos = await response.json()
        return datos;
    } catch (error) {
        return {
            token:"",
            error:true,
            message:error.message
        }
    }
}

export function SessionStorage(data:string,token:string) {
    window.localStorage.setItem("token",token);
    
    return window.localStorage.setItem('user',data);
}

export function GetSessionStorage(){
    return window.localStorage.getItem('user')
}

export function GetStorageToken(){
    return window.localStorage.getItem("token")
}