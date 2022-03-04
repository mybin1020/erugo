const Host = "https://erugo-world-api.appzero.services"

const getData = ({ path, method, data, callback }) => {
    let _method_ = method
    if (!_method_) {
        _method_ = 'post'
    }
    fetch(`${Host}${path}`, {
        method: _method_,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((r) => {
            return r.json()
        })
        .then((d) => {
            callback(undefined, d)
        })
        .catch((e) => {
            console.log(e)
            callback(e)
        })
}

export const requestLogin = ({ email, password, callback }) => {
    getData({
        path: '/users/login',
        data: {
            type: 'reqLogin',
            data: { email, password }
        },
        callback
    })
}

export const getMapBlockData = ({ mapId, blockX, blockY, callback }) => {
    getData({
        path: '/map/read-block-data',
        data: {
            mapId, blockX, blockY
        },
        callback
    })
}
export const readInfo = ({ uuid, callback }) => {
    getData({
        path: '/users/info',
        data: {
            uuid
        },
        callback
    })
}
export const reqSMSAuthCode = ({ country_dial, phone, callback }) => {
    getData({
        path: '/users/sms-auth',
        data: {
            country_dial, phone
        },
        callback
    })
}
export const reqJoin = ({
    email,
    countryDial,
    name,
    password,
    phone,
    pin,
    callback
}) => {
    getData({
        path: '/users/sign-up',
        data: {
            email,
            countryDial,
            name,
            password,
            phone,
            pin
        },
        callback
    })
}
export const reqMemberInfo = ({ id, callback }) => {
    getData({
        path: '/users/check-id',
        data: {
            id
        },
        callback
    })
}
export const reqResetPassword = ({ uuid, new_password, callback }) => {
    getData({
        path: '/users/reset-password',
        data: {
            uuid, new_password
        },
        callback
    })
}
export const reqWithdrawCoin = ({ uuid, coin, callback }) => {
    getData({
        path: '/users/withdraw-coin',
        data: {
            uuid, coin
        },
        callback
    })
}
export const getPointAmount = ({ uuid, callback }) => {
    getData({
        path: '/users/point/get-amount',
        data: {
            uuid
        },
        callback
    })
}
export const applyAuction = ({
    applicant,
    bidPriceList,
    totalBidPrice,
    tbIdxList,
    mapId,
    blockX,
    blockY,
    gridXList,
    gridYList,
    callback
}) => {
    getData({
        path: '/users/auction/apply',
        data: {
            applicant, bidPriceList, tbIdxList, mapId, blockX, blockY,
            gridXList, gridYList, totalBidPrice
        },
        callback
    })
}
export const getMailList = ({ uuid, callback }) => {
    getData({
        path: '/users/mail/list',
        data: {
            uuid
        },
        callback
    })
}
export const getMinBid = ({ callback }) => {
    getData({
        path: '/map/auction/min-bid',
        callback
    })
}
export const getMaxBidList = ({ tbIdxList, callback }) => {
    getData({
        path: '/map/auction/get-max-bid',
        data: {
            tbIdxList
        },
        callback
    })
}
export const getMyBidList = ({ userUUID, callback }) => {
    getData({
        path: '/users/auction/my-list',
        data: {
            userUUID
        },
        callback
    })
}
export const withdrawalBid = ({ applicantIdx, userUUID, returnPoints, tbIdx, callback }) => {
    getData({
        path: '/users/auction/withdrawal',
        data: {
            applicantIdx,
            userUUID,
            returnPoints,
            tbIdx
        },
        callback
    })
}
export const highestBidList = ({ orderType, callback }) => {
    getData({
        path: '/map/auction/highest-bid',
        data: {
            orderType
        },
        callback
    })
}
export const getLanguageData = ({ callback }) => {
    getData({
        path: '/map/language',
        callback
    })
}
export const getAuctionClose = ({ callback }) => {
    getData({
        path: '/map/auction/auction-close',
        callback
    })
}
export const getMyLandOpen = ({ callback }) => {
    getData({
        path: '/map/my-land-open',
        callback
    })
}
export const getMyLandList = ({ userUUID, callback }) => {
    getData({
        path: '/users/my-land-list',
        data: {
            uuid: userUUID
        },
        callback
    })
}
export const checkMyIp = ({ callback }) => {
    fetch('https://www.erugocoin.com/ip-check', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then((r) => { return r.json() })
        .then((d) => {
            console.log(d.ip)
            let myIp = d.ip.split('::ffff:')[1]
            callback(undefined, myIp)
        })
        .catch((e) => {
            callback(e)
        })
}
export const allowedIp = ({ ip, callback }) => {
    getData({
        path:'/users/ip-allowed',
        data : {
            ip
        },
        callback
    })
}
export const getMyBidListOnMapPage = ({blockX, blockY, applicant, callback}) => {
    getData({
        path:'/users/auction/bid-list-on-map',
        data:{
            blockX, blockY, applicant
        },
        callback
    })
}