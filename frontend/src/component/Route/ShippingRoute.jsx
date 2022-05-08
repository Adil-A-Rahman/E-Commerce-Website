import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom'
import Loader from '../layout/Loader/Loader'

const useAuth = () =>{
    const {user, isAuthenticated} = useSelector((state)=> state.user)
    return user && isAuthenticated
}

const ProtectedRoute = () => {

    const {loading} = useSelector((state)=> state.user)
    const isAuth = useAuth();    
    // Return <Outlet/> if loading is FALSE and auth is TRUE; return <navigate...> if loading and auth is false; if loading is not false return loader  
    return loading===false ? isAuth ? <Outlet/> : <Navigate replace={true} to='/login?redirect=shipping'/> : <Loader/>
}

export default ProtectedRoute