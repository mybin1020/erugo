import React, { useEffect, useRef, useState } from "react"
import Style from './style.module.css'
import Bounce from './bounce.module.css'
import FrameCSS from './frame.module.scss'
import About from "./frame/about"
import Home from "./frame/home"
import Auction from "./frame/auction"
import BuyLand from "./frame/buyland"
import LogIn from "./frame/login"
import MyPage from "./frame/mypage"
import SignUp from "./frame/signup"
import Market from "./frame/market"

const animationOrderList = ['frame-1st', 'frame-2nd', 'frame-3rd', 'frame-4th', 'frame-5th', 'frame-6th', 'frame-7th', 'frame-8th']
const stopOrderList = [
    'frame-style-1st-stop',
    'frame-style-2nd-stop',
    'frame-style-3rd-stop',
    'frame-style-4th-stop',
    'frame-style-5th-stop',
    'frame-style-6th-stop',
    'frame-style-7th-stop',
    'frame-style-8th-stop'
]
const TopMenu = () => {
    return (
        <div className={Style['top-menu-background']}>
            <div className={Style['logo']}></div>
            <div className={Style['top-menu-button-wrapper']}>
                <div className={`${Style['top-menu-button']} ${Style['about-button']} pointer`}></div>
                <div className={`${Style['top-menu-button']} ${Style['home-button']} pointer`}></div>
                <div className={`${Style['top-menu-button']} ${Style['auction-button']} pointer`}></div>
                <div className={`${Style['top-menu-button']} ${Style['buy-land-button']} pointer`}></div>
                <div className={`${Style['top-menu-button']} ${Style['log-in-button']} pointer`}></div>
                <div className={`${Style['top-menu-button']} ${Style['my-page-button']} pointer`}></div>
                <div className={`${Style['top-menu-button']} ${Style['sign-up-button']} pointer`}></div>
                <div className={`${Style['top-menu-button']} ${Style['market-button']} pointer`}></div>
                <div className={`${Style['top-menu-button']}${Style['lang-button']} pointer`}></div>
            </div>
        </div>
    )
}
const Frame = ({ onCloseBunttonClick, onClick, frameName, frameIdx, frameOrder, detailFrameState, frameShowIdx, frameHideIdx, frameEle,children }) => {
    const [isFirst, setIsFirst] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsFirst(false)
        }, 2500)
    }, [])
    return (
        <div
            //className={`${FrameCSS[`${frameName}-frame`]} ${FrameCSS[frameOrder]} pointer`}
            className={`${isFirst ? FrameCSS[`init-${frameIdx + 1}`] : FrameCSS[frameOrder]} ${FrameCSS[`${frameName}-frame`]} pointer`}
            onClick={
                (e) => {
                    if (onClick && typeof onClick === 'function') {
                        onClick()
                    }
                }
            }
            ref={frameEle}
        >
            {/* detail view frame  start*/}
            <div
                className={`${detailFrameState === frameShowIdx ? FrameCSS[`${frameName}-detail-frame-show`] : (detailFrameState === frameHideIdx ? FrameCSS[`${frameName}-detail-frame-hide`] : FrameCSS[`${frameName}-detail-frame`])}`}
            >
                {/*  어떤 클래스를 적용할지 선택하는 방식 비교 연산 (비교) ? (참) : (거짓) */}
                {/* close button wrapper start*/}
                <div
                    style={{
                        width: '100%', height: '5%', marginTop: '0.8%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '1%'
                    }}
                >
                    {/* close button start*/}
                    <div
                        className="pointer"
                        style={{ width: '1.5%', height: '60%', borderRadius: '50%' }}
                        onClick={
                            (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                if (onCloseBunttonClick && typeof onCloseBunttonClick === 'function') {
                                    onCloseBunttonClick()
                                }
                            }
                        }
                    ></div>
                    {/* close button end*/}
                </div>
                {/* close button wrapper end*/}
                <div style={{width:'100%', height:'95%', padding:'5%'}}>
                    <div style={{width:'100%', height:'100%'}}>
                        {children}
                    </div>
                </div>
            </div>
            {/* detail view frame  end*/}
        </div>
    )
}
const MainGate = () => {
    const aboutFrame = useRef(undefined)
    const [frameOrder, setFrameOrderList] = useState(animationOrderList)
    const [detailFrameState, setDetailFrameState] = useState(undefined)
    const [wrapperSlide, setWrapperSlide] = useState(-10)
    const [leftButtonDown, setLeftButtonDown] = useState(false)
    const [buttonDownStartPoint, setButtonDownStartPoint] = useState({ startPoint: undefined })

    useEffect(() => {
        console.log(aboutFrame)
    }, [])
    return (
        <div className={Style['page-background']}>
            <div className={`${Style['plant']} ${Bounce['bounce-plant']}`}>
            </div>
            <div className={`${Style['drone']} ${Bounce['bounce-drone']}`} >
            </div>
            <div className={Style['main-wrapper']}>
                <TopMenu />
                <div className={Style['main-contents']} >
                    <div
                        style={{
                            width: '100%', height: '100%', perspective: '400vw',
                            transformStyle: 'preserve-3d', transform: `rotateX(${wrapperSlide}deg)`
                        }}
                    >
                        <Frame
                            frameEle={aboutFrame}
                            frameName={'about'}
                            frameIdx={0}
                            frameOrder={frameOrder[0]}
                            detailFrameState={detailFrameState}
                            onClick={
                                () => {
                                    setWrapperSlide(0)
                                    setDetailFrameState(0)
                                    setTimeout(() => {
                                        setFrameOrderList([
                                            stopOrderList[0], stopOrderList[1], stopOrderList[2], stopOrderList[3],
                                            stopOrderList[4], stopOrderList[5], stopOrderList[6], stopOrderList[7]
                                        ])
                                    }, 50)
                                }
                            }
                            onCloseBunttonClick={
                                () => {
                                    setDetailFrameState(1)
                                    setWrapperSlide(-10)
                                    setFrameOrderList([
                                        animationOrderList[0], animationOrderList[1], animationOrderList[2], animationOrderList[3],
                                        animationOrderList[4], animationOrderList[5], animationOrderList[6], animationOrderList[7]
                                    ])
                                }
                            }
                            frameShowIdx={0}
                            frameHideIdx={1}
                        ><About /> </Frame>
                        <Frame
                            frameName={'home'}
                            frameIdx={1}
                            frameOrder={frameOrder[1]}
                            detailFrameState={detailFrameState}
                            onClick={
                                () => {
                                    setWrapperSlide(0)
                                    setDetailFrameState(2)
                                    setTimeout(() => {
                                        setFrameOrderList([
                                            stopOrderList[7], stopOrderList[0], stopOrderList[1], stopOrderList[2],
                                            stopOrderList[3], stopOrderList[4], stopOrderList[5], stopOrderList[6]
                                        ])
                                    }, 50)
                                }
                            }
                            onCloseBunttonClick={
                                () => {
                                    setDetailFrameState(3)
                                    setWrapperSlide(-10)
                                    setFrameOrderList([
                                        animationOrderList[7], animationOrderList[0], animationOrderList[1], animationOrderList[2],
                                        animationOrderList[3], animationOrderList[4], animationOrderList[5], animationOrderList[6]
                                    ])
                                }
                            }
                            frameShowIdx={2}
                            frameHideIdx={3}
                        ><Home /></Frame>
                        <Frame
                            frameName={'auction'}
                            frameIdx={2}
                            frameOrder={frameOrder[2]}
                            detailFrameState={detailFrameState}
                            onClick={
                                () => {
                                    setWrapperSlide(0)
                                    setDetailFrameState(4)
                                    setTimeout(() => {
                                        setFrameOrderList([
                                            stopOrderList[6], stopOrderList[7], stopOrderList[0], stopOrderList[1],
                                            stopOrderList[2], stopOrderList[3], stopOrderList[4], stopOrderList[5],
                                        ])
                                    }, 50)
                                }
                            }
                            onCloseBunttonClick={
                                () => {
                                    setDetailFrameState(5)
                                    setWrapperSlide(-10)
                                    setFrameOrderList([
                                        animationOrderList[6], animationOrderList[7], animationOrderList[0], animationOrderList[1],
                                        animationOrderList[2], animationOrderList[3], animationOrderList[4], animationOrderList[5],
                                    ])
                                }
                            }
                            frameShowIdx={4}
                            frameHideIdx={5}
                        ><Auction/></Frame>
                        <Frame
                            frameName={'buyland'}
                            frameIdx={3}
                            frameOrder={frameOrder[3]}
                            detailFrameState={detailFrameState}
                            onClick={
                                () => {
                                    setWrapperSlide(0)
                                    setDetailFrameState(6)
                                    setTimeout(() => {
                                        setFrameOrderList([
                                            stopOrderList[5], stopOrderList[6], stopOrderList[7], stopOrderList[0],
                                            stopOrderList[1], stopOrderList[2], stopOrderList[3], stopOrderList[4],
                                        ])
                                    }, 50)
                                }
                            }
                            onCloseBunttonClick={
                                () => {
                                    setDetailFrameState(7)
                                    setWrapperSlide(-10)
                                    setFrameOrderList([
                                        animationOrderList[5], animationOrderList[6], animationOrderList[7], animationOrderList[0],
                                        animationOrderList[1], animationOrderList[2], animationOrderList[3], animationOrderList[4],
                                    ])
                                }
                            }
                            frameShowIdx={6}
                            frameHideIdx={7}
                        ><BuyLand /></Frame>
                        <Frame
                            frameName={'login'}
                            frameIdx={4}
                            frameOrder={frameOrder[4]}
                            detailFrameState={detailFrameState}
                            onClick={
                                () => {
                                    setWrapperSlide(0)
                                    setDetailFrameState(8)
                                    setTimeout(() => {
                                        setFrameOrderList([
                                            stopOrderList[4], stopOrderList[5], stopOrderList[6], stopOrderList[7],
                                            stopOrderList[0], stopOrderList[1], stopOrderList[2], stopOrderList[3],
                                        ])
                                    }, 50)
                                }
                            }
                            onCloseBunttonClick={
                                () => {
                                    setDetailFrameState(9)
                                    setWrapperSlide(-10)
                                    setFrameOrderList([
                                        animationOrderList[4], animationOrderList[5], animationOrderList[6], animationOrderList[7],
                                        animationOrderList[0], animationOrderList[1], animationOrderList[2], animationOrderList[3],
                                    ])
                                }
                            }
                            frameShowIdx={8}
                            frameHideIdx={9}
                        ><LogIn/></Frame>
                        <Frame
                            frameName={'mypage'}
                            frameIdx={5}
                            frameOrder={frameOrder[5]}
                            detailFrameState={detailFrameState}
                            onClick={
                                () => {
                                    setWrapperSlide(0)
                                    setDetailFrameState(10)
                                    setTimeout(() => {
                                        setFrameOrderList([
                                            stopOrderList[3], stopOrderList[4], stopOrderList[5], stopOrderList[6],
                                            stopOrderList[7], stopOrderList[0], stopOrderList[1], stopOrderList[2],
                                        ])
                                    }, 50)
                                }
                            }
                            onCloseBunttonClick={
                                () => {
                                    setDetailFrameState(11)
                                    setWrapperSlide(-10)
                                    setFrameOrderList([
                                        animationOrderList[3], animationOrderList[4], animationOrderList[5], animationOrderList[6],
                                        animationOrderList[7], animationOrderList[0], animationOrderList[1], animationOrderList[2],
                                    ])
                                }
                            }
                            frameShowIdx={10}
                            frameHideIdx={11}
                        ><MyPage /></Frame>
                        <Frame
                            frameName={'signup'}
                            frameIdx={6}
                            frameOrder={frameOrder[6]}
                            detailFrameState={detailFrameState}
                            onClick={
                                () => {
                                    setWrapperSlide(0)
                                    setDetailFrameState(12)
                                    setTimeout(() => {
                                        setFrameOrderList([
                                            stopOrderList[2], stopOrderList[3], stopOrderList[4], stopOrderList[5],
                                            stopOrderList[6], stopOrderList[7], stopOrderList[0], stopOrderList[1],
                                        ])
                                    }, 50)
                                }
                            }
                            onCloseBunttonClick={
                                () => {
                                    setDetailFrameState(13)
                                    setWrapperSlide(-10)
                                    setFrameOrderList([
                                        animationOrderList[2], animationOrderList[3], animationOrderList[4], animationOrderList[5],
                                        animationOrderList[6], animationOrderList[7], animationOrderList[0], animationOrderList[1],
                                    ])
                                }
                            }
                            frameShowIdx={12}
                            frameHideIdx={13}
                        ><SignUp /></Frame>
                        <Frame
                            frameName={'market'}
                            frameIdx={7}
                            frameOrder={frameOrder[7]}
                            detailFrameState={detailFrameState}
                            onClick={
                                () => {
                                    setWrapperSlide(0)
                                    setDetailFrameState(14)
                                    setTimeout(() => {
                                        setFrameOrderList([
                                            stopOrderList[1], stopOrderList[2], stopOrderList[3], stopOrderList[4],
                                            stopOrderList[5], stopOrderList[6], stopOrderList[7], stopOrderList[0],
                                        ])
                                    }, 50)
                                }
                            }
                            onCloseBunttonClick={
                                () => {
                                    setDetailFrameState(15)
                                    setWrapperSlide(-10)
                                    setFrameOrderList([
                                        animationOrderList[1], animationOrderList[2], animationOrderList[3], animationOrderList[4],
                                        animationOrderList[5], animationOrderList[6], animationOrderList[7], animationOrderList[0],
                                    ])
                                }
                            }
                            frameShowIdx={14}
                            frameHideIdx={15}
                        ><Market /></Frame>
                    </div>

                </div>
                <div className={Style['bottom']}></div>
            </div>
        </div>
    )
}

export default MainGate