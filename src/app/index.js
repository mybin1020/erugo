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
import { allowedIp, checkMyIp, getLanguageData, getMyLandOpen, getPointAmount } from './api'
import BidList from './pages/bid-list';
import HighestBid from './pages/highest-bid';

import Menu from './components/top-menu';
import LandStatePage from './pages/land-state';

/*
const Menu = ({ myLandOpen, language = {} }) => {
    const history = useHistory()
    const isLogin = (sessionStorage.getItem('userUUID') ? true : false)
    return (
        <div style={{ width: '100%', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className={`pointer ${Style['company']}`} onClick={() => { history.push('/main-entrance') }} style={{ width: '350px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: '18px' }}>ERUGO WORLD</div>
                <div className={Style['logo']} style={{ width: '40px', height: '30px' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '30px', paddingRight: '100px', width: 'calc(100% - 350px)', height: '100%' }}>
                {/*
                <div
                    className={'pointer'}
                    key={'buy'}
                    onClick={() => {
                        history.push('/map')
                    }}
                    style={{ width: '122px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', border: '1px solid rgba(112,112,112,1)', borderRadius: '20px' }}
                >
                    BUY LAND
                </div>
                <div
                    className={'pointer'}
                    key={'market'}
                    onClick={() => { history.push('/market') }}
                    style={{ width: '122px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', border: '1px solid rgba(112,112,112,1)', borderRadius: '20px' }}
                >
                    MARKET
                </div>
                *//*
{
!myLandOpen ?
<div
className={'pointer'}
key={'auction'}
onClick={() => { history.push('/auction') }}
style={{ width: '122px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', border: '1px solid rgba(112,112,112,1)', borderRadius: '20px' }}
>
{language['header-auction']}
</div>
: undefined
}
{
!myLandOpen ?
<div
className={'pointer'}
key={'auction'}
onClick={() => { history.push('/highest-bid') }}
style={{ width: '122px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', border: '1px solid rgba(112,112,112,1)', borderRadius: '20px' }}
>
{language['header-highest-bid']}
</div>
: undefined
}
{
isLogin && !myLandOpen ?
<div
className={'pointer'}
key={'auction'}
onClick={() => { history.push('/bid-list') }}
style={{ width: '122px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', border: '1px solid rgba(112,112,112,1)', borderRadius: '20px' }}
>
{language['header-my-bid']}
</div>
: undefined
}
{/*
<div
className={'pointer'}
key={'my-land'}
style={{
width: '32px',
height: '30px'
}}
onClick={
() => {
history.push('/land')
}
}
>
<img src="/images/map-marked-alt-solid.svg" style={{ width: '32px', height: '30px' }} />
</div>
*/
/*
<div
    className={'pointer'}
    key={'mail-box'}
    style={{
        width: '36px',
        height: '30px'
    }}
    onClick={
        () => {
            history.push('/mail-box')
        }
    }
>
    <img src="/images/envelope-regular.svg" style={{ width: '36px', height: '30px' }} />
</div>
{
    myLandOpen && isLogin ?
        <div
            className={'pointer'}
            key={'multi-language-support-icon'}
            style={{
                width: '32px',
                height: '32px'
            }}
            onClick={
                () => {
                    history.push('/my-land')
                }
            }
        >
            <img src="/images/globe-americas-solid.svg" style={{ width: '32px', height: '30px' }} />
        </div>
        : undefined
}
<div
    className={'pointer'}
    key={'account-icon'}
    style={{
        width: '33px',
        height: '33px'
    }}
    onClick={() => {
        if (sessionStorage.getItem('userUUID')) {
            history.push('/my')
        } else {
            history.push('/login')
        }
    }}
>
    <img src={window.sessionStorage.getItem('userUUID') ? "/images/user-circle-solid.svg" : "/images/user-circle-regular.svg"} style={{ width: '33px', height: '33px' }} />
</div>
</div>
</div>
)
}*/
const App = () => {

    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('')

    const [points, setPoints] = useState(400)
    const [wallet, setWallet] = useState('')
    const [userUUID, setUserUUID] = useState(undefined)

    const [language, setLanguage] = useState({})
    const [myLandOpen, setMyLandOpen] = useState(false)

    const [isWhiteList, setIsWhiteList] = useState(true)

    const [currentFrame, setCurrentFrame] = useState(undefined)



    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [ether, setEther] = useState(0)
    const [coin, setCoin] = useState(0)
    const [exchangeRate, setExchangeRate] = useState(1)
    const [tempCoin, setTempCoin] = useState(0)
    const [tempPoint, setTempPoint] = useState(0)

    useEffect(() => {

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
                                setLanguage(res.language.ko)
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
            getPointAmount({
                uuid,
                callback: (err, response) => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (response.result === 'success') {
                            setPoints(response.point)

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
                            setPoints={setPoints}
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
                            setEther={setPhone}
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
                                setExchangeRate={setExchangeRate}
                            />
                            :
                            <HomePage2 />
                    }
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