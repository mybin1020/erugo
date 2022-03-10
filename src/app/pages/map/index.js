import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Style from './map.module.css'
import { useHistory } from 'react-router-dom'
import { TiArrowRightThick } from 'react-icons/ti'
import { AiOutlineLeft } from 'react-icons/ai'
import { BsFillCaretDownFill, BsFillCaretUpFill, BsTrash } from 'react-icons/bs'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Range, Direction } from 'react-range';
import { getMapBlockData } from '../../api'
import Loader from "react-spinners/PacmanLoader";

const useStateGroup = {
    available: {},
    selected: {}
}

const mapWidth = 1800
const mapHeight = 1500
const gridWidth = 15
const gridHeight = 15
const numberOfColumn = 120
const numberOfRow = 100
let selectedAreaHandler = undefined
let numberOfSelectedGrids = 0
let changeMap = undefined
let toInit = undefined

const SuperSimple = ({ scale = 0, zoomIn, zoomOut }) => {
    return (
        <Range
            step={0.1}
            min={0}
            max={100}
            direction={Direction.Up}
            values={[scale]}
            onChange={(values) => {
                /*
                if(values[0] - scale > 0.025){
                    zoomIn(values[0] - scale)
                }else if(scale - values[0] > 0.025){
                    zoomOut(scale - values[0])
                }
                */
            }}
            renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '100%',
                        width: '0',
                        backgroundColor: '#ffffff',
                        borderRadius: '11px'
                    }}
                >
                    {children}
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '30px',
                        width: '60px',
                        borderTopRightRadius: '30px',
                        borderBottomRightRadius: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: '600',
                        fontSize: '12px'
                    }}
                ><TiArrowRightThick fontSize={'25px'} color={'#ea8080'} /> </div>
            )}
        />
    )
}
const Row = ({ grids, count, gridSize }) => {
    return (
        <div style={{ width: '100%', height: gridSize, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }} >
            {grids}
        </div>
    )
}
let Grid = ({ count, rowIdx, columnIdx, blockX, blockY, gridSize, onClickHandler }) => {
    const [available, setAvailable] = useState(true)
    const [selected, setSelected] = useState(false)
    //useStateArr[`${columnIdx}`][`${rowIdx}`] = setBackgroundColor
    useStateGroup.available[`${columnIdx}-${rowIdx}`] = setAvailable
    useStateGroup.selected[`${columnIdx}-${rowIdx}`] = setSelected
    let style = {}
    return (
        < div
            style={{
                width: gridSize, height: '100%', border: '1px solid rgba(0,0,0,0.2)', ...style
            }}
            onClick={() => {
                if (onClickHandler && typeof onClickHandler === 'function') {
                    onClickHandler({ mapId: 0, blockX, blockY, gridX: columnIdx, gridY: rowIdx })
                }
            }}
        >
            <div style={{ width: '100%', height: '100%', backgroundColor: available ? (selected ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)') : 'rgba(0,0,0,0.8)' }}>

            </div>
        </div>
    )
}
const Grids = ({ rowCount, columnCount, blockX, blockY, gridWidth, gridHeight, onClickHandler }) => {

    console.log('Grid Rerendering.....')

    let rows = []
    for (let i = 0; i < rowCount; i++) {
        let grids = []
        for (let j = 0; j < columnCount; j++) {
            grids.push(
                <Grid key={`grid-${j}-${i}`} count={columnCount} rowIdx={i} columnIdx={j} blockX={blockX} blockY={blockY} gridSize={gridWidth} onClickHandler={onClickHandler} />
            )
        }
        rows.push(<Row grids={grids} key={`row-${i}`} count={rowCount} gridSize={gridHeight} />)
    }

    return (
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
            {rows}
        </div>
    )
}
const BackgroundMap = ({ MapUrl }) => {
    const [mapUrl, setMapUrl] = useState(MapUrl)
    console.log('Make Background New Map.....')
    changeMap = setMapUrl
    return <img src={mapUrl} alt="test" style={{ objectFit: 'contain', width: `${mapWidth}px`, height: `${mapHeight}px` }} />
}
const getGrids = ({ blockX, blockY, onClickHandler, MapUrl }) => {
    console.log('Make New Grids.......')
    const MyGrid = [<Grids columnCount={numberOfColumn} rowCount={numberOfRow} key={'My-Grid'} blockX={blockX} blockY={blockY} gridHeight={`${gridHeight}px`} gridWidth={`${gridWidth}px`} onClickHandler={onClickHandler} />]
    const MyMap = (
        <div style={{ width: `${mapWidth}px`, height: `${mapHeight}px` }}>
            <BackgroundMap MapUrl={MapUrl} />
            {MyGrid}
        </div>
    )
    return MyMap
}
const mouseAction = {
    leftButtonDown: false,
    mouseMove: false
}
const MapId = {
    mapId: 0, blockX: undefined, blockY: undefined
}
const selectEndPoint = {
    mapId: undefined, blockX: undefined, blockY: undefined, gridX: undefined, gridY: undefined
}
const selectStartPoint = {
    mapId: undefined, blockX: undefined, blockY: undefined, gridX: undefined, gridY: undefined
}
const alreadySetStartPoint = () => {
    return !(selectStartPoint.gridX === undefined && selectStartPoint.gridY === undefined)
}
const initSelectPoint = () => {
    MapId.mapId = undefined
    MapId.blockX = undefined
    MapId.blockY = undefined
    changeBackgroundGrids({
        startPoint: JSON.parse(JSON.stringify(selectStartPoint)),
        endPoint: JSON.parse(JSON.stringify(selectEndPoint)),
        selection: false
    })
    selectStartPoint.gridX = undefined
    selectStartPoint.gridY = undefined
    selectEndPoint.gridX = undefined
    selectEndPoint.gridY = undefined
    numberOfSelectedGrids = 0
}
const changeBackgroundGrids = ({ startPoint, endPoint, selection, doCount }) => {
    let count = 0
    if (startPoint.gridX >= endPoint.gridX) {
        if (startPoint.gridY >= endPoint.gridY) {
            for (let i = endPoint.gridX; i <= startPoint.gridX; i++) {
                for (let j = endPoint.gridY; j <= startPoint.gridY; j++) {
                    useStateGroup.selected[`${i}-${j}`](selection)
                    if (doCount) count++
                }
            }
        } else {
            for (let i = endPoint.gridX; i <= startPoint.gridX; i++) {
                for (let j = startPoint.gridY; j <= endPoint.gridY; j++) {
                    useStateGroup.selected[`${i}-${j}`](selection)
                    if (doCount) count++
                }
            }
        }
    } else {
        if (startPoint.gridY >= endPoint.gridY) {
            for (let i = startPoint.gridX; i <= endPoint.gridX; i++) {
                for (let j = endPoint.gridY; j <= startPoint.gridY; j++) {
                    useStateGroup.selected[`${i}-${j}`](selection)
                    if (doCount) count++
                }
            }
        } else {
            for (let i = startPoint.gridX; i <= endPoint.gridX; i++) {
                for (let j = startPoint.gridY; j <= endPoint.gridY; j++) {
                    useStateGroup.selected[`${i}-${j}`](selection)
                    if (doCount) count++
                }
            }
        }
    }
    if (doCount) {
        numberOfSelectedGrids = count
    }
}
const onClickHandler = (e) => {
    if (mouseAction.leftButtonDown && mouseAction.mouseMove) {
        mouseAction.leftButtonDown = false
        mouseAction.mouseMove = false
    } else if (mouseAction.leftButtonDown && !mouseAction.mouseMove) {
        mouseAction.leftButtonDown = false
        mouseAction.mouseMove = false
        if (!alreadySetStartPoint()) {
            console.log(e)
            console.log('start point set')
            selectStartPoint.gridY = e.gridY
            selectStartPoint.gridX = e.gridX
            selectEndPoint.gridY = e.gridY
            selectEndPoint.gridX = e.gridX
            let startPoint = JSON.parse(JSON.stringify(selectStartPoint))
            let endPoint = startPoint
            changeBackgroundGrids({ startPoint, endPoint, selection: true })
            selectedAreaHandler({ exist: true })
            numberOfSelectedGrids = 1
        } else {
            console.log('end point set')
            let startPoint = JSON.parse(JSON.stringify(selectStartPoint))
            let endPoint = JSON.parse(JSON.stringify(selectEndPoint))
            changeBackgroundGrids({ startPoint, endPoint, selection: false })
            selectEndPoint.gridY = e.gridY
            selectEndPoint.gridX = e.gridX
            endPoint = JSON.parse(JSON.stringify(selectEndPoint))
            changeBackgroundGrids({ startPoint, endPoint, selection: true, doCount: true })
            selectedAreaHandler({ exist: true })
        }
    }
}
const myMap = getGrids({ blockX: undefined, blockY: undefined, onClickHandler: onClickHandler, MapUrl: '' })
const Viewer = () => {
    const minScale = 1.6
    const maxScale = 6.4
    const initialScale = ((minScale + maxScale) / 2)

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
                    console.log('Map Init!!!!')
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

                /*
                setTimeout(() => {
                    if (rest.state.positionY > 0 && rest.state.positionX > 0) {
                        rest.setTransform(0, 0, rest.state.scale, 50, "easeOut")
                    } else if (rest.state.positionY > 0) {
                        rest.setTransform(rest.state.positionX, 0, rest.state.scale, 50, "easeOut")
                    } else if (rest.state.positionX > 0) {
                        rest.setTransform(0, rest.state.positionY, rest.state.scale, 50, "easeOut")
                    } else if (-1 * (rest.state.positionX - window.innerWidth) > width * rest.state.scale) {
                        rest.setTransform(-1 * width * rest.state.scale + window.innerWidth, rest.state.positionY, rest.state.scale, 50, "easeOut")
                    } else if (-1 * (rest.state.positionY - window.innerHeight) > height * rest.state.scale) {
                        rest.setTransform(rest.state.positionX, -1 * height * rest.state.scale + window.innerHeight, rest.state.scale, 50, "easeOut")
                    }
                }, 200)
                */
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
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '100px',
                                right: '50px',
                                width: '81px',
                                height: '216px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px',
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                gap: '4px'
                            }}
                        >
                            <div style={{ width: '35px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                                <SuperSimple
                                    scale={((rest.state.scale - minScale) / (maxScale - minScale)) * 100}
                                    zoomIn={
                                        (value) => {
                                            const delta = (value / 100).toFixed(2)
                                            console.log(delta)
                                            //zoomIn(delta)
                                        }
                                    }
                                    zoomOut={
                                        (value) => {
                                            const delta = (value / 100).toFixed(2)
                                            console.log(delta)
                                            //zoomOut(delta)
                                        }
                                    }
                                />
                            </div>
                            <div style={{
                                width: '30px',
                                height: '100%',
                                backgroundColor: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}
                            >
                                <div style={{ width: '100%', height: '0%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    100
                                </div>
                                <div style={{ width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    75
                                </div>
                                <div style={{ width: '100%', height: '0%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    50
                                </div>
                                <div style={{ width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    25
                                </div>
                                <div style={{ width: '100%', height: '0%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    0
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }}
        </TransformWrapper>
    )
}
const BlockInfoBar = ({ setShowSPMap, showSPMap }) => {
    const history = useHistory()
    const [selectedArea, setSelectedArea] = useState({ exist: false })
    const [showDetail, setShowDetail] = useState(false)
    useEffect(() => {
        selectedAreaHandler = setSelectedArea
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
                                            선택영역 보기 펼침
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
                                            선택영역 보기 접기
                                            <BsFillCaretUpFill className="pointer" color={'white'} style={{ backgroundColor: '#404040', padding: '4px', margin: '0 10px', borderRadius: '4px' }} onClick={() => { setShowDetail(false) }} />
                                            <div
                                                style={{
                                                    width: '400px',
                                                    height: '200px',
                                                    position: 'absolute',
                                                    right: '0',
                                                    top: '180px',
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
                                                    <div style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                        <div style={{ width: '60px', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '14px', color: 'white', fontWeight: '800' }}>소유주</div>
                                                        <div style={{ width: 'calc(100% - 60px)', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '14px', color: 'white', fontWeight: '800' }}>N/A</div>
                                                    </div>
                                                    <div style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                        <div style={{ width: '60px', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '14px', color: 'white', fontWeight: '800' }}>격자 개수</div>
                                                        <div style={{ width: 'calc(100% - 60px)', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '14px', color: 'white', fontWeight: '800' }}>{numberOfSelectedGrids}  개</div>
                                                    </div>
                                                    <div style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <div
                                                            className="pointer" style={{ padding: '4px 16px', backgroundColor: 'white', fontSize: '12px', color: '#172a4d', borderRadius: '4px', fontWeight: '800' }}
                                                            onClick={
                                                                () => {
                                                                    history.push('/view-detail')
                                                                }
                                                            }
                                                        >
                                                            구매하기
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
const MapPage = ({ menubar, footer, MapUrl }) => {
    const history = useHistory()
    const [showSPMap, setShowSPMap] = useState(false)
    const [size, setSize] = useState({ height: 0, width: 0 })
    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
    useEffect(() => {

        const sizeSetting = () => {
            let height = window.innerHeight - 180
            let width = window.innerWidth
            if (width > height * 2) {
                setSize({
                    height, width: height * 2
                })
            } else {
                setSize({
                    height: width / 2, width
                })
            }
        }
        window.addEventListener('resize', () => {
            setTimeout(() => {
                sizeSetting()
            }, 400)
        }, false)
        sizeSetting()
    }, [])
    return (
        <React.Fragment>
            <div className={classNames(Style['background'])}>
                {menubar}
                <BlockInfoBar setShowSPMap={setShowSPMap} showSPMap={showSPMap} />
                <div
                    style={{ backgroundColor: '#33a4ef', position: 'relative' }} className={classNames(Style['map-wrapper'])}
                    onMouseDown={
                        (e) => {
                            if (e.nativeEvent.button === 0) {
                                console.log('왼쪽 버튼 클릭')
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
                        <div
                            style={{
                                width: `${size.width}px`, height: `${size.height}px`,
                                backgroundImage: 'url(/images/last-map.jpg)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain'
                            }}
                        >
                            <div
                                style={{
                                    width: '100%', height: '33.3333%', display: 'flex', justifyContent: "flex-start", alignItems: 'center'
                                }}
                            >
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 0
                                        MapId.blockY = 0
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-00.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 1
                                        MapId.blockY = 0
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-10.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 2
                                        MapId.blockY = 0
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-20.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 3
                                        MapId.blockY = 0
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-30.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 4
                                        MapId.blockY = 0
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-40.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                            </div>
                            <div style={{ width: '100%', height: '33.3333%', display: 'flex', justifyContent: "flex-start", alignItems: 'center' }}>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 0
                                        MapId.blockY = 1
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-01.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 1
                                        MapId.blockY = 1
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-11.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 2
                                        MapId.blockY = 1
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-21.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 3
                                        MapId.blockY = 1
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-31.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 4
                                        MapId.blockY = 1
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-41.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                            </div>
                            <div style={{ width: '100%', height: '33.3333%', display: 'flex', justifyContent: "flex-start", alignItems: 'center' }}>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 0
                                        MapId.blockY = 2
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-02.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 1
                                        MapId.blockY = 2
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-12.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 2
                                        MapId.blockY = 2
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-22.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 3
                                        MapId.blockY = 2
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-32.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                                <div
                                    className={Style['map-block']}
                                    style={{ width: '20%', height: '100%' }}
                                    onClick={() => {
                                        setLoadingMsg('데이터 다운로드 진행중입니다. 잠시만 기다려 주세요')
                                        setLoading(true)
                                        MapId.mapId = 0
                                        MapId.blockX = 4
                                        MapId.blockY = 2
                                        getMapBlockData({
                                            mapId: MapId.mapId,
                                            blockX: MapId.blockX,
                                            blockY: MapId.blockY,
                                            callback: (err, response) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log(response)
                                                    setLoadingMsg('다운로드 받은 데이터를 처리중입니다.')
                                                    response.result.forEach((grid, idx) => {
                                                        if (grid.available === 0) {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](false)
                                                        } else {
                                                            useStateGroup.available[`${grid.gridX}-${grid.gridY}`](true)
                                                        }
                                                    })
                                                    changeMap('/images/map-sp-42.jpg')
                                                    setLoading(false)
                                                    setShowSPMap(true)
                                                    toInit(3, 300, 'easeOut')
                                                }
                                            }
                                        })
                                    }}
                                >

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*footer*/}
            </div>
            <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: '0', left: '0', display: loading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)', flexDirection: 'column' }}>

                <div style={{width:'100px', height:'240px',marginRight:'300px'}}><Loader color={'#E27A18'} size={100} /></div>
                <h4 style={{ padding: '30px', color: '#E27A17' }}>{loadingMsg}</h4>
            </div>
        </React.Fragment>
    )
}

export default MapPage