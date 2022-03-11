import React, { useEffect, useRef, useState } from "react";
import Style from "./style.module.css";
import Bounce from "./bounce.module.css";
import FrameCSS from "./frame.module.scss";
import About from "./frame/about";
import Home from "./frame/home";
import Auction from "./frame/auction";
import BuyLand from "./frame/buyland";
import LogIn from "./frame/login";
import MyPage from "./frame/mypage";
import SignUp from "./frame/signup";
import Market from "./frame/market";
import { useHistory } from "react-router-dom";
import { readInfo } from "../../api";
import Message from "./frame/message";

const animationOrderList = [
  "frame-1st",
  "frame-2nd",
  "frame-3rd",
  "frame-4th",
  "frame-5th",
  "frame-6th",
  "frame-7th",
  "frame-8th",
];
const stopOrderList = [
  "frame-style-1st-stop",
  "frame-style-2nd-stop",
  "frame-style-3rd-stop",
  "frame-style-4th-stop",
  "frame-style-5th-stop",
  "frame-style-6th-stop",
  "frame-style-7th-stop",
  "frame-style-8th-stop",
];
const TopMenu = ({
  isLogin,
  onClick,
  languageCode,
  setLanguageCode,
  setUserUUID,
}) => {
  const history = useHistory();
  return (
    <div
      className={Style["top-menu-background"]}
      style={{ backgroundImage: "url(/images/frame/top-menu.png)" }}
    >
      <div
        className={Style["logo"]}
        style={{ backgroundImage: "url(/images/frame/logo.png)" }}
      ></div>
      <div className={Style["top-menu-button-wrapper"]}>
        <div
          style={{ backgroundImage: "url(/images/frame/top-button/about.png)" }}
          className={`${Style["top-menu-button"]} ${Style["about-button"]} pointer`}
          onClick={() => {
            onClick("about");
          }}
        ></div>
        <div
          style={{ backgroundImage: "url(/images/frame/top-button/home.png)" }}
          className={`${Style["top-menu-button"]} ${Style["home-button"]} pointer`}
          onClick={() => {
            onClick("home");
          }}
        ></div>
        <div
          style={{
            backgroundImage: "url(/images/frame/top-button/auction.png)",
          }}
          className={`${Style["top-menu-button"]} ${Style["auction-button"]} pointer`}
          onClick={() => {
            history.push("/auction");
          }}
        ></div>
        <div
          style={{
            backgroundImage: "url(/images/frame/top-button/buy-land.png)",
          }}
          className={`${Style["top-menu-button"]} ${Style["buy-land-button"]} pointer`}
          onClick={() => {
            history.push("/land-state");
            //onClick('buyland')
          }}
        ></div>
        <div
          style={{
            backgroundImage: "url(/images/frame/top-button/my-page.png)",
          }}
          className={`${Style["top-menu-button"]} ${Style["my-page-button"]} pointer`}
          onClick={() => {
            if (!isLogin) {
              onClick("login");
              return;
            }
            onClick("mypage");
          }}
        ></div>
        <div
          style={{
            backgroundImage: "url(/images/frame/top-button/market.png)",
          }}
          className={`${Style["top-menu-button"]} ${Style["market-button"]} pointer`}
          onClick={() => {
            history.push("/land-state");
            //onClick('market')
          }}
        ></div>
        <div
          style={{
            backgroundImage: "url(/images/frame/top-button/message.png)",
          }}
          className={`${Style["top-menu-button"]} ${Style["sign-up-button"]} pointer`}
          onClick={() => {
            if (!isLogin) {
              onClick("login");
              return;
            }
            onClick("message");
          }}
        ></div>

        {/* userUUID가 있으면 ? log-in 버튼 : log-out 버튼*/}
        {sessionStorage.getItem('userUUID') ? (
          <div
            style={{
              backgroundImage: "url(/images/frame/top-button/about.png)",
            }}
            className={`${Style["top-menu-button"]} ${Style["log-in-button"]} pointer`}
            onClick={() => {
              onClick("login");
            }}
          ></div>
        ) : (
          <div
            style={{
              backgroundImage: "url(/images/frame/top-button/log-in.png)",
            }}
            className={`${Style["top-menu-button"]} ${Style["log-in-button"]} pointer`}
            onClick={() => {
              onClick("logout");
            }}
          ></div>
        )}


        {/* Language code가 ? KR이면 KR : ENG  */}
        {languageCode === "ko" ? (
          <div
            style={{
              color: "white",
              backgroundImage: "url(/images/frame/top-button/about.png)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
            className={`${Style["lang-button"]} pointer`}
            onClick={() => {
              if (languageCode === "ko") {
                setLanguageCode("eng");
              } else {
                setLanguageCode("ko");
              }
            }}
          >
            {languageCode}
          </div>
        ) : (
          <div
            style={{
              color: "white",
              backgroundImage: "url(/images/frame/top-button/market.png)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
            className={`${Style["lang-button"]} pointer`}
            onClick={() => {
              if (languageCode === "ko") {
                setLanguageCode("eng");
              } else {
                setLanguageCode("ko");
              }
            }}
          >
            {languageCode}
          </div>
        )}
      </div>
    </div>
  );
};

const Frame = ({
  onCloseBunttonClick,
  onClick,
  frameName,
  frameIdx,
  frameOrder,
  detailFrameState,
  frameShowIdx,
  frameHideIdx,
  frameEle,
  children,
  first = true,
}) => {
  const [isFirst, setIsFirst] = useState(first);
  useEffect(() => {
    setTimeout(() => {
      setIsFirst(false);
    }, 2500);
  }, []);
  return (
    <div
      //className={`${FrameCSS[`${frameName}-frame`]} ${FrameCSS[frameOrder]} pointer`}
      className={`${
        isFirst ? FrameCSS[`init-${frameIdx + 1}`] : FrameCSS[frameOrder]
      } ${FrameCSS[`${frameName}-frame`]} pointer`}
      style={{ backgroundImage: `url(/images/frame/frame/${frameName}.png)` }}
      onClick={(e) => {
        if (onClick && typeof onClick === "function") {
          onClick();
        }
      }}
      ref={frameEle}
    >
      {/* detail view frame  start*/}
      <div
        className={`${
          detailFrameState === frameShowIdx
            ? FrameCSS[`${frameName}-detail-frame-show`]
            : detailFrameState === frameHideIdx
            ? FrameCSS[`${frameName}-detail-frame-hide`]
            : FrameCSS[`${frameName}-detail-frame`]
        }`}
        style={{
          backgroundImage: `url(/images/detail-frame/${frameName}.png)`,
        }}
      >
        {/*  어떤 클래스를 적용할지 선택하는 방식 비교 연산 (비교) ? (참) : (거짓) */}
        {/* close button wrapper start*/}
        <div
          style={{
            width: "100%",
            height: "5%",
            marginTop: "0.8%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: "1%",
          }}
        >
          {/* close button start*/}
          <div
            className="pointer"
            style={{ width: "1.5%", height: "60%", borderRadius: "50%" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (
                onCloseBunttonClick &&
                typeof onCloseBunttonClick === "function"
              ) {
                onCloseBunttonClick();
              }
            }}
          ></div>
          {/* close button end*/}
        </div>
        {/* close button wrapper end*/}
        <div style={{ width: "100%", height: "95%", padding: "5%" }}>
          <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            {children}
          </div>
        </div>
      </div>
      {/* detail view frame  end*/}
    </div>
  );
};
const MainGate = ({
  currentFrame,
  setCurrentFrame,
  setUserUUID,
  setLoading,
  setWallet,
  setPoints,
  menubar,
  footer,
  points,
  userUUID,
  walletAddress,
  email,
  name,
  phone,
  ether,
  coin,
  exchangeRate,
  setEmail,
  setName,
  setPhone,
  setEther,
  setCoin,
  setExchangeRate,
  setTempCoin,
  setTempPoint,
  tempCoin,
  tempPoint,
  language,
  setLanguage,
  languageCode,
  setLanguageCode,
}) => {
  const aboutFrame = useRef(undefined);
  const [frameOrder, setFrameOrderList] = useState(animationOrderList);
  const [detailFrameState, setDetailFrameState] = useState(undefined);
  const [wrapperSlide, setWrapperSlide] = useState(-10);
  const [leftButtonDown, setLeftButtonDown] = useState(false);
  const [buttonDownStartPoint, setButtonDownStartPoint] = useState({
    startPoint: undefined,
  });

  const isLogin = sessionStorage.getItem("userUUID") ? true : false;
  console.log(language);
  console.log(languageCode);
  useEffect(() => {
    setTimeout(() => {
      if (currentFrame === "about") {
        setWrapperSlide(0);
        setDetailFrameState(0);
        setTimeout(() => {
          setFrameOrderList([
            stopOrderList[0],
            stopOrderList[1],
            stopOrderList[2],
            stopOrderList[3],
            stopOrderList[4],
            stopOrderList[5],
            stopOrderList[6],
            stopOrderList[7],
          ]);
        }, 50);
      } else if (currentFrame === "home") {
        setWrapperSlide(0);
        setDetailFrameState(2);
        setTimeout(() => {
          setFrameOrderList([
            stopOrderList[7],
            stopOrderList[0],
            stopOrderList[1],
            stopOrderList[2],
            stopOrderList[3],
            stopOrderList[4],
            stopOrderList[5],
            stopOrderList[6],
          ]);
        }, 50);
      } else if (currentFrame === "buyland") {
        setWrapperSlide(0);
        setDetailFrameState(6);
        setTimeout(() => {
          setFrameOrderList([
            stopOrderList[5],
            stopOrderList[6],
            stopOrderList[7],
            stopOrderList[0],
            stopOrderList[1],
            stopOrderList[2],
            stopOrderList[3],
            stopOrderList[4],
          ]);
        }, 50);
      } else if (currentFrame === "login") {
        setWrapperSlide(0);
        setDetailFrameState(8);
        setTimeout(() => {
          setFrameOrderList([
            stopOrderList[4],
            stopOrderList[5],
            stopOrderList[6],
            stopOrderList[7],
            stopOrderList[0],
            stopOrderList[1],
            stopOrderList[2],
            stopOrderList[3],
          ]);
        }, 50);
      } else if (currentFrame === "mypage") {
        setWrapperSlide(0);
        setDetailFrameState(10);
        setTimeout(() => {
          setFrameOrderList([
            stopOrderList[3],
            stopOrderList[4],
            stopOrderList[5],
            stopOrderList[6],
            stopOrderList[7],
            stopOrderList[0],
            stopOrderList[1],
            stopOrderList[2],
          ]);
        }, 50);
      } else if (currentFrame === "message") {
        setWrapperSlide(0);
        setDetailFrameState(12);
        setTimeout(() => {
          setFrameOrderList([
            stopOrderList[2],
            stopOrderList[3],
            stopOrderList[4],
            stopOrderList[5],
            stopOrderList[6],
            stopOrderList[7],
            stopOrderList[0],
            stopOrderList[1],
          ]);
        }, 50);
      } else if (currentFrame === "market") {
        setWrapperSlide(0);
        setDetailFrameState(14);
        setTimeout(() => {
          setFrameOrderList([
            stopOrderList[1],
            stopOrderList[2],
            stopOrderList[3],
            stopOrderList[4],
            stopOrderList[5],
            stopOrderList[6],
            stopOrderList[7],
            stopOrderList[0],
          ]);
        }, 50);
      }
      setCurrentFrame(undefined);
    }, 200);
  }, []);


//  홈버튼 눌렀을 때 이동
const el = useRef();
const [isOpen, setOpen] = useState(false);
const handleCloseWindow = e => {
    if(isOpen && (!el.current || !el.current.contains(e.target))) setOpen(false);
}
useEffect(() => {
    window.addEventListener('click', handleCloseWindow);
    return () => {
        window.removeEventListener('click', handleCloseWindow);
    };
}, []);



  return (
    <div
      className={Style["page-background"]}
      style={{ backgroundImage: "url(/images/frame/lobby.jpeg)" }}
    >
      <div
        className={`${Style["plant"]} ${Bounce["bounce-plant"]}`}
        style={{ backgroundImage: "url(/images/frame/plant.png)" }}
      ></div>
      <div
        className={`${Style["drone"]} ${Bounce["bounce-drone"]}`}
        style={{ backgroundImage: "url(/images/frame/drone.png)" }}
      ></div>
      <div
        className={
          wrapperSlide === -10
            ? Style["main-wrapper"]
            : Style["main-wrapper-dark"]
        }
      >
        <TopMenu
          isLogin={isLogin}
          languageCode={languageCode}
          setLanguageCode={setLanguageCode}
          onClick={(frame) => {
            if (frame === "about") {
              setWrapperSlide(0);
              setDetailFrameState(0);
              setTimeout(() => {
                setFrameOrderList([
                  stopOrderList[0],
                  stopOrderList[1],
                  stopOrderList[2],
                  stopOrderList[3],
                  stopOrderList[4],
                  stopOrderList[5],
                  stopOrderList[6],
                  stopOrderList[7],
                ]);
              }, 50);
            } else if (frame === "home") {
              setWrapperSlide(0);
              setDetailFrameState(2);
              setTimeout(() => {
                setFrameOrderList([
                  stopOrderList[7],
                  stopOrderList[0],
                  stopOrderList[1],
                  stopOrderList[2],
                  stopOrderList[3],
                  stopOrderList[4],
                  stopOrderList[5],
                  stopOrderList[6],
                ]);
              }, 50);
            } else if (frame === "buyland") {
              setWrapperSlide(0);
              setDetailFrameState(6);
              setTimeout(() => {
                setFrameOrderList([
                  stopOrderList[5],
                  stopOrderList[6],
                  stopOrderList[7],
                  stopOrderList[0],
                  stopOrderList[1],
                  stopOrderList[2],
                  stopOrderList[3],
                  stopOrderList[4],
                ]);
              }, 50);
            } else if (frame === "login") {
              setWrapperSlide(0);
              setDetailFrameState(8);
              setTimeout(() => {
                setFrameOrderList([
                  stopOrderList[4],
                  stopOrderList[5],
                  stopOrderList[6],
                  stopOrderList[7],
                  stopOrderList[0],
                  stopOrderList[1],
                  stopOrderList[2],
                  stopOrderList[3],
                ]);
              }, 50);
            } else if (frame === "mypage") {
              setWrapperSlide(0);
              setDetailFrameState(10);
              setTimeout(() => {
                setFrameOrderList([
                  stopOrderList[3],
                  stopOrderList[4],
                  stopOrderList[5],
                  stopOrderList[6],
                  stopOrderList[7],
                  stopOrderList[0],
                  stopOrderList[1],
                  stopOrderList[2],
                ]);
              }, 50);
            } else if (frame === "message") {
              setWrapperSlide(0);
              setDetailFrameState(12);
              setTimeout(() => {
                setFrameOrderList([
                  stopOrderList[2],
                  stopOrderList[3],
                  stopOrderList[4],
                  stopOrderList[5],
                  stopOrderList[6],
                  stopOrderList[7],
                  stopOrderList[0],
                  stopOrderList[1],
                ]);
              }, 50);
            } else if (frame === "market") {
              setWrapperSlide(0);
              setDetailFrameState(14);
              setTimeout(() => {
                setFrameOrderList([
                  stopOrderList[1],
                  stopOrderList[2],
                  stopOrderList[3],
                  stopOrderList[4],
                  stopOrderList[5],
                  stopOrderList[6],
                  stopOrderList[7],
                  stopOrderList[0],
                ]);
              }, 50);
            }
          }}
        />
        <div className={Style["main-contents"]}>
          <div
            className={
              wrapperSlide === -10 ? Style["wrapper-10"] : Style["wrapper-0"]
            }
          >
            <Frame
                ref={el}
              first={currentFrame ? false : true}
              frameEle={aboutFrame}
              frameName={"about"}
              frameIdx={0}
              frameOrder={frameOrder[0]}
              detailFrameState={detailFrameState}
              onClick={() => {
                setWrapperSlide(0);
                setDetailFrameState(0);
                setTimeout(() => {
                  setFrameOrderList([
                    stopOrderList[0],
                    stopOrderList[1],
                    stopOrderList[2],
                    stopOrderList[3],
                    stopOrderList[4],
                    stopOrderList[5],
                    stopOrderList[6],
                    stopOrderList[7],
                  ]);
                }, 50);
              }}
              onCloseBunttonClick={() => {
                setDetailFrameState(1);
                setWrapperSlide(-10);
                setFrameOrderList([
                  animationOrderList[0],
                  animationOrderList[1],
                  animationOrderList[2],
                  animationOrderList[3],
                  animationOrderList[4],
                  animationOrderList[5],
                  animationOrderList[6],
                  animationOrderList[7],
                ]);
              }}
              frameShowIdx={0}
              frameHideIdx={1}
            >
              <About language={language[languageCode] || {}} />
            </Frame>
            <Frame
              first={currentFrame ? false : true}
              frameName={"home"}
              frameIdx={1}
              frameOrder={frameOrder[1]}
              detailFrameState={detailFrameState}
              onClick={() => {
                setWrapperSlide(0);
                setDetailFrameState(2);
                setTimeout(() => {
                  setFrameOrderList([
                    stopOrderList[7],
                    stopOrderList[0],
                    stopOrderList[1],
                    stopOrderList[2],
                    stopOrderList[3],
                    stopOrderList[4],
                    stopOrderList[5],
                    stopOrderList[6],
                  ]);
                }, 50);
              }}
              onCloseBunttonClick={() => {
                setDetailFrameState(3);
                setWrapperSlide(-10);
                setFrameOrderList([
                  animationOrderList[7],
                  animationOrderList[0],
                  animationOrderList[1],
                  animationOrderList[2],
                  animationOrderList[3],
                  animationOrderList[4],
                  animationOrderList[5],
                  animationOrderList[6],
                ]);
              }}
              frameShowIdx={2}
              frameHideIdx={3}
            >
              <Home language={language[languageCode] || {}} />
            </Frame>
            <Frame
              first={currentFrame ? false : true}
              frameName={"auction"}
              frameIdx={2}
              frameOrder={frameOrder[2]}
              detailFrameState={detailFrameState}
              onClick={() => {
                setWrapperSlide(0);
                setDetailFrameState(4);
                setTimeout(() => {
                  setFrameOrderList([
                    stopOrderList[6],
                    stopOrderList[7],
                    stopOrderList[0],
                    stopOrderList[1],
                    stopOrderList[2],
                    stopOrderList[3],
                    stopOrderList[4],
                    stopOrderList[5],
                  ]);
                }, 50);
              }}
              onCloseBunttonClick={() => {
                setDetailFrameState(5);
                setWrapperSlide(-10);
                setFrameOrderList([
                  animationOrderList[6],
                  animationOrderList[7],
                  animationOrderList[0],
                  animationOrderList[1],
                  animationOrderList[2],
                  animationOrderList[3],
                  animationOrderList[4],
                  animationOrderList[5],
                ]);
              }}
              frameShowIdx={4}
              frameHideIdx={5}
            >
              <Auction language={language[languageCode] || {}} />
            </Frame>
            <Frame
              first={currentFrame ? false : true}
              frameName={"buyland"}
              frameIdx={3}
              frameOrder={frameOrder[3]}
              detailFrameState={detailFrameState}
              onClick={() => {
                setWrapperSlide(0);
                setDetailFrameState(6);
                setTimeout(() => {
                  setFrameOrderList([
                    stopOrderList[5],
                    stopOrderList[6],
                    stopOrderList[7],
                    stopOrderList[0],
                    stopOrderList[1],
                    stopOrderList[2],
                    stopOrderList[3],
                    stopOrderList[4],
                  ]);
                }, 50);
              }}
              onCloseBunttonClick={() => {
                setDetailFrameState(7);
                setWrapperSlide(-10);
                setFrameOrderList([
                  animationOrderList[5],
                  animationOrderList[6],
                  animationOrderList[7],
                  animationOrderList[0],
                  animationOrderList[1],
                  animationOrderList[2],
                  animationOrderList[3],
                  animationOrderList[4],
                ]);
              }}
              frameShowIdx={6}
              frameHideIdx={7}
            >
              <BuyLand language={language[languageCode] || {}} />
            </Frame>
            <Frame
              first={currentFrame ? false : true}
              frameName={"login"}
              frameIdx={4}
              frameOrder={frameOrder[4]}
              detailFrameState={detailFrameState}
              onClick={() => {
                setWrapperSlide(0);
                setDetailFrameState(8);
                setTimeout(() => {
                  setFrameOrderList([
                    stopOrderList[4],
                    stopOrderList[5],
                    stopOrderList[6],
                    stopOrderList[7],
                    stopOrderList[0],
                    stopOrderList[1],
                    stopOrderList[2],
                    stopOrderList[3],
                  ]);
                }, 50);
              }}
              onCloseBunttonClick={() => {
                setDetailFrameState(9);
                setWrapperSlide(-10);
                setFrameOrderList([
                  animationOrderList[4],
                  animationOrderList[5],
                  animationOrderList[6],
                  animationOrderList[7],
                  animationOrderList[0],
                  animationOrderList[1],
                  animationOrderList[2],
                  animationOrderList[3],
                ]);
              }}
              frameShowIdx={8}
              frameHideIdx={9}
            >
              <LogIn
                language={language[languageCode] || {}}
                isLogin={isLogin}
                setPoints={setPoints}
                setLoading={setLoading}
                setWallet={setWallet}
                setUserUUID={setUserUUID}
                setCurrentFrame={setCurrentFrame}
                onClose={() => {
                  setTimeout(() => {
                    readInfo({
                      uuid: sessionStorage.getItem("userUUID"),
                      callback: (err, response) => {
                        console.log(err);
                        if (err) {
                          //    history.push('/login')
                          window.alert(
                            "사용자 정보를 불러오는 데 실패하였습니다. 관리자에게 문의 바랍니다."
                          );
                        } else {
                          console.log(response.userInfo);
                          setExchangeRate(response.userInfo.exchangeRate);
                          setEther(Number(response.userInfo.ethAmount));
                          setCoin(Number(response.userInfo.coin));
                          setEmail(response.userInfo.email);
                          setName(response.userInfo.name);
                          setPhone(response.userInfo.phone);

                          setTempCoin(Number(response.userInfo.coin));
                          setTempPoint(
                            Number(response.userInfo.coin) *
                              response.userInfo.exchangeRate
                          );
                          setPoints(response.userInfo.point);
                          setLoading(false);

                          setDetailFrameState(9);
                          setWrapperSlide(-10);
                          setFrameOrderList([
                            animationOrderList[4],
                            animationOrderList[5],
                            animationOrderList[6],
                            animationOrderList[7],
                            animationOrderList[0],
                            animationOrderList[1],
                            animationOrderList[2],
                            animationOrderList[3],
                          ]);

                          setTimeout(() => {
                            setWrapperSlide(0);
                            setDetailFrameState(10);
                            setTimeout(() => {
                              setFrameOrderList([
                                stopOrderList[3],
                                stopOrderList[4],
                                stopOrderList[5],
                                stopOrderList[6],
                                stopOrderList[7],
                                stopOrderList[0],
                                stopOrderList[1],
                                stopOrderList[2],
                              ]);
                            }, 50);
                          }, 300);
                        }
                      },
                    });
                  }, 200);
                }}
              />
            </Frame>
            <Frame
              first={currentFrame ? false : true}
              frameName={"mypage"}
              frameIdx={5}
              frameOrder={frameOrder[5]}
              detailFrameState={detailFrameState}
              onClick={() => {
                if (!isLogin) {
                  setWrapperSlide(0);
                  setDetailFrameState(8);
                  setTimeout(() => {
                    setFrameOrderList([
                      stopOrderList[4],
                      stopOrderList[5],
                      stopOrderList[6],
                      stopOrderList[7],
                      stopOrderList[0],
                      stopOrderList[1],
                      stopOrderList[2],
                      stopOrderList[3],
                    ]);
                  }, 50);
                  return;
                }
                setWrapperSlide(0);
                setDetailFrameState(10);
                setTimeout(() => {
                  setFrameOrderList([
                    stopOrderList[3],
                    stopOrderList[4],
                    stopOrderList[5],
                    stopOrderList[6],
                    stopOrderList[7],
                    stopOrderList[0],
                    stopOrderList[1],
                    stopOrderList[2],
                  ]);
                }, 50);
              }}
              onCloseBunttonClick={() => {
                setDetailFrameState(11);
                setWrapperSlide(-10);
                setFrameOrderList([
                  animationOrderList[3],
                  animationOrderList[4],
                  animationOrderList[5],
                  animationOrderList[6],
                  animationOrderList[7],
                  animationOrderList[0],
                  animationOrderList[1],
                  animationOrderList[2],
                ]);
              }}
              frameShowIdx={10}
              frameHideIdx={11}
            >
              <MyPage
                language={language[languageCode] || {}}
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
            </Frame>
            {/* 0311 Sign-up 자리인데 안뜹니다 */}
            <Frame
              first={currentFrame ? false : true}
              frameName={"signup"}
              // 왜 메세지인데 signup이 뜨나요?
              frameIdx={6}
              frameOrder={frameOrder[6]}
              detailFrameState={detailFrameState}
              onClick={() => {
                if (!isLogin) {
                  setWrapperSlide(0);
                  setDetailFrameState(8);
                  setTimeout(() => {
                    setFrameOrderList([
                      stopOrderList[4],
                      stopOrderList[5],
                      stopOrderList[6],
                      stopOrderList[7],
                      stopOrderList[0],
                      stopOrderList[1],
                      stopOrderList[2],
                      stopOrderList[3],
                    ]);
                  }, 50);
                  return;
                }
                setWrapperSlide(0);
                setDetailFrameState(12);
                setTimeout(() => {
                  setFrameOrderList([
                    stopOrderList[2],
                    stopOrderList[3],
                    stopOrderList[4],
                    stopOrderList[5],
                    stopOrderList[6],
                    stopOrderList[7],
                    stopOrderList[0],
                    stopOrderList[1],
                  ]);
                }, 50);
              }}
              onCloseBunttonClick={() => {
                setDetailFrameState(13);
                setWrapperSlide(-10);
                setFrameOrderList([
                  animationOrderList[2],
                  animationOrderList[3],
                  animationOrderList[4],
                  animationOrderList[5],
                  animationOrderList[6],
                  animationOrderList[7],
                  animationOrderList[0],
                  animationOrderList[1],
                ]);
              }}
              frameShowIdx={12}
              frameHideIdx={13}
            >
              <SignUp userUUID={userUUID} isLogin={isLogin} />
            </Frame>


            <Frame
              first={currentFrame ? false : true}
              frameName={"market"}
              frameIdx={7}
              frameOrder={frameOrder[7]}
              detailFrameState={detailFrameState}
              onClick={() => {
                setWrapperSlide(0);
                setDetailFrameState(14);
                setTimeout(() => {
                  setFrameOrderList([
                    stopOrderList[1],
                    stopOrderList[2],
                    stopOrderList[3],
                    stopOrderList[4],
                    stopOrderList[5],
                    stopOrderList[6],
                    stopOrderList[7],
                    stopOrderList[0],
                  ]);
                }, 50);
              }}
              onCloseBunttonClick={() => {
                setDetailFrameState(15);
                setWrapperSlide(-10);
                setFrameOrderList([
                  animationOrderList[1],
                  animationOrderList[2],
                  animationOrderList[3],
                  animationOrderList[4],
                  animationOrderList[5],
                  animationOrderList[6],
                  animationOrderList[7],
                  animationOrderList[0],
                ]);
              }}
              frameShowIdx={14}
              frameHideIdx={15}
            >
              <Market language={language[languageCode] || {}} />
            </Frame>
          </div>
        </div>
        <div className={Style["bottom"]}></div>
      </div>
    </div>
  );
};

export default MainGate;
