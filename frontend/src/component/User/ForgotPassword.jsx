import React, { Fragment, useState, useEffect } from 'react'
import './ForgotProfile.css'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearError} from '../../actions/userAction'
import { useAlert } from 'react-alert'

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, message, loading } = useSelector((state)=>state.forgotPassword)

    const [email, setEmail] = useState('')
    
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('email', email)
        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearError())
        }
        if(message){
            alert.success(message)
        }
    }, [dispatch, error, alert, message])


    return (<Fragment> {!loading ? 
        <Fragment>
            <MetaData title={'Forgot Password - Ecommerce'} />
            <div className='forgotPasswordContainer'>
                <div className='forgotPasswordBox'>
                    <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                    <form className='forgotPasswordForm' onSubmit={forgotPasswordSubmit}>
                        <div className='forgotPasswordEmail'>
                            <MailOutlineIcon />
                            <input type='email' placeholder='Email' required name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                        </div>
                        <input type='submit' value='Send Reset Email' className='forgotPasswordBtn' disabled={loading ? true : false } />
                    </form>
                </div>
            </div>
        </Fragment>:<Loader/>} 
    </Fragment>)
}

export default ForgotPassword