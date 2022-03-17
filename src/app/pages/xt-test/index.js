import React, { useEffect, useState } from 'react'
import md5 from 'md5'
import { ImCheckboxChecked } from 'react-icons/im'
import { createConfirmRequest, readConfirmRequestList } from '../../api'

const Rows = ({ hash, ewc, date, confirm = false }) => {
    return (
        <>
            <div
                style={{
                    width: '600px', height: '40px', margin: '10px 0', border: '1px solid #0039cb', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#0039cb', padding: '0 30px'
                }}
            >
                <div style={{ color: '#0039cb', width:'50%', display:'flex', justifyContent:'center', alignItems:'center' }}>{hash}</div>
                <div style={{ color: '#0039cb', width:'15%', display:'flex', justifyContent:'center', alignItems:'center' }}>{ewc}ewc</div>
                <div style={{ color: '#0039cb', width:'15%', display:'flex', justifyContent:'center', alignItems:'center' }}>{date}</div>
                <div style={{ color: '#0039cb', width:'10%', display:'flex', justifyContent:'center', alignItems:'center' }}><ImCheckboxChecked color={confirm ? 'green' : 'gray'} fontSize={'18px'} /></div>
            </div>
        </>
    )
}

const XTTest = () => {
    const [transactionHash, setTransactionHash] = useState('')
    const [testData, setTestData] = useState([])
    const rows = []
    testData.forEach((data, idx) => {
        rows.push(
            <Rows
                date={data.requestTime.split('T')[0]}
                ewc={data.ewc}
                confirm={data.confirm === 'yes' ? true : false}
                hash={data.transactionHash}
            />
        )
    })
    useEffect(() => {
        readConfirmRequestList({
            user:sessionStorage.getItem('userUUID'),
            callback:(err, res) => {
                if(err) {
                    console.log(err)
                } else {
                    setTestData(res.data)
                }
            }
        })
    }, [])
    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: 'white', padding: '20px', margin: '0' }}>
            <div style={{padding:'20px'}}>
                Temp Hash : {md5(`erugo-${(new Date()).getTime()}`)}
            </div>
            <div style={{ width: '600px', padding: '10px', border: '1px solid black', borderRadius: '4px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px' }}>
                <input
                    style={{
                        width: '300px', fontSize: '14px', height: '40px', paddingLeft: '10px'
                    }}
                    placeholder="Set Transaction Hash"
                    type="text"
                    value={transactionHash}
                    onChange={
                        (e) => {
                            setTransactionHash(e.target.value)
                        }
                    }
                />
                <div
                    className='pointer'
                    style={{
                        width: '200px', height: '40px', backgroundColor: '#2962ff', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', color: 'white', fontWeight: 'bold'
                    }}
                    onClick={
                        () => {
                            createConfirmRequest({
                                transactionHash:transactionHash,
                                user:sessionStorage.getItem('userUUID'),
                                callback:(err, res) => {
                                    if(err){
                                        console.log(err)
                                    }else{
                                        setTestData(res.data)
                                    }
                                }
                            })
                        }
                    }
                >
                    Confirm Request
                </div>
            </div>
            <div style={{ width: '100%', marginTop:'50px' }}>
                <div style={{ width: '100%', height: '40px', display: 'flex', alignItems: 'center', justifyContent: "flex-start" }}>
                    <h6>입금내역</h6>
                </div>
                {rows}
            </div>
        </div>
    )
}
/*
erugoworld@naver.com : 0xd604c42bfad7b52f25f815af096f42cb8f90ca06
erugo0265@naver.com : 0xb8 ~ 38d  ( 2022-03-03 12:44:58 2022-03-03 12:45:51)

*/
export default XTTest