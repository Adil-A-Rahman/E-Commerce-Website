import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'

const ProtectedRoute = (component, ...rest) => {

    const {loading, isAuthenticated} = useSelector((state)=> state.user)

    return (<Fragment>
        {!loading && (
            <Route {...rest} element={!isAuthenticated ? <Navigate to='/login' />: <component/> } />
        )}
    </Fragment>)
}

export default ProtectedRoute