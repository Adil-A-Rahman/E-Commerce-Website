import React, { Fragment, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearError, getProductDetails } from '../../actions/productAction'
import { addItemsToCart } from '../../actions/cartAction'
import ReactStar from 'react-rating-stars-component'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import ReviewCard from './ReviewCard'
import Loader from "../layout/Loader/Loader"
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'

const ProductDetails = () => {
    
    const dispatch = useDispatch();

    const alert = useAlert();

    const {id} = useParams();

    const {product, loading, error} = useSelector((state) => state.productDetails);

    const [quantity, setQuantity] = useState(1)

    const increaseQuantity = () => {
        if(quantity < product.stock){
            setQuantity(quantity+1)
        }
    }

    const decreaseQuantity = () => {
        if(quantity > 1){
            setQuantity(quantity-1)
        }
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity))
        alert.success('Item added to cart')
    } 

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearError())
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert]);
    
    const options = {
        edit:false,
        color: "rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size: window.innerWidth <600 ? 20 : 25,
        value:product.ratings,
        isHalf: true
    }

    return (<Fragment>
        {loading ? <Loader/> : <Fragment>
            <MetaData title={`${product.name} - Ecommerce`} />
            
            <div className='ProductDetails'>
                <div>
                    <Carousel>
                        {product.images && product.images.map((item, i) => (
                            <img className="CarouselImage" key={i} src={item.url} alt={`${i} Slide`}/>
                        ))}
                    </Carousel>
                </div>
                <div>
                    <div className='detailsBlock1'>
                        <h2>{product.name}</h2>
                        <p>Product #{product._id}</p>
                    </div>
                    <div className='detailsBlock2'>
                        <ReactStar {...options}/>
                        <span>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className='detailsBlock3'>
                        <h1>₹{product.price}</h1>
                        <div className='detailsBlock3-1'>
                            <div className='detailsBlock3-1-1'>
                                <button onClick={decreaseQuantity}>-</button>
                                <input readOnly value={quantity} type= 'number' />
                                <button onClick={increaseQuantity}>+</button>
                            </div>
                            <button onClick={addToCartHandler}> Add to Cart</button>
                        </div>
                        <p>
                            Status:
                            <b className= {product.Stock < 1 ? 'redColor' : 'greenColor'}>
                                {product.Stock< 1 ? 'OutOfStock' : 'InStock'}
                            </b>
                        </p>
                    </div>
                    <div className='detailsBlock4'>
                        Description: <p>{product.description}</p>
                    </div>
                    <button className='submitReview'>Submit Review</button>
                </div>
            </div>
            <div>
                <h3 className='reviewsHeading'>REVIEWS</h3>
                {product.reviews && product.reviews[0] ? (
                    <div className='reviews'>
                        {product.reviews && product.reviews.map((review)=><ReviewCard review={review}/>)}
                    </div>
                ):(
                    <p className='noReviews'>No Reviews Yet</p>
                )}
            </div>
        </Fragment>}
    </Fragment>)
}

export default ProductDetails