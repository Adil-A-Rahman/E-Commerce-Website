import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js"
import MetaData from "../layout/MetaData";
import {getProduct} from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'

const product = {
    name:"Blue shirt",
    images:[{url: "https://i.ibb.co/DRST11n/1.webp"}],
    price: "$30",
    _id:"kuch bhi"
};

const Home = () => {

    const dispatch = useDispatch();

    const {loading, error, products, productCount} = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProduct())
    },[dispatch])
    
    return (<Fragment>
        <MetaData title='Ecommerce Website' />

        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>Find amazing products below</h1>
            <a href="#container">
                <button>
                    Scroll <CgMouse/> 
                </button>
            </a>
        </div>
        
        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id="container">

            {products && products.map(product =>(
                <Product product={product} />
            ))}
        </div>


    </Fragment>);
}

export default Home;