import React, { Fragment, useState, useEffect } from 'react'
import './ResetPassword.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearError } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import LockIcon from '@mui/icons-material/Lock'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { token } = useParams();
    let navigate = useNavigate()


    const { error, success, loading } = useSelector((state)=>state.forgotPassword)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('password', password)
        myForm.set('confirmPassword', confirmPassword)
        dispatch(resetPassword(token, myForm))
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearError())
        }
        if(success){
            alert.success('Password Reset Successfully')
            navigate('/login')
        }
    }, [dispatch, error, alert, navigate, success])

    return (<Fragment> {!loading ? 
        <Fragment>
        <MetaData title={'Reset Password - Ecommerce'} />
        <div className='resetPasswordContainer'>
            <div className='resetPasswordBox'>
                <h2 className='resetPasswordHeading'>Reset Password</h2>
                <form className='resetPasswordForm' onSubmit={resetPasswordSubmit}>
                <div>
                    <LockOpenIcon />
                    <input type='password' placeholder='New Password' required name='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div>
                    <LockIcon />
                    <input type='password' placeholder='Confirm Password' required name='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                </div>
                <input type='submit' value='Reset Password' className='resetPasswordBtn' />
                </form>
            </div>
        </div>
        </Fragment>:<Loader/>} 
    </Fragment>)
}

export default ResetPassword