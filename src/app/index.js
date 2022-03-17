import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Route, Switch } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Style from './style.module.css'

import Loader from "react-spinners/PacmanLoader";

import LoginPage from './pages/login'
import HomePage from './pages/home'
import HomePage2 from './pages/home2';
//import MapPage from './pages/map'
import MyLandPage from './pages/my-land';
import AuctionPage from './pages/auction';
import MyPage from './pages/my';
import ViewDetailPage from './pages/view-detail';
import MailBox from './pages/mail-box'

import { Footer } from './components'
import Land from './pages/land';
import MainEntrance from './pages/main-gate';
import ResetPassword from './pages/reset-password';
import SignUp from './pages/sign-up';
import { allowedIp, checkMyIp, downloadGridImage, getLanguageData, getMyLandOpen, getPointAmount, readGridColorList, readInfo, requestLogin } from './api'
import BidList from './pages/bid-list';
import HighestBid from './pages/highest-bid';

import Menu from './components/top-menu';
import LandStatePage from './pages/land-state';
import XTTest from './pages/xt-test';

const App = () => {

    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('')


    const [language, setLanguage] = useState({ ko: {}, eng: {} })
    const [languageCode, setLanguageCode] = useState(localStorage.getItem('language-code') || 'ko')

    const [myLandOpen, setMyLandOpen] = useState(false)

    const [isWhiteList, setIsWhiteList] = useState(true)

    const [currentFrame, setCurrentFrame] = useState(undefined)


    const [points, setPoints] = useState(400)
    const [wallet, setWallet] = useState('')
    const [userUUID, setUserUUID] = useState(undefined)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [ether, setEther] = useState(0)
    const [coin, setCoin] = useState(0)
    const [ewc, setEWC] = useState(0)
    const [swId, setSwId] = useState('')
    const [fees, setFees] = useState(0)

    const [exchangeRate, setExchangeRate] = useState(1)
    const [tempCoin, setTempCoin] = useState(0)
    const [tempPoint, setTempPoint] = useState(0)
    

    const [isLogin, setIsLogin] = useState(false)

    const [map, setMap] = useState({url : undefined})
    useEffect(() => {

        setTimeout(() => {
            fetch('https://erugo-world-api.appzero.services/map/download', {
                method:'get',
            })
            .then((res) => { return res.blob() })
            .then((blob) => {
                console.log(blob)
                setMap({
                    url : window.URL.createObjectURL(blob)
                })
            })
            .catch((e) => {
                console.log(e)
            })
        }, 1500)

        readGridColorList({
            callback: (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(res.data)
                    res.data.forEach((d, i) => {
                        if (d.idx === 0) {
                            if (d.image) {

                                fetch('https://erugo-world-api.appzero.services/map/grid-color/download-image', {
                                    method: 'post',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify({ name: d.image })
                                })
                                    .then((res) => {
                                        return res.blob()
                                    })
                                    .then((blob) => {
                                        console.log(blob)
                                        window.notAvailable = {
                                            color: d.color, image: window.URL.createObjectURL(blob)
                                        }
                                    })
                                    .catch((e) => {
                                        console.log(e)
                                    })
                            } else {
                                window.notAvailable = {
                                    color: d.color, image: d.image
                                }
                            }
                        } else if (d.idx === 1) {
                            if (d.image) {

                                fetch('https://erugo-world-api.appzero.services/map/grid-color/download-image', {
                                    method: 'post',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify({ name: d.image })
                                })
                                    .then((res) => {
                                        return res.blob()
                                    })
                                    .then((blob) => {
                                        console.log(blob)
                                        window.selectedGrid = {
                                            color: d.color, image: window.URL.createObjectURL(blob)
                                        }
                                    })
                                    .catch((e) => {
                                        console.log(e)
                                    })
                            } else {
                                window.selectedGrid = {
                                    color: d.color, image: d.image
                                }
                            }
                        } else if (d.idx === 2) {
                            if (d.image) {

                                fetch('https://erugo-world-api.appzero.services/map/grid-color/download-image', {
                                    method: 'post',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify({ name: d.image })
                                })
                                    .then((res) => {
                                        return res.blob()
                                    })
                                    .then((blob) => {
                                        console.log(blob)
                                        window.myHighestBid = {
                                            color: d.color, image: window.URL.createObjectURL(blob)
                                        }
                                    })
                                    .catch((e) => {
                                        console.log(e)
                                    })
                            } else {
                                window.myHighestBid = {
                                    color: d.color, image: d.image
                                }
                            }
                        } else if (d.idx === 3) {
                            if (d.image) {

                                fetch('https://erugo-world-api.appzero.services/map/grid-color/download-image', {
                                    method: 'post',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify({ name: d.image })
                                })
                                    .then((res) => {
                                        return res.blob()
                                    })
                                    .then((blob) => {
                                        console.log(blob)
                                        window.myNotHighestBid = {
                                            color: d.color, image: window.URL.createObjectURL(blob)
                                        }
                                    })
                                    .catch((e) => {
                                        console.log(e)
                                    })
                            } else {
                                window.myNotHighestBid = {
                                    color: d.color, image: d.image
                                }
                            }
                        } else if (d.idx === 4) {
                            if (d.image) {

                                fetch('https://erugo-world-api.appzero.services/map/grid-color/download-image', {
                                    method: 'post',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify({ name: d.image })
                                })
                                    .then((res) => {
                                        return res.blob()
                                    })
                                    .then((blob) => {
                                        console.log(blob)
                                        window.pickOnList = {
                                            color: d.color, image: window.URL.createObjectURL(blob)
                                        }
                                    })
                                    .catch((e) => {
                                        console.log(e)
                                    })
                            } else {
                                window.pickOnList = {
                                    color: d.color, image: d.image
                                }
                            }
                        }
                    })
                }
            }
        })

        checkMyIp({
            callback: (err, myIp) => {
                if (err) {
                    console.log(err)
                } else {
                    allowedIp({
                        ip: myIp,
                        callback: (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(res)
                                setIsWhiteList(res.whiteList)
                            }
                        }
                    })
                }
            }
        })

        getMyLandOpen({
            callback: (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    if (res.isOpen === 'yes') {
                        setMyLandOpen(true)
                    }
                    getLanguageData({
                        callback: (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(res)
                                setLanguage(res.language)
                            }
                        }
                    })
                }
            }
        })

        if (sessionStorage.getItem('userUUID')) {
            console.log('기존 세션 스토리지를 업데이트 합니다.')
            let uuid = sessionStorage.getItem('userUUID')
            let wallet = sessionStorage.getItem('wallet')
            setUserUUID(uuid)
            setWallet(wallet)
            
            readInfo({
                uuid : uuid,
                callback : (err, user) => {
                    if(err) {
                        console.log(err)
                    } else {
                        if(user.result === 'success') {
                            let coin = user.userInfo.coin
                            let ether = user.userInfo.ethAmount
                            let ewc = user.userInfo.ewc
                            let phone = user.userInfo.phone
                            let name = user.userInfo.name
                            let email = user.userInfo.email
                            let swId = user.userInfo.swId
                            let point = user.userInfo.point
                            let fees = user.userInfo.fees
                            let exchangeRate = user.userInfo.exchangeRate
                            setCoin(coin)
                            setEther(ether)
                            setEWC(ewc)
                            setPhone(phone)
                            setName(name)
                            setEmail(email)
                            setSwId(swId)
                            setPoints(point)
                            setFees(fees)
                            setExchangeRate(exchangeRate)
                            setIsLogin(true)
                        }
                    }
                }
            })
        } else {
            console.log('기존 세션 스토리지가 없습니다.')
        }
    }, [])

    return (
        <div className={classNames(Style['background'])} >
            <Switch>
                <Route path="/land-state">
                    <LandStatePage
                        menubar={
                            <Menu
                                hideButton={true}
                                points={points}
                                language={language}
                                myLandOpen={myLandOpen}
                                onClick={setCurrentFrame}
                            />
                        }
                        setLoading={setLoading}
                        setLoadingMsg={setLoadingMsg}
                        points={points}
                        setPoints={setPoints}
                        userUUID={userUUID}
                    />
                </Route>
                <Route path="/land">
                    <Land menubar={<Menu points={points} language={language} myLandOpen={myLandOpen} />} footer={<Footer />} />
                </Route>
                <Route path="/mail-box">
                    {isWhiteList ? <MailBox menubar={<Menu points={points} language={language} myLandOpen={myLandOpen} />} footer={<Footer />} /> : <HomePage2 />}
                </Route>
                <Route path="/home">
                    {isWhiteList ? <HomePage menubar={<Menu points={points} language={language} myLandOpen={myLandOpen} />} footer={<Footer />} /> : <HomePage2 />}
                </Route>
                <Route path="/my-land">
                    {isWhiteList ? <MyLandPage userUUID={userUUID} menubar={<Menu points={points} language={language} myLandOpen={myLandOpen} />} footer={<Footer />} /> : <HomePage2 />}
                </Route>
                <Route path="/auction">
                    {
                        isWhiteList ?
                            <AuctionPage
                                menubar={
                                    <Menu
                                        points={points}
                                        language={language}
                                        myLandOpen={myLandOpen}
                                        onClick={setCurrentFrame}
                                    />
                                }
                                setLoading={setLoading}
                                setLoadingMsg={setLoadingMsg}
                                points={points}
                                setPoints={setPoints}
                                userUUID={userUUID}
                                map={map}
                            />
                            :
                            <HomePage2 />
                    }
                </Route>
                <Route path="/my">
                    {isWhiteList ?
                        <MyPage
                            menubar={<Menu points={points} language={language} myLandOpen={myLandOpen} />}
                            footer={<Footer />}
                            userUUID={userUUID}
                            points={points}
                            walletAddress={wallet}
                            setPoints={setPoints}
                            setLoading={setLoading}
                            setUserUUID={setUserUUID}
                            email={email}
                            name={name}
                            phone={phone}
                            ether={ether}
                            coin={coin}
                            exchangeRate={exchangeRate}
                            tempCoin={tempCoin}
                            tempPoint={tempPoint}

                            setTempCoin={setTempCoin}
                            setTempPoint={setTempPoint}
                            setEmail={setEmail}
                            setName={setName}
                            setPhone={setPhone}
                            setEther={setEther}
                            setCoin={setCoin}
                            setExchangeRate={setExchangeRate}
                        />
                        :
                        <HomePage2 />
                    }
                </Route>
                <Route path="/view-detail">
                    {isWhiteList ? <ViewDetailPage menubar={<Menu points={points} language={language} myLandOpen={myLandOpen} />} footer={<Footer />} /> : <HomePage2 />}
                </Route>
                <Route path="/login" >
                    {
                        isWhiteList ?
                            <LoginPage
                                setUserUUID={setUserUUID}
                                setPoints={setPoints}
                                setWallet={setWallet}
                                setLoading={setLoading}
                            />
                            :
                            <HomePage2 />
                    }
                </Route>
                <Route path="/reset-password">
                    {isWhiteList ? <ResetPassword setLoading={setLoading} setLoadingMsg={setLoadingMsg} /> : <HomePage2 />}
                </Route>
                <Route path="/sign-up">
                    {
                        isWhiteList ?
                            <SignUp
                                setLoading={setLoading}
                                setLoadingMsg={setLoadingMsg}
                                setCurrentFrame={setCurrentFrame}
                            />
                            :
                            <HomePage2 />
                    }
                </Route>
                <Route path="/bid-list">
                    {
                        isWhiteList ?
                            <BidList
                                menubar={
                                    <Menu
                                        points={points}
                                        language={language}
                                        myLandOpen={myLandOpen}
                                        onClick={setCurrentFrame}
                                    />
                                }
                                footer={<Footer />}
                                userUUID={userUUID}
                            />
                            :
                            <HomePage2 />
                    }
                </Route>
                <Route path="/highest-bid">
                    {
                        isWhiteList ?
                            <HighestBid
                                menubar={
                                    <Menu
                                        points={points}
                                        language={language}
                                        myLandOpen={myLandOpen}
                                        onClick={setCurrentFrame}
                                    />
                                }
                                footer={<Footer />}
                                userUUID={userUUID}
                            />
                            :
                            <HomePage2 />
                    }
                </Route>
                <Route path="/main-entrance">
                    {
                        isWhiteList
                            ?
                            <MainEntrance
                                currentFrame={currentFrame}
                                setCurrentFrame={setCurrentFrame}
                                setUserUUID={setUserUUID}
                                setLoading={setLoading}
                                setWallet={setWallet}
                                setPoints={setPoints}
                                points={points}
                                userUUID={userUUID}
                                walletAddress={wallet}

                                email={email}
                                name={name}
                                phone={phone}
                                ether={ether}
                                coin={coin}
                                ewc={ewc}
                                swId={swId}
                                exchangeRate={exchangeRate}
                                tempCoin={tempCoin}
                                tempPoint={tempPoint}

                                setTempCoin={setTempCoin}
                                setTempPoint={setTempPoint}
                                setEmail={setEmail}
                                setName={setName}
                                setPhone={setPhone}
                                setEther={setPhone}
                                setCoin={setCoin}
                                setEWC={setEWC}
                                setSwId={setSwId}
                                setExchangeRate={setExchangeRate}

                                language={language}
                                setLanguage={setLanguage}
                                languageCode={languageCode}
                                setLanguageCode={setLanguageCode}

                                fees={fees}
                                setFees={setFees}

                                setIsLogin={setIsLogin}
                                isLogin={isLogin}
                            />
                            :
                            <HomePage2 />
                    }
                </Route>
                <Route path="/xt-test">
                    <XTTest />
                </Route>
                <Route path="/" >
                    <HomePage2 />
                </Route>
                
            </Switch>
            <div
                style={{
                    width: '100vw', height: '100vh',
                    position: 'absolute', top: '0', left: '0',
                    display: loading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.9)', flexDirection: 'column'
                }}
            >
                <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '-200px' }}><Loader color={'#E27A18'} size={50} /></div>
                <h4 style={{ padding: '30px', color: '#E27A17' }}>{loadingMsg}</h4>
            </div>
            <div style={{ width: '0', height: '0', overflow: 'hidden' }}>

                <div style={{ backgroundImage: 'url(/images/frame/lobby.jpeg)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/drone.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/plant.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/top-menu.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/logo.png)' }}></div>

                <div style={{ backgroundImage: 'url(/images/frame/top-button/about.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/top-button/auction.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/top-button/button0.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/top-button/buyland.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/top-button/home.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/top-button/log-in.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/top-button/market.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/top-button/my-page.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/top-button/sign-up.png)' }}></div>

                <div style={{ backgroundImage: 'url(/images/frame/frame/about.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/frame/auction.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/frame/buy-land.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/frame/home.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/frame/login.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/frame/market.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/frame/mypage.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/frame/frame/signup.png)' }}></div>

                <div style={{ backgroundImage: 'url(/images/detail-frame/about.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/detail-frame/auction.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/detail-frame/buyland.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/detail-frame/home.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/detail-frame/login.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/detail-frame/market.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/detail-frame/signup.png)' }}></div>
                <div style={{ backgroundImage: 'url(/images/detail-frame/mypage.png)' }}></div>
            </div>
        </div>
    )
}

export default App