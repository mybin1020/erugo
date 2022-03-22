import React, { useEffect, useState } from "react";
import Style from "./style.module.css";
import MyPageContent from "../../../my";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import NumberFormat from "react-number-format";
import { changePointEWC, readInfo, reqWithdrawCoin } from "../../../../api";

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
  ewc,
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
const characterName = ["ORBIT", "ETHER", "AMORA", "ASLAN", "AXIOM", "GOING"];
function ExchangeCharacter(inputNum) {
  if (inputNum >= 1 && inputNum < 10) {
    return characterName[0];
  }
  if (inputNum >= 10 && inputNum < 100) {
    return characterName[1];
  }
  if (inputNum >= 100 && inputNum < 1000) {
    return characterName[2];
  }
  if (inputNum >= 1000 && inputNum < 9999) {
    return characterName[3];
  }
  if (inputNum >= 10000) {
    return characterName[4];
  } else {
    return characterName[5];
  }
}

// 충전
const ExchangCoin = ({ SW, EW, coin, onClick }) => {
  const [tempCoin, setTempCoin] = useState(0);
  return (
    <>
      <h4 className={Style["info-title"]}>SecurityWallet에서 충전하기</h4>
      <div>
      <span className={Style["exErugoCoin"]} data-tip data-for="swewc3">
        {SW}
      </span>

      <input
        type={Text}
        className={Style["exErugoInput"]}
        value={tempCoin}
        onChange={(e) => {
          let withdrawCoin =
            e.target.value === "" ? 0 : parseInt(e.target.value);
          if (isNaN(withdrawCoin)) {
            return;
          }
          if (withdrawCoin > coin) {
            return;
          }
          setTempCoin(withdrawCoin);
        }}
      />

      <button
        className={Style["swExchange"]}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (onClick && typeof onClick === "function") {
            setTempCoin(0);
            onClick({ withdrawCoin: tempCoin });
          }
        }}
      >
        Exchange
      </button>
      </div>
      <span className={Style['swChange']}>
        ※ SecurityWallet EWC 개수는 
        <span style={{ color: "#64c9dc" }}>{coin}</span> 개 입니다
      </span>
      <div className={Style["line2"]}></div>
    </>
  );
};
const ExchangeRugo = ({ SW, EW, ewc, exchangeRate, onClick }) => {
  const [tempEWC, setTempEWC] = useState(0);
  const [tempRugo, setTempRugo] = useState(0);
  return (
    <>
      <div className={Style["ex-rugo-content"]}>
        <div className={Style["content-left"]}>
          <span className={Style["exRugo"]}>
            {SW}
          </span>

          <input
            type={Text}
            className={Style["exRugoInput"]}
            value={tempEWC}
            onChange={(e) => {
              let newTempEWC =
                e.target.value === "" ? 0 : parseInt(e.target.value);
              if (isNaN(newTempEWC)) {
                return;
              }
              if (newTempEWC > ewc) {
                return;
              }
              setTempEWC(newTempEWC);
              setTempRugo(exchangeRate * newTempEWC);
            }}
          />
        </div>

        <span className={Style["change-icon"]}>
          <img
            src={require("./images/icon3.png").default}
            alt=""
            width={"30px"}
          ></img>
        </span>

        <div className={Style["content-right"]}>
          <span className={Style["exRugo"]} data-tip data-for="ewewc4">
            {EW}
          </span>

          <input
            type={Text}
            className={Style["exRugoInput"]}
            value={tempRugo}
            onChange={(e) => {}}
            disabled
          />
        </div>
        <button
          className={Style["swExchange"]}
          onClick={(e) => {
            if (onClick && typeof onClick === "function") {
              onClick({ ewc: tempEWC, rugo: tempRugo });
              setTempEWC(0);
              setTempRugo(0);
            }
          }}
        >
          Exchange
        </button>
      </div>
    </>
  );
};

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
  setEWC,
  setSwId,
  ewc,
  swId,
  fees,
  setFees,
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
  // const todayVal = () => {
  //   var randomVal = Math.ramdom
  //   for(let i = 2500; i < 3000; i++) {
  //     var randomVal2 = Math.floor(randomVal*10 + i)
  //   }
  //   return randomVal2
  // }
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
  const [txValue, setTxValue] = useState('');
  const txHandler = (e) => {
    let txValue = e.target.value
    setTxValue(txValue)
  }
  return (
    <>
      <div
        style={{ overflowY: "auto" }} className={Style["mypage-bg"]}
        
      >
        <div className={Style["character"]}>
          <img
            className={Style["character-img"]}
            src={require(`./images/${ExchangeCharacter(coin)}.png`).default}
            alt=""
          />
          <h1 className={Style["characterName"]}>
            {ExchangeCharacter(coin)}
          </h1>
        </div>
        <div className={Style["container"]}>
          <div className={Style["mypageBox1"]}>
            {/* <div className={Style["pageBox1"]}> */}
              <div className={Style["address"]}>
                <table>
                  <tr>
                    <th>Email</th>
                    <td>{email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>

                    <td>
                    <NumberFormat
                      value= {phone}
                      displayType="text"
                     format="### - #### - ####"
                     mask="_"
                    />
                      
                    </td>
                  </tr>
                  <tr>
                    <th>Name</th>

                    <td>{name}</td>
                  </tr>
                  <tr>

                    <th>Wallet</th>
                    <td className={Style["wallet-width"]}>{walletAddress}</td>
                    {/* <CopyToClipboard key={walletAddress}>
                      <img src={require('./images/copy.png').default} alt="" data-tip
                        data-for="copy" style={{ cursor: "pointer", width: "25px" }} />
                    </CopyToClipboard> */}
                  </tr>
                </table>
              </div>
              <div className={Style["line"]}></div>
              <div className={Style["boxs"]}>
                <div className={`${Style.box1}`}>
                  <h4 className={Style["info-title"]}>SecurityWallet 정보</h4>

                  <span
                    className={Style["text-box"]}
                  
                  >
                    SW ETH
                  </span>
                 
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
                   
                  >
                    SW EWC
                  </span>
                 
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
                <div className={`${Style.box1}`}>
                  <h4 className={Style["info-title"]}>ErugoWorld 정보</h4>

                  <span
                    className={Style["text-box"]}
                    data-tip
                    data-for="ew-ewc3"
                  >
                    EW EWC
                  </span>
                  <span className={Style["num-box"]}>
                    <NumberFormat
                      value={ewc}
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
            {/* </div> */}
          </div>

          <div className={Style["mypageBox2"]}>
            {/* <div className={Style["pageBox2"]}> */}
              <div className={Style["exchange-xt"]}>
                <h4 className={Style["info-title"]}>거래소에서 충전하기</h4>

                <span
                  className={Style["input-content"]}
                  data-tip
                  data-for="xtcom"
                >
                  LBank
                </span>
                <div
                  className={Style["help-btn"]}
                  onClick={() => {
                    window.open().location.href =
                      "https://blog.naver.com/erugocoin_official/222663552969";
                  }}
                ></div>
               
                <input
                  type="text"
                  className={Style["input-box"]}
                  placeholder={" 추후 지원 예정 "}
                  value={txValue}
                  onChange={txHandler}
                />
                <div style={{ height: "1vh" }} />

                <div style={{ position: "relative" }}>
                  <ExchangCoin
                    SW={"SW EWC"}
                    coin={coin}
                    onClick={({ withdrawCoin }) => {
                      if (withdrawCoin > 0 && withdrawCoin <= coin) {
                        if (!window.confirm("EWC를 가져오시겠습니까?")) {
                          return;
                        }
                        reqWithdrawCoin({
                          uuid: userUUID,
                          coin: withdrawCoin,
                          callback: (err, res) => {
                            if (err) {
                              console.log(err);
                            } else {
                              if (res.result === "success") {
                                readInfo({
                                  uuid: userUUID,
                                  callback: (err, user) => {
                                    if (err) {
                                      console.log(err);
                                    } else {
                                      if (user.result === "success") {
                                        console.log(user);
                                        let coin = user.userInfo.coin;
                                        let ether = user.userInfo.ethAmount;
                                        let ewc = user.userInfo.ewc;
                                        let phone = user.userInfo.phone;
                                        let name = user.userInfo.name;
                                        let email = user.userInfo.email;
                                        let swId = user.userInfo.swId;
                                        let point = user.userInfo.point;
                                        let fees = user.userInfo.fees;
                                        setCoin(coin);
                                        setEther(ether);
                                        setEWC(ewc);
                                        setPhone(phone);
                                        setName(name);
                                        setEmail(email);
                                        setSwId(swId);
                                        setPoints(point);
                                        setFees(fees);
                                        window.alert(
                                          "EWC를 Security Wallet으로 부터 가져오는 데 성공하였습니다."
                                        );
                                      }
                                    }
                                  },
                                });
                              } else {
                                console.log(res);
                                window.alert(
                                  "EWC를 가져오는 데 실패하였습니다. Security Walle으로 부터의 Error Msg:" +
                                    res.data.err
                                );
                              }
                            }
                          },
                        });
                      } else {
                        window.alert(
                          `이루고 월드로 가져올 코인은 0보다 크고 ${Number(
                            coin
                          )}보다 작아야 합니다.`
                        );
                      }
                    }}
                  />

                 
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
                  <h4
                    className={Style["info-title"]}
                    data-tip
                    data-for="rugo-change"
                  >
                    <div style={{ height: "1vh" }} />
                    RUGO로 변환하기
                  </h4>

                  <ExchangeRugo
                    SW={"EW EWC"}
                    EW={"EW Rugo"}
                    ewc={ewc}
                    exchangeRate={exchangeRate}
                    onClick={(data) => {
                      if (data.rugo > 0 && data.ewc > 0) {
                        if (
                          !window.confirm(
                            `EWC ${data.ewc}개를 Rugo ${data.rugo}개로 전환하시겠습니까?`
                          )
                        ) {
                          return;
                        }
                        changePointEWC({
                          uuid: userUUID,
                          ewc: data.ewc,
                          point: data.rugo,
                          callback: (err, res) => {
                            if (err) {
                              console.log(err);
                            } else {
                              if (res.result === "success") {
                                readInfo({
                                  uuid: userUUID,
                                  callback: (err, user) => {
                                    if (err) {
                                      console.log(err);
                                    } else {
                                      if (user.result === "success") {
                                        console.log(user);
                                        let coin = user.userInfo.coin;
                                        let ether = user.userInfo.ethAmount;
                                        let ewc = user.userInfo.ewc;
                                        let phone = user.userInfo.phone;
                                        let name = user.userInfo.name;
                                        let email = user.userInfo.email;
                                        let swId = user.userInfo.swId;
                                        let point = user.userInfo.point;
                                        let fees = user.userInfo.fees;
                                        setCoin(coin);
                                        setEther(ether);
                                        setEWC(ewc);
                                        setPhone(phone);
                                        setName(name);
                                        setEmail(email);
                                        setSwId(swId);
                                        setPoints(point);
                                        setFees(fees);
                                        window.alert("전환에 성공하였습니다.");
                                      }
                                    }
                                  },
                                });
                              } else {
                                console.log(res);
                              }
                            }
                          },
                        });
                      } else {
                        window.alert("전환하려는 EWC은 0보다 커야 합니다.");
                      }
                    }}
                  />
                  <div
                    className={Style["rugo-change-info"]}
                   
                  >

                    CURRENT EXCHANGE RATE : 1 Erugo Coin = <span style={{color: "blue"}}>
                    <NumberFormat
                      value= {exchangeRate}
                      displayType="text"
                      thousandSeparator={true} 
                    />
                      </span> Point
                  </div>
                </div>
              </div>
              <button
                className={Style["logout-btn"]}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setUserUUID(undefined);
                  sessionStorage.removeItem("userUUID");
                  sessionStorage.removeItem("wallet");
                  // history.push("/main-entrance");
                  alert("로그아웃 되었습니다");
                  window.location.reload();
                }}
              >
                로그아웃
              </button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;