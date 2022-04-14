import React, { Fragment, useState } from 'react'
import './Header.css'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { logout } from '../../../actions/userAction'
import { useDispatch } from 'react-redux'

const UserOptions = ({ user }) => {
    
    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false) 

    const options = [
        { icon: <ListAltIcon/>, name: 'Orders', func: orders },
        { icon: <PersonIcon/>, name: 'Profile', func: account },
        { icon: <ExitToAppIcon/>, name: 'Logout', func: logoutUser },
    ]

    if(user.role === 'admin'){
        options.unshift({ icon: <DashboardIcon/>, name: 'Dashboard', func: dashboard },)
    }

    function dashboard(){
        navigate('/dashboard')
    }

    function orders(){
        navigate('/orders')
    }

    function account(){
        navigate('/account')
    }

    function logoutUser(){
        dispatch(logout())
        alert.success('Logged Out Successfully')
    }

    const speedDialOptions = {
        ariaLabel: "SpeedDial tooltip example",
        onClose:()=>setOpen(false),
        onOpen:()=>setOpen(true),
        open: open,
        direction: 'down',
        style:{zIndex:'11'},
        className: 'speedDial',
        icon: (<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : '/logo192.png'} alt='profile' />)
    }

    return (<Fragment>
        <Backdrop open={open} style={{zIndex:'10'}} />
        <SpeedDial {...speedDialOptions}>
            {options.map((item)=>(
                <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
            ))}
        </SpeedDial>
    </Fragment>)
}

export default UserOptions