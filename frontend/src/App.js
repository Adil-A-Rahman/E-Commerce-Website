import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import store from './store';
import { loadUser } from './actions/userAction';
import WebFont from "webfontloader";
import './App.css';
//Site wide HTML import
import Header from "./component/layout/Header/Header.js";
import UserOptions from './component/layout/Header/UserOptions'
import Footer from "./component/layout/Footer/Footer.js";
//Routes import
import Home from "./component/Home/Home.js";
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import Search from './component/Product/Search.js'
import ProtectedRoute from './component/Route/ProtectedRoute';
import LoginRegister from './component/User/LoginRegister';
import Profile from './component/User/Profile'
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';

function App() {

    const { isAuthenticated, user } = useSelector(state => state.user)

    React.useEffect(async ()=>{
        WebFont.load({
            google:{
                families:["Roboto", "Droid Sans", "Chilanka"]
            }
        })
        await store.dispatch(loadUser())
    },[])

    return (
        <Router>
            <Header />
            {isAuthenticated && <UserOptions user={user} />}
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/product/:id' element={<ProductDetails/>} />
                <Route path='/products' element={<Products/>} />
                <Route path='/Search' element={<Search/>} />
                <Route path='/products/:keyword/*' element={<Products/>} />
                <Route path='/login' element={<LoginRegister/>} />
                <Route path='/password/forgot' element={<ForgotPassword/>} />
                <Route path='/password/reset/:token' element={<ResetPassword/>} />
                <Route element={<ProtectedRoute/>} >                // All the protected routes as child of this 
                    <Route path='/account' element={<Profile/>} />
                    <Route path='/me/update' element={<UpdateProfile/>} />
                    <Route path='/password/update' element={<UpdatePassword/>} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;