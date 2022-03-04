import React, { useEffect, useState } from "react"


const Row = ({ grids, count, gridSize }) => {
    return (
        <div style={{ width: '100%', height: gridSize, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }} >
            {grids}
        </div>
    )
}
let Grid = ({ count, rowIdx, columnIdx, blockX, blockY, gridSize, onClickHandler, grids }) => {
    const [available, setAvailable] = useState(true)
    const [selected, setSelected] = useState(false)
    const [myLand, setMyLand] = useState(0)
    const [displayMyLand, setDisplayMyLand] = useState(true)
    const [pick, setPick] = useState(false)
    const [others, setOthers] = useState(false)
    const [displayOthers, setDisplayOthers] = useState(true)
    const [forSales, setForSales] = useState(false)

    const OK = 1

    useEffect(() => {
        if (grids[`${columnIdx}-${rowIdx}`]) {
            grids[`${columnIdx}-${rowIdx}`].setAvailable = setAvailable
            grids[`${columnIdx}-${rowIdx}`].setSelected = setSelected
            grids[`${columnIdx}-${rowIdx}`].setMyLand = setMyLand
            grids[`${columnIdx}-${rowIdx}`].setPick = setPick
            grids[`${columnIdx}-${rowIdx}`].setOthers = setOthers
            grids[`${columnIdx}-${rowIdx}`].setForSales = setForSales
        } else {
            grids[`${columnIdx}-${rowIdx}`] = {
                setAvailable,
                available,
                setSelected,
                selected,
                setMyLand,
                myLand,
                setPick,
                pick,
                setOthers,
                others,
                setForSales,
                forSales,
                setDisplayMyLand,
                displayMyLand,
                setDisplayOthers,
                displayOthers
            }
        }
    }, [])
    let style = {}
    return (
        < div
            style={{
                width: gridSize, height: '100%', border: '1px solid rgba(0,0,0,0.2)', ...style
            }}
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (onClickHandler && typeof onClickHandler === 'function') {
                    onClickHandler({ mapId: 0, blockX, blockY, gridX: columnIdx, gridY: rowIdx })
                }
            }}
        >
            {
                pick ?
                    <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255,255,0,1)' }}>

                    </div>
                    :
                    myLand === OK ?
                        displayMyLand ?
                            <div style={{ width: '100%', height: '100%', backgroundColor: selected ? 'rgba(255,255,255,1)' : 'rgba(255,0,0,1)', display:'flex', justifyContent:'center', alignItems:'center'  }}>
                                {
                                    forSales ?
                                        <div style={{ width: '50%', height: '50%', backgroundColor: 'rgba(0,0,255,1)', borderRadius:'50%' }}></div>
                                        :
                                        undefined
                                }
                            </div>
                            :
                            <div style={{ width: '100%', height: '100%', backgroundColor: selected ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0)' }}></div>
                        :
                        available ?
                            others && displayOthers ?
                                <div style={{ width: '100%', height: '100%', backgroundColor: selected ? 'rgba(255,255,255,1)' : 'rgba(0,255,0,1)', display:'flex', justifyContent:'center', alignItems:'center' }}>
                                    {
                                        forSales ?
                                            <div style={{ width: '50%', height: '50%', backgroundColor: 'rgba(0,0,255,1)', borderRadius:'50%' }}></div>
                                            :
                                            undefined
                                    }
                                </div>
                                :
                                <div style={{ width: '100%', height: '100%', backgroundColor: selected ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0)' }}></div>
                            :
                            <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255,0,0,1)' }}></div>
            }
        </div>
    )
}
const Grids = ({ rowCount, columnCount, blockX, blockY, gridWidth, gridHeight, onClickHandler, gridsList }) => {
    let rows = []
    for (let i = 0; i < rowCount; i++) {
        let grids = []
        for (let j = 0; j < columnCount; j++) {
            grids.push(
                <Grid
                    key={`grid-${j}-${i}`}
                    count={columnCount}
                    rowIdx={i}
                    columnIdx={j}
                    blockX={blockX}
                    blockY={blockY}
                    gridSize={gridWidth}
                    onClickHandler={onClickHandler}
                    grids={gridsList}
                />
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
const BackgroundMap = ({ MapUrl, mapWidth, mapHeight, gridBackground }) => {
    const [mapUrl, setMapUrl] = useState(MapUrl)
    gridBackground.changeMap = setMapUrl
    return <img src={mapUrl} alt="test" style={{ objectFit: 'contain', width: `${mapWidth}px`, height: `${mapHeight}px` }} />
}
export const getGrids = ({
    gridBackground,
    blockX,
    blockY,
    onClickHandler,
    MapUrl,
    mapWidth,
    mapHeight,
    gridWidth,
    gridHeight,
    numberOfColumn,
    numberOfRow,
    grids
}) => {
    const MyGrid = [
        <Grids
            columnCount={numberOfColumn}
            rowCount={numberOfRow}
            key={'My-Grid'}
            blockX={blockX}
            blockY={blockY}
            gridHeight={`${gridHeight}px`}
            gridWidth={`${gridWidth}px`}
            onClickHandler={onClickHandler}
            gridsList={grids}
        />
    ]
    const MyMap = (
        <div style={{ width: `${mapWidth}px`, height: `${mapHeight}px` }}>
            <BackgroundMap MapUrl={MapUrl} mapWidth={mapWidth} mapHeight={mapHeight} gridBackground={gridBackground} />
            {MyGrid}
        </div>
    )
    return MyMap
}
