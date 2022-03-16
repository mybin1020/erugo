import classNames from "classnames";
import {React, useEffect} from "react";
import { useHistory } from 'react-router-dom'
import Style from './home2.module.css'
const HomePage2 = ({ menubar, footer }) => {
 
    const history = useHistory()
    return (
        <div className={classNames(Style['background'])} onClick={() => { history.push('/main-entrance') }}>
           <video autoPlay muted loop>
                <source src="/video/main_new.mp4" type="video/mp4"></source>
            </video>
            <div className={classNames(Style['image-inner-box'])}>
                <div className={classNames(Style['menu-button-wrapper'])}>
                    <div className={classNames(Style['company-name'])}>
                    <img src={require('./images/logo.png').default} alt="" style={{width: "20%"}} onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        history.push('/main-entrance')
                    }}/>
                        <h2>ERUGO WORLD</h2>
                        
                    </div>
                    <div className={classNames(Style['menu-button-area'])}>
                        {/*
                        <div 
                        className={classNames(Style['menu-button'])} 
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            history.push('/home')
                        }}
                        >
                            CONCEPT1
                        </div>
                        <div 
                        className={classNames(Style['menu-button'])} 
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            history.push('/map')
                        }}
                        >
                            BUY LAND
                        </div>
                        <div 
                        className={classNames(Style['menu-button'])} 
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            history.push('/market')
                        }}
                        >
                            MARKET
                        </div>
                        <div 
                        className={classNames(Style['menu-button'])} 
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            history.push('/auction')
                        }}
                        >
                            AUCTION
                        </div>
*/}
                    </div>
                </div>

                {/*
                <div className={classNames(Style['start-button'])} onClick={() => { history.push('/home')}}>START NOW</div>
                */}
            </div>
        </div>
    )
}

export default HomePage2