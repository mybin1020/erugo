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


const ExchangeEwcCoin = () => {
  return(
    <>
    <span
    className={Style["exRugo"]}
    data-tip
    data-for="swewc1"
  >
    SW EWC
  </span>
  <ReactTooltip
    id="swewc1"
    place="left"
    effect="solid"
    backgroundColor="rgba(100,201,200,0.7)"
  >
    <span>SecurityWallet의 EWC개수 </span>{/*언어변수값 들어갈곳*/}
  </ReactTooltip>
  <input
    type={Text}
    className={Style["exRugoInput"]}
    placeholder={" 0 "}
  />
  
  <span className={Style['change-icon']}><img src={require('./images/change-icon.png').default} alt="" width={'35px'}></img></span>

  <span
    className={Style["exRugo"]}
    data-tip
    data-for="ewewc2"
  >
    EW EWC
  </span>
  <ReactTooltip
    id="ewewc2"
    place="left"
    effect="solid"
    backgroundColor="rgba(100,201,200,0.7)"
  >
    <span>Erugo World의 EWC(Point)개수 </span>{/*언어변수값 들어갈곳*/}
  </ReactTooltip>
  <input
    type={Text}
    className={Style["exRugoInput"]}
    placeholder={" 0 "}
  />
  <button className={Style["exchange"]}>Exchange</button>{/*언어변수값 들어갈곳*/}
  </>
  );
}
const ExchangeRugo = () => {
  return(
    <>
    <span
    className={Style["exRugo"]}
    data-tip
    data-for="swewc3"
  >
    EW EWC
  </span>
  <ReactTooltip
    id="swewc3"
    place="left"
    effect="solid"
    backgroundColor="rgba(100,201,200,0.7)"
  >
    <span>Erugo World의 EWC(Point)개수 </span>{/*언어변수값 들어갈곳*/}
  </ReactTooltip>
  <input
    type={Text}
    className={Style["exRugoInput"]}
    placeholder={" 0 "}
  />
  
  <span className={Style['change-icon']}><img src={require('./images/change-icon.png').default} alt="" width={'35px'}></img></span>

  <span
    className={Style["exRugo"]}
    data-tip
    data-for="ewewc4"
  >
    EW RUGO
  </span>
  <ReactTooltip
    id="ewewc4"
    place="left"
    effect="solid"
    backgroundColor="rgba(100,201,200,0.7)"
  >
    <span>Erugo World의 RUGO(Point)개수 </span>{/*언어변수값 들어갈곳*/}
  </ReactTooltip>
  <input
    type={Text}
    className={Style["exRugoInput"]}
    placeholder={" 0 "}
  />
  <button className={Style["exchange"]}>Exchange</button>{/*언어변수값 들어갈곳*/}
  </>
  );
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
  console.log(`email : ${email}`)
  return (
    <>
 <Container>
        <Row>
          <Col md={2} lg={2} xxl={2}>
            <div className={Style["character"]}>
              <img className={Style["character-img"]} src={require(`./images/${ExchangeCharacter(coin)}.png`).default} alt="" />
            </div>
            <div className={Style['bg-white']}></div>
          </Col>
          <Col md={5} lg={5} xxl={5}>
            <div className={Style["mypage-box"]}>
              <div className={Style["big-bg"]}>
                <div className={Style["address"]}>
                  <table>
                    <tr>
                      <th>Email</th>{/*언어변수값 들어갈곳*/}
                      <td>{email}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>{/*언어변수값 들어갈곳*/}
                      <td>{phone}</td>
                    </tr>
                    <tr>
                      <th>Name</th>{/*언어변수값 들어갈곳*/}
                      <td>{name}</td>
                    </tr>
                    <tr>
                      <th>Wallet</th>
                      <td>{walletAddress}</td>
                    </tr>
                  </table>
                </div>
                <div className={Style["line"]}></div>
                <div className={Style["boxs"]}>
                  <div className={Style['box1']}>
                    <div className={Style['info-title']}>SecurityWallet 정보</div>{/*언어변수값 들어갈곳*/}
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
                      <span>SecurityWallet의 이더리움 개수</span>{/*언어변수값 들어갈곳*/}
                    </ReactTooltip>
                    <span className={Style["num-box"]}>{ether}</span>
                  </div>
                  <div className={Style['box1']}>
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
                      <span>SecurityWallet의 EWC개수</span>{/*언어변수값 들어갈곳*/}
                    </ReactTooltip>
                    <span className={Style["num-box"]}>{ether}</span>
                  </div>
                  <div className={Style['box1']}>
                    <div className={Style['info-title']}>ErugoWorld 정보</div>{/*언어변수값 들어갈곳*/}
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
                      <span>Erugo World의 EWC(Point)개수</span>{/*언어변수값 들어갈곳*/}
                    </ReactTooltip>
                    <span className={Style["num-box"]}>{coin}</span>
                  </div>
                  <div className={Style['box1']}>
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
                      <span>Erugo World의 Rugo 개수</span>{/*언어변수값 들어갈곳*/}
                    </ReactTooltip>
                    <span className={Style["num-box"]}>{points}</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={5} lg={5} xxl={5}>
            <div className={Style["mypage-box"]}>
              <div className={Style["big-bg"]}>
                <div className={Style["exchange-xt"]}>
                  <div className={Style["title"]}>거래소에서 충전하기</div>{/*언어변수값 들어갈곳*/}
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
                    <span>거래소 XT.COM</span>{/*언어변수값 들어갈곳*/}
                  </ReactTooltip>
                  <input
                    type={Text}
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
                        history.push("https://blog.naver.com/erugocoin_official/222663552969");
                      }}
                    >
                      <ReactTooltip id="info" place="left" effect="solid">
                        <span>자세한 설명은 클릭</span>{/*언어변수값 들어갈곳*/}
                      </ReactTooltip>
                    </button>
                    <input
                      type="checkbox"
                      className={Style["amountCheck"]}
                      onClick={accountCheckHandler}
                    />
                  </div>
                  <div>
                    <span
                      className={Style["title"]}
                      data-tip
                      data-for="sw-change"
                    >
                      SecurityWallet 충전하기
                    </span>{/*언어변수값 들어갈곳*/}
                    <ReactTooltip
                      id="sw-change"
                      place="top"
                      effect="solid"
                    >
                      <span>SecurityWallet에 있는 EWC를 ErugoWorld EWC로 충전시키기</span>{/*언어변수값 들어갈곳*/}
                    </ReactTooltip>
                  </div>
                  <ExchangeEwcCoin/>
                  <div className={Style["line2"]}></div>
                </div>
                <div className={Style["bg-down"]}>
                  <div className={Style["box-bottom"]}>
                    <span
                      className={Style["title"]}
                      data-tip
                      data-for="rugo-change"
                    >
                      RUGO로 변환하기
                    </span>{/*언어변수값 들어갈곳*/}
                    <ReactTooltip
                      id="rugo-change"
                      place="top"
                      effect="solid"
                    >
                      <span>EWC를 RUGO로 변환시켜드립니다.</span>{/*언어변수값 들어갈곳*/}
                    </ReactTooltip>
                    <ExchangeRugo/>
                    <p>CURRENT EXCHANGE RATE : 1 Erugo Coin = 3000 Point </p>
                  </div>
                </div>
                <button className={
                  Style["logout-btn"]} 
                  onClick={
                      () => {
                          setUserUUID(undefined)
                          sessionStorage.removeItem('userUUID')
                          sessionStorage.removeItem('walletAddress')
                          history.push('/main-entrance')
                      }
                  }>
                  로그아웃
                </button>{/*언어변수값 들어갈곳*/}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default MyPage;