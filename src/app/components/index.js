import React from "react";
import classNames from "classnames";
import Style from './components.module.css'
import { GrYoutube, GrBlog, GrTwitter } from 'react-icons/gr'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'


export const SButton = ({onClick, text}) => {
    return (
        <div 
        className={classNames(Style['wire-border'], Style['small-button'])}
        onClick={() => { if(onClick) onClick() }}
        >
            {text}
        </div>
    )
}

export const MButton = ({onClick, text}) => {
    return (
        <div 
        className={classNames(Style['wire-border'], Style['middle-button'])}
        onClick={() => { if(onClick) onClick() }}
        >
            {text}
        </div>
    )
}

export const LButton = ({onClick, text}) => {
    return (
        <div 
        className={classNames(Style['wire-border'], Style['large-button'])}
        onClick={() => { if(onClick) onClick() }}
        >
            {text}
        </div>
    )
}

export const Input = ({tag, placeholder, onChange, value}) => {
    return (
        <div className={classNames(Style['input-wrapper'])}>
            <div className={classNames(Style['input-tag'])}>{tag}</div>
            <div className={classNames(Style['input-field-wrapper'])}>
                <input 
                type="text"  
                className={classNames(Style['input-field'])} placeholder={placeholder} 
                value={value}
                onChange={
                    (e) => {
                        if(onChange) {
                            onChange(e.target.value)
                        }
                    }
                }
                />
            </div>
        </div>
    )
}

export const DataRow = ({tag, children}) => {
    return (
        <div className={classNames(Style['input-wrapper'])}>
            <div className={classNames(Style['input-tag'])}>{tag}</div>
            <div className={classNames(Style['input-field-wrapper'])}>
                <div className={classNames(Style['data-row-wrapper'])}>{children}</div>
            </div>
        </div>
    )
}

export const STitle = ({text}) => {
    return (
        <div className={classNames(Style['small-text'])}>{text}</div>
    )
}

export const MTitle = ({text}) => {
    return (
        <div className={classNames(Style['middle-text'])}>{text}</div>
    )
}

export const LTitle = ({text}) => {
    return (
        <div className={classNames(Style['large-text'])}>{text}</div>
    )
}

export const MenuBar = ({company, buttonGroup=[]}) => {
    return (
        <div className={classNames(Style['menubar-wrapper'])}>
            <div className={classNames(Style['menubar-company'])}>{company}</div>
            <div className={classNames(Style['menubar-button-group'])}>{buttonGroup}</div>
        </div>
    )
}

export const Image = ({children}) => {
    return (
        <div className={classNames(Style['image'])}>{children}</div>
    )
}

export const TextArea = () => {
    return (
        <div className={classNames(Style['text-area-wrapper'])}>
            <p className={classNames(Style['text-area'])}>
{
`
이루고 월드란 현실과의 연계를 지향하는 메타버스 플랫폼으로, 기존 플랫폼의 가상자산의 가치 및 트랜잭션의 양에만 집중하는 양산형 메타버스의 한계를 극복하고 지속 가능한 메타버스 플랫폼을 지향하고 있습니다.

이루고 월드가 추구하는 메타버스는 4가지의 원칙을 따르고 있습니다.
1. 누구나 쉽게 참여할 수 있는 낮은 진입장벽을 만든다.
2. 자체적으로 운용되고 발전하는 경제 생태계를 만든다.
3. 보다 강력한 현실과의 연계를 추구한다.
4. 기업과의 콜라보를 통한 메타버스 경제 생태계를 활성화 한다.

블록체인을 기반으로 메타버스와 입점업체, 유저를 연결시키는 '이루고월드 생태계 모델'을 가진 이루고월드는 독자적인 경제 생태계를 통해 지속적인 성장을 추구합니다.

이루고월드코인(EWC)이란, 메타버스 내 부동산, 상품, 용역, 아이템 등을 거래할 수 있는 가상자산입니다.

루고(RUGO)란, 실제 이루고월드 내에서 유통되는 통화로서 EWC를 기반으로 발행된 토큰입니다.

메타버스내에서 다양한 작업과 노력을 통해서 유저가 벌어들인 루고 토큰은 언제든지 EWC로 교환되어 적립할 수 있으며, EWC를 매각함으로써 현금화 하는 것도 가능합니다.

또한 이루고월드 내에서 입점업체가 지불하는 입점비, 광고비, 판매인센티브 등은 루고 형태로 유통되어 이루고월드의 경제 생태계를 발전시키게 됩니다.
`
}
            </p>
        </div>
    )
}

export const VideoPlayer = () => {
    return (
        <div className={classNames(Style['video'])}></div>
    )
}

export const Footer = () => {
    return (
        <div className={classNames(Style['footer'])}>
            <div className={classNames(Style['footer-inner-wrapper'])}>
                <div className={classNames(Style['footer-address'])}>
                Address : 129, Seochojungang-ro 8-gil, Gangnam-gu, Seoul, Republic of Korea
                </div>
                <div className={classNames(Style['footer-contact'])}>
                Phone : +82 2 545 0265 Email : 0265erugo@gmail.com
                </div>
                <div className={classNames(Style['footer-sns-link'])}>
                    <GrYoutube 
                        className="pointer"
                        onClick={
                            () => {
                                window.open('https://www.youtube.com/channel/UCj-Hyp1afwEgmSJ6gTYx4wA')
                            }
                        }
                    />
                    <GrBlog 
                        className="pointer"
                        onClick={
                            () => {
                                window.open('https://blog.naver.com/erugocoin_official')
                            }
                        }
                    />
                    <GrTwitter 
                        className="pointer"
                        onClick={
                            () => {
                                window.open('https://twitter.com/ErugoWorldCoin')
                            }
                        }
                    />
                </div>
                <div className={classNames(Style['footer-copy-rights'])}>Copyright © 2021 ERUGO World Coin All Right reserved</div>
            </div>
        </div>
    )
}

export const Map = ({children}) => {
    return (
        <div className={classNames(Style['map'])}>
            {children}
        </div>
    )
}

export const Plus = () => {
    return (
        <AiOutlinePlus />
    )
}

export const Minus = () => {
    return (
        <AiOutlineMinus />
    )
}

export const Table = ({children}) => {
    return (
        <div className={classNames(Style['table'])}>
            {children}
        </div>
    )
}

export const MarketRowHeader = ({tiles, user, value, buyHandler}) => {
    return (
        <div className={classNames(Style['market-row-border'])}>
            <div className={classNames(Style['market-row-tile-header'])}>Tiles</div>
            <div className={classNames(Style['market-row-owner-header'])}>User</div>
            <div className={classNames(Style['market-row-value-of-land-header'])}>Value Of Land</div>
            <div className={classNames(Style['market-row-action-header'])}>Action</div>
        </div>
    )
}

export const MarketRow = ({tiles, user, value, buyHandler}) => {
    return (
        <div className={classNames(Style['market-row-border'])}>
            <div className={classNames(Style['market-row-tile'])}>{tiles}</div>
            <div className={classNames(Style['market-row-owner'])}>{user}</div>
            <div className={classNames(Style['market-row-value-of-land'])}>{value}</div>
            <div className={classNames(Style['market-row-action'])}>
                <SButton text={'Buy'} onClick={() => {if(buyHandler) buyHandler()}}/>
            </div>
        </div>
    )
}

export const AuctionRowHeader = ({tiles, user, value, buyHandler}) => {
    return (
        <div className={classNames(Style['market-row-border'])}>
            <div className={classNames(Style['market-row-tile-header'])}>Tiles</div>
            <div className={classNames(Style['market-row-owner-header'])}>User</div>
            <div className={classNames(Style['market-row-owner-header'])}>Min Value</div>
            <div className={classNames(Style['market-row-value-of-land-header'])}>Due Date</div>
            <div className={classNames(Style['market-row-owner-header'])}>Applicants</div>
            <div className={classNames(Style['market-row-action-header'])}>Action</div>
        </div>
    )
}

export const AuctionRow = ({tiles, user, minValue, dueDate, applicants, buyHandler}) => {
    return (
        <div className={classNames(Style['market-row-border'])}>
            <div className={classNames(Style['market-row-tile'])}>{tiles}</div>
            <div className={classNames(Style['market-row-owner'])}>{user}</div>
            <div className={classNames(Style['market-row-value-of-land'])}>{minValue}</div>
            <div className={classNames(Style['market-row-value-of-land'])}>{dueDate}</div>
            <div className={classNames(Style['market-row-value-of-land'])}>{applicants}</div>
            <div className={classNames(Style['market-row-action'])}>
                <SButton text={'Apply'} onClick={() => {if(buyHandler) buyHandler()}}/>
            </div>
        </div>
    )
}

export const Pager = () => {
    return (
        <div className={classNames(Style['pager-wrapper'])}>
            <AiOutlineLeft />
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
            <AiOutlineRight />
        </div>
    )
}

export const Selector = ({options =[]}) => {
    let optionEles = []
    options.forEach((option, index) => {
        optionEles.push(
            <option key={`option-${index}`}>{option}</option>
        )
    })
    return (
        <select className={classNames(Style['selector'])}>{optionEles}</select>
    )
}

export const Card = ({children}) => {
    return (
        <div className={classNames(Style['card'])}>{children}</div>
    )
}

export const Center = ({width, height, children}) => {
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width,height}}>{children}</div>
    )
}