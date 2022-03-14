import { React, useEffect, useRef } from "react";
import Style from "./style.module.css";

// swiper bundle styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination, Navigation } from "swiper";
// install Swiper modules
SwiperCore.use([Mousewheel, Pagination, Navigation]);

// cityzenship 으로 바뀜
const Home = () => {
    

  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        resizeObserver={true}
        mousewheel={true}
        pagination={{clickable: true}}
        className={Style['mySwiper']}
      >

        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["grap1"]}></div>
            <div className={Style["cityzenship-content-text"]}>
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
            
          </div>
        </SwiperSlide>
        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["img1"]}></div>
            <div className={Style["cityzenship-content-text"]}>
              <p className={Style["title"]}>1계위</p>
              <p>
                1계위는 이루고 월드의 시민권을 확보하여 이루고 월드에서의 생활이
                가능합니다. 계급 유지를 위한 최소 보유 EWC는 존재하지 않으며
                보유 땅의 수량에 따라 투표권이 최소 1표부터 최대 9표까지
                지급됩니다. 이루고 월드에 입점된 사업체에서 물품 구입이
                가능합니다.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["img2"]}></div>
            <div className={Style["cityzenship-content-text"]}>
              <p className={Style["title"]}>2계위</p>
              <p>
                2계위는 1계위의 혜택과 더불어, 외치기 기능이 해금되어 이루고
                월드 내에 활동하는 다른 개척자와 전체 대화를 할 수 있습니다.
                1계위와 동일하게 계급 유지를 위한 최소 보유 EWC가 존재하지
                않으며, 보유한 땅의 수량에 따라 최소 10표 ~ 최대 99표의 투표권이
                지급됩니다. 하우징 시스템을 이용하기 위해서는 최소 3*3의 토지를
                지니고 있어야 합니다.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["img3"]}></div>
            <div className={Style["cityzenship-content-text"]}>
              <p className={Style["title"]}>3계위</p>
              <p>
                3계위는 소유한 땅 위에 정해져 있는 항목 중 원하는 사업을
                시작하여 대외적인 경제 활동이 가능합니다. 3계위의 계급 유지를
                위한 최소 보유 EWC는 100 EWC입니다. 보유한 땅에 수량에 따라 최소
                100표 ~ 최대 999표의 투표권이 지급됩니다.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["img4"]}></div>
            <div className={Style["cityzenship-content-text"]}>
              <p className={Style["title"]}>4계위</p>
              <p>
                4계위는 자신이 원하는 사업 아이템을 건의하여 유저들의 투표를
                통해 새로운 시장을 개척할 권리를 가지게 됩니다. ※ 모든 건의
                사항은 유저들의 찬반 투표 완료 후 법적 논의를 거쳐 진행됩니다.
                4계위의 계급 유지 최소 EWC는 1,000 EWC입니다. 보유한 땅에 수량에
                따라 최소 1,000표 ~ 9,999표의 투표권이 지급됩니다.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["img5"]}></div>
            <div className={Style["cityzenship-content-text"]}>
              <p className={Style["title"]}>5계위</p>
              <p>
                5계위는 1~4계위의 권한을 포함하여 새로운 세계로의 진출 여부 등
                대규모 업데이트에 관한 투표를 건의할 수 있습니다. ※ 최초로
                새로운 세계로 나아간다면 그에 따른 보상이 지급됩니다.
                <p>5계위의 계급 유지 최소 EWC는 10,000 EWC입니다.</p>
                <p>
                  보유한 땅에 수량에 따라 최소 10,000표 이상의 투표권이
                  지급됩니다
                </p>
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["grap2"]}></div>
          </div>
        </SwiperSlide>
      </Swiper>

    </>
  );
};

export default Home;
