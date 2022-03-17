import {React, useEffect, useRef} from "react";
import Style from './style.module.css'
import { useHistory } from 'react-router-dom'

// swiper bundle styles
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




const Auction = ({language}) => {
    const history = useHistory()

    return (
        <>
            <div 
            className={Style["pointer"]}
            onClick={
                () => {
                    history.push('/auction')
                }
            }
            >
                맵분양이동
            </div>
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
                    <h2 className={Style["auction-title"]}>{language['auction-mean-01']}</h2>
                    <div className={Style["auctionBox"]}>
                        <div className={Style['img1']}></div>
                        <div className={Style['auction-content-text']}>
                            <h3>{language['auction-mean-02']}</h3>
                            <p>{language['auction-mean-03']}</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <h2 className={Style["auction-title"]}>{language['auction-mean-01']}</h2>
                    <div className={Style["auctionBox"]}>
                        <div className={Style['img2']}></div>
                        <div className={Style['auction-content-text']}>
                            <div>
                                <h3>{language['auction-mean-04']}</h3>
                                <p>{language['auction-mean-05']}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <h2 className={Style["auction-title"]}>{language['auction-mean-01']}</h2>
                    <div className={Style["auctionBox"]}>
                        <div className={Style['img3']}></div>
                        <div className={Style['auction-content-text']}>
                            <div>
                                <h3>{language['auction-mean-06']}</h3>
                                <p>{language['auction-mean-07']}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <h2 className={Style["auction-title"]}>{language['auction-mean-01']}</h2>
                    <div className={`${Style.auctionBox} ${Style.auctionImgbox}`}>
                        <div className={Style['auction-img']}>
                            <div className={Style['img5']}></div>
                            <div className={Style['auction-img-text']}>{language['auction-mean-08']}</div>
                        </div>
                        <div className={Style['auction-img']}>
                            <div className={Style['img6']}></div>
                            <div className={Style['auction-img-text']}>{language['auction-mean-09']}</div>
                        </div>
                        <div className={Style['auction-img']}>
                            <div className={Style['img7']}></div>
                            <div className={Style['auction-img-text']}>{language['auction-mean-10']}</div>
                        </div>
                        <div className={Style['auction-img']}>
                            <div className={Style['img8']}></div>
                            <div className={Style['auction-img-text']}>{language['auction-mean-11']}</div>
                        </div>
                        <div className={Style['auction-img']}>
                            <div className={Style['img9']}></div>
                            <div className={Style['auction-img-text']}>{language['auction-mean-12']}</div>
                        </div>
                        <div className={Style['map-content']}>{language['auction-mean-13']}</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <h2 className={Style["auction-title"]}>{language['auction-mean-01']}</h2>
                    <div className={Style['auctionBox']}>
                        <div className={Style['img4']}></div>
                        <div className={Style['auction-content-text']}>
                            <div>
                                <h3>{language['auction-mean-14']}</h3>
                                <p>{language['auction-mean-15']}</p>
                            </div>
                            <div className={Style['auction-content-text-font']}>
                                <p>{language['auction-mean-16']}</p>
                                <p>{language['auction-mean-17']}</p>
                                <p>{language['auction-mean-18']}</p>
                                <p>{language['auction-mean-19']}</p>
                                <p>{language['auction-mean-20']}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                <h2 className={Style["auction-title"]}>{language['auction-mean-01']}</h2>
                    <div className={Style["auctionBox"]}>
                        <div className={Style['step5-img']}></div>
                        <div className={Style['auction-content-text']}>
                            <div>
                                <h3>{language['auction-mean-21']}</h3>
                                <p>{language['auction-mean-22']}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <h2 className={Style["auction-title"]}>{language['auction-mean-01']}</h2>
                    <div className={Style["auctionBox"]}>
                        <div className={Style['auction-howto-content']}>
                            <div>
                                <p>{language['auction-mean-23']}</p>
                                <p>{language['auction-mean-24']}</p>
                            </div>
                            <div>
                                <h4>{language['auction-mean-25']}</h4>
                                <ul>
                                    <li>{language['auction-mean-26']}</li>
                                    <li>{language['auction-mean-27']}</li>
                                    <li>③ 검은색 픽셀은 구매가 불가합니다...</li>
                                    <li>④ 개인 하우징은 최소 10개의 토지를 소유해야 건설 가능합니다...</li>
                                    <li>{language['auction-mean-28']}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                
            </Swiper>
        </>
    )
}

export default Auction