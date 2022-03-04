import React from 'react'
import Style from './style.module.css'
import classNames from 'classnames'
import { Route, Switch, useHistory } from 'react-router-dom'


const MyLandMenu = () => {
    const history = useHistory()
    return (
        <div style={{ width: '100%', height: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className={classNames(Style['map-wrapper'])}>
            </div>
            <div className={classNames(Style['menu'])}>
                <div className={classNames(Style['menu-item'])} onClick={() => { history.push('/land/sell-in-market') }}>
                    1. 선택 Land 마켓에서 판매하기
                </div>
                <div className={classNames(Style['menu-item'])} onClick={() => { history.push('/land/through-auction') }}>
                    2. 선택 Land로 경매하기
                </div>
                <div className={classNames(Style['menu-item'])} onClick={() => { history.push('/land/on-selling') }}>
                    3. 판매 및 경매중인 내용 보기
                </div>
            </div>
        </div>
    )
}

const SellInMarket = () => {
    return (
        <div style={{ width: '100%', height: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
                width: '400px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: "space-evenly", alignItems: 'flex-start', border: '1px solid gray',
                padding: '10px 20px', borderRadius: '15px'
            }}>
                <div>판매하려는 Land : 5개</div>
                <div>판매가격 <input type="text" /></div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><div style={{ width: '120px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid gray', fontSize: '12px' }}>판매 등록하기</div></div>
            </div>
        </div>
    )
}

const ThroughAuction = () => {
    return (
        <div style={{ width: '100%', height: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
                width: '400px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: "space-evenly", alignItems: 'flex-start', border: '1px solid gray',
                padding: '10px 20px', borderRadius: '15px'
            }}>
                <div>경매하려는 Land : 5개</div>
                <div>최소가격 <input type="text" /></div>
                <div>입찰마감 <input type="date" min={'2021-10-29'} /></div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><div style={{ width: '120px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid gray', fontSize: '12px' }}>경매 등록하기</div></div>
            </div>
        </div >
    )
}

const OnMarketSelling = () => {
    return (
        <div
            className='pointer'
            style={{
                width: '100%', height: '40px', border: '1px solid gray', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: '12px', marginTop: '20px'
            }}
        >
            <div
                style={{ width: '200px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >마켓 판매</div>
            <div
                style={{ width: '200px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >Land 5개</div>
            <div
                style={{ width: '200px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >판매가 200P</div>
            <div
                style={{ width: '200px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >등록일 2021. 10. 10</div>
        </div>
    )
}

const Applicant = () => {
    return (
        <div
            className='pointer'
            style={{
                width: '100%', height: '40px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: '12px', backgroundColor: 'rgba(0,0,0,0.2)'
            }}
        >
            <div
                style={{ width: '200px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >User00</div>
            <div
                style={{ width: '300px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >응찰가 300P</div>
            <div
                style={{ width: '300px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >응찰일 2021. 10. 10</div>
        </div>
    )
}

const OnAuctionSelling = ({ applicants }) => {
    return (
        <React.Fragment>
            <div
                className='pointer'
                style={{
                    width: '100%', height: '40px', border: '1px solid gray', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '20px', fontSize: '12px'
                }}
            >
                <div
                    style={{ width: '100px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >옥션 판매</div>
                <div
                    style={{ width: '100px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >Land 5개</div>
                <div
                    style={{ width: '200px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >최소가 240P</div>
                <div
                    style={{ width: '200px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >마감일 2021. 10. 10</div>
                <div
                    style={{ width: '200px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >등록일 2021. 10. 10</div>
            </div>
            {applicants}
        </React.Fragment>
    )
}

const OnSelling = () => {
    return (
        <div style={{ width: '840px', padding: '20px', margin: 'auto', height: '100%' }}>
            <OnMarketSelling />
            <OnAuctionSelling applicants={[<Applicant />, <Applicant />]} />
            <OnAuctionSelling applicants={[<Applicant />]} />
            <OnMarketSelling />
            <OnAuctionSelling applicants={[<Applicant />, <Applicant />]} />
            <OnAuctionSelling applicants={[<Applicant />, <Applicant />, <Applicant />]} />
            <OnMarketSelling />
            <OnMarketSelling />
        </div>
    )
}

const Land = ({ menubar, footer }) => {
    const history = useHistory()
    return (
        <div>
            {menubar}
            <div className={classNames(Style['body'])}>
                <Switch>
                    <Route path="/land/on-selling">
                        <OnSelling />
                    </Route>
                    <Route path="/land/through-auction"><ThroughAuction /></Route>
                    <Route path="/land/sell-in-market"><SellInMarket /></Route>
                    <Route path="/land"><MyLandMenu /></Route>
                </Switch>
            </div>
            {footer}
        </div>
    )
}

export default Land