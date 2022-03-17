import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Style from './market.module.css'
import { Table, MarketRow, MarketRowHeader, Pager, Selector } from '../../components'
import { useHistory } from 'react-router-dom'
import { getMyLandList } from "../../api";

const Row = ({index, location, price}) => {
    return (
        <div style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #808080' }}>
            <div style={{ width: '25%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#808080', fontSize: '12px' }}>
                {index}
            </div>
            <div style={{ width: '25%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#808080', fontSize: '12px' }}>
                {location}
            </div>
            <div style={{ width: '25%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#808080', fontSize: '12px' }}>
                {price}
            </div>
            <div style={{ width: '25%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#808080', fontSize: '12px' }}>
                <div className="pointer" style={{ width: '200px', height: '40px', display: 'flex', justifyContent: "center", alignItems: "center", border: '1px solid #808080', borderRadius: '5px' }}>
                    Go to my grid
                </div>
            </div>
        </div>
    )
}

const MarketPage = ({ menubar, footer, userUUID }) => {
    const history = useHistory()
    const [myLandList, setMyLandList] = useState([])
    const rows = []
    myLandList.forEach((land, idx) => {
        rows.push(
            <Row 
                index={idx + 1}
                location={`BLOCK:${land.blockX}:${land.blockY}-GRID:${land.gridX}:${land.gridY}`}
                price={land.price}
            />
        )
    })
    useEffect(() => {
        getMyLandList({
            userUUID: userUUID,
            callback: (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    setMyLandList(res.myLandList)
                }
            }
        })
    }, [])
    return (
        <div className={classNames(Style['background'])}>
            {menubar}
            <div className={classNames(Style['body'])}>
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <div style={{ width: '800px', height: '700px', overflowY: 'auto' }}>
                        <div style={{ width: '100%', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '13px', backgroundColor: 'black', color: 'white' }}>
                            <div style={{ width: '25%', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: '600' }}>Index</div>
                            <div style={{ width: '25%', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: '600' }}>Location</div>
                            <div style={{ width: '25%', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: '600' }}>Purchase Price</div>
                            <div style={{ width: '25%', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: '600' }}>View My Land</div>
                        </div>
                        {rows}
                    </div>
                </div>
            </div>
            {footer}
        </div>
    )
}

export default MarketPage