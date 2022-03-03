import React from "react";
import Style from './style.module.css'
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




const About = () => {
    
    return (
        <>
        <Swiper 
            direction={"vertical"}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{clickable: true}}
            onSwiper={(swiper) => console.log(swiper)}
            scrollbar={{draggable: true}}
            onSlideChange={() => console.log('slide change')}
            className={Style['mySwiper']}
        >
            <SwiperSlide className={Style['swiper-slide']}>
                <div className={Style["about-box"]}>
                    <div className={Style['img1']}></div>
                    <div className={Style['about-content-text']}>
                        <div>
                            <p>우리가 살아가는 현실 세계는 시간과 공간에 제약이 있습니다.</p>
                        </div>
                        <div>
                            <p>아침에 시작해서 밤에 끝납니다.</p>
                            
                        </div>
                        <div>
                            <p>지금의 세계는 사람을 차별하지 않기 위해서 노력하지만, 완벽하진 않습니다.</p>
                            
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className={Style['swiper-slide']}>
                <div className={Style["about-box"]}>
                    <div className={Style['img2']}></div>
                    <div className={Style['about-content-text']}>
                        <div>
                            <p>나이, 성별, 외모, 국적, 그 밖에 많은 것들로 구분하고, 차별합니다.</p>
                        
                        </div>
                        <div>
                            <p>때때로 사람은 자기가 하고 싶은 일을 할 수 없습니다.</p>
                        </div>
                        <div>
                            <p>어른은 장난감을 가지고 놀 수 없고, 아이는 자기 사업을 시작할 수 없고, 노인이 되어 극한 스포츠를 시작할 수는 없습니다</p>
                        
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className={Style['swiper-slide']}>
                <div className={Style["about-box"]}>
                    <div className={Style['img3']}></div>
                    <div className={Style['about-content-text']}>
                        <div>
                            <p>이루고 월드는 그 모든 제약이 없습니다.</p>
                            
                        </div>
                        <div>
                            <p>상상해보세요.</p>
                            
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className={Style['swiper-slide']}>
                <div className={Style['about-box']}>
                    <div className={Style['img4']}></div>
                    <div className={Style['about-content-text']}>
                        <div>
                            <p>아침에 일어나 당신은 이루고 월드에 접속합니다.</p>
                            
                        </div>
                        <div>
                            <p>당신은 비행 자동차를 타고 속도 제한 없이 하늘을 납니다.</p>
                            
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className={Style['swiper-slide']}>
                <div className={Style["about-box"]}>
                    <div className={Style['img5']}></div>
                    <div className={Style['about-content-text']}>
                        <div>
                            <p>당신에게 운전면허는 필요 없습니다. 교통 규칙도 필요 없는 이야기죠.</p>
                            
                        </div>
                        <div>
                            <p>당신은 비행하면서 쇼핑을 하고, 주식을 거래하고, 친구와 통화를 할 수 있습니다.</p>
                            
                        </div>
                        <div>
                            <p>당신은 출근하는게 아니라 잠시 비행을 즐긴 것입니다.</p>
                            
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className={Style['swiper-slide']}>
                <div className={Style["about-box"]}>
                    <div className={Style['img6']}></div>
                    <div className={Style['about-content-text']}>
                        <div>
                            <p>당신의 오피스가 당신을 기다리고 있습니다.</p>
                            
                        </div>
                        <div>
                            <p>오늘 필요한 업무는 무엇인지 인공지능 비서가 친절하게 브리핑해줍니다.</p>
                            
                        </div>
                        <div>
                            <p>마치 대기업의 보스처럼 당신은 그것을 듣고는 우선순위를 정해줍니다. </p>
                            
                        </div>
                        <div>
                            <p>당신의 사업은 얼마 전부터 성공하고 있어서 확장해야 합니다. 그래서 새롭게 직원을 채용해야 합니다. 만약 현실 세계였다면 당신은 많은 고민을 했을 겁니다. 현실상에서 새로운 직원을 고용하는 것은 어려운 일입니다. 하지만 이루고 월드는 그렇지 않습니다. 파트타임 직원을 순식간에 고용할 수 있습니다.</p>
                            
                        </div>
                        <div>
                            <p>당신은 직원 고용을 위해서 광고를 냅니다. 바로 지원자가 지원합니다.</p>
                            
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className={Style['swiper-slide']}>
                <div className={Style["about-box"]}>
                    <div className={Style['img7']}></div>
                    <div className={Style['about-content-text']}>
                        <div>
                            <p>지원자는 로마에서, 뉴욕에서, 싱가폴에서 거리와 상관없이 지원했습니다.</p>
                            
                        </div>
                        <div>
                            <p>이루고 월드는 이런 일이 가능합니다.</p>
                            
                        </div>
                        <div>
                            <p>당신이 이렇게 바쁘게 일하고 있는 동안 알람이 울립니다.</p>
                            
                        </div>
                        <div>
                            <p>당신은 이루고 월드를 로그아웃합니다.</p>
                            
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className={Style['swiper-slide']}>
                <div className={Style["about-box"]}>
                    <div className={Style['img8']}></div>
                    <div className={Style['about-content-text']}>
                        <div>
                            <p>어젯밤 당신의 아바타가 입었던 가죽 재킷이 집으로 배달되었습니다. 그리고 당신의 반려동물을 위한 사료 세트도 배달되었습니다. 이루고 월드와 현실 속에서 당신은 똑같은 강아지를 키우고 있습니다. 아바타와 반려동물은 특별히 만든 비타민과 영양제가 들어간 사료를 배달받고 있습니다. 모두 이루고 월드에서 당신이 주문한 것입니다.</p>
                            
                        </div>
                        <div>
                            <p>살짝 출출해진 당신은 며칠 전 이루고 월드에서 당신의 아바타가 먹었던 태국 음식이 생각났습니다. 당신은 배달 가능한 태국 음식점을 찾다가 직접 요리하고 싶은 욕구가 생겼습니다. 다시 이루고 월드에 로그인합니다.</p>
                            
                        </div>
                        <div>
                            <p>당신은 태국 음식을 배울 수 있는 학원을 찾았고, 그리고 학원으로 달려가 태국 요리를 배웁니다.</p>
                            
                        </div>
                        <div>
                            <p>당신이 요리를 배우는 동안 당신의 집으로 학원에서 배운 요리의 밀키트가 배달되었습니다. </p>
                            
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className={Style['swiper-slide']}>
                <div className={Style["about-box"]}>
                    <div className={Style['img9']}></div>
                    <div className={Style['about-content-text']}>
                        <div>
                            <p>이제 당신은 아주 멋진 태국 요리사가 되어 음식을 만들고 그것을 즐깁니다.</p>
                            
                        </div>
                        <div>
                            <p>이것이 가상 세계와 현실 세계가 하나가 되는 이루고 월드의 일상입니다.</p>
                            
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