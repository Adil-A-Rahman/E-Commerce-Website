import React, { Fragment, useState, useEffect } from 'react'
import './UpdatePassword.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearError } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import LockIcon from '@mui/icons-material/Lock'
import VpnKeyIcon from '@mui/icons-material/VpnKey'

const UpdatePassword = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    let navigate = useNavigate()


    const { error, isUpdated } = useSelector((state)=>state.profile)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('oldPassword', oldPassword)
        myForm.set('newPassword', newPassword)
        myForm.set('confirmPassword', confirmPassword)
        dispatch(updatePassword(myForm))
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearError())
        }
        if(isUpdated){
            alert.success('Password Changed Successfully')
            navigate('/account')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, alert, navigate, isUpdated])

    return (<Fragment>
        <MetaData title={'Change Password - Ecommerce'} />
        <div className='updatePasswordContainer'>
            <div className='updatePasswordBox'>
                <h2 className='updatePasswordHeading'>Update Profile</h2>
                <form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>
                <div className='registerPassword'>
                    <VpnKeyIcon />
                    <input type='password' placeholder='Old Password' required name='password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
                </div>
                <div className='registerPassword'>
                    <LockOpenIcon />
                    <input type='password' placeholder='New Password' required name='password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                </div>
                <div className='registerPassword'>
                    <LockIcon />
                    <input type='password' placeholder='Confirm Password' required name='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                </div>
                <input type='submit' value='Change Password' className='updatePasswordBtn' />
                </form>
            </div>
        </div>
    </Fragment>)
}

export default UpdatePassword