import React, { useState } from "react";
import classNames from "classnames";
import Style from './login.module.css'
import { SButton, STitle } from '../../components'
import { useHistory } from 'react-router-dom'
import { requestLogin } from '../../api'

const LoginPage = ({ setUserUUID, setLoading, setWallet, setPoints, setCurrentFrame, onClose, isLogin }) => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onKeyPress = (e) => {
        if(e.key === 'Enter'){
            onSignup();
        }
    }
    const onSignup =  () => {
        if (email === undefined || email === '') {
            window.alert('이메일을 입력해 주세요')
            return
        }
        if (password === undefined || password === '') {
            window.alert('비밀번호를 입력해 주세요')
            return
        }
        setLoading(true)
        console.log({ email, password })
        requestLogin({
            email,
            password,
            callback: (err, response) => {
                setEmail('')
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
                        console.log('로그인 성공')
                        console.log(d)
                        setPoints(d.point)
                        setUserUUID(d.uuid)
                        setWallet(d.wallet)
                        sessionStorage.setItem('userUUID', d.uuid)
                        sessionStorage.setItem('wallet', d.wallet)
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
                                width: '400px', height: '300px', backgroundColor: 'yellow', display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column',
                                background: "rgba( 255, 255, 255, 0.4 )", boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )", backdropFilter: "blur( 9px )",
                                WebkitBackdropFilter: "blur( 8px )", borderRadius: "10px", border: "1px solid rgba( 255, 255, 255, 0.18 )", overflow: 'hidden'
                            }}
                        >
                            <div style={{ width: '100%', height: '40px', backgroundColor:'black' }}>
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
                            <div className={Style['sw-btn']}
                                onClick={() => {
                                    history.push("https://www.securitywallet.co.kr/auth/login?gourl=%2Foverview");
                                  }}
                            >
                                Security Wallet 회원가입이 되어있다면 Security Wallet ID로 접속해주세요
                            </div>
                            <div style={{ width: '330px', height: '250px', display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', gap: '20px'}}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '30px', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: 'white', height: '100%', backgroundColor: '#E27A17', paddingRight: '0' }}>Email</div>
                                    <input
                                        style={{ width: 'calc(100% - 80px)', textAlign: 'center', height: '100%', borderWidth: '0', color: '#E27A17', borderRadius: '10px', fontSize: '12px' }}
                                        type="text"
                                        value={email}
                                        // placeholder={'Security Wallet Email과 연동되어 있습니다'}
                                        onChange={
                                            (e) => {
                                                setEmail(e.target.value)
                                            }
                                        }
                                    />
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '30px', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: 'white', height: '100%', backgroundColor: '#E27A17', paddingRight: '0' }}>Password</div>
                                    <input
                                        style={{ width: 'calc(100% - 80px)', textAlign: 'center', height: '100%', borderWidth: '0', color: '#E27A17', borderRadius: '10px', fontSize: '12px' }}
                                        type="password"
                                        value={password}
                                        onKeyPress={onKeyPress}
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
                                        height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', fontSize: '15px', borderRadius: '10px',
                                        backgroundColor: '#E27A17', color: 'white'
                                    }}
                                    onClick={onSignup}
                                >SIGN IN</div>
                            </div>
                            <div style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', backgroundColor: 'white' }}>
                                <div
                                    className={Style["sign-in"]}
                                    style={{
                                        width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '15px', height: '100%'
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
                                        width: '50%', display: 'flex', justifyContent: "center", alignItems: 'center', fontSize: '15px', height: '100%'
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