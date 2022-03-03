import React, { useEffect, useState } from "react";
import Style from './style.module.css'
import MyPageContent from "../../../my";

/*
1. css class는 Style['{css module 파일에서의 클래스 이름}'] 으로 사용합니다.
2. 두개 이상의 클래스 사용은 className={`Style['classname1'] Style['classname2']`}로 정의 합니다.
3. html은 반드시 react component의 return ({컴포넌트 위치}) 안쪽에 위치해야 합니다.
4. css파일이 아닌 인라인 형식을 사용할 경우 style={}으로 표시되면 {} 오브젝트로 값을 넘겨주어야 합니다.
5. 또한 style 오브젝트의 css 프로퍼티 이름은 카멜표기를 따릅니다. ex ) font-weight => fontWeight, font-size => fontSize
6. img element에서 이미지를 불러올 때는 public 폴더에서 불러 오게 됩니다. 따라서 해당 public은 root 폴더가 되므로 /images, /assets등으로 시작합니다.
7. 반면 css에서 background-image로 적용할 경우에는 css module에 의해 적용되므로 about폴더의 내부 images 폴더에서 이미지를 로드 합니다. 자세한 
경로는 style.module.css를 확인합니다. 
*/
// const MyPage = ({ menubar, footer, points, setPoints, userUUID, walletAddress, setLoading, setUserUUID,
//     setExchangeRate, exchangeRate, setCoin, coin, setEmail, email, setName, name, setPhone, phone, setEther, ether,
//     setTempPoint, setTempCoin, tempPoint, tempCoin

// }) => {
//     const [show, setShow] = useState(false)
//     useEffect(() => {
//         setShow(true)
//     })
//     return (
//         <div className={Style['ground']}>
//             {
//                 userUUID
//                     ?
//                     <MyPageContent
//                         menubar={menubar}
//                         footer={footer}
//                         points={points}
//                         setPoints={setPoints}
//                         userUUID={userUUID}
//                         walletAddress={walletAddress}
//                         setLoading={setLoading}
//                         setUserUUID={setUserUUID}
//                         setExchangeRate={setExchangeRate}
//                         exchangeRate={exchangeRate}
//                         setCoin={setCoin}
//                         coin={coin}
//                         setEmail={setEmail}
//                         email={email}
//                         setName={setName}
//                         name={name}
//                         setPhone={setPhone}
//                         phone={phone}
//                         setEther={setEther}
//                         ether={ether}
//                         setTempPoint={setTempPoint}
//                         setTempCoin={setTempCoin}
//                         tempPoint={tempPoint}
//                         tempCoin={tempCoin}
//                     />
//                     :
//                     undefined
//             }
//         </div>

//     )
// }
const characterName = ['dei', 'ego', 'el', 'going', 'monglong1, monglong2'];
function character(inputNum){
    if(inputNum>=1 && inputNum < 10) {
        return characterName[0];
       
    }
    if(inputNum>=10 && inputNum < 100) {
        return characterName[1];
    }
    if(inputNum>=100 && inputNum < 1000) {
        return characterName[3];
    }
    else
        return characterName[4];
};
const MyPage = () => {
    return (
        <div className={Style['ground']}>
            <div className={Style['character']}>
                <img src={require(`./images/${characterName[1]}.png`)} alt="" style={{width:'55px'}}></img>
            </div>
            <div className={Style['big-bg']}>
            <div className={Style['bg']}>
            <div className={Style['left']}>
            <div className={Style['address']}>
                <table>
                    <tbody>
                        <tr className={Style['tr']}>
                            <th>Email</th>
                            <td>test01@test.com</td>
                        </tr>
                        <tr className={Style['tr']}>
                            <th>Phone</th>
                            <td>010-8206-0268</td>
                        </tr>
                        <tr className={Style['tr']}>
                            <th>Name</th>
                            <td>test01</td>
                        </tr>
                        <tr className={Style['tr']}>
                            <th>Wallet</th>
                            <td>0x4d3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default MyPage