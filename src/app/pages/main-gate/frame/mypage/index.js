import React, { useEffect, useState } from "react";
import Style from "./style.module.css";
import MyPageContent from "../../../my";
import { useHistory, Link } from "react-router-dom";
import Home from "../home/index";
// 툴팁 라이브러리 설치했습니다
import ReactTooltip from "react-tooltip";
import "bootstrap/dist/css/bootstrap.min.css";
// 부트스트랩 라이브러리 설치했습니다.
import { Container, Row, Col } from "react-bootstrap";
import NumberFormat from "react-number-format";
// import styles from './OtherNumberFormat.module.scss'
import { GiConfirmed } from "react-icons/gi";
// react-responsive 설치했습니다
import { useMediaQuery } from 'react-responsive'

const MyPage2 = ({
  menubar,
  footer,
  points,
  setPoints,
  userUUID,
  walletAddress,
  setLoading,
  setUserUUID,
  setExchangeRate,
  exchangeRate,
  setCoin,
  coin,
  setEmail,
  email,
  setName,
  name,
  setPhone,
  phone,
  setEther,
  ether,
  setTempPoint,
  setTempCoin,
  tempPoint,
  tempCoin,
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  });
  return (
    <div className={Style["ground"]}>
      {userUUID ? (
        <MyPageContent
          menubar={menubar}
          footer={footer}
          points={points}
          setPoints={setPoints}
          userUUID={userUUID}
          walletAddress={walletAddress}
          setLoading={setLoading}
          setUserUUID={setUserUUID}
          setExchangeRate={setExchangeRate}
          exchangeRate={exchangeRate}
          setCoin={setCoin}
          coin={coin}
          setEmail={setEmail}
          email={email}
          setName={setName}
          name={name}
          setPhone={setPhone}
          phone={phone}
          setEther={setEther}
          ether={ether}
          setTempPoint={setTempPoint}
          setTempCoin={setTempCoin}
          tempPoint={tempPoint}
          tempCoin={tempCoin}
        />
      ) : undefined}
    </div>
  );
};
const characterName = ["dei", "ego", "el", "going"];
function ExchangeCharacter(inputNum) {
  if (inputNum >= 1 && inputNum < 10) {
    return characterName[0];
  }
  if (inputNum >= 10 && inputNum < 100) {
    return characterName[1];
  }
  if (inputNum >= 100 && inputNum < 1000) {
    return characterName[2];
  } else return characterName[3];
}

const ExchangeEwcCoin = ({ ether, coin, points }) => {
  return (
    <>
      <span className={Style["exRugo"]} data-tip data-for="swewc1">
        SW EWC
      </span>
      <ReactTooltip
        id="swewc1"
        place="left"
        effect="solid"
        backgroundColor="rgba(100,201,200,0.7)"
      >
        <span>SecurityWallet의 EWC개수 </span>
        {/*언어변수값 들어갈곳*/}
      </ReactTooltip>
      <span className={Style["exRugoInput"]}>
        <NumberFormat
          value={ether}
          thousandsGroupStyle="thousand"
          type="text"
          displayType="text"
          thousandSeparator={true}
          allowNegative={true}
        />
      </span>

      <span className={Style["change-icon"]}>
        <img
          src={require("./images/icon3.png").default}
          alt=""
          width={"35px"}
        ></img>
      </span>

      <span className={Style["exRugo"]} data-tip data-for="ewewc2">
        EW EWC
      </span>
      <ReactTooltip
        id="ewewc2"
        place="left"
        effect="solid"
        backgroundColor="rgba(100,201,200,0.7)"
      >
        <span>Erugo World의 EWC(Point)개수 </span>
        {/*언어변수값 들어갈곳*/}
      </ReactTooltip>
      <div type={Text} className={Style["exRugoInput"]}>
        <NumberFormat
          value={ether}
          thousandsGroupStyle="thousand"
          type="text"
          displayType="text"
          thousandSeparator={true}
          allowNegative={true}
        />
      </div>
      <button className={Style["exchange"]}>Exchange</button>
      {/*언어변수값 들어갈곳*/}
    </>
  );
};

// 충전
const ExchangeRugo = (props) => {
  return (
    <>
      <span className={Style["exRugo"]} data-tip data-for="swewc3">
      {props.SW}
      </span>
      {/* <ReactTooltip
        id="swewc3"
        place="left"
        effect="solid"
        backgroundColor="rgba(100,201,200,0.7)"
      >
        <span>Erugo World의 EWC(Point)개수 </span>
      </ReactTooltip> */}
      <input type={Text} className={Style["exRugoInput"]} placeholder={" 0 "} />

      <span className={Style["change-icon"]}>
        <img
          src={require("./images/icon3.png").default}
          alt=""
          width={"35px"}
        ></img>
      </span>

      <span className={Style["exRugo"]} data-tip data-for="ewewc4">
        {props.EW}
      </span>
      {/* <ReactTooltip
        id="ewewc4"
        place="left"
        effect="solid"
        backgroundColor="rgba(100,201,200,0.7)"
      >
        <span>Erugo World의 RUGO(Point)개수 </span>
      </ReactTooltip> */}
      <input type={Text} className={Style["exRugoInput"]} placeholder={" 0 "} />
      <button className={Style["exchange"]}>Exchange</button>
    </>
  );
};

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}


// page
const MyPage = ({
  menubar,
  footer,
  points,
  setPoints,
  userUUID,
  walletAddress,
  setLoading,
  setUserUUID,
  setExchangeRate,
  exchangeRate,
  setCoin,
  coin,
  setEmail,
  email,
  setName,
  name,
  setPhone,
  phone,
  setEther,
  ether,
  setTempPoint,
  setTempCoin,
  tempPoint,
  tempCoin,
}) => {
  const history = useHistory();
  const [accountCheck, setAccountCheck] = useState(new Set());
  const accountCheckHandler = (amount, isChecked) => {
    if (isChecked) {
      accountCheck.add(amount);
      setAccountCheck(accountCheck);
    } else if (!isChecked && accountCheck.has(amount)) {
      accountCheck.delete(amount);
      setAccountCheck(accountCheck);
    }
  };
  // console.log(`email : ${email}`);
  const todayVal = () => {
    var randomVal = Math.ramdom
    for(let i = 2500; i < 3000; i++) {
      var randomVal2 = Math.floor(randomVal*10 + i)
    }
    return randomVal2
  }
  //   const Input = ({ type='text', inputElement = null, style = {}, value, onChange, customEle }) => {
  //     return (
  //         <div style={{ width: '10%', height: '80px', display: 'flex', justifyContent: 'center', flexDirection: 'column', fontSize: '12px' }}>
  //             <div style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
  //                 <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}></div>
  //                 <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>{customEle}</div>
  //             </div>
  //             <div style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  //                 {
  //                     inputElement ? inputElement :
  //                         <input
  //                         type='text'
  //                             className={Style['input']}
  //                             style={{ width: '100%', height: '100%', padding: '10px', borderRadius: '4px', ...style }}
  //                             value={value}
  //                             onChange={
  //                                 (e) => {
  //                                     if (onChange && typeof onChange === 'function') {
  //                                         onChange(e.target.value)
  //                                     }
  //                                 }
  //                             }
  //                         />
  //                 }
  //             </div>
  //         </div>
  //     )
  // }

  return (
    <>
      <div style={{ overflowY: "auto" }} className={Style["mypage-bg"]}>
        <div className={Style["character"]}>
          <img
            className={Style["character-img"]}
            src={require(`./images/${ExchangeCharacter(coin)}.png`).default}
            alt=""
          />
        </div>
        <div className={Style["container"]}>
          <div className={Style["mypageBox1"]}>
            <div className={Style["pageBox1"]}>
              <div className={Style["address"]}>
                <table>
                  <tr>
                    <th>Email</th>
                    {/*언어변수값 들어갈곳*/}
                    <td>{email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    {/*언어변수값 들어갈곳*/}
                    <td>{phone}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    {/*언어변수값 들어갈곳*/}
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <th>Wallet</th>
                    <td className={Style["wallet-width"]}>{walletAddress}</td>
                  </tr>
                </table>
              </div>
              <div className={Style["line"]}></div>
              <div className={Style["boxs"]}>
                <div className={`${Style.box1} ${Style.boxLeft}`}>
                  <div className={Style["info-title"]}>SecurityWallet 정보</div>
                  {/*언어변수값 들어갈곳*/}
                  <span
                    className={Style["text-box"]}
                    data-tip
                    data-for="sw-eth"
                  >
                    SW ETH
                  </span>
                  <ReactTooltip
                    id="sw-eth"
                    place="top"
                    effect="solid"
                    backgroundColor="rgba(100,201,200,0.7)"
                  >
                    <span>SecurityWallet의 이더리움 개수</span>
                    {/*언어변수값 들어갈곳*/}
                  </ReactTooltip>
                  <span className={Style["num-box"]}>
                    <NumberFormat
                      value={ether}
                      thousandsGroupStyle="thousand"
                      type="text"
                      displayType="text"
                      thousandSeparator={true}
                      allowNegative={true}
                    />
                  </span>
                </div>
                <div className={`${Style.box1} ${Style.boxLeft}`}>
                  <span
                    className={Style["text-box"]}
                    data-tip
                    data-for="sw-ewc2"
                  >
                    SW EWC
                  </span>
                  <ReactTooltip
                    id="sw-ewc2"
                    place="top"
                    effect="solid"
                    backgroundColor="rgba(100,201,200,0.7)"
                  >
                    <span>SecurityWallet의 EWC개수</span>
                    {/*언어변수값 들어갈곳*/}
                  </ReactTooltip>
                  <span className={Style["num-box"]}>
                    <NumberFormat
                      value={ether}
                      thousandsGroupStyle="thousand"
                      type="text"
                      displayType="text"
                      thousandSeparator={true}
                      allowNegative={true}
                    />
                  </span>
                </div>
                <div className={`${Style.box1} ${Style.boxRight}`}>
                  <div className={Style["info-title"]}>ErugoWorld 정보</div>
                  {/*언어변수값 들어갈곳*/}
                  <span
                    className={Style["text-box"]}
                    data-tip
                    data-for="ew-ewc3"
                  >
                    EW EWC
                  </span>
                  <ReactTooltip
                    id="ew-ewc3"
                    place="top"
                    effect="solid"
                    backgroundColor="rgba(100,201,200,0.7)"
                  >
                    <span>Erugo World의 EWC(Point)개수</span>
                    {/*언어변수값 들어갈곳*/}
                  </ReactTooltip>
                  <span className={Style["num-box"]}>
                    <NumberFormat
                      value={coin}
                      thousandsGroupStyle="thousand"
                      type="text"
                      displayType="text"
                      thousandSeparator={true}
                      allowNegative={true}
                    />
                  </span>
                </div>
                <div className={`${Style.box1} ${Style.boxRight}`}>
                  <span
                    className={Style["text-box"]}
                    data-tip
                    data-for="ew-rugo"
                  >
                    EW Rugo
                  </span>
                  <ReactTooltip
                    id="ew-rugo"
                    place="top"
                    effect="solid"
                    backgroundColor="rgba(100,201,200,0.7)"
                  >
                    <span>Erugo World의 Rugo 개수</span>
                    {/*언어변수값 들어갈곳*/}
                  </ReactTooltip>
                  <span className={Style["num-box"]}>
                    <NumberFormat
                      value={points}
                      thousandsGroupStyle="thousand"
                      type="text"
                      displayType="text"
                      thousandSeparator={true}
                      allowNegative={true}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={Style["mypageBox2"]}>
            <div className={Style["pageBox2"]}>
              <div className={Style["exchange-xt"]}>
                <div className={Style["title"]}>거래소에서 충전하기</div>
                {/*언어변수값 들어갈곳*/}
                <span
                  className={Style["input-content"]}
                  data-tip
                  data-for="xtcom"
                >
                  XT.COM
                </span>
                <ReactTooltip
                  id="xtcom"
                  place="left"
                  effect="solid"
                  backgroundColor="rgba(100,201,200,0.5)"
                >
                  <span>거래소 XT.COM</span>
                  {/*언어변수값 들어갈곳*/}
                </ReactTooltip>
                <input
                  type="text"
                  className={Style["input-box"]}
                  placeholder={" TX(transaction hash)값"}
                />
               
                <div className={Style["xtScale"]}>
                  <button
                    data-tip
                    data-for="info"
                    id="xtComInfo"
                    className={Style["xtComInfo"]}
                    onClick={() => {
                      history.push(
                        "https://blog.naver.com/erugocoin_official/222663552969"
                      );
                    }}
                  >
                    <ReactTooltip id="info" place="left" effect="solid" backgroundColor="rgba(100,201,200,0.7)">
                      <span>자세한 설명은 클릭</span>
                      {/*언어변수값 들어갈곳*/}
                    </ReactTooltip>
                  </button>
                  <input
                    type="checkbox"
                    className={Style["amountCheck"]}
                    onClick={accountCheckHandler}
                    customEle={
                      <GiConfirmed
                        style={{ marginRight: "10px" }}
                        fontSize={"22px"}
                        // color={password === passwordConfirm && password !== '' ? 'rgba(0,150,0,1)' : 'rgba(250,0,0, 1)'}
                        color={"green"}
                      />
                    }
                  />
                  {/* <Input
                      style={{ backgroundColor: coin === setTempCoin ? 'white' : 'rgba(250,200,200, 0.4)' }}
                      // onChange={
                      //     (passwordConfirm) => {
                      //         setPasswordConfirm(passwordConfirm)
                      //     }
                      // }
                      customEle={<GiConfirmed style={{ marginRight: '10px' }} fontSize={'22px'} color={coin === setTempCoin && coin !== '' ? 'rgba(0,150,0,1)' : 'rgba(250,0,0, 1)'} />}
                  /> */}
                </div>
                <div className={Style["sw-content"]}>
                  <span
                    className={Style["title"]}
                    data-tip
                    data-for="sw-change"
                  >
                    SecurityWallet 충전하기
                  </span>
                  <ExchangeRugo SW={'SW EWC'} EW={'EW EWC'}/>


                  <ReactTooltip
                    id="sw-change"
                    place="top"
                    effect="solid"
                    backgroundColor="rgba(70,201,200,0.7)"
                  >
                    <span>
                      SecurityWallet에 있는 EWC를 ErugoWorld EWC로 충전시키기
                    </span>
                    {/*언어변수값 들어갈곳*/}
                  </ReactTooltip>
                  <div
                    className={Style["help-btn"]}
                    onClick={() => {
                      history.push(
                        "https://blog.naver.com/erugocoin_official/222663552969"
                      );
                    }}
                  ></div>
                </div>
              </div>
              <div className={Style["bg-down"]}>
                <div className={Style["box-bottom"]}>
                  <span
                    className={Style["title"]}
                    data-tip
                    data-for="rugo-change"
                  >
                    RUGO로 변환하기
                  </span>
                  {/*언어변수값 들어갈곳*/}
                  <ReactTooltip
                    id="rugo-change"
                    place="top"
                    effect="solid"
                    backgroundColor="rgba(70,201,200,0.7)"
                  >
                    <span>EWC를 RUGO로 변환시켜드립니다.</span>
                    {/*언어변수값 들어갈곳*/}
                  </ReactTooltip>
                  <div
                    className={Style["help-btn"]}
                    onClick={() => {
                      history.push(
                        "https://blog.naver.com/erugocoin_official/222663552969"
                      );
                    }}
                  ></div>
                  <ExchangeRugo SW={'EW EWC'} EW={'EW Rugo'}/>
                  <p>CURRENT EXCHANGE RATE : 1 Erugo Coin = {todayVal()} Point </p>
                </div>
              </div>
              <button
                className={Style["logout-btn"]}
                onClick={() => {
                  setUserUUID(undefined);
                  sessionStorage.removeItem("userUUID");
                  sessionStorage.removeItem("walletAddress");
                  history.push("/main-entrance");
                }}
              >
                로그아웃
              </button>
              {/*언어변수값 들어갈곳*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;
