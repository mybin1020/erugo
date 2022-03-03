import React from "react";
import classNames from "classnames";
import Style from './auction.module.css'
import {  Table, AuctionRow, AuctionRowHeader, Pager, Selector  } from '../../components'
import { useHistory } from "react-router";

const AuctionPage = ({menubar, footer}) => {
    const history = useHistory()
    return (
        <div className={classNames(Style['background'])}>
            {menubar}
            <div className={classNames(Style['body'])}>
                <div className={classNames(Style['body-inner-wrapper'])}>
                    <div className={classNames(Style['filter-wrapper'])}>
                        <Selector
                            options={
                                ['Land Value Low', 'Land Value High', 'Most Tiles', 'Recent']
                            }
                        />
                    </div>
                    <Table>
                        <AuctionRowHeader />
                        <AuctionRow tiles={4} user={'USER_001'} minValue={'20P'} dueDate={'2021.10.20'} applicants={8}  buyHandler={() => {history.push('/view-detail/auction')}}/>
                        <AuctionRow tiles={8} user={'USER_002'} minValue={'30P'} dueDate={'2021.10.22'} applicants={12}  buyHandler={() => {history.push('/view-detail/auction')}}/>
                        <AuctionRow tiles={12} user={'USER_003'} minValue={'40P'} dueDate={'2021.10.28'} applicants={23}  buyHandler={() => {history.push('/view-detail/auction')}}/>
                        <AuctionRow tiles={20} user={'USER_004'} minValue={'20P'} dueDate={'2021.11.02'} applicants={40}  buyHandler={() => {history.push('/view-detail/auction')}}/>
                        <AuctionRow tiles={16} user={'USER_005'} minValue={'25P'} dueDate={'2021.11.10'} applicants={2}  buyHandler={() => {history.push('/view-detail/auction')}}/>
                        <AuctionRow tiles={12} user={'USER_006'} minValue={'25P'} dueDate={'2021.11.20'} applicants={9}  buyHandler={() => {history.push('/view-detail/auction')}}/>
                        <AuctionRow tiles={20} user={'USER_007'} minValue={'35P'} dueDate={'2021.12.20'} applicants={56}  buyHandler={() => {history.push('/view-detail/auction')}}/>
                        <AuctionRow tiles={16} user={'USER_008'} minValue={'120P'} dueDate={'2021.12.25'} applicants={23}  buyHandler={() => {history.push('/view-detail/auction')}}/>
                        <Pager />
                    </Table>
                </div>
            </div>
            {footer}
        </div>
    )
}

export default AuctionPage