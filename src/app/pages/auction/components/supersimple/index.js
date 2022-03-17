import React from "react"
import { Range, Direction } from 'react-range';
import { TiArrowRightThick, TiDelete } from 'react-icons/ti'

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

export default SuperSimple