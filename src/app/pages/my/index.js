import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Style from './my.module.css'

import { RiExchangeLine, RiArrowRightSLine } from 'react-icons/ri'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'
import { readInfo } from '../../api'

import { requestLogin, reqWithdrawCoin } from '../../api'
/**
 * 
 * id: jungsu226@naver.com
 * pw: 734800
 * 
 * 
 */
const Input = ({ tag, inputElement = null, type = "text", style = {}, value, onChange, customEle }) => {
    return (
        <div style={{ width: '100%', height: '80px', display: 'flex', justifyContent: 'center', flexDirection: 'column', fontSize: '12px' }}>
            <div style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: 'rgb(225, 122, 24)' }}>{tag}</div>
                <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>{customEle}</div>
            </div>
            <div style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    inputElement ? inputElement :
                        <input
                            className={Style['input']}
                            type={type}
                            style={{ width: '100%', height: '100%', padding: '10px', borderRadius: '4px', ...style }}
                            value={value}
                            onChange={
                                (e) => {
                                    if (onChange && typeof onChange === 'function') {
                                        onChange(e.target.value)
                                    }
                                }
                            }
                        />
                }
            </div>
        </div>
    )
}
const Splitter = ({ color, width, height }) => {
    return (
        <div style={{ width: '100%', borderTop: `${width} solid ${color}`, marginTop: height, marginBottom: height }}></div>
    )
}
const DataRow = ({ tag, children }) => {
    return (
        <div
            style={{
                width: '100%', height: '70px', fontSize: '12px'
            }}
        >
            <div
                style={{ width: '100%', height: '30px', display: 'flex', justifyContent: "flex-start", alignItems: 'center' }}
            >
                <div style={{ width: '100px', height: '100%', backgroundColor: '#e17a18', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}>{tag}</div>
            </div>
            <div
                style={{ 
                    width: '100%', height: '40px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', border: '1px solid #e17a18', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', paddingLeft: '20px', overflow: 'hidden',
                    backgroundColor:'white'
                }}
            >
                {children}
            </div>
        </div>
    )
}

const MyPage = ({ 
    menubar, footer, points, setPoints, userUUID, walletAddress, setLoading, setUserUUID, 
    setExchangeRate, exchangeRate, setCoin, coin, setEmail, email, setName, name, setPhone, phone, setEther, ether,
    setTempPoint, setTempCoin, tempPoint, tempCoin
}) => {

    const history = useHistory()

    const [showPopup, setShowPopup] = useState(false)
    /*
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [ether, setEther] = useState(0)
    const [coin, setCoin] = useState(0)
    const [exchangeRate, setExchangeRate] = useState(1)

    const [tempCoin, setTempCoin] = useState(0)
    const [tempPoint, setTempPoint] = useState(0)
    */

    const [tempP, setTempP] = useState('')

    useEffect(() => {
        console.log('new create....')
        /*
        if (sessionStorage.getItem('userUUID')) {
            console.log('exist session storage : ' + sessionStorage.getItem('userUUID'))
            readInfo({
                uuid: sessionStorage.getItem('userUUID'),
                callback: (err, response) => {
                    if (err) {
                        history.push('/login')
                        window.alert('사용자 정보를 불러오는 데 실패하였습니다. 관리자에게 문의 바랍니다.')
                    } else {
                        console.log(response.userInfo )
                        setExchangeRate(response.userInfo.exchangeRate)
                        setEther(Number(response.userInfo.ethAmount))
                        setCoin(Number(response.userInfo.coin))
                        setEmail(response.userInfo.email)
                        setName(response.userInfo.name)
                        setPhone(response.userInfo.phone)

                        setTempCoin(Number(response.userInfo.coin))
                        setTempPoint(Number(response.userInfo.coin) * response.userInfo.exchangeRate)
                        setPoints(response.userInfo.point)
                        setLoading(false)
                    }
                }
            })
        }else{
            console.log('no userUUID session storage')
        }*/
    }, [])
    return (
        <div className={classNames(Style['background'])}>
            {menubar}
            <div className={classNames(Style['body'])}>
                <div className={classNames(Style['body-inner-wrapper'])} style={{padding:'0 15px'}}>
                    <div style={{ width: '400px' }} >
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
                            <DataRow tag={'Email'} >{email}</DataRow>
                            <DataRow tag={'Phone'} >{phone}</DataRow>
                            <DataRow tag={'Name'} >{name}</DataRow>
                            <DataRow tag={'Wallet'} >{walletAddress}</DataRow>
                            <DataRow tag={'Ethereum'} >{ether}</DataRow>
                            <DataRow tag={'Erugo Coin'} >{coin}</DataRow>
                            <DataRow tag={'Point'} >{points}</DataRow>
                        </div>
                    </div>
                    <Splitter color={'#e17a18'} width={'1px'} height={'30px'} />
                    <div style={{ width: '100%' }}>
                        <div style={{ width: '100%', padding: '0 0 30px 0', fontSize: '12px', fontWeight: 'bold', color: '#e17a18', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            {`Current Exchange Rate : 1 Erugo Coin = ${exchangeRate} Point`}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: "flex-start", gap: '20px' }}>
                            <DataRow tag={'Point'} >
                                <input
                                    type="number"
                                    style={{
                                        width: '100%', height: '100%', border: '0px solid white', paddingRight: '10px', textAlign: 'right', fontSize: '12px'
                                    }}
                                    value={tempPoint}
                                    max={coin * exchangeRate}
                                    min={0}
                                    step={exchangeRate}
                                    onChange={
                                        (e) => {
                                            setTempCoin((Number(e.target.value) / exchangeRate))
                                            setTempPoint((Number(e.target.value)))
                                        }
                                    }
                                />
                            </DataRow>
                            <div style={{ width: '40px', height: '100%', display: 'flex', justifyContent: "center", alignItems: "flex-end" }}>
                                <RiExchangeLine
                                    color="#e17a18"
                                    fontSize={'80px'}
                                />
                            </div>
                            <DataRow tag={'Erugo Coin'} >
                                <input
                                    type="number"
                                    style={{
                                        width: '100%', height: '100%', border: '0px solid white', paddingRight: '10px', textAlign: 'right', fontSize: '12px'
                                    }}
                                    value={tempCoin}
                                    max={coin}
                                    min={0}
                                    step={1}
                                    onChange={
                                        (e) => {
                                            setTempCoin((Number(e.target.value)))
                                            setTempPoint((Number(e.target.value) * exchangeRate))
                                        }
                                    }
                                />
                            </DataRow>
                            <div style={{ width: '40px', height: '100%', display: 'flex', justifyContent: "center", alignItems: "flex-end" }}>
                                <RiArrowRightSLine color="#e17a18" fontSize={'80px'} />
                            </div>
                            <DataRow tag={'Remainder'} >
                                <input
                                    type="number"
                                    style={{
                                        width: '100%', height: '100%', border: '0px solid white', paddingRight: '10px', textAlign: 'right', fontSize: '12px'
                                    }}
                                    value={(coin - tempCoin)}
                                    max={coin}
                                    min={0}
                                    step={1}
                                    onChange={
                                        (e) => {
                                            setTempCoin((coin - Number(e.target.value)))
                                            setTempPoint(((coin - Number(e.target.value)) * exchangeRate))
                                        }
                                    }
                                />
                            </DataRow>
                        </div>
                        <div style={{ width: '100%', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div
                                className="pointer"
                                style={{
                                    width: '160px', height: '40px', border: '1px solid #e17a18', display: 'flex', 
                                    justifyContent: "center", alignItems: "center", fontSize: '12px', color: '#e17a18', borderRadius: '10px',
                                    backgroundColor:'white'
                                }}
                                onClick={
                                    () => {
                                        setShowPopup(true)
                                    }
                                }
                            >
                                Exchange
                            </div>
                        </div>
                    </div>

                    <div style={{width:'100%', height:'80px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/*
                            <div
                                style={{
                                    width: '160px', height: '40px', border: '1px solid #e17a18', display: 'flex', justifyContent: "center", alignItems: "center", fontSize: '12px', color: '#e17a18', borderRadius: '10px'
                                }}
                                onClick={
                                    () => {

                                    }
                                }
                            >
                                활동정지
                            </div>*/}
                            <div
                                className="pointer"
                                style={{
                                    width: '160px', height: '40px', border: '1px solid #e17a18', display: 'flex', justifyContent: "center", alignItems: "center", fontSize: '12px', color: '#e17a18', borderRadius: '10px'
                                }}
                                onClick={
                                    () => {
                                        setUserUUID(undefined)
                                        sessionStorage.removeItem('userUUID')
                                        sessionStorage.removeItem('walletAddress')
                                    }
                                }
                            >
                                로그아웃
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {footer}
            <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: '0', left: '0', backgroundColor: 'rgba(255,255,255,0.3)', display: showPopup ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }}>
                <div
                    style={{
                        width: '300px', backgroundColor: 'white', borderRadius: '20px',
                        background: 'rgba( 255, 255, 255, 0.25 )', boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', backdropFilter: 'blur( 4px )', WebkitBackdropFilter: 'blur( 4px )',
                        border: '1px solid rgba( 255, 255, 255, 0.18 )', padding: '30px 10px 10px 10px', position:'relative'
                    }}
                >
                    <Input
                        tag={'Password'}
                        type={'password'}
                        value={tempP}
                        onChange={
                            (p) => {
                                setTempP(p)
                            }
                        }
                    />
                    <div style={{ width: '100%', height: '80px', display: 'flex', justifyContent:'center', alignItems: "center" }}>
                        <div
                            className="pointer"
                            style={{
                                width: '100px', height: '40px', border: '1px solid #e17a18', display: 'flex', justifyContent: "center", alignItems: "center", fontSize: '12px', backgroundColor: '#e17a18', borderRadius: '10px', color:'white'
                            }}
                            onClick={
                                () => {
                                    setLoading(true)
                                    requestLogin({
                                        email, password:tempP, 
                                        callback:(err, response) => {
                                            if(err){
                                                setShowPopup(false)
                                                setLoading(false)
                                                console.log(err)
                                            }else{
                                                if(response.result === 'success'){
                                                    reqWithdrawCoin({
                                                        uuid:userUUID,
                                                        coin:tempCoin,
                                                        callback:(err, response) => {
                                                            setShowPopup(false)
                                                            setLoading(false)
                                                            if(err){
                                                                console.log(err)
                                                            }else{
                                                                if(response.result === 'success' && response.data.result === true){
                                                                    /*734800*/
                                                                    console.log(response)
                                                                    setTempP('')
                                                                    setTempPoint(response.data.balance * exchangeRate)
                                                                    setTempCoin(response.data.balance)
                                                                    setCoin(response.data.balance)
                                                                    setPoints(response.data.point)
                                                                }
                                                            }
                                                        }
                                                    })
                                                }else{
                                                    setShowPopup(false)
                                                    setLoading(false)
                                                    console.log(response)
                                                }
                                            }
                                        }
                                    })
                                }
                            }
                        >
                            Confirm
                        </div>
                    </div>
                    <div style={{ position:'absolute', top:'10px', right:'10px' }}>
                        <AiFillCloseCircle 
                        className="pointer"
                        fontSize={'20px'} 
                        color="#e17a18"
                        onClick={
                            () => {
                                setShowPopup(false)
                            }
                        }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPage