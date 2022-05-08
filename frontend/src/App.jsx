import React, { useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useSelector } from 'react-redux';
import store from './store';
import { loadUser } from './actions/userAction';
import WebFont from "webfontloader";
import './App.css';
// import axios from "axios";

//Site wide HTML import
import Header from "./component/layout/Header/Header";
import UserOptions from './component/layout/Header/UserOptions'
import Footer from "./component/layout/Footer/Footer";
//Route imports
import Home from "./component/Home/Home";
import ProductDetails from './component/Product/ProductDetails'
import Products from './component/Product/Products'
import Search from './component/Product/Search'
import ProtectedRoute from './component/Route/ProtectedRoute';
import ShippingRoute from './component/Route/ShippingRoute';
import LoginRegister from './component/User/LoginRegister';
import Profile from './component/User/Profile'
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart' 
import Shipping from './component/Cart/Shipping'
import ConfirmOrder from './component/Cart/ConfirmOrder'
import StripeContainer from "./StripeContainer";
// import Payment from './component/Cart/Payment'

function App() {

    const { isAuthenticated, user } = useSelector(state => state.user)

    useEffect(async ()=>{
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
                <Route path='/cart' element={<Cart/>} />

                {/* All the protected routes as child of this */}
                <Route element={<ProtectedRoute/>} >
                    <Route path='/account' element={<Profile/>} />
                    <Route path='/me/update' element={<UpdateProfile/>} />
                    <Route path='/password/update' element={<UpdatePassword/>} />
                </Route>
                <Route element={<ShippingRoute/>} >
                    <Route path='/shipping' element={<Shipping/>} />
                    <Route path='/order/confirm' element={<ConfirmOrder/>} />
                    <Route path='/process/payment' element={<StripeContainer/>} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;