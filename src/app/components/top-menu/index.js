import React, {useState} from 'react'
import Style from './style.module.css'
import { useHistory } from 'react-router-dom'

const Menu = ({ onClick, hideButton = false }) => {
    const history = useHistory()
    const [wrapperSlide, setWrapperSlide] = useState(-10);
    const [leftButtonDown, setLeftButtonDown] = useState(false);
    const [buttonDownStartPoint, setButtonDownStartPoint] = useState({
      startPoint: undefined,
    });
    const [detailFrameState, setDetailFrameState] = useState(undefined);
   
    return (
        <div className={Style['top-menu-background']}>
            <div
                className={`${Style['logo']} pointer`}
                onClick={
                    () => {
                        history.push('/main-entrance')
                    }
                }
            ></div>
            {
                !hideButton
                    ?
                    <div className={Style['top-menu-button-wrapper']}>
                        {/* Auction 페이지 */}
                        <div
                            className={`${Style['top-menu-button']} ${Style['auction-button']} pointer`}
                            onClick={
                                () => {
                                    onClick('auction')
                                    setTimeout(() => {
                                        history.push('/auction')
                                    }, 200)
                                }
                            }
                        ></div>
                        {/* my bid */}
                        <div
                            className={`${Style['top-menu-button']} ${Style['my-bid-button']} pointer`}
                            onClick={
                                () => {
                                    onClick('bid-list')
                                    setTimeout(() => {
                                        history.push('/bid-list')
                                    }, 200)
                                }
                            }
                        ></div>
                        {/* highest bid */}
                        <div
                            className={`${Style['top-menu-button']} ${Style['highest-bid-button']} pointer`}
                            onClick={
                                () => {
                                    onClick('highest-bid')
                                    setTimeout(() => {
                                        history.push('/highest-bid')
                                    }, 200)
                                }
                            }
                        ></div>
                        {/* my page */}
                <div className={`${Style['top-menu-button']} ${Style['my-page-button']} pointer`}
                onClick={
                    () => {
                        history.push('/main-entrance')
                        onClick('mypage')
                    }
                }
                ></div>
               
           
                    </div>
                    :
                    undefined
            }
        </div>
    )
}

export default Menu