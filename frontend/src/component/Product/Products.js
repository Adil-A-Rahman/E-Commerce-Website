import React, { Fragment, useEffect } from 'react'
import './Products.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearError, getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useAlert } from 'react-alert'

const Products = () => {

    const alert = useAlert();

    const dispatch = useDispatch();

    const {loading, error, products, productCount} = useSelector(state => state.products);

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearError())
        }
        dispatch(getProduct())
    },[dispatch, error, alert])

    return (<Fragment>
        {loading ? <Loader/> : <Fragment>
        <h2 className='productsHeading'>Products</h2>
            <div className='products'>
                {products && products.map(product =>(
                    <ProductCard key={product._id} product={product} />
                ))}

            </div>
        </Fragment>}
    </Fragment>)
}

export default Products