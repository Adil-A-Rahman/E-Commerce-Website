import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearError, getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import MetaData from '../layout/MetaData'

const categories = [
    'Laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'SmartPhones'
];

const Products = () => {

    const alert = useAlert();

    const dispatch = useDispatch();

    const { keyword } = useParams();

    const [currentPage, setCurrentPage] = useState(1);

    const [price, setPrice] = useState([0,25000])
    
    const [category, setCategory] = useState('')
    
    const [ratings, setRatings] = useState(0)
    
    const { loading, error, products, productsCount, resultPerPage } = useSelector(state => state.products);
    
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    const ratingHandler = (e, newRating)=>{
        setRatings(newRating)
    } 
    
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearError())
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    },[dispatch, keyword, error, alert, currentPage, price, category, ratings])
    
    const paginationOptions = {
        activePage: currentPage, 
        itemsCountPerPage: resultPerPage, 
        totalItemsCount: productsCount, 
        onChange: setCurrentPageNo, 
        nextPageText: 'Next', 
        prevPageText: 'Prev', 
        firstPageText: 'First', 
        lastPageText: 'Last', 
        itemClass: 'page-item', 
        linkClass: 'page-link', 
        activeClass: 'pageItemActive',
        activeLinkClass: 'pageLinkActive'
    }

    const sliderOptions = {
        value: price,
        onChange: priceHandler,
        valueLabelDisplay: 'auto',
        min: 0,
        max: 25000,
        'aria-labelledby':'range-slider',
        size: 'small'
    }

    const ratingsSliderOptions = {
        value: ratings,
        onChange: ratingHandler,
        'aria-labelledby':'continuous-slider',
        valueLabelDisplay: 'auto',
        min: 0,
        max: 5,
        size: 'small'
    }
    
    return (<Fragment>
        {loading ? <Loader/> : <Fragment>
            <MetaData title='Products - Ecommerce' />

            <h2 className='productsHeading'>Products</h2>
            
            <div className='products'>
                {products && products.map(product =>(
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className='filterBox'>
                <Typography variant='body2'> Price </Typography>
                <Slider {...sliderOptions} />
            
                <Typography variant='body2'> Categories </Typography>
                <ul className='categoryBox'>
                    {categories.map((category)=> (
                        <li className='category-link' key={category} onClick={()=>setCategory(category)}>
                            {category}
                        </li>
                    ))}
                </ul>

                <fieldset>
                    <Typography component='legend' variant='body2'>Ratings Above</Typography>
                    <Slider {...ratingsSliderOptions} />
                </fieldset>
            </div>

            <div className='paginationBox'>
                <Pagination {...paginationOptions} />
            </div>

        </Fragment>}
    </Fragment>)
}

export default Products