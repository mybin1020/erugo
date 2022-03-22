import { React } from "react";
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
const Home = ({language}) => {
  
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
                {language['citizenship-mean-01']}
              </p>
              <p>
              {language['citizenship-mean-02']}
              </p>
              <p>
              {language['citizenship-mean-03']}
              </p>
            </div>
            
          </div>
        </SwiperSlide>
        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["img1"]}></div>
            <div className={Style["cityzenship-content-text"]}>
              <p className={Style["title"]}> {language['grade-01']}</p>
              <p>
              {language['citizenship-mean-04']}
              </p>
              <p>
              {language['citizenship-mean-05']}
              </p>
              <p>
             <small> {language['citizenship-mean-06']} </small>
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["img2"]}></div>
            <div className={Style["cityzenship-content-text"]}>
              <p className={Style["title"]}>{language['grade-02']}</p>
              <p>
              {language['citizenship-mean-07']}
              </p>
              <p>
              <small>{language['citizenship-mean-08']}</small>
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["img3"]}></div>
            <div className={Style["cityzenship-content-text"]}>
              <p className={Style["title"]}>{language['grade-03']}</p>
              <p>
              {language['citizenship-mean-09']}
              </p>
              <p>
              {language['citizenship-mean-10']}
              </p>
              <p>
              {language['citizenship-mean-11']}
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["img4"]}></div>
            <div className={Style["cityzenship-content-text"]}>
              <p className={Style["title"]}>{language['grade-04']}</p>
              <p>
              {language['citizenship-mean-12']}
              </p>
              <p>
              <small>
              {language['citizenship-mean-13']}
              </small>
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={Style["swiper-slide"]}>
          <div className={Style["cityzenship-swiper-text"]}>
            <div className={Style["img5"]}></div>
            <div className={Style["cityzenship-content-text"]}>
              <p className={Style["title"]}>{language['grade-05']}</p>
              <p>
              {language['citizenship-mean-14']}</p>
                <p>
                {language['citizenship-mean-15']}
                  
                </p>
              <p>
              <small> {language['citizenship-mean-16']}
              </small>
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