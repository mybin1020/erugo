import React, { useEffect, useState } from 'react'
import Style from './style.module.css'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { getGridInfo, getMailList, proposalAccept } from '../../api'

const TableItem = ({ index, type, title, date, sender, onClickHandler }) => {
    return (
        <div
            className='pointer'
            style={{
                width: '100%', height: '50px', display: 'flex', justifyContent: "flex-start", alignItems: "center", fontSize: '12px',
                borderBottom: '1px solid gray'
            }}
            onClick={
                () => {
                    if (onClickHandler && typeof onClickHandler === 'function') {
                        onClickHandler({ index: index - 1 })
                    }
                }
            }
        >
            <div style={{ width: '10%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{index}</div>
            <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{title}</div>
            <div style={{ width: '30%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{date}</div>
            <div style={{ width: '10%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{sender}</div>
        </div>
    )
}

const TableHeader = () => {
    return (
        <div
            style={{
                width: '100%', height: '40px', display: 'flex', justifyContent: "flex-start", alignItems: "center", fontSize: '12px',
                backgroundColor: '#e17a18', color: 'white'
            }}
        >
            <div style={{ width: '10%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>순서</div>
            <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>제목</div>
            <div style={{ width: '30%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>날짜</div>
            <div style={{ width: '10%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>보낸이</div>
        </div>
    )
}
const ViewDetail = ({ title, sender, registerTime, msg, onCloseHandler, msgType, msgRef, showDetail, userUUID }) => {
    const tbIndex = msgRef.split(':')[0]
    const proposal = `${msgRef.split(':')[1]}:${msgRef.split(':')[2]}`
    const price = msgRef.split(':')[3]
    const [grid, setGrid] = useState({ gridX: undefined, gridY: undefined, blockX: undefined, blockY: undefined })
    const history = useHistory()
    useEffect(() => {
        console.log(userUUID)
    }, [])
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255,255,255, 0.4)', position: 'absolute', top: '0', left: "0", display: showDetail ? 'flex' : 'none', justifyContent: 'center',
                alignItems: 'center', fontSize: '12px'
            }}
        >
            <div style={{ width: '600px', height: 'calc(100% - 200px)', backgroundColor: 'white', border: '1px solid #e17a18' }}>
                <div style={{ width: '100%', height: '50px', borderBottom: '1px solid #e17a18', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '20px' }}>
                    {title}
                </div>
                <div style={{ width: '100%', height: '50px', display: 'flex', justifyContent: "center", alignItems: 'center', borderBottom: '1px solid #e17a18' }}>
                    <div style={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: "flex-start", paddingLeft: '20px' }}>{sender}</div>
                    <div style={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: "flex-start", paddingLeft: '20px' }}>{registerTime}(UTC)</div>
                </div>
                <div style={{ width: '100%', height: 'calc(100% - 180px)', padding: '20px' }}>

                    {msg}
                    {msgType === 'receive proposal' ? <div>Price : {price}</div> : undefined}
                    {msgType === 'receive proposal' ?
                        <div
                            className='pointer'
                            style={{ width: '100px', heigh: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: '#e17a18', marginTop: '4px' }}
                            onClick={
                                () => {

                                    if (tbIndex) {
                                        getGridInfo({
                                            tbIndex,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log('result')
                                                    console.log(response.gridInfo)
                                                    setGrid({
                                                        gridX: response.gridInfo.gridX,
                                                        gridY: response.gridInfo.gridY,
                                                        blockX: response.gridInfo.blockX,
                                                        blockY: response.gridInfo.blockY
                                                    })
                                                    history.push(`/land-state?blockX=${response.gridInfo.blockX}&blockY=${response.gridInfo.blockY}&gridX=${response.gridInfo.gridX}&gridY=${response.gridInfo.gridY}`)
                                                }
                                            }
                                        })
                                    }
                                }
                            }
                        >
                            Go To Land
                        </div> : undefined}
                    {msgType === 'receive proposal' ?
                        <div
                            className='pointer' style={{ width: '100px', heigh: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: '#e17a18', marginTop: '4px' }}
                            onClick={
                                () => {
                                    proposalAccept({
                                        oldOwner: userUUID,
                                        newOwner: proposal,
                                        tbIndex: tbIndex,
                                        price: price,
                                        callback: (err, response) => {
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log(response)
                                            }
                                        }
                                    })
                                }
                            }
                        >
                            OK
                        </div> : undefined}
                </div>
                <div className='pointer' style={{ width: '100%', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                        className='pointer'
                        style={{
                            width: '120px', height: '25px', backgroundColor: '#e17a18', borderRadius: '10px', color: 'white', fontSize: '12px', display: 'flex',
                            justifyContent: 'center', alignItems: 'center'
                        }}
                        onClick={
                            () => {
                                if (onCloseHandler && typeof onCloseHandler === 'function') {
                                    onCloseHandler()
                                }
                            }
                        }
                    >
                        확인
                    </div>
                </div>
            </div>
        </div>
    )
}
const MailBox = ({ menubar, footer, userUUID }) => {
    const [list, setList] = useState([])
    const [showDetail, setShowDetail] = useState(false)
    const [detailMsgIdx, setDetailMsgIdx] = useState(0)
    let mailTable = []
    list.forEach((mail, idx) => {
        mailTable.push(
            <TableItem
                index={idx + 1} title={mail.title} date={mail.registerTime} sender={mail.sender} key={`${idx}`}
                onClickHandler={
                    ({ index }) => {
                        setShowDetail(true)
                        setDetailMsgIdx(index)
                    }
                }
            />
        )
    })
    useEffect(() => {
        if (window.sessionStorage.getItem('userUUID')) {
            getMailList({
                uuid: window.sessionStorage.getItem('userUUID'),
                callback: (err, response) => {
                    if (err) {
                        console.log(err)
                    } else {
                        setList(response.list)
                    }
                }
            })
        }
    }, [])
    return (
        <React.Fragment>
            <div className={classNames(Style['view-box'])} style={{ height: '100%' }}>
                {menubar}
                <div className={classNames(Style['body'])} style={{ height: '100%' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ height: '100%', overflowY: 'auto', width: '100%', padding: '15px', backgroundColor: 'white' }}>
                            <TableHeader />
                            {mailTable}
                        </div>
                    </div>
                </div>
                {footer}
            </div>
            <ViewDetail
                showDetail={showDetail}
                onCloseHandler={
                    () => {
                        setShowDetail(false)
                    }
                }
                title={showDetail ? list[detailMsgIdx].title : ''}
                msg={showDetail ? list[detailMsgIdx].msg : ''}
                sender={showDetail ? list[detailMsgIdx].sender : ''}
                registerTime={showDetail ? list[detailMsgIdx].registerTime : ''}
                msgRef={showDetail ? list[detailMsgIdx].msgRef : ''}
                msgType={showDetail ? list[detailMsgIdx].msgType : ''}
                userUUID={userUUID}
            />
        </React.Fragment>
    )
}

export default MailBox