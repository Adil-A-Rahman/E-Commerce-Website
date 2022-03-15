import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import Search from './component/Product/Search.js'
import LoginRegister from './component/User/LoginRegister';

function App() {

    React.useEffect(()=>{
        WebFont.load(
            {google:{
                families:["Roboto", "Droid Sans", "Chilanka"]
            }}
        )
    },[])
    
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/product/:id' element={<ProductDetails/>} />
                <Route path='/products' element={<Products/>} />
                <Route path='/Search' element={<Search/>} />
                <Route path='/products/:keyword*' element={<Products/>} />
                <Route path='/login' element={<LoginRegister/>} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;