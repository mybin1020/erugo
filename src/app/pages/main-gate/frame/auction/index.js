import {React, useEffect, useRef} from "react";
import Style from './style.module.css'
import { useHistory } from 'react-router-dom'
import Slider from '../components/slide'

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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




const Auction = () => {
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
                observer={true}
                observeParents={true}
                pagination={{clickable: true}}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                className={Style['mySwiper']}
            >
                <SwiperSlide className={Style['swiper-slide']}>
                    <h2 className={Style["auction-title"]}>Auction 이용 방법</h2>
                    <div className={Style["auctionBox"]}>
                        <div className={Style['img1']}></div>
                        <div className={Style['auction-content-text']}>
                            <h3>step 1</h3>
                            <p>‘이루고 월드’ 홈페이지 로그인 </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <h2 className={Style["auction-title"]}>Auction 이용 방법</h2>
                    <div className={Style["auctionBox"]}>
                        <div className={Style['img2']}></div>
                        <div className={Style['auction-content-text']}>
                            <div>
                                <h3>step 2</h3>
                                <p>맵 분양 페이지 접속</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <h2 className={Style["auction-title"]}>Auction 이용 방법</h2>
                    <div className={Style["auctionBox"]}>
                        <div className={Style['img3']}></div>
                        <div className={Style['auction-content-text']}>
                            <div>
                                <h3>step 3</h3>
                                <p>구역 및 위치, 땅 수량 선택</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <h2 className={Style["auction-title"]}>Auction 이용 방법</h2>
                    <div className={`${Style.auctionBox} ${Style.auctionImgbox}`}>
                        <div className={Style['auction-img']}>
                            <div className={Style['img5']}></div>
                            <div className={Style['auction-img-text']}>구매가능</div>
                        </div>
                        <div className={Style['auction-img']}>
                            <div className={Style['img6']}></div>
                            <div className={Style['auction-img-text']}>선택한 범위내 특정 셀 확인</div>
                        </div>
                        <div className={Style['auction-img']}>
                            <div className={Style['img7']}></div>
                            <div className={Style['auction-img-text']}>기존 입찰자 존재</div>
                        </div>
                        <div className={Style['auction-img']}>
                            <div className={Style['img8']}></div>
                            <div className={Style['auction-img-text']}>기존 입찰 범위 선택</div>
                        </div>
                        <div className={Style['auction-img']}>
                            <div className={Style['img9']}></div>
                            <div className={Style['auction-img-text']}>구매 불가 지역</div>
                        </div>
                        <div className={Style['map-content']}>※ 맵 선택 : 최소 1개 ~ 최대 4,096개</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <h2 className={Style["auction-title"]}>Auction 이용 방법</h2>
                    <div className={Style['auctionBox']}>
                        <div className={Style['img4']}></div>
                        <div className={Style['auction-content-text']}>
                            <div>
                                <h3>step 4</h3>
                                <p>우측 상단 입찰가 기입 후 경매 참가</p>
                            </div>
                            <div className={Style['auction-content-text-font']}>
                                <p>PositionX : 선택 땅의 X축 좌표</p>
                                <p>PositionY : 선택 땅의 Y축 좌표</p>
                                <p>Max Bid : 현재 최고 입찰가</p>
                                <p>Bid Price : 입찰 희망가</p>
                                <p>Bid Price 입찰 희망가 입력 후 하단의 Apply 클릭하여 경매 참여</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                <h2 className={Style["auction-title"]}>Auction 이용 방법</h2>
                    <div className={Style["auctionBox"]}>
                        <div className={Style['step5-img']}></div>
                        <div className={Style['auction-content-text']}>
                            <div>
                                <h3>step 5</h3>
                                <p>Auction 관리자 메시지 확인</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={Style['swiper-slide']}>
                    <h2 className={Style["auction-title"]}>Auction 이용 방법</h2>
                    <div className={Style["auctionBox"]}>
                        <div className={Style['auction-howto-content']}>
                            <div>
                                <p>※ 경매 진행 기간</p>
                                <p>‘이루고 월드’의 땅 분양 경매는 22.xx.xx(00시) ~ 22.xx.xx(00시)까지 2주간 진행됩니다.</p>
                            </div>
                            <div>
                                <h4>※ 주의 사항</h4>
                                <ul>
                                    <li>① 맵 분양은 경매 형식으로 진행되며, 낙찰 받지 못한 EWC는 계정 지갑으로 환급됩니다.</li>
                                    <li>② 경매 입찰 취소는 My Bid에서 가능합니다.</li>
                                    <li>③ 검은색 픽셀은 구매가 불가합니다.</li>
                                    <li>④ 개인 하우징은 최소 10개의 토지를 소유해야 건설 가능합니다.</li>
                                    <li>⑤ 사업용 건물은 최소 100개 이상의 토지를 소유해야 건설 가능합니다.(3계위 이상)</li>
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