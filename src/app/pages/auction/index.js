import React, { useEffect, useState } from "react";
import classNames from "classnames";
import queryString from 'query-string'
import Style from './map.module.css'
import ReactTooltip from "react-tooltip";
import { useHistory } from 'react-router-dom'
import { TiArrowRightThick, TiDelete } from 'react-icons/ti'
import { AiOutlineLeft } from 'react-icons/ai'
import { BsFillCaretDownFill, BsFillCaretUpFill, BsTrash } from 'react-icons/bs'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { getAuctionClose, getMapBlockData, getMyBidListOnMapPage } from '../../api'
import { getPointAmount, applyAuction, getMinBid, getMaxBidList } from '../../api'
import { lang } from '../../data/lang'
import { getGrids } from './components/grids'

const map = {
    mapWidth: 3000,
    mapHeight: 1665,
    gridWidth: 15,
    gridHeight: 15,
    numberOfColumn: 200,
    numberOfRow: 111
}
/*
const useStateGroup = {
    available: {},
    selected: {},
    setMyLand: {},
    setSelectedGridList: undefined
}*/
let addSelectedGrids = undefined
const gridsState = {
    myGrid: {}
}
const grids = {}

const gridBackground = {
    changeMap: undefined
}
const mouseAction = {
    leftButtonDown: false,
    mouseMove: false
}
const selectedPoints = {
    start: { mapId: undefined, blockX: undefined, blockY: undefined, gridX: undefined, gridY: undefined },
    end: { mapId: undefined, blockX: undefined, blockY: undefined, gridX: undefined, gridY: undefined }
}
const MapId = {
    mapId: 0, blockX: undefined, blockY: undefined
}
let maxSelectedGrid = 64 * 64
let selectedAreaHandler = undefined
let numberOfSelectedGrids = 0
let toInit = undefined
let toMove = undefined
let zoomIn = undefined
let userUUID_g = undefined
let unfoldInfo = undefined
let clickIsBlocked = false
let minBid = 0


const initMapId = () => {
    MapId.mapId = 0
    MapId.blockX = 0
    MapId.blockY = 0
}
const alreadySetStartPoint = () => {
    return !(selectedPoints.start.gridX === undefined && selectedPoints.start.gridY === undefined)
}
const initSelectPoint = () => {
    changeBackgroundGrids({
        startPoint: JSON.parse(JSON.stringify(selectedPoints.start)),
        endPoint: JSON.parse(JSON.stringify(selectedPoints.end)),
        selection: false
    })
    selectedPoints.start.gridX = undefined
    selectedPoints.start.gridY = undefined
    selectedPoints.end.gridX = undefined
    selectedPoints.end.gridY = undefined
    numberOfSelectedGrids = 0
    addSelectedGrids([])
}
const changeBackgroundGrids = ({ startPoint, endPoint, selection, doCount, maxBidList }) => {
    console.log(maxBidList)
    let count = 0
    const selectedGrids = []
    if (startPoint.gridX >= endPoint.gridX) {
        if (startPoint.gridY >= endPoint.gridY) {
            for (let i = endPoint.gridX; i <= startPoint.gridX; i++) {
                for (let j = endPoint.gridY; j <= startPoint.gridY; j++) {
                    grids[`${i}-${j}`].setSelected(selection)
                    console.log(grids[`${i}-${j}`])
                    if (doCount) {
                        if (grids[`${i}-${j}`].info.available) {
                            count++
                            if (maxBidList[grids[`${i}-${j}`].info.tbIndex]) {
                                grids[`${i}-${j}`].info.maxBid = maxBidList[grids[`${i}-${j}`].info.tbIndex].bidPrice
                            }
                            selectedGrids.push({ gridIdx: `${i}-${j}`, bidPrice: grids[`${i}-${j}`].info.maxBid + 1, tbIdx: grids[`${i}-${j}`].info.tbIndex })
                        }
                    }
                }
            }
        } else {
            for (let i = endPoint.gridX; i <= startPoint.gridX; i++) {
                for (let j = startPoint.gridY; j <= endPoint.gridY; j++) {
                    grids[`${i}-${j}`].setSelected(selection)
                    if (doCount) {
                        if (grids[`${i}-${j}`].info.available) {
                            count++
                            if (maxBidList[grids[`${i}-${j}`].info.tbIndex]) {
                                grids[`${i}-${j}`].info.maxBid = maxBidList[grids[`${i}-${j}`].info.tbIndex].bidPrice
                            }
                            selectedGrids.push({ gridIdx: `${i}-${j}`, bidPrice: grids[`${i}-${j}`].info.maxBid + 1, tbIdx: grids[`${i}-${j}`].info.tbIndex })
                        }
                    }
                }
            }
        }
    } else {
        if (startPoint.gridY >= endPoint.gridY) {
            for (let i = startPoint.gridX; i <= endPoint.gridX; i++) {
                for (let j = endPoint.gridY; j <= startPoint.gridY; j++) {
                    grids[`${i}-${j}`].setSelected(selection)
                    if (doCount) {
                        if (grids[`${i}-${j}`].info.available) {
                            count++
                            if (maxBidList[grids[`${i}-${j}`].info.tbIndex]) {
                                grids[`${i}-${j}`].info.maxBid = maxBidList[grids[`${i}-${j}`].info.tbIndex].bidPrice
                            }
                            selectedGrids.push({ gridIdx: `${i}-${j}`, bidPrice: grids[`${i}-${j}`].info.maxBid + 1, tbIdx: grids[`${i}-${j}`].info.tbIndex })
                        }
                    }
                }
            }
        } else {
            for (let i = startPoint.gridX; i <= endPoint.gridX; i++) {
                for (let j = startPoint.gridY; j <= endPoint.gridY; j++) {
                    grids[`${i}-${j}`].setSelected(selection)
                    if (doCount) {
                        if (grids[`${i}-${j}`].info.available) {
                            count++
                            if (maxBidList[grids[`${i}-${j}`].info.tbIndex]) {
                                grids[`${i}-${j}`].info.maxBid = maxBidList[grids[`${i}-${j}`].info.tbIndex].bidPrice
                            }
                            selectedGrids.push({ gridIdx: `${i}-${j}`, bidPrice: grids[`${i}-${j}`].info.maxBid + 1, tbIdx: grids[`${i}-${j}`].info.tbIndex })
                        }
                    }
                }
            }
        }
    }
    if (doCount) {
        numberOfSelectedGrids = count
        addSelectedGrids(selectedGrids)
    }
}
const getSelectedGridsList = ({ startPoint, endPoint }) => {
    let gridsList = []
    if (startPoint.gridX >= endPoint.gridX) {
        if (startPoint.gridY >= endPoint.gridY) {
            for (let i = endPoint.gridX; i <= startPoint.gridX; i++) {
                for (let j = endPoint.gridY; j <= startPoint.gridY; j++) {
                    if (grids[`${i}-${j}`].info.available === 1) {
                        gridsList.push(grids[`${i}-${j}`])
                    }
                }
            }
        } else {
            for (let i = endPoint.gridX; i <= startPoint.gridX; i++) {
                for (let j = startPoint.gridY; j <= endPoint.gridY; j++) {
                    if (grids[`${i}-${j}`].info.available === 1) {
                        gridsList.push(grids[`${i}-${j}`])
                    }
                }
            }
        }
    } else {
        if (startPoint.gridY >= endPoint.gridY) {
            for (let i = startPoint.gridX; i <= endPoint.gridX; i++) {
                for (let j = endPoint.gridY; j <= startPoint.gridY; j++) {
                    if (grids[`${i}-${j}`].info.available === 1) {
                        gridsList.push(grids[`${i}-${j}`])
                    }
                }
            }
        } else {
            for (let i = startPoint.gridX; i <= endPoint.gridX; i++) {
                for (let j = startPoint.gridY; j <= endPoint.gridY; j++) {
                    if (grids[`${i}-${j}`].info.available === 1) {
                        gridsList.push(grids[`${i}-${j}`])
                    }
                }
            }
        }
    }
    return gridsList
}
const onClickHandler = (e) => {
    if (mouseAction.leftButtonDown && mouseAction.mouseMove) {
        mouseAction.leftButtonDown = false
        mouseAction.mouseMove = false
    } else if (mouseAction.leftButtonDown && !mouseAction.mouseMove && !clickIsBlocked) {
        clickIsBlocked = true
        document.body.style.cursor = 'wait'
        mouseAction.leftButtonDown = false
        mouseAction.mouseMove = false
        if (!alreadySetStartPoint()) {
            selectedPoints.start.gridY = e.gridY
            selectedPoints.start.gridX = e.gridX
            selectedPoints.end.gridY = e.gridY
            selectedPoints.end.gridX = e.gridX
            let startPoint = JSON.parse(JSON.stringify(selectedPoints.start))
            let endPoint = startPoint
            let tbIdxList = []
            let gridsList = getSelectedGridsList({ startPoint, endPoint: e })
            gridsList.forEach((g, i) => {
                tbIdxList.push(g.info.tbIndex)
            })
            const selectedGrids = []
            getMaxBidList({
                tbIdxList,
                callback: (err, res) => {
                    if (err) {
                        console.log(err)
                        clickIsBlocked = false
                        document.body.style.cursor = 'default'
                    } else {
                        if (res.result === 'success') {
                            let bidPrice = minBid
                            if (res.maxBidList.length !== 0) {
                                bidPrice = res.maxBidList[0].bidPrice
                            }
                            grids[`${e.gridX}-${e.gridY}`].info.maxBid = bidPrice
                            changeBackgroundGrids({ startPoint, endPoint, selection: true })
                            selectedAreaHandler({ exist: true })
                            if (grids[`${e.gridX}-${e.gridY}`].info.available === 1) {
                                selectedGrids.push({ gridIdx: `${e.gridX}-${e.gridY}`, bidPrice: grids[`${e.gridX}-${e.gridY}`].info.maxBid + 1, tbIdx: grids[`${e.gridX}-${e.gridY}`].info.tbIndex })
                                addSelectedGrids(selectedGrids)
                                numberOfSelectedGrids = 1
                                unfoldInfo(true)
                            }
                            clickIsBlocked = false
                            document.body.style.cursor = 'default'
                        } else {
                            console.log('fail')
                            clickIsBlocked = false
                            document.body.style.cursor = 'default'
                        }
                    }
                }
            })
        } else {


            let startPoint = JSON.parse(JSON.stringify(selectedPoints.start))
            let endPoint = JSON.parse(JSON.stringify(selectedPoints.end))
            let rowCount = Math.abs(startPoint.gridX - e.gridX) + 1
            let columnCount = Math.abs(startPoint.gridY - e.gridY) + 1

            if (maxSelectedGrid < rowCount * columnCount) {
                window.alert(`선택 가능한 그리드 최대 개수는 ${maxSelectedGrid} 개입니다.`)
                clickIsBlocked = false
                document.body.style.cursor = 'default'
                return
            }

            let tbIdxList = []
            let gridsList = getSelectedGridsList({ startPoint, endPoint: e })
            gridsList.forEach((g, i) => {
                tbIdxList.push(g.info.tbIndex)
            })

            getMaxBidList({
                tbIdxList,
                callback: (err, res) => {
                    if (err) {
                        console.log(err)
                        clickIsBlocked = false
                        document.body.style.cursor = 'default'
                    } else {
                        if (res.result === 'success') {
                            console.log(res)
                            let tbIdxObj = {}
                            if (res.maxBidList.length > 1) {
                                res.maxBidList.forEach((maxBid, i) => {
                                    if (maxBid && Array.isArray(maxBid) && maxBid.length > 0) {
                                        tbIdxObj[maxBid[0].tbIdx] = maxBid[0]
                                    } else {
                                        tbIdxObj[tbIdxList[i]] = gridsList[i]
                                        tbIdxObj[tbIdxList[i]].bidPrice = minBid
                                    }
                                })
                            } else {
                                tbIdxObj[gridsList[0].tbIdx] = res.maxBidList[0]
                            }
                            changeBackgroundGrids({ startPoint, endPoint, selection: false })
                            selectedPoints.end.gridY = e.gridY
                            selectedPoints.end.gridX = e.gridX
                            endPoint = JSON.parse(JSON.stringify(selectedPoints.end))
                            changeBackgroundGrids({ startPoint, endPoint, selection: true, doCount: true, maxBidList: tbIdxObj })
                            selectedAreaHandler({ exist: true })
                            clickIsBlocked = false
                            document.body.style.cursor = 'default'
                        } else {
                            console.log('fail')
                            clickIsBlocked = false
                            document.body.style.cursor = 'default'
                        }
                    }
                }
            })

        }
    }
}
const Viewer = () => {
    const minScale = 1
    const maxScale = 13
    const initialScale = 1//((minScale + maxScale) / 2)

    return (
        <TransformWrapper
            initialScale={initialScale}
            initialPositionX={0}
            initialPositionY={0}
            minScale={minScale}
            maxScale={maxScale}
            limitToBounds={true}
            onInit={
                (e) => {
                    e.centerView()
                    toInit = e.centerView
                    toMove = e.setTransform
                    zoomIn = e.zoomIn
                }
            }
            wheel={{
                step: 0.25
            }}
            doubleClick={{
                disabled: true
            }}
            zoomAnimation={{
                disabled: false,
                zoomAnimation: 0
            }}
        >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
                return (
                    <React.Fragment>
                        <TransformComponent
                            contentStyle={{
                            }}
                            wrapperStyle={{
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            {myMap}
                        </TransformComponent>
                    </React.Fragment>
                )
            }}
        </TransformWrapper>
    )
}
const InforRow = ({ gridX, gridY, maxBid, onDeleteHandler, onBidPriceChangeHandler, bidPrice }) => {
    console.log(bidPrice)
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white', fontSize: '12px', height: '35px', borderBottom: '1px solid #e17a18'
            }}
            onMouseOver={
                () => {
                    grids[`${gridX}-${gridY}`].setPick(true)
                }
            }
            onMouseLeave={
                () => {
                    grids[`${gridX}-${gridY}`].setPick(false)
                }
            }
        >
            <div style={{ width: 'calc(33.333% - 50px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{gridX}</div>
            <div style={{ width: 'calc(33.333% - 50px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{gridY}</div>
            <div style={{ width: 'calc(33.333% - 50px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{maxBid}</div>
            <div style={{ width: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input
                    type="text"
                    style={{ width: '100%', height: '100%', textAlign: 'right' }}
                    min={maxBid + 1}
                    value={bidPrice}
                    step={1}
                    onChange={
                        (e) => {
                            if (onBidPriceChangeHandler && typeof onBidPriceChangeHandler) {
                                let regex = /[^0-9]/g
                                if (regex.test(e.target.value)) {
                                    return
                                } else {
                                    let bidPrice = Number(e.target.value).toFixed(0)
                                    console.log(bidPrice)
                                    onBidPriceChangeHandler({
                                        gridX, gridY, bidPrice: bidPrice
                                    })
                                }
                            }
                        }
                    }
                />
            </div>
            <div style={{ width: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TiDelete
                    fontSize={'20px'}
                    onClick={
                        () => {
                            if (onDeleteHandler && typeof onDeleteHandler === 'function') {
                                grids[`${gridX}-${gridY}`].setPick(false)
                                onDeleteHandler({
                                    gridX, gridY
                                })
                            }
                        }
                    }
                />
            </div>
        </div>
    )
}
const BlockInfoBar = ({ setShowSPMap, showSPMap, points, setPoints, userUUID, setLoading, setLoadingMsg }) => {
    const history = useHistory()
    const [selectedArea, setSelectedArea] = useState({ exist: false })
    const [showDetail, setShowDetail] = useState(true)
    const [selectedGridsList, setSelectedGridList] = useState([])
    let inforRows = []
    unfoldInfo = setShowDetail
    let totalBidPrice = 0
    selectedGridsList.forEach((grid, idx) => {
        let gridIdx = grid.gridIdx
        let gridIdxArr = gridIdx.split('-')
        totalBidPrice += grid.bidPrice
        inforRows.push(
            <InforRow
                key={gridIdx}
                gridX={gridIdxArr[0]}
                gridY={gridIdxArr[1]}
                maxBid={grids[gridIdx].info.maxBid}
                onDeleteHandler={
                    (e) => {
                        let newGridsList = []
                        selectedGridsList.forEach((grid, idx) => {
                            let gridIdx = grid.gridIdx
                            if (gridIdx === `${e.gridX}-${e.gridY}`) {
                                grids[gridIdx].setSelected(false)
                            } else {
                                newGridsList.push(grid)
                            }
                        })
                        setSelectedGridList(newGridsList)
                        if (newGridsList.length === 0) {
                            initSelectPoint()
                            setShowDetail(false)
                            setSelectedArea({ exist: false })
                        }
                    }
                }
                bidPrice={grid.bidPrice}
                onBidPriceChangeHandler={
                    (e) => {
                        let newGridsList = []
                        let temp = JSON.parse(JSON.stringify(selectedGridsList))
                        temp.forEach((grid, idx) => {
                            let gridIdx = grid.gridIdx
                            if (gridIdx === `${e.gridX}-${e.gridY}`) {
                                grid.bidPrice = Number(e.bidPrice)
                                console.log(`change grid idx : ${gridIdx}`)
                            }
                            newGridsList.push(grid)
                        })
                        setSelectedGridList(newGridsList)
                        console.log(gridsState)
                    }
                }
            />
        )
    })
    console.log(inforRows)
    useEffect(() => {
        selectedAreaHandler = setSelectedArea
        addSelectedGrids = setSelectedGridList
    }, [])
    return (
        <div style={{ width: '100%', height: '60px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    showSPMap ?
                        <AiOutlineLeft
                            className={'pointer'}
                            fontSize={'40px'}
                            onClick={() => {
                                for (let gridIdx in gridsState.myGrid) {
                                    //useStateGroup.setMyLand[gridIdx](false)
                                }

                                for (let gridIdx in grids) {
                                    grids[gridIdx].info = undefined
                                }
                                initMapId()
                                gridsState.myGrid = {}
                                gridsState.idx = {}
                                initSelectPoint()
                                setShowSPMap(false)
                            }}
                        /> : undefined
                }
            </div>
            <div style={{ width: 'calc(100% - 60px)', height: '100%', display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', paddingRight: '40px' }}>
                {
                    !showSPMap ? undefined :
                        selectedArea.exist ?
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    !showDetail ?
                                        <>
                                            Unfold
                                            <BsFillCaretDownFill
                                                className="pointer"
                                                color={'white'}
                                                style={{ backgroundColor: '#404040', padding: '4px', margin: '0 10px', borderRadius: '4px' }}
                                                onClick={() => {
                                                    setShowDetail(true)
                                                }}
                                            />
                                        </>
                                        :
                                        <React.Fragment>
                                            Fold
                                            <BsFillCaretUpFill className="pointer" color={'white'} style={{ backgroundColor: '#404040', padding: '4px', margin: '0 10px', borderRadius: '4px' }} onClick={() => { setShowDetail(false) }} />
                                            <div
                                                style={{
                                                    width: '500px',
                                                    height: '200px',
                                                    position: 'absolute',
                                                    right: '0',
                                                    top: '20vh',
                                                    zIndex: '100000',
                                                    display: 'flex',
                                                    justifyContent: "center",
                                                    alignItems: 'flex-start',
                                                    padding: '20px'
                                                }}
                                            >
                                                <div
                                                    className={classNames(Style['info-box'])}
                                                >
                                                    <div style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                        <div style={{ width: '200px', fontSize: '12px', padding: '0 20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: 'white' }}>
                                                            Toatal Points {totalBidPrice}
                                                        </div>
                                                        <BsTrash
                                                            className="pointer"
                                                            color={'#172a4d'}
                                                            style={{ backgroundColor: 'white', padding: '6px', borderRadius: '15px' }}
                                                            onClick={
                                                                () => {
                                                                    initSelectPoint()
                                                                    setShowDetail(false)
                                                                    setSelectedArea({ exist: false })
                                                                }
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            justifyContent: 'flex-start',
                                                            alignItems: 'center',
                                                            backgroundColor: 'white',
                                                            fontSize: '12px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'bold', height: '40px',
                                                            border: '1px solid #e17a18', color: '#e17a18', paddingRight: '10px'
                                                        }}
                                                    >
                                                        <div style={{ width: 'calc(33.333% - 50px)', display: 'flex', justifyContent: "center", alignItems: 'center', color: '#e17a18' }}>PositionX</div>
                                                        <div style={{ width: 'calc(33.333% - 50px)', display: 'flex', justifyContent: "center", alignItems: 'center', color: '#e17a18' }}>PositionY</div>
                                                        <div style={{ width: 'calc(33.333% - 50px)', display: 'flex', justifyContent: "center", alignItems: 'center', color: '#e17a18' }}>Max Bid</div>
                                                        <div style={{ width: '100px', display: 'flex', justifyContent: "center", alignItems: 'center', color: '#e17a18' }}>Bid Price</div>
                                                        <div style={{ width: '50px', display: 'flex', justifyContent: "center", alignItems: 'center', color: '#e17a18' }}>Del</div>
                                                    </div>
                                                    <div style={{ width: '100%', maxHeight: '400px', overflowY: 'auto', borderLeft: '1px solid #e17a18', borderRight: '1px solid #e17a18', borderBottom: '1px solid #e17a18' }}>
                                                        {inforRows}
                                                    </div>
                                                    <div style={{ width: '100%', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
                                                        <div style={{ fontSize: '12px', color: 'white' }}>
                                                            The number of Grids : {selectedGridsList.length}
                                                        </div>
                                                        <div
                                                            className="pointer" style={{ padding: '4px 16px', backgroundColor: 'white', fontSize: '12px', color: '#172a4d', borderRadius: '4px', fontWeight: '800' }}
                                                            onClick={
                                                                () => {
                                                                    if (window.sessionStorage.getItem('userUUID')) {
                                                                        //history.push('/view-detail')
                                                                        let bidPriceList = []
                                                                        let tbIdxList = []
                                                                        if (MapId.mapId === undefined || MapId.blockX === undefined || MapId.blockY === undefined) {
                                                                            window.alert(`Error : MapId undefined error!`)
                                                                            return
                                                                        }
                                                                        if (selectedGridsList.length > maxSelectedGrid) {
                                                                            window.alert(`한번에 참여 할 수 있는 최대 Land의 개수는 ${maxSelectedGrid} 개 입니다.`)
                                                                            return
                                                                        }
                                                                        console.log(`uuid : ${userUUID}, points : ${points}`)
                                                                        let totalBidPrice = 0
                                                                        const gridXList = []
                                                                        const gridYlist = []
                                                                        let isBidPriceOverMaxBid = true
                                                                        selectedGridsList.forEach((grid, idx) => {
                                                                            gridXList.push(grid.gridIdx.split('-')[0])
                                                                            gridYlist.push(grid.gridIdx.split('-')[1])
                                                                            bidPriceList.push(grid.bidPrice)
                                                                            tbIdxList.push(grid.tbIdx)
                                                                            totalBidPrice += grid.bidPrice
                                                                            if (grids[grid.gridIdx].info.maxBid >= grid.bidPrice) {
                                                                                isBidPriceOverMaxBid = false
                                                                            }
                                                                        })
                                                                        if (!isBidPriceOverMaxBid) {
                                                                            window.alert(lang.selection["auction-alert-00"])
                                                                            return
                                                                        }
                                                                        setLoadingMsg('Participation in the auction is in progress.')
                                                                        setShowDetail(false)
                                                                        setSelectedArea({ exist: false })
                                                                        setLoading(true)
                                                                        getAuctionClose({
                                                                            callback: (err, res) => {
                                                                                if (err) {
                                                                                    console.log(err)
                                                                                } else {
                                                                                    if (res.auction_close[0].auction_finish === 'yes') {
                                                                                        window.alert('모든 경매가 종료되었습니다. 더이상 경매에 참여 할  수 없습니다.')
                                                                                        initSelectPoint()
                                                                                        setShowDetail(false)
                                                                                        setSelectedArea({ exist: false })
                                                                                        setLoading(false)
                                                                                        return
                                                                                    }
                                                                                    getPointAmount({
                                                                                        uuid: userUUID,
                                                                                        callback: (err, response) => {
                                                                                            if (err) {
                                                                                                setLoading(false)
                                                                                                console.log(err)
                                                                                            } else {
                                                                                                if (response.result === 'success') {
                                                                                                    let point = response.point
                                                                                                    setPoints(point)

                                                                                                    if (point >= totalBidPrice) {
                                                                                                        getMaxBidList({
                                                                                                            tbIdxList,
                                                                                                            callback: (err, res) => {
                                                                                                                if (err) {
                                                                                                                    console.log(err)
                                                                                                                } else {
                                                                                                                    let allClear = true
                                                                                                                    res.maxBidList.forEach((maxBid, i) => {
                                                                                                                        console.log(maxBid)
                                                                                                                        if (maxBid && Array.isArray(maxBid) && maxBid.length > 0) {// 기존 경매참여자 존재
                                                                                                                            let oldBid = maxBid[0].bidPrice
                                                                                                                            let tbIdx = maxBid[0].tbIdx
                                                                                                                            console.log(`${i} : 경매 참여자 있음 : tbIdx : ${tbIdx}`)
                                                                                                                            tbIdxList.forEach((t, i) => {
                                                                                                                                if (t === tbIdx) {
                                                                                                                                    console.log(`old bid : ${oldBid}, new bid : ${bidPriceList[i]}`)
                                                                                                                                    if (bidPriceList[i] <= oldBid) {
                                                                                                                                        console.log('Out')
                                                                                                                                        allClear = false
                                                                                                                                    } else {
                                                                                                                                        console.log('OK')
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            })
                                                                                                                        } else {
                                                                                                                            console.log(`${i} : 경매 참여자 없음`)
                                                                                                                        }
                                                                                                                    })
                                                                                                                    if (allClear) {
                                                                                                                        applyAuction({
                                                                                                                            applicant: userUUID,
                                                                                                                            bidPriceList: bidPriceList,
                                                                                                                            totalBidPrice: totalBidPrice,
                                                                                                                            tbIdxList: tbIdxList,
                                                                                                                            mapId: MapId.mapId,
                                                                                                                            blockX: MapId.blockX,
                                                                                                                            blockY: MapId.blockY,
                                                                                                                            gridXList: gridXList,
                                                                                                                            gridYList: gridYlist,
                                                                                                                            callback: (err, response) => {
                                                                                                                                if (err) {
                                                                                                                                    setLoading(false)
                                                                                                                                    console.log(err)
                                                                                                                                } else {
                                                                                                                                    if (response.result === 'success') {
                                                                                                                                        console.log(response)


                                                                                                                                        for (let gridIdx in gridsState.myGrid) {
                                                                                                                                            console.log(gridIdx)
                                                                                                                                            //useStateGroup.setMyLand[gridIdx](false)
                                                                                                                                        }

                                                                                                                                        initMapId()
                                                                                                                                        gridsState.myGrid = {}
                                                                                                                                        gridsState.idx = {}
                                                                                                                                        initSelectPoint()
                                                                                                                                        setShowSPMap(false)
                                                                                                                                        setLoading(false)
                                                                                                                                        window.alert('Complete to apply auction.')
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        })
                                                                                                                        console.log(selectedGridsList)

                                                                                                                    } else {
                                                                                                                        initMapId()
                                                                                                                        gridsState.myGrid = {}
                                                                                                                        gridsState.idx = {}
                                                                                                                        initSelectPoint()
                                                                                                                        setShowSPMap(false)
                                                                                                                        setLoading(false)
                                                                                                                        window.alert(`경매 입찰에 실패 하였습니다. 경매가가 상승하였습니다. 다시 시도해 주세요`)
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        })
                                                                                                    } else {
                                                                                                        setLoading(false)
                                                                                                        window.alert('경매 입찰에 실패하였습니다. 현재 보유한 포인트가 Land 가격보다 적습니다.')
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                }
                                                                            }
                                                                        })
                                                                    } else {
                                                                        history.push('/login')
                                                                    }
                                                                }
                                                            }
                                                        >
                                                            Apply
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                }
                            </div>
                            :
                            '선택된 영역이 없습니다.'
                }
            </div>
        </div>
    )
}
const gridInit = (grid, userUUID) => {
    /*if (grid.available === 0) {
        useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
        gridsState.idx[`${grid.gridX}-${grid.gridY}`] = grid        
    } else {
        
        if (userUUID && grid.applicant === userUUID) {
            useStateGroup.setMyLand[`${grid.gridX}-${grid.gridY}`](true)
            gridsState.myGrid[`${grid.gridX}-${grid.gridY}`] = grid
        }
        useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
        gridsState.idx[`${grid.gridX}-${grid.gridY}`] = grid
    }*/
    if (grids[`${grid.gridX}-${grid.gridY}`]) {
        grids[`${grid.gridX}-${grid.gridY}`].info = grid
    } else {
        grids[`${grid.gridX}-${grid.gridY}`] = { info: grid }
    }
    if (grids[`${grid.gridX}-${grid.gridY}`].setAvailable && typeof grids[`${grid.gridX}-${grid.gridY}`].setAvailable === 'function') {
        grids[`${grid.gridX}-${grid.gridY}`].setAvailable(true)
    }
    if (grids[`${grid.gridX}-${grid.gridY}`].setMyLand && typeof grids[`${grid.gridX}-${grid.gridY}`].setMyLand === 'function') {
        grids[`${grid.gridX}-${grid.gridY}`].setMyLand(0)
    }
    if (grids[`${grid.gridX}-${grid.gridY}`].setAvailable && grid.available === 0) {
        grids[`${grid.gridX}-${grid.gridY}`].setAvailable(false)
    }

}
let myMap = getGrids({
    blockX: undefined,
    blockY: undefined,
    onClickHandler: onClickHandler,
    MapUrl: '',
    mapWidth: map.mapWidth,
    mapHeight: map.mapHeight,
    gridWidth: map.gridWidth,
    gridHeight: map.gridHeight,
    numberOfColumn: map.numberOfColumn,
    numberOfRow: map.numberOfRow,
    gridBackground: gridBackground,
    grids: grids
})
const dataDownload = ({ mapId, blockX, blockY, setLoading, setLoadingMsg, mapPath, setShowSPMap, userUUID, pick = undefined }) => {
    console.log(userUUID)
    console.log(pick)
    setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
    setLoading(true)
    MapId.mapId = mapId
    MapId.blockX = blockX
    MapId.blockY = blockY
    getMapBlockData({
        mapId: MapId.mapId,
        blockX: MapId.blockX,
        blockY: MapId.blockY,
        callback: (err, response) => {
            if (err) {
                console.log(err)
            } else {
                getMinBid({
                    callback: (err, minBidRes) => {
                        if (err) {
                            console.log(err)
                        } else {
                            if (minBidRes.result === 'success') {
                                console.log(grids['0-0'])
                                if (gridBackground.changeMap && typeof gridBackground.changeMap === 'function') {
                                    gridBackground.changeMap(mapPath)
                                }
                                minBid = minBidRes.minBid
                                setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                response.result.forEach((grid, idx) => {
                                    grid.maxBid = minBid
                                    gridInit(grid, userUUID)
                                })
                                if (userUUID) {
                                    getMyBidListOnMapPage({
                                        blockX: MapId.blockX,
                                        blockY: MapId.blockY,
                                        applicant: userUUID,
                                        callback: (err, myBidList) => {
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log(myBidList)
                                                myBidList.list.forEach((myList, idx) => {
                                                    if (myList.myBid === myList.maxBid) {
                                                        grids[`${myList.gridX}-${myList.gridY}`].setMyLand(1)
                                                    } else {
                                                        grids[`${myList.gridX}-${myList.gridY}`].setMyLand(2)
                                                    }
                                                    grids[`${myList.gridX}-${myList.gridY}`].info.myBidPrice = myList.myBid
                                                })
                                                setLoading(false)
                                                setShowSPMap(true)

                                                if (pick && pick.gridX && pick.gridY) {
                                                    if (toMove && typeof toMove === 'function') {

                                                        mouseAction.mouseMove = false
                                                        mouseAction.leftButtonDown = true
                                                        clickIsBlocked = false
                                                        onClickHandler({ gridX: pick.gridX, gridY: pick.gridY })

                                                        let magnifyRate = 2
                                                        let windowWidth = window.innerWidth
                                                        let windowHeight = window.innerHeight - 120
                                                        let left = -15 * pick.gridX * magnifyRate
                                                        let top = -15 * pick.gridY * magnifyRate
                                                        if (left * -1 > windowWidth * 0.5 && left * -1 + windowWidth < map.mapWidth * magnifyRate) left = left + windowWidth * 0.5
                                                        else if (left * -1 <= windowWidth) left = 0
                                                        else left = -1 * map.mapWidth * magnifyRate + windowWidth

                                                        if (top * -1 > windowHeight * 0.5 && top * -1 + windowHeight < map.mapHeight * magnifyRate) top = top + windowHeight * 0.5
                                                        else if (top * -1 <= windowHeight) top = 0
                                                        else top = -1 * map.mapHeight * magnifyRate + windowHeight
                                                        toMove(left, top, magnifyRate, 2000, 'easeOut')
                                                        //toMove(-6000 + windowWidth, -1665 * 2 + windowHeight, 2, 4000, 'easeOut')
                                                    }
                                                    /*    setTimeout(() => {
                                                            let windowWidth = window.innerWidth
                                                            let windowHeight = window.innerHeight - 120
                                                            toMove(-6000 + windowWidth, -1665 * 2 + windowHeight, 2, 4000, 'easeOut')
                                                            
                                                        }, 4000)*/
                                                } else if (toInit && typeof toInit === 'function') {
                                                    toInit(1, 300, 'easeOut')
                                                    //    toMove(0, 0, 1, 2000, 'easeOut')
                                                }
                                                console.log(grids['0-0'])
                                            }
                                        }
                                    })
                                } else {
                                    setLoading(false)
                                    setShowSPMap(true)
                                    if (pick && pick.gridX && pick.gridY) {
                                        if (toMove && typeof toMove === 'function') {

                                            mouseAction.mouseMove = false
                                            mouseAction.leftButtonDown = true
                                            clickIsBlocked = false
                                            onClickHandler({ gridX: pick.gridX, gridY: pick.gridY })


                                            let magnifyRate = 2
                                            let windowWidth = window.innerWidth
                                            let windowHeight = window.innerHeight - 120
                                            let left = -15 * pick.gridX * magnifyRate
                                            let top = -15 * pick.gridY * magnifyRate
                                            if (left * -1 > windowWidth * 0.5 && left * -1 + windowWidth < map.mapWidth * magnifyRate) left = left + windowWidth * 0.5
                                            else if (left * -1 <= windowWidth) left = 0
                                            else left = -1 * map.mapWidth * magnifyRate + windowWidth

                                            if (top * -1 > windowHeight * 0.5 && top * -1 + windowHeight < map.mapHeight * magnifyRate) top = top + windowHeight * 0.5
                                            else if (top * -1 <= windowHeight) top = 0
                                            else top = -1 * map.mapHeight * magnifyRate + windowHeight
                                            toMove(left, top, magnifyRate, 2000, 'easeOut')
                                            //toMove(-6000 + windowWidth, -1665 * 2 + windowHeight, 2, 4000, 'easeOut')
                                        }
                                        /*    setTimeout(() => {
                                                let windowWidth = window.innerWidth
                                                let windowHeight = window.innerHeight - 120
                                                toMove(-6000 + windowWidth, -1665 * 2 + windowHeight, 2, 4000, 'easeOut')
                                                
                                            }, 4000)*/
                                    } else if (toInit && typeof toInit === 'function') {
                                        toInit(1, 300, 'easeOut')
                                        //    toMove(0, 0, 1, 2000, 'easeOut')
                                    }
                                    console.log(grids['0-0'])
                                }
                            }
                        }
                    }
                })
            }
        }
    })
}
const GridDom = ({ blockX, blockY, mapId, setLoading, setLoadingMsg, setShowSPMap, userUUID, width }) => {

    return (
        
        <div
            className={Style['map-block']}
            style={{ width, height: '100%' }}
            onClick={() => {
                dataDownload({
                    mapId,
                    blockX,
                    blockY,
                    setLoading,
                    setLoadingMsg,
                    mapPath: `/images/map-sp-${blockX}${blockY}.jpeg`,
                    setShowSPMap, userUUID
                })
            }}
        >
            
        </div>
    )
}
const GridDomRow = ({ blockXs = [], blockY, mapId, setLoading, setLoadingMsg, setShowSPMap, userUUID, widthArr, height }) => {
    let blockXList = []
    blockXs.forEach((blockX, idx) => {
        blockXList.push(
            <GridDom
                setLoading={setLoading}
                setLoadingMsg={setLoadingMsg}
                setShowSPMap={setShowSPMap}
                mapId={mapId}
                blockX={blockX}
                blockY={blockY}
                userUUID={userUUID}
                width={widthArr[idx]}
                key={`idx-${idx}-${0}-${blockY}`}
            />
        )
    })
    return (
        <div
            style={{
                width: '100%', height: height, display: 'flex', justifyContent: "flex-start", alignItems: 'center'
            }}
        >
            {blockXList}
        </div>
    )
}
const RemoteMap = ({ blockXs = [], blockYs = [], mapId, setLoading, setLoadingMsg, setShowSPMap, userUUID, backgroundMapPath, size, widthArr, heightArr }) => {
    let gridDomRowList = []
    blockYs.forEach((blockY, idx) => {
        gridDomRowList.push(
            <GridDomRow
                setLoading={setLoading}
                setLoadingMsg={setLoadingMsg}
                setShowSPMap={setShowSPMap}
                mapId={mapId}
                blockXs={blockXs}
                blockY={blockY}
                userUUID={userUUID}
                height={heightArr[idx]}
                widthArr={widthArr}
                key={`gridDomRow-${idx}`}
            />
        )
    })
    return (
        <div
            style={{
                width: `${size.width}px`, height: `${size.height}px`,
                backgroundImage: `url(${backgroundMapPath})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
            }}
        >
            {gridDomRowList}
        </div>
    )
}
const AuctionPage = ({ menubar, footer, MapUrl, setLoadingMsg, setLoading, points, setPoints, userUUID }) => {
    const history = useHistory()
    const [showSPMap, setShowSPMap] = useState(false)
    const [size, setSize] = useState({ height: 0, width: 0 })
    userUUID_g = userUUID

    
    const [displayMyLand, setDisplayMyLand] = useState(true)
    const [displayOthers, setDisplayOthers] = useState(true)
    const dpMyLand = (display) => {
    grids['160-60'].setDisplayMyLand(display)
    grids['160-61'].setDisplayMyLand(display)
    grids['160-62'].setDisplayMyLand(display)
    grids['161-60'].setDisplayMyLand(display)
    grids['161-61'].setDisplayMyLand(display)
    grids['161-62'].setDisplayMyLand(display)
    grids['162-60'].setDisplayMyLand(display)
    grids['162-61'].setDisplayMyLand(display)
    grids['162-62'].setDisplayMyLand(display)
    grids['163-60'].setDisplayMyLand(display)
    grids['163-61'].setDisplayMyLand(display)
    grids['163-62'].setDisplayMyLand(display)
}
const dpOthers = (display) => {

    grids['164-60'].setDisplayOthers(display)
    grids['164-61'].setDisplayOthers(display)
    grids['164-62'].setDisplayOthers(display)
    grids['165-60'].setDisplayOthers(display)
    grids['165-61'].setDisplayOthers(display)
    grids['165-62'].setDisplayOthers(display)

    grids['160-63'].setDisplayOthers(display)
    grids['161-63'].setDisplayOthers(display)
    grids['162-63'].setDisplayOthers(display)
    grids['163-63'].setDisplayOthers(display)
    grids['164-63'].setDisplayOthers(display)
}
    useEffect(() => {



        const sizeSetting = () => {
            let height = window.innerHeight - 60 - window.innerWidth *0.05
            let width = window.innerWidth
            if (width * 4.995 > height * 9) {
                setSize({
                    height, width: (height / 4.995) * 9
                })
            } else {
                setSize({
                    height: 4.995 * (width / 9), width
                })
            }
        }

        for (let gridIdx in grids) {
            grids[gridIdx].info = undefined
        }
        initMapId()
        gridsState.myGrid = {}
        gridsState.idx = {}
        initSelectPoint()
        setShowSPMap(false)

        window.addEventListener('resize', () => {
            setTimeout(() => {
                sizeSetting()
            }, 400)
        }, false)
        sizeSetting()

        let data = queryString.parse(window.location.search)
        if (data.blockX && data.blockY && data.gridX && data.gridY) {
            dataDownload({
                mapId: 0,
                blockX: data.blockX,
                blockY: data.blockY,
                setLoading,
                setLoadingMsg,
                mapPath: `/images/map-sp-${data.blockX}${data.blockY}.jpeg`,
                setShowSPMap, userUUID,
                pick: { gridX: data.gridX, gridY: data.gridY }
            })
        }

    }, [])
    return (
        <React.Fragment>
            
            <div className={classNames(Style['background'])}>
                {menubar}
                <div style={{ width: '89%', transform: 'translateY(150%)', display: 'flex', justifyContent: 'flex-end', alignItems: "center", gap: '20px' }}>
                                <div data-tip
              data-for="myland">
                                    최고 입찰가입니다
                                    <ReactTooltip id="myland" place="top" effect="solid" backgroundColor="rgba(225, 122, 24, 0.7)">
                <span>최고 입찰가입니다</span>
              </ReactTooltip>
                                    <div 
                                    style={{ 
                                        display: 'inline-block', 
                                        width: '13px', 
                                        height: '13px', 
                                        backgroundColor: displayMyLand ? 'rgba(255,0,0,1)' : 'white', 
                                        borderRadius: '2px', 
                                        marginLeft: '4px', 
                                        marginRight: '4px' ,
                                        border:'1px solid gray'
                                    }}
                                    onClick={
                                        (e) => {
                                            let newDisplayMyLand = !displayMyLand
                                            setDisplayMyLand(newDisplayMyLand)
                                            dpMyLand(newDisplayMyLand)
                                        }
                                    }
                                    ></div>
                                </div>
                                <div data-tip
              data-for="selectedrange">
                                    현재 선택된 땅
                                    <ReactTooltip id="selectedrange" place="top" effect="solid" backgroundColor="rgba(225, 122, 24, 0.7)">
                <span>옥션에 참여하기 위해 클릭한 땅입니다</span>
              </ReactTooltip>
                                
                                <div style={{display: 'inline-block', width: '13px', height: '13px', backgroundColor: 'rgba(255,255,0,1)',
                            borderRadius: '2px', marginLeft: '4px', marginRight: '4px', border: '1px solid gray' }}></div>
                            </div>


                            <div data-tip
              data-for="abletopurchase">
                                    선택된 땅
                                    <ReactTooltip id="abletopurchase" place="top" effect="solid" backgroundColor="rgba(225, 122, 24, 0.7)">
                <span>옥션에 참여하기 위해 선택한 땅입니다</span>
              </ReactTooltip>
                                
                                <div style={{display: 'inline-block', width: '13px', height: '13px', backgroundColor: 'rgba(255,255,255,1)',
                            borderRadius: '2px', marginLeft: '4px', marginRight: '4px', border: '1px solid gray' }}></div>
                            </div>

                                <div data-tip
              data-for="posterior">
                                    후순위 입찰가
                                    <ReactTooltip id="posterior" place="top" effect="solid" backgroundColor="rgba(225, 122, 24, 0.7)">
                <span>후순위 입찰가 입니다</span>
              </ReactTooltip>
                                    <div style={{ display: 'inline-block', width: '13px', height: '13px', backgroundColor: 'rgba(0,0,255,1)', borderRadius: '2px', marginLeft: '4px', marginRight: '4px', border: '1px solid gray' }}></div>
                                </div>
                                {/* <div>선택된 영역이 없습니다.</div> */}
                            </div>


                                
                                



                                
                
                <BlockInfoBar
                    setShowSPMap={setShowSPMap}
                    showSPMap={showSPMap}
                    points={points}
                    setPoints={setPoints}
                    userUUID={userUUID}
                    setLoading={setLoading}
                    setLoadingMsg={setLoadingMsg}
                />
                <div
                    style={{ backgroundColor: '#33a4ef', position: 'relative' }} className={classNames(Style['map-wrapper'])}
                    onMouseDown={
                        (e) => {
                            if (e.nativeEvent.button === 0) {
                                mouseAction.leftButtonDown = true
                                mouseAction.mouseMove = false
                                document.body.style.cursor = 'grabbing'
                            }
                        }
                    }
                    onMouseUp={
                        (e) => {
                            if (e.nativeEvent.button === 0) {
                                document.body.style.cursor = 'default'
                            }
                        }
                    }
                    onMouseLeave={
                        (e) => {
                            if (e.nativeEvent.button === 0) {
                                mouseAction.leftButtonDown = false
                                mouseAction.mouseMove = false
                                document.body.style.cursor = 'default'
                            }
                        }
                    }
                    onMouseMove={
                        (e) => {
                            if (mouseAction.leftButtonDown && !mouseAction.mouseMove) {
                                mouseAction.mouseMove = true
                            }
                        }
                    }
                >
                    
                    <Viewer />
                    <div
                        style={{
                            width: '100%', height: '100%', display: !showSPMap ? 'flex' : 'none', justifyContent: "center", alignItems: "center", flexDirection: 'column', position: 'absolute', top: '0', left: '0', backgroundColor: 'white'
                        }}
                    >
                        <RemoteMap
                            setLoading={setLoading}
                            setLoadingMsg={setLoadingMsg}
                            setShowSPMap={setShowSPMap}
                            mapId={0}
                            blockXs={[0, 1, 2]}
                            blockYs={[0, 1, 2]}
                            userUUID={userUUID}
                            size={size}
                            backgroundMapPath={'/images/last-map.jpg'}
                            widthArr={['33.3333%', '33.3333%', '33.3333%']}
                            heightArr={['33.3333%', '33.3333%', '33.3333%']}
                        />
                    </div>
                </div>
                {/*footer*/}
            </div>
        </React.Fragment>
    )
}

export default AuctionPage