import React from "react";
import classNames from "classnames";
import Style from './home.module.css'
import { useHistory } from "react-router";
//import 'react-responsive-carousel/lib/styles/carousel.css'
//import { Carousel } from 'react-responsive-carousel'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'


const HomePage = ({ menubar, footer }) => {
    const history = useHistory()
    const images = [1, 2].map((number) => ({
        src: `/images/main_0${number}.jpeg`
    }));

    return (
        <div className={classNames(Style['background'])}>
            {menubar}
            <div className={classNames(Style['main-image'])} >
                {/*
                <Image>
                    <div className={classNames(Style['image-inner-box'])}>
                    <MButton text={'Get Started'} onClick={() => {history.push('/map')}} />
                    </div>
                </Image>
                
                <video autoPlay muted loop>
                    <source src="/video/main.mp4" type="video/mp4"></source>
                </video>
                */}
                {/*
                <Carousel showArrows={true} onChange={() => { }} onClickItem={() => { }} onClickThumb={() => { }} width={'100%'} autoPlay={true} interval={2000} infiniteLoop={true}>
                    <div>
                        <img src="/images/main_01.png" />
                    </div>
                    <div>
                        <img src="/images/main_02.png" />
                    </div>
                    <div>
                        <img src="/images/main_03.png" />
                    </div>
                    <div>
                        <img src="/images/main_04.png" />
                    </div>
                    <div>
                        <img src="/images/main_05.png" />
                    </div>
                    <div>
                        <img src="/images/main_06.png" />
                    </div>
                </Carousel>
                */}
                {/*
                <div className={classNames(Style['image-inner-box'])}>
                    <MButton text={'GET STARTED'} onClick={() => { history.push('/map') }} />
                </div>
                */}
                <Carousel
                    images={images}
                    style={{ height: 512, width: '100%' }}
                    isLoop={true}
                    isAutoPlaying={true}
                    hasThumbnails={false}
                    canAutoPlay={true}
                    autoPlayInterval={3000}
                    pauseIcon={<div></div>}
                    maxIcon={<div></div>}
                    hasIndexBoard={false}
                    hasSizeButton={false}
                    rightIcon={
                        <div style={{width:'50px', height:'50px', backgroundColor:'rgba(255,255,255,1)', borderRadius:'25px', marginRight:'50px', display:'flex', justifyContent:'center', alignItems:'center', paddingLeft:'10px'}}>
                            <AiFillCaretRight fontSize={'40px'}/>
                        </div>
                    }
                    leftIcon={
                        <div style={{width:'50px', height:'50px', backgroundColor:'rgba(255,255,255,1)', borderRadius:'25px', marginLeft:'50px', display:'flex', justifyContent:'center', alignItems:'center', paddingRight:'10px'}}>
                            <AiFillCaretLeft fontSize={'40px'}/>
                        </div>
                    }
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '1244px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ font: 'Noto Sans KR', fontSize: '28px', fontWeight: 'bold' }}>꿈이 이루워지는 공간 이루고 월드</div>
                    </div>
                    <div style={{ width: '100%', height: '40px' }}></div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', gap: '3px' }}>
                        <div style={{ font: 'Noto Sans KR', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                            메타버스 프랫폼 '이루고 월드'는 가상세계와 현실 세계가 이어지는 함께 꿈을 실현하는 곳입니다.
                        </div>
                        <div style={{ font: 'Noto Sans KR', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                            저희는 게임, 가상 오피스, SNS등의 구분과 분류를 거부합니다.
                        </div>
                        <div style={{ font: 'Noto Sans KR', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                            인간을 오직 한 단어로 정의 내릴 수 없듯 우리 '이루고 월드'도 그렇습니다.
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '80px' }}></div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <div style={{ width: '450px', height: '450px' }}>
                            <img src="/images/main_desc_02.jpeg" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div style={{ width: 'calc(100% - 450px)', height: '450px', paddingLeft: '54px' }}>
                            <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontWeight: 'bold', fontSize: '24px' }}>
                                이루고 월드가 추구하는 메타버스는 4가지 원칙을 따르고 있습니다.
                            </div>
                            <div style={{ width: '100%', height: '250px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <div style={{ width: '800px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '25%', height: '100%', border: '1px solid #707070', padding:'15px' }}>
                                        <div style={{ width: '100%', height: '25%', fontFamily: 'arial', fontSize: '48px', fontWeight: 'bold' }}>1</div>
                                        <div style={{width:'100%', height:'15px'}}></div>
                                        <div style={{width:'100%'}}>
                                            <p style={{fontSize:'16px', lineHeight:'27px', whiteSpace:'pre-wrap'}}>
                                                {
`누구나 쉽게
참여할 수 있는 낮은 
진입장벽을 만든다`                                                    
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ width: '25%', height: '100%', border: '1px solid #707070', padding:'15px' }}>
                                        <div style={{ width: '100%', height: '25%', fontFamily: 'arial', fontSize: '48px', fontWeight: 'bold' }}>2</div>
                                        <div style={{width:'100%', height:'15px'}}></div>
                                        <div style={{width:'100%'}}>
                                            <p style={{fontSize:'16px', lineHeight:'27px', whiteSpace:'pre-wrap'}}>
                                                {
`자체적으로 
운용되고 
발전하는 경제 
생태계를 만든다`                                                    
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ width: '25%', height: '100%', border: '1px solid #707070', padding:'15px' }}>
                                        <div style={{ width: '100%', height: '25%', fontFamily: 'arial', fontSize: '48px', fontWeight: 'bold' }}>3</div>
                                        <div style={{width:'100%', height:'15px'}}></div>
                                        <div style={{width:'100%'}}>
                                            <p style={{fontSize:'16px', lineHeight:'27px', whiteSpace:'pre-wrap'}}>
                                                {
`보다 강력한 
현실과의 연계를 
추구한다.`                                                    
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ width: '25%', height: '100%', border: '1px solid #707070', padding:'15px' }}>
                                        <div style={{ width: '100%', height: '25%', fontFamily: 'arial', fontSize: '48px', fontWeight: 'bold' }}>4</div>
                                        <div style={{width:'100%', height:'15px'}}></div>
                                        <div style={{width:'100%'}}>
                                            <p style={{fontSize:'16px', lineHeight:'27px', whiteSpace:'pre-wrap'}}>
                                                {
`기업과의 콜라보를 
통한 메타버스 
경제 생태계를 
활성화 한다.`                                                    
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <p style={{ fontSize: '16px', whiteSpace: 'pre-wrap' }}>{
                                    `블록체인을 기반으로 메타버스와 입점업체, 유저를 연결시키는 '이루고월드 경제 생태계 모델'을
가진 이루고월드는 독자적인 경제 생태계를 통해 지속적인 성장을 추구합니다.`
                                }</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '80px' }}></div>
                    <div style={{ width: '100%' }}>
                        <video src="/video/result.mp4" style={{ width: '100%' }} controls loop muted autoPlay/>
                    </div>
                    <div style={{ width: '100%', height: '80px' }}></div>
                    <div style={{ width: '100%' }}>
                        <div style={{ width: '100%', height: '610px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '540px', height: '610px', backgroundColor: '#000000', padding: '20px' }}>
                                <div style={{ width: '100%', height: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 'bold', color: '#ffffff' }}>
                                    {'ERUGO WORLD COIN && RUGO TOKEN'}
                                </div>
                                <div style={{ width: '500px', height: '500px' }}>
                                    <img src="/images/main_desc_01.jpeg" style={{ width: '100%', height: '100%' }} />
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '40px' }}></div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '916px', height: '250px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ width: '400px', height: '100%', border: '1px solid #707070' }}>
                                    <div style={{ fontSize: '100px', color: 'rgba(219,219,219,0.37)', width: '400px', height: '150px', textAlign: 'center' }}>
                                        EWC
                                        <div style={{ fontSize: '24px', fontWeight: 'bold', position: 'relative', top: '-90px' }}>이루고월드코인(EWC)</div>
                                    </div>
                                    <div style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <div style={{ fontSize: '16px' }}>메타버스 내 부동산, 상품, 용역, 아이템</div>
                                        <div style={{ fontSize: '16px' }}>등을 거래할 수 있는 가상 자산입니다.</div>
                                    </div>
                                </div>
                                <div style={{ width: '400px', height: '100%', border: '1px solid #707070' }}>
                                    <div style={{ fontSize: '100px', color: 'rgba(219,219,219,0.37)', width: '400px', height: '150px', textAlign: 'center' }}>
                                        RUGO
                                        <div style={{ fontSize: '24px', fontWeight: 'bold', position: 'relative', top: '-90px' }}>루고(RUGO)</div>
                                    </div>
                                    <div style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <div style={{ fontSize: '16px' }}>실제 이루고월드 내에서 유통되는 통화로서</div>
                                        <div style={{ fontSize: '16px' }}>EWC를 기반으로 발행된 토큰입니다.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '40px' }}></div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '916px', height: '120px', border: '1px solid #707070', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <div style={{ fontSize: '16px' }}>메타버스 내에서 다양한 작업과 노력을 통해서 유저가 벌어들인 룩 토큰은 언제든지 EWC로</div>
                                <div style={{ fontSize: '16px' }}>이루고월드 환율 정책에 의해 교환할 수 있으며, EWC를 매각함으로써 현금화가 가능합니다.</div>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '40px' }}></div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '916px', height: '120px', border: '1px solid #707070', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <div style={{ fontSize: '16px' }}>이루고월드 내에서 입점 업체가 내는 입점비, 광고비, 판매 수익 등은 루고 형태로 유통되어</div>
                                <div style={{ fontSize: '16px' }}>이루고월드의 경제 생태계를 발전시키게 됩니다.</div>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '40px' }}></div>
                    </div>
                </div>
            </div>
            {footer}
        </div>
    )
}

export default HomePage