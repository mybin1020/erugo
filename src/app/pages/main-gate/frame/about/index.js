import {React, useEffect, useRef} from "react";
import Style from './style.module.css'

// swiper bundle styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {
  Mousewheel,Pagination
} from 'swiper';

// install Swiper modules
SwiperCore.use([Mousewheel,Pagination]);
const About = ({ language }) => {
    
    console.log(language)
    useEffect(() => {
        
        console.log('componentDidMount[Function]');
    }, []);
    
    return (
        <>
          
            <Swiper 
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={50}
                mousewheel={true}
                pagination={{clickable: true}}
                className={Style['mySwiper']}
            >
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["about-box"]}>
                        <div className={Style['img1']}></div>
                        <div className={Style['about-content-text']}>
                            <div>
                                <p>{language['about-mean-01']}</p>
                            </div>
                            <div>
                                <p>{language['about-mean-02']}</p>
                            </div>
                            <div>
                                <p>{language['about-mean-03']}</p>
                                
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["about-box"]}>
                        <div className={Style['img2']}></div>
                        <div className={Style['about-content-text']}>
                            <div>
                                <p>{language['about-mean-04']}</p>
                            
                            </div>
                            <div>
                                <p>{language['about-mean-05']}</p>
                            </div>
                            <div>
                                <p>{language['about-mean-06']}</p>
                            
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["about-box"]}>
                        <div className={Style['img3']}></div>
                        <div className={Style['about-content-text']}>
                            <div>
                                <p>{language['about-mean-07']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-08']}</p>
                                
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style['about-box']}>
                        <div className={Style['img4']}></div>
                        <div className={Style['about-content-text']}>
                            <div>
                                <p>{language['about-mean-09']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-10']}</p>
                                
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["about-box"]}>
                        <div className={Style['img5']}></div>
                        <div className={Style['about-content-text']}>
                            <div>
                                <p>{language['about-mean-11']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-12']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-13']}</p>
                                
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["about-box"]}>
                        <div className={Style['img6']}></div>
                        <div className={Style['about-content-text']}>
                            <div>
                                <p>{language['about-mean-14']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-15']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-16']} </p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-17']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-18']}</p>
                                
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["about-box"]}>
                        <div className={Style['img7']}></div>
                        <div className={Style['about-content-text']}>
                            <div>
                                <p>{language['about-mean-19']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-20']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-21']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-22']}</p>
                                
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["about-box"]}>
                        <div className={Style['img8']}></div>
                        <div className={Style['about-content-text']}>
                            <div>
                                <p>{language['about-mean-23']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-24']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-25']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-26']}</p>
                                
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["about-box"]}>
                        <div className={Style['img9']}></div>
                        <div className={Style['about-content-text']}>
                            <div>
                                <p>{language['about-mean-27']}</p>
                                
                            </div>
                            <div>
                                <p>{language['about-mean-28']}</p>
                                
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <div className={Style["about-box"]}>
                        <div className={Style['img10']}></div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default About