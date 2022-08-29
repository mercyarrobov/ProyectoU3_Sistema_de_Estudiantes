import {useContext} from 'react'
import {AuthContext} from './index'
export const useAuth = () =>{
    const context = useContext(AuthContext)
    
    return context;
}