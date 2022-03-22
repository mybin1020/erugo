import React, { useState } from "react";
import classNames from "classnames";
import Style from './login.module.css'
import { SButton, STitle } from '../../components'
import { useHistory } from 'react-router-dom'
import { readInfo, requestLogin } from '../../api'

const LoginPage = ({ 
    setLoading, 
    
    setUserUUID, 
    setWallet, 
    setPoints, 
    setEmail,
    setName,
    setPhone,
    setCoin,
    setEWC,
    setSwId,
    setEther,

    setCurrentFrame, 
    onClose, 
    isLogin,
    setIsLogin

}) => {
    const history = useHistory()
    const [tempEmail, setTempEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <React.Fragment>
            <div
                style={{
                    width: '100%', height: '100%',
                    backgroundImage: 'url(/images/login-bg.jpeg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'no-repeat',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}
            >
                {
                    isLogin
                        ?
                        <div
                                className="pointer"
                                style={{
                                    width: '160px', height: '40px', border: '1px solid #e17a18', 
                                    display: 'flex', justifyContent: "center", alignItems: "center", 
                                    fontSize: '12px', color: '#e17a18', borderRadius: '10px',
                                    backgroundColor: 'white'
                                }}
                                onClick={
                                    () => {
                                        setUserUUID(undefined)
                                        setIsLogin(false)
                                        sessionStorage.removeItem('userUUID')
                                        sessionStorage.removeItem('walletAddress')
                                        //history.push('/home')
                                    }
                                }
                            >
                                로그아웃
                            </div>
                        :
                        <div
                            style={{
                                width: '400px', height: '280px', backgroundColor: 'yellow', display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column',
                                background: "rgba( 255, 255, 255, 0.4 )", boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )", backdropFilter: "blur( 8px )",
                                WebkitBackdropFilter: "blur( 8px )", borderRadius: "10px", border: "1px solid rgba( 255, 255, 255, 0.18 )", overflow: 'hidden'
                            }}
                        >
                            <div style={{ width: '100%', height: '40px' }}>
                                <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', padding: '10px', height: '100%' }}>
                                    ERUGO WORLD
                                    <div
                                        style={{
                                            width: '20px', height: '20px',
                                            backgroundImage: 'url(/images/logo.jpg)',
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center'
                                        }}
                                    >

                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '300px', height: '220px', display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', gap: '20px' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '30px', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ width: '80px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '12px', color: 'white', height: '100%', backgroundColor: '#E27A17', paddingRight: '20px' }}>Email</div>
                                    <input
                                        style={{ width: 'calc(100% - 80px)', textAlign: 'center', height: '100%', borderWidth: '0', color: '#E27A17', borderRadius: '10px', fontSize: '12px' }}
                                        type="text"
                                        value={tempEmail}
                                        onChange={
                                            (e) => {
                                                setTempEmail(e.target.value)
                                            }
                                        }
                                    />
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '30px', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ width: '80px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '12px', color: 'white', height: '100%', backgroundColor: '#E27A17', paddingRight: '20px' }}>Password</div>
                                    <input
                                        style={{ width: 'calc(100% - 80px)', textAlign: 'center', height: '100%', borderWidth: '0', color: '#E27A17', borderRadius: '10px', fontSize: '12px' }}
                                        type="password"
                                        value={password}
                                        onChange={
                                            (e) => {
                                                setPassword(e.target.value)
                                            }
                                        }
                                    />
                                </div>
                                <div
                                    className="pointer"
                                    style={{
                                        width: '100px',
                                        height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', borderRadius: '10px',
                                        backgroundColor: '#E27A17', color: 'white'
                                    }}
                                    onClick={
                                        () => {
                                            if (tempEmail === undefined || tempEmail === '') {
                                                window.alert('이메일을 입력해 주세요')
                                                return
                                            }
                                            if (password === undefined || password === '') {
                                                window.alert('비밀번호를 입력해 주세요')
                                                return
                                            }
                                            setLoading(true)
                                            requestLogin({
                                                email : tempEmail,
                                                password,
                                                callback: (err, response) => {
                                                    setTempEmail('')
                                                    setPassword('')
                                                    if (err) {
                                                        setLoading(false)
                                                        console.log(err)
                                                    } else {
                                                        if (response.result !== 'success') {
                                                            setLoading(false)
                                                            window.alert('로그인에 실패하였습니다.')
                                                        } else {
                                                            let d = response.userInfo
                                                            console.log(d)
                                                            setUserUUID(d.uuid)
                                                            setWallet(d.wallet)
                                                            sessionStorage.setItem('userUUID', d.uuid)
                                                            sessionStorage.setItem('wallet', d.wallet)
                                                            history.push('/main-entrance')

                                                            readInfo({
                                                                uuid : d.uuid,
                                                                callback : (err, user) => {
                                                                    if(err) {
                                                                        console.log(err)
                                                                    } else {
                                                                        if(user.result === 'success') {
                                                                            console.log(user)
                                                                            let coin = user.userInfo.coin
                                                                            let ether = user.userInfo.ethAmount
                                                                            let ewc = user.userInfo.ewc
                                                                            let phone = user.userInfo.phone
                                                                            let name = user.userInfo.name
                                                                            let email = user.userInfo.email
                                                                            let swId = user.userInfo.swId
                                                                            let point = user.userInfo.point
                                                                            setCoin(coin)
                                                                            setEther(ether)
                                                                            setEWC(ewc)
                                                                            setPhone(phone)
                                                                            setName(name)
                                                                            setEmail(email)
                                                                            setSwId(swId)
                                                                            setPoints(point)
                                                                            setIsLogin(true)
                                                                        }
                                                                    }
                                                                }
                                                            })

                                                            setLoading(false)
                                                            onClose()
                                                            /*
                                                            setTimeout(() => {
                                                                history.push('/main-entrance')
                                                                setCurrentFrame('mypage')
                                                            }, 200)
                                                            */
                                                            //history.push('/my')
                                                        }
                                                    }
                                                }
                                            })
                                        }
                                    }
                                >SIGN IN</div>
                                <span style={{display: 'grid', color: 'white', fontSize: '12px', textShadow: '0px -1px 5px #000'}}><small> ※ Security Wallet 회원정보 공유합니다. <br/> Security Wallet ID로 로그인 하세요</small></span>
                            </div>
                            <div style={{ width: '100%', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', backgroundColor: 'white' }}>
                                <div
                                    className={Style["sign-in"]}
                                    style={{
                                        width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', height: '100%'
                                    }}
                                    onClick={
                                        () => {
                                            history.push('/sign-up')
                                        }
                                    }
                                >
                                    SIGN UP
                                </div>
                                <div
                                    className={Style["reset-password"]}
                                    style={{
                                        width: '50%', display: 'flex', justifyContent: "center", alignItems: 'center', fontSize: '10px', height: '100%'
                                    }}
                                    onClick={
                                        () => {
                                            history.push('/reset-password')
                                        }
                                    }
                                >
                                    RESET PASSWORD
                                </div>
                            </div>
                        </div>
                }
            </div>
        </React.Fragment >
    )
}

export default LoginPage