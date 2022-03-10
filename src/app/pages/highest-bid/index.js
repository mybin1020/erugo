import Reac, { useEffect, useState } from "react"
import Style from './style.module.css'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { getMyBidList, highestBidList, withdrawalBid } from '../../api'

const TableHeader = () => {
    return (
        <div style={{ backgroundColor: 'rgb(226, 121, 22)', width: '800px', height: '40px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '14px', width: '25%' }}>Max Bid Price</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '14px', width: '25%' }}>Number Of Applicants</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '14px', width: '25%' }}>Location</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '14px', width: '25%' }}>Go to Map</div>
        </div>
    )
}

const TableRow = ({ maxBidPrice, location, numberOfApplicants, blockX, blockY, gridX, gridY }) => {
    const history = useHistory()
    return (
        <div
            style={{
                borderRight: '1px solid rgb(226, 121, 22)',
                borderLeft: '1px solid rgb(226, 121, 22)',
                borderBottom: '1px solid rgb(226, 121, 22)', width: '800px', height: '60px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '14px', width: '25%', color: 'rgb(226, 121,22)' }}>
                {maxBidPrice}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '14px', width: '25%', color: 'rgb(226, 121,22)' }}>
                {numberOfApplicants}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '14px', width: '25%', color: 'rgb(226, 121,22)' }}>
                {location}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '14px', width: '25%' }}>
                <div
                    className="pointer"
                    style={{
                        border: '1px solid rgb(226, 121, 22)',
                        width: '100px', height: '40px',
                        borderRadius: '20px', display: 'flex',
                        justifyContent: 'center', alignItems: 'center',
                        color: 'rgb(226, 121,22)', fontSize: '12px'
                    }}
                    onClick={
                        () => {
                            history.push(`/auction?blockX=${blockX}&blockY=${blockY}&gridX=${gridX}&gridY=${gridY}`)
                        }
                    }
                >
                    Go
                </div>
            </div>
        </div>
    )
}

const Table = ({ bidList = [], withDrawalHandler }) => {
    let bidRows = []
    bidList.forEach((bid, idx) => {
        bidRows.push(
            <TableRow
                numberOfApplicants={bid.numberOfApplicants}
                maxBidPrice={bid.maxBidPrice}
                location={`BLOCK${bid.blockX}${bid.blockY} : ${bid.gridX}, ${bid.gridY}`}
                blockX={bid.blockX}
                blockY={bid.blockY}
                gridX={bid.gridX}
                gridY={bid.gridY}
            />
        )
    })
    return (
        <div style={{height:'700px', overflowY:'auto'}}>
            <TableHeader />
            {bidRows}
        </div>
    )
}
const optionList = ['maxBidPrice', 'applicantsCount']
const HighestBid = ({ menubar, footer, userUUID }) => {
    const [bidList, setBidList] = useState([])
    const [searchCondition, setSearchCondition] = useState('maxBidPrice')

    useEffect(() => {
        highestBidList({
            orderType: 'maxBidPrice',
            callback: (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    if (res.result === 'success') {
                        console.log(res.bidList)
                        setBidList(res.bidList)
                    }
                }
            }
        })
    }, [])

    return (
        <div className={classNames(Style['view-box'])}>
            {menubar}
            <div className={classNames(Style['body'])}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{width:'800px', padding:'10px 0'}}>
                        <select 
                        style={{height:'30px'}}
                        value={searchCondition}
                        onChange={
                            (e) => {
                                console.log(e.target.value)
                                setSearchCondition(e.target.value)
                                highestBidList({
                                    orderType: e.target.value,
                                    callback: (err, res) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            if (res.result === 'success') {
                                                console.log(res.bidList)
                                                setBidList(res.bidList)
                                            }
                                        }
                                    }
                                })
                            }
                        }
                        >
                            <option value={'maxBidPrice'}>Order by bid price</option>
                            <option value={'applicantsCount'}>Order by number of applicants</option>
                        </select>
                    </div>
                    <Table
                        bidList={bidList}
                    />
                </div>
            </div>
            {footer}
        </div>
    )
}

export default HighestBid