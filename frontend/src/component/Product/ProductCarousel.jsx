import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../actions/productAction'
//import Carousel from 'react-bootstrap/Carousel'; // BOOT
// import 'bootstrap/dist/css/bootstrap.min.css'; //BOOT CSS
// import ProductCarouselCSS from './ProductCarousel.module.css' //BOOT CSS
// import Carousel from 'react-material-ui-carousel' // MATERIAL COMPONENT
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ProductCarousel = () => {

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        // autoplay: true,
        centerMode: true
      };

    const dispatch = useDispatch();

    const {id} = useParams();

    const {product, loading, error} = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id]);

    return (
    <Slider {...settings}>
        {product.images && product.images.map((item,i)=>(
            <div>
                <img  className="CarouselImage" src={item.url} alt={i+'Slide'} />
            </div>
        ))}
    </Slider>
)}


export default ProductCarousel

// {/* <Carousel variant="dark" className='ProductCarouselCSS'>
//                 {product.images && product.images.map((item,i)=>(
//                     <Carousel.Item>
//                         <img  src={item.url} alt={i+'Slide'} />
//                     </Carousel.Item>
//                 ))}
//             </Carousel> */}
//             {/* <Carousel>
//                         {product.images && product.images.map((item,i)=>(
//                             <img className='CarouselImage' key = {item.url} src = {item.url} alt = {i+'Slide'} />
//                         ))}
//                     </Carousel> */}