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



const BuyLand = () => {
    const history = useHistory()
    return (
        <>
            <div 
            className={Style['buyland-btn']}
            onClick={
                () => {
                    history.push('/land-state')
                }
            }
            >
                land-state버튼
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
                    <div className={Style["buyland-box"]}>
                        <div className={Style['img1']}></div>
                        <div className={Style['buyland-content-text']}>
                            <div>
                                <p>
                                    고대의 작은 도시가 있었습니다. 일곱 언덕에서 시작한 이 도시는 왕국으로 성장했고, 공화국이 되었으며 종래에 제국이 되었습니다.
                                </p>
                                <p>
                                    이 위대한 제국의 시작은 도시조차 제대로 이루지 못하고 일곱 언덕에서 자리를 잡고 전전긍긍하는 삶이었으며, 그 구성원들은 찬란한 미래보다 현실의 삶을 걱정하며 살아가는 처지였습니다.
                                </p>
                                <p>
                                    시간이 흐른 뒤, 그들은 한 가지 획기적인 생각을 하게 됩니다. 그 생각은 자신들의 삶을 윤택하게 만들어 주었으며 
                                    대제국이라는 결과물의 첫걸음이 되었습니다.
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
                                    고대의 작은 도시는 땅과 자신들의 구성원이 될 수 있는 시민권을 팔았습니다. 땅을 사는 사람에게 시민권을 제공한 것입니다. 땅의 주인은 시민이 되고, 시민은 땅의 주인이 됩니다. 
                                </p>
                                <p>
                                    기존의 기득권자들과 시민들은 땅을 구매하여 새로운 시민이 된 자들을 차별 없는 동등한 위치로 받아들였습니다. 
                                </p>
                                <p>
                                심지어 타지에서 들어와 투표를 통하여 왕이 될 수도 있었습니다.
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
                                    작은 도시였던 그곳은 사람들의 유입으로 언덕 주변의 땅을 얻고 시민도 얻었으며 다양성도 확보하게 되었습니다.
                                </p>
                                <p>
                                    이 모든 것은 그들이 세계를 지배하는 대제국으로 성장하는 밑거름이 되었습니다.
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
                                    결과적으로 대제국의 시대는 막을 내리게 되었지만, 그들의 문화와 역사는 지금까지도 세계 여러 곳에서 영향을 끼치고 있습니다.
                                </p>
                                <p>
                                    기억하고 싶지 않은 슬픈 사건 이후, 무너져버린 이루고 월드를 다시 세우기로 결심한 구성원들은 고대 작은 도시의 지혜를 빌리기로 합니다.
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
                                    화려했던 기억만 남아있는 이루고 월드 타워 주변의 땅을 9개로 나누고 그것을 다시 10만 개로 나누어 공평하게 다른 세계에서 이주한 개척자에게 나누기로 했습니다.
                                </p>
                                <p>
                                    고대 로마 제국과 같이, 이루고 월드 타워에 대가를 치른 후 땅을 보유하게 되면 그 개척자는 시민권을 얻습니다.
                                </p>
                                <p>
                                    시민권을 얻은 개척자는 자신이 보유한 땅만큼의 투표권을 얻게 되며 이 투표권은 이루고 월드 내의 모든 것의 기반이 되는 만큼, 위대한 권리를 가지고 있습니다.
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
                                        이 권리는 보유한 땅의 수량에 따라 총 5계급으로 나누어져 혜택을 받을 수 있게 됩니다.
                                        <div className={Style['grap1']}></div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={Style['swiper-slide']}>
                                <div className={Style['buyland-swiper-text']}>
                                    <p>
                                        하나의 땅과 한 장의 투표권을 가지고 있더라도 이루고 월드의 시민입니다. 
                                    </p>
                                    <p>
                                        하지만, 하나의 땅에 한 장의 투표권이 생기는 만큼 자신이 땅을 얼마나 보유하느냐가 권력 행사의 관건이 될 것입니다. 
                                    </p>
                                    <p>
                                        또한, 보유한 땅에 따라 투표권을 제외한 별도의 권리가 추가됩니다.
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={Style['swiper-slide']}>
                                <div className={Style['buyland-swiper-text']}>
                                    <p>
                                        1계위는 이루고 월드의 시민권을 확보하여 이루고 월드에서의 생활이 가능합니다.
                                        
                                    </p>
                                    <p>
                                        2계위는 1계위의 혜택과 더불어, 외치기 기능이 해금되어 이루고 월드 내에 활동하는 다른 개척자와 전체 대화를 할 수 있습니다.
                                    </p>
                                    <p>
                                        3계위는 소유한 땅 위에 정해져 있는 항목 중 원하는 사업을 시작하여 대외적인 경제 활동이 가능합니다.
                                    </p>
                                    <p>
                                        4계위는 앞서 말한 1 ~ 3계위의 혜택 이외 추가로 자신이 원하는 사업 아이템을 건의하여 유저들의 투표를 통해 새로운 시장을 개척할 권리를 가지게 됩니다. 
                                    </p>
                                    <p className={Style['buyland-swiper-text-font']}>
                                        <small>※ 건의사항은 유저들의 투표 이후 법적 논의 후 문제가 없을 시 진행이 가능합니다.</small>
                                        
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={Style['swiper-slide']}>
                                <div className={Style['buyland-swiper-text']}>
                                    <div>
                                        <p>
                                            5계위는 앞서 나열된 모든 권리를 포함하여 새로운 세계로의 진출 여부에 대해 투표를 개최할 권리가 생기게 됩니다. 물론, 가장 먼저 새로운 세계로 나아간다면 그에 따른 보상이 지급됩니다.
                                        </p>
                                        <p>
                                        모든 권력은 시민권과 투표에서부터 시작되기에 많은 땅과 투표권을 보유하고 있다면 권력이 커집니다. 
                                        </p>
                                        <p>
                                        다만, 일반 시민들이 권력의 균형을 이루고자 한다면, 전체 채팅과 온라인 채팅 센터를 통하여 이루고 월드 내에 활동중인 다른 개척자와 힘을 합쳐 자신들의 뜻을 관철시킬 수 있습니다.
                                        </p>
                                        <p className={Style['buyland-swiper-text-font']}>
                                        <small>※ 3계위 이상의 계급은 일정한 Rugo를 세금으로 거두게 됩니다. 이는 이루고 월드의 경제를 해치지 않는 선에서 책정이 되며, 자신의 권리를 증명하지 못하는 순간 세금 역시 거두지 못하게 됩니다. (최소 보유 땅 / EWC)</small>
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
                                    <div>
                                        <p>
                                        3계위 이상의 계급은 이루고 월드를 지키기 위한 최소한의 의무가 존재합니다.
                                        자신의 권리를 지키기 위하여 EWC를 최소 보유 수량 이상 소지하고 있어야 하며 수량은 다음과 같습니다.
                                        </p>
                                        
                                    </div>
                                    <div className={Style['grap2']}></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={Style['swiper-slide']}>
                                <div className={Style['buyland-swiper-text']}>
                                    <div>
                                        <p>
                                        만약 계급에 맞는 최소한의 EWC를 보유하지 않았다면, 자신의 현재 계급과 상관없이 2계위의 권리만을 누릴 수 있게 됩니다.
                                        </p>
                                        <p>
                                        상상하는 모든 것이 이루어지는 세계, 이루고 월드의 시민이 되어 당신의 권리를 보여주세요. 
                                        </p>
                                        <p>
                                        당신이 창조하는 세계를 우리에게 보여주세요. 이루고 월드가 기다리고 있습니다.
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