import React from "react";
import Style from '../mypage/style.module.css'
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
export default function Slide() {
    return (
        <Swiper 
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={30}
                mousewheel={true}
                pagination={true}
                colors={'white'}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                className={Style['mySwiper']}
            >
                <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["cityzenship-text"]}>
              <p>
                ‘이루고 월드’에서 시민권은 세계의 근간을 이루는 중요한 역할을
                합니다.
              </p>
              <p>
                시민권이 없이 이루고 월드를 방문하여도 기본적인 이동에 제약은
                없지만, 월드 내에서 다양한 경험을 체험하고 싶다면 시민권이 꼭
                필요합니다.
              </p>
              <p>
                이루고 월드의 시민은 총 5개의 계급으로 나누어지며, 계급이
                올라가면 그에 따른 혜택과 권리가 추가됩니다.
              </p>
            </div>
            <div className={Style["grap1"]}></div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["cityzenship-text"]}>
              <p>
                ‘이루고 월드’에서 시민권은 세계의 근간을 이루는 중요한 역할을
                합니다.
              </p>
              <p>
                시민권이 없이 이루고 월드를 방문하여도 기본적인 이동에 제약은
                없지만, 월드 내에서 다양한 경험을 체험하고 싶다면 시민권이 꼭
                필요합니다.
              </p>
              <p>
                이루고 월드의 시민은 총 5개의 계급으로 나누어지며, 계급이
                올라가면 그에 따른 혜택과 권리가 추가됩니다.
              </p>
            </div>
            <div className={Style["grap1"]}></div>
          </div>
        </SwiperSlide>
            </Swiper>
    )
}