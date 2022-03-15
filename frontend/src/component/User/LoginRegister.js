import React, { Fragment, useRef, useState } from 'react'
import './LoginRegister.css'
import Loader from '../layout/Loader/Loader'
import { Link } from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockOpenIcon from '@mui/icons-material/LockOpen'

const LoginRegister = () => {
    
    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)
    
    const loginSubmit = () => {
        console.log('form submitted')
    }

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const switchTabs = (e, tab) => {
        if(tab === 'login'){
            switcherTab.current.classList.add('shiftToNeutral')
            switcherTab.current.classList.remove('shiftToRight')
            registerTab.current.classList.remove('shiftToNeutralForm')
            loginTab.current.classList.remove('shiftToLeft')
        }
        if(tab === 'login'){
            switcherTab.current.classList.add('shiftToRight')
            switcherTab.current.classList.remove('shiftToNeutral')
            registerTab.current.classList.add('shiftToNeutralForm')
            loginTab.current.classList.add('shiftToLeft')
        }
    }
    
    return (<Fragment>
        <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
                <div>
                    <div className='login_signUp_toggle'>
                        <p onClick={(e)=>switchTabs(e, 'login')}>Login</p>
                        <p onClick={(e)=>switchTabs(e, 'Register')}>Register</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className='loginEmail'>
                        <MailOutlineIcon />
                        <input type='email' placeholder='Email' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
                    </div>
                    <div className='loginPassword'>
                        <LockOpenIcon />
                        <input type='password' placeholder='password' required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
                    </div>
                    <Link to='/password/forget'> Forget Password ?</Link>
                    <input className='loginBtn' type='submit' value='login' />
                </form>
            </div>
        </div>
    </Fragment>)
}

export default LoginRegister