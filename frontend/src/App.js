import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import Search from './component/Product/Search.js'
import LoginRegister from './component/User/LoginRegister';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions'
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile'
import UpdateProfile from './component/User/UpdateProfile';

function App() {

    const { loading, isAuthenticated, user } = useSelector(state => state.user)

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
                <Route path='/products/:keyword*' element={<Products/>} />
                <Route path='/login' element={<LoginRegister/>} />
                <Route path='/account' element={!loading && !isAuthenticated ? <Navigate to='/login' replace='true' />: <Profile/> } />
                <Route path='/me/update' element={!loading && !isAuthenticated ? <Navigate to='/login' replace='true' />: <UpdateProfile/> } />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;