import React from 'react'
import Style from './style.module.css'
import { useHistory } from 'react-router-dom'

const Menu = ({ onClick, hideButton = false }) => {
    const history = useHistory()
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

                        
                        
                {/* <div 
                className={`${Style['top-menu-button']} ${Style['about-button']} pointer`}
                onClick={
                    () => {
                        onClick('about')
                        setTimeout(() => {
                            history.push('/main-entrance')
                        }, 200)
                    }
                }
                ></div>
                <div className={`${Style['top-menu-button']} ${Style['home-button']} pointer`}
                onClick={
                    () => {
                        onClick('home')
                        setTimeout(() => {
                            ('/main-entrance')
                        }, 200)
                    }
                }
                ></div>
                <div className={`${Style['top-menu-button']} ${Style['auction-button']} pointer`}></div>
                <div className={`${Style['top-menu-button']} ${Style['buy-land-button']} pointer`}
                onClick={
                    () => {
                        onClick('buyland')
                        setTimeout(() => {
                            history.push('/main-entrance')
                        }, 200)
                    }
                }
                ></div>
                <div className={`${Style['top-menu-button']} ${Style['log-in-button']} pointer`}
                onClick={
                    () => {
                        onClick('login')
                        setTimeout(() => {
                            history.push('/main-entrance')
                        }, 200)
                    }
                }
                ></div> */}
                <div className={`${Style['top-menu-button']} ${Style['my-page-button']} pointer`}
                onClick={
                    () => {
                        onClick('mypage')
                        setTimeout(() => {
                            history.push('/mypage')
                        }, 200)
                       
                    }
                }
                ></div>
                {/* <div className={`${Style['top-menu-button']} ${Style['sign-up-button']} pointer`}
                onClick={
                    () => {
                        onClick('signup')
                        setTimeout(() => {
                            history.push('/main-entrance')
                        }, 200)
                    }
                }
                ></div>
                <div className={`${Style['top-menu-button']} ${Style['market-button']} pointer`}
                onClick={
                    () => {
                        onClick('market')
                        setTimeout(() => {
                            history.push('/main-entrance')
                        }, 200)
                    }
                }
                ></div> */}
                {/* <div className={`${Style['lang-button']} pointer`}></div> */}
           
                    </div>
                    :
                    undefined
            }
        </div>
    )
}

export default Menu