import React, { Fragment } from 'react'
import './Cart.css'
import { useSelector } from 'react-redux' 
import CartItemCard from './CartItemCard'
import Typography from '@mui/material/Typography';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCartTwoTone';
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {

    const navigate = useNavigate()
    const { cartItems } = useSelector((state)=>state.cart)
    const { isAuthenticated } = useSelector((state)=> state.user)

    const checkOutHandler = () => {
        // if(!isAuthenticated){
            navigate('/shipping')
        // }
        // else{
        //     navigate('/login?redirect=shipping')
        // }
    }

    return <Fragment>{cartItems.length === 0 ? (
        <div className='emptyCart'>
            <RemoveShoppingCartIcon/>
            <Typography>No Products in Your Cart</Typography>
            <Link to='/products'>View Products</Link>
        </div>
        ) : <Fragment>
        <div className='cartPage'>
            <div className='cartHeader'>
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
            {cartItems && cartItems.map((item)=>(
                <CartItemCard item={item} />
            ))}
            <div className='cartGrossTotal'>
                <div></div>
                <div className='cartGrossTotalBox'>
                    <p>Gross Total</p>
                    <p>{`₹${cartItems.reduce((acc, item)=>acc+ item.quantity*item.price,0)}`}</p>
                </div>
                <div></div>
                <div className='checkOutBtn'>
                    <button onClick={checkOutHandler} >Check Out </button>
                </div>
            </div>
        </div>
    </Fragment>
    }</Fragment>
}

export default Cart