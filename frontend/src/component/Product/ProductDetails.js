import React, { Fragment, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearError, getProductDetails } from '../../actions/productAction'
import ReactStar from 'react-rating-stars-component'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import ReviewCard from './ReviewCard.js'
import Loader from "../layout/Loader/Loader"
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'

const ProductDetails = () => {
    
    const dispatch = useDispatch();

    const alert = useAlert();

    const {id} = useParams();

    const {product, loading, error} = useSelector((state) => state.productDetails);

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
                                <button>-</button>
                                <input value='1' type= 'number' />
                                <button>+</button>
                            </div>
                            <button> Add to Cart</button>
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