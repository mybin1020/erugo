import {React, useEffect} from "react";
import Style from './style.module.css'
import { useHistory } from 'react-router-dom'

// swiper bundle styles
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'


import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {
  Mousewheel,Pagination,Navigation
} from 'swiper';

// install Swiper modules
SwiperCore.use([Mousewheel,Pagination,Navigation]);



const BuyLand = ({language}) => {
    const history = useHistory()
    return (
        <>
            {/* <div 
            className={Style['buyland-btn']}
            onClick={
                () => {
                    history.push('/land-state')
                }
            }
            >
                land-state버튼
            </div>  */}
            
            <Swiper 
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={30}
                mousewheel={true}
                resizeObserver={true}
                pagination={{clickable: true}}
                className={Style['mySwiper']}
            >
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["buyland-box"]}>
                        <div className={Style['img1']}></div>
                        <div className={Style['buyland-content-text']}>
                            <div>
                                <p>
                                    {language['buyland-mean-01']}
                                </p>
                                <p>
                                {language['buyland-mean-02']}
                                </p>
                                <p>
                                {language['buyland-mean-03']}
                                </p>
                               
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["buyland-box"]}>
                        <div className={Style['img2']}></div>
                        <div className={Style['buyland-content-text']}>
                            <div>
                                <p>
                                {language['buyland-mean-04']}
                                </p>
                                <p>
                                {language['buyland-mean-05']}
                                </p>
                                <p>
                                {language['buyland-mean-06']}
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["buyland-box"]}>
                        <div className={Style['img3']}></div>
                        <div className={Style['buyland-content-text']}>
                            <div>
                                <p>
                                {language['buyland-mean-07']}
                                </p>
                                <p>
                                {language['buyland-mean-08']}
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style['buyland-box']}>
                        <div className={Style['img4']}></div>
                        <div className={Style['buyland-content-text']}>
                            <div>
                                <p>
                                {language['buyland-mean-09']}
                                </p>
                                <p>
                                {language['buyland-mean-10']}
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["buyland-box"]}>
                        <div className={Style['img5']}></div>
                        <div className={Style['buyland-content-text']}>
                            <div>
                                <p>
                                {language['buyland-mean-11']}
                                </p>
                                <p>
                                {language['buyland-mean-12']}
                                </p>
                                <p>
                                {language['buyland-mean-13']}
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["buyland-box"]}>
                        <div className={Style['img6']}></div>
                        <Swiper
                            cssMode={true}
                            navigation={true}
                            pagination={true}
                            mousewheel={true}
                            keyboard={true}
                            slidesPerView={1}
                            spaceBetween={30}
                            observer={true}
                            observeParents={true}
                            className={`${Style.mySwiper} ${Style.swiperBuyland}`}
                        >
                            <SwiperSlide className={`${Style.swiper_slide} ${Style.swiperland}`}>
                                <div className={Style['buyland-swiper-text']}>
                                    <div>
                                    {language['buyland-mean-14']}
                                        <div className={Style['grap1']}></div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={`${Style.swiper_slide} ${Style.swiperland}`}>
                                <div className={Style['buyland-swiper-text']}>
                                    <p>
                                    {language['buyland-mean-14']}
                                    </p>
                                    <p>
                                    {language['buyland-mean-15']}
                                    </p>
                                    <p>
                                    {language['buyland-mean-16']}
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={Style['swiper-slide']}>
                                <div className={`${Style.buylandSwiperText} ${Style.buylandHight}`}>
                                    <p>
                                    {language['buyland-mean-17']}
                                        
                                    </p>
                                    <p>
                                    {language['buyland-mean-18']}
                                    </p>
                                    <p>
                                    {language['buyland-mean-19']}
                                    </p>
                                    <p>
                                    {language['buyland-mean-20']}
                                    </p>
                                    <p className={Style['buyland-swiper-text-font']}>
                                        <small> {language['buyland-mean-21']}</small>
                                        
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={Style['swiper-slide']}>
                                <div className={`${Style.buylandSwiperText} ${Style.buylandHight}`}>
                                    <div>
                                        <p>
                                        {language['buyland-mean-22']}
                                           
                                        </p>
                                        <p>
                                            {language['buyland-mean-23']}
                                            </p>
                                        <p>
                                        {language['buyland-mean-24']}
                                        </p>
                                        <p>
                                        {language['buyland-mean-25']}
                                        </p>
                                        <p className={Style['buyland-swiper-text-font']}>
                                        <small> {language['buyland-mean-26']}</small>
                                        </p>
                                        
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["buyland-box"]}>
                        <div className={Style['img7']}></div>
                        <Swiper
                            cssMode={true}
                            navigation={true}
                            pagination={true}
                            mousewheel={true}
                            keyboard={true}
                            slidesPerView={1}
                            spaceBetween={30}
                            observer={true}
                            observeParents={true}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                            className={`${Style.mySwiper} ${Style.swiperBuyland}`}
                        >
                            <SwiperSlide className={Style['swiper-slide']}>
                                <div className={Style['buyland-swiper-text']}>
                                    <div className={Style['lastContent']}>
                                        <p>
                                        {language['buyland-mean-27']}
                                        </p>
                                        <p>                                        
                                        {language['buyland-mean-28']}
                                        </p>
                                        
                                    </div>
                                    <div className={Style['grap2']}></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={Style['swiper-slide']}>
                                <div className={Style['buyland-swiper-text']}>
                                    <div className={Style['lastHeight']}>
                                        <p>
                                        {language['buyland-mean-29']}
                                        </p>
                                        <p>
                                        {language['buyland-mean-30']}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default BuyLand