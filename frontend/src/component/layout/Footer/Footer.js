import React from 'react';
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/appstore.png'
import './Footer.css'

function Footer() {
    return (

        <footer id='footer'>
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download for Android and IOS</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="appstore" />
            </div>

            <div className="midFooter">
                <h1>ECOMMERCE</h1>
                <p>Cheap and affordable 😊</p>
                <p>Copyrights 2022 &copy; Adil</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="http://instagram.com">Instagram</a>
                <a href="http://youtube.com">Youtube</a>
                <a href="http://facebook.com/">Facebook</a>
            </div>
        </footer>
    );
};

export default Footer