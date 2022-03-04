import React from "react";
import classNames from "classnames";
import Style from './view-detail.module.css'
import { Card, Input, MButton } from '../../components'
import { Switch, Route } from 'react-router-dom'

const BuyLandSlot = () => {
    return (
        <div className={classNames(Style['bottom'])}>
            <div className={classNames(Style['bottom-row'])}>
                <div className={classNames(Style['point-wrpper'])}>
                    <MButton text={'Click To Buy'} />
                </div>
            </div>
        </div>
    )
}

const MarketSlot = () => {
    return (
        <div className={classNames(Style['bottom'])}>
            <div className={classNames(Style['bottom-row'])}>
                <div className={classNames(Style['point-wrpper'])}>
                    <MButton text={'Click To Buy'} />
                </div>
            </div>
        </div>
    )
}

const BidSlot = () => {
    return (
        <div className={classNames(Style['bottom'])}>
            <div className={classNames(Style['bottom-row-half'])}>
                <div className={classNames(Style['point-wrpper'])}>
                    Min Bid 200P
                </div>
            </div>
            <div className={classNames(Style['bottom-row-half'])}>
                <div className={classNames(Style['point-wrpper'])}>
                    <MButton text={'Click To Apply'} />
                </div>
            </div>
        </div>
    )
}

const Proposal = () => {
    return (
        <div className={classNames(Style['bottom'])}>
            <div className={classNames(Style['bottom-row'])}>
                <div className={classNames(Style['point-wrpper-proposal'])}>
                    <div className={classNames(Style['proposal-input-wrapper'])}><Input tag={'Value'}/></div>
                    <MButton text={'Click To Proposal'} />
                    <div style={{width:'10px'}}></div>
                </div>
            </div>
        </div>
    )
}

const ViewDetailPage = ({ menubar, footer }) => {
    return (
        <div className={classNames(Style['background'])}>
            {menubar}
            <div className={classNames(Style['body'])}>
                <div className={classNames(Style['body-inner-wrapper'])}>
                    <div className={classNames(Style['card-wrapper'])}>
                        <Card >
                            <div className={classNames(Style['card-inner-wrapper'])}>
                                <div className={classNames(Style['card-image-part'])}></div>
                                <div className={classNames(Style['card-info-part'])}>
                                    <div className={classNames(Style['card-row'])}>
                                        <div className={classNames(Style['card-row-name'])}>
                                            Tiles
                                        </div>
                                        <div className={classNames(Style['card-row-value'])}>
                                            80
                                        </div>
                                    </div>
                                    <div className={classNames(Style['card-row'])}>
                                        <div className={classNames(Style['card-row-name'])}>
                                            Owner
                                        </div>
                                        <div className={classNames(Style['card-row-value'])}>
                                            USER_002
                                        </div>
                                    </div>
                                    <div className={classNames(Style['card-row'])}>
                                        <div className={classNames(Style['card-row-name'])}>
                                            Value Of Land
                                        </div>
                                        <div className={classNames(Style['card-row-value'])}>
                                            120P
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className={classNames(Style['action-wrapper'])}>
                        <Switch>
                            <Route path="/view-detail/proposal">
                                <Proposal />
                            </Route>
                            <Route path="/view-detail/auction">
                                <BidSlot />
                            </Route>
                            <Route path="/view-detail/market">
                                <MarketSlot />
                            </Route>
                            <Route path="/view-detail/">
                                <BuyLandSlot />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
            {footer}
        </div>
    )
}

export default ViewDetailPage