import React, { Fragment } from 'react'
import './CartItemCard.css'
import { Link } from 'react-router-dom'
import { addItemsToCart, removeCartItems } from '../../actions/cartAction'
import { useDispatch } from 'react-redux'

const CartItemCard = ({ item }) => {
    
    const dispatch = useDispatch()

    const increaseQuantity = (id, quantity, stock) => {
        if(quantity < stock){
            dispatch(addItemsToCart(id, (quantity+1)))
        }
    }

    const decreaseQuantity = (id, quantity) => {
        if(quantity > 1){
            dispatch(addItemsToCart(id, (quantity-1)))
        }
    }

    const deleteCartItems = (id) =>{
        dispatch(removeCartItems(id))
    }

    return <Fragment>
        <div className='cartContainer' key={item.product}>
            <div className='CartItemCard'>
                <img src={item.image} alt='ssa'/>
                <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>{`Price: ₹${item.price}`}</span>
                    <p onClick={()=>{deleteCartItems(item.product)}}>Remove</p>
                </div>
            </div>
            <div className='cartInput'>
                <button onClick={()=>decreaseQuantity(item.product, item.quantity)}>-</button>
                <input type='number' value={item.quantity} readOnly />
                <button onClick={()=>increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
            </div>
            <p className='cartSubtotal'>{`₹${item.price*item.quantity}`}</p>
        </div>
    </Fragment>
}

export default CartItemCard