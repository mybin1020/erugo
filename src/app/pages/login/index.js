import React, { useState } from "react";
import classNames from "classnames";
import Style from "./login.module.css";
import { SButton, STitle } from "../../components";
import { useHistory } from "react-router-dom";
import { readInfo, requestLogin } from "../../api";

const LoginPage = ({
  setLoading,
  setUserUUID,
  setWallet,
  setPoints,
  setEmail,
  setName,
  setPhone,
  setCoin,
  setEWC,
  setSwId,
  setEther,
  setCurrentFrame,
  onClose,
  isLogin,
  setIsLogin,
  language,
}) => {
  console.log(`로그인 ${language}`);

  const history = useHistory();
  const [tempEmail, setTempEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <React.Fragment>
      <div
        className={Style["backgroundImg"]}
      >
        {isLogin ? (
          <div
            className="pointer"
            style={{
              width: "160px",
              height: "40px",
              border: "1px solid #e17a18",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
              color: "#e17a18",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
            onClick={() => {
              setUserUUID(undefined);
              setIsLogin(false);
              sessionStorage.removeItem("userUUID");
              sessionStorage.removeItem("walletAddress");
              //history.push('/home')
            }}
          >
            로그아웃
          </div>
        ) : (
          <div className={Style["loginWindow"]}>
            <div className={Style["loginTitle"]}>
              <div className={Style["loginTitle2"]}>ERUGO WORLD</div>
            </div>
            <div className={Style["emailTitle"]}>
              <div className={Style["emailTitle2"]}>
                <div className={Style["emailTitle3"]}>Email</div>
                <input
                  className={Style["emailInput"]}
                  type="text"
                  value={tempEmail}
                  onChange={(e) => {
                    setTempEmail(e.target.value);
                  }}
                />
              </div>
              <div className={Style["pwdTitle"]}>
                <div className={Style["pwdTitle2"]}>Password</div>
                <input
                  className={Style["pwdInput"]}
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div
                className={`pointer ${Style["signinBtn"]}`}
                // style={{
                //   width: "100px",
                //   height: "30px",
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
                //   fontSize: "12px",
                //   borderRadius: "10px",
                //   backgroundColor: "#E27A17",
                //   color: "white",
                // }}
                onClick={() => {
                  if (tempEmail === undefined || tempEmail === "") {
                    window.alert("이메일을 입력해 주세요");
                    return;
                  }
                  if (password === undefined || password === "") {
                    window.alert("비밀번호를 입력해 주세요");
                    return;
                  }
                  setLoading(true);
                  requestLogin({
                    email: tempEmail,
                    password,
                    callback: (err, response) => {
                      setTempEmail("");
                      setPassword("");
                      if (err) {
                        setLoading(false);
                        console.log(err);
                      } else {
                        if (response.result !== "success") {
                          setLoading(false);
                          window.alert("로그인에 실패하였습니다.");
                        } else {
                          let d = response.userInfo;
                          console.log(d);
                          setUserUUID(d.uuid);
                          setWallet(d.wallet);
                          sessionStorage.setItem("userUUID", d.uuid);
                          sessionStorage.setItem("wallet", d.wallet);
                          history.push("/main-entrance");

                          readInfo({
                            uuid: d.uuid,
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
                                  setCoin(coin);
                                  setEther(ether);
                                  setEWC(ewc);
                                  setPhone(phone);
                                  setName(name);
                                  setEmail(email);
                                  setSwId(swId);
                                  setPoints(point);
                                  setIsLogin(true);
                                }
                              }
                            },
                          });

                          setLoading(false);
                          onClose();
                          /*
                                                            setTimeout(() => {
                                                                history.push('/main-entrance')
                                                                setCurrentFrame('mypage')
                                                            }, 200)
                                                            */
                          //history.push('/my')
                        }
                      }
                    },
                  });
                }}
              >
                SIGN IN
              </div>
              <span
              className={Style['loginInfo']}
              >
                <small>
                  {" "}
                 {language['login-01']}
                 <br/>
                 {language['login-02']}
                 
              

                </small>
              </span>
            </div>
            <div
            className={Style["footerMenu"]}
            >
              <div
                className={Style["sign-in"]}
                onClick={() => {
                  history.push("/sign-up");
                }}
              >
                SIGN UP
              </div>
              <div
                className={Style["reset-password"]}
                onClick={() => {
                  history.push("/reset-password");
                }}
              >
                RESET PASSWORD
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
