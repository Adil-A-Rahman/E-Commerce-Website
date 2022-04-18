import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loadUser } from '../../actions/userAction'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import './Profile.css'

const Profile = () => {

    // const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector( state => state.user )

    // const navigate = useNavigate()
    // useEffect(()=>{
    //     console.log(isAuthenticated);
    //     // dispatch(loadUser());
    //     console.log(isAuthenticated);
    // })
    // useEffect(() => {
    //     if(isAuthenticated===false){
    //         navigate('/login', {replace: true})
    //         console.log('redir');
    //     }
    //     console.log(isAuthenticated);
    // }, [isAuthenticated])
    

    return (<Fragment> 
        {loading ? <Loader/> : <Fragment>
            <MetaData title={user.name+"'s Profile"} />
            <div className='profileContainer'>
                <div>
                    <h1>My Profile</h1>
                    <img src={/*user.avatar ?*/ user.avatar.url/* : './logo192.png'*/} alt={user.name} onError={(e) => (e.target.onerror = null, e.target.src = './logo192.png')} />
                    <Link to='/me/update'>Edit Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Joined on</h4>
                        <p>{String(user.createdAt).substring(0,10)}</p>
                    </div>
                    <div>
                        <Link to='/orders'>My Orders</Link>
                        <Link to='/password/update'>Change Password</Link>
                    </div>
                </div>
            </div>
        </Fragment>}
    </Fragment>)
}

export default Profile