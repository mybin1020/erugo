import React, { useEffect, useState } from "react";
import Style from "./style.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { GiConfirmed } from "react-icons/gi";
import { reqSMSAuthCode, reqJoin } from "../../api";
import { useHistory } from "react-router-dom";

const TopMenu = () => {
    const history = useHistory();
    return (
        <div className={Style['top-menu-background']}>
            <div className={Style['logo']} onClick={() => {
          history.push("/main-entrance");
        }}></div>
            <div className={Style['top-menu-button-wrapper']}>
                <div className={`${Style['top-menu-button']} ${Style['back-button']} pointer`} onClick={() => {
          history.push("/main-entrance");
        }}></div>

            </div>
        </div>
    )
}

const Input = ({
  tag,
  inputElement = null,
  type = "text",
  style = {},
  value,
  onChange,
  customEle,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "80px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: "12px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {tag}
        </div>
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {customEle}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {inputElement ? (
          inputElement
        ) : (
          <input
            className={Style["input"]}
            type={type}
            style={{
              width: "100%",
              height: "100%",
              padding: "10px",
              borderRadius: "4px",
              ...style,
            }}
            value={value}
            onChange={(e) => {
              if (onChange && typeof onChange === "function") {
                onChange(e.target.value);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

const SignUp = ({
  setLoading,
  setLoadingMsg,
  currentFrame,
  setCurrentFrame,
}) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState(82);
  const [country, setCountry] = useState("kr");
  const [pinNumber, setPinNumber] = useState("");
  const [authKey, setAuthKey] = useState("");
  const [recomCode, setRecomCode] = useState("");

  const [onFocus, setOnFocus] = useState(false);

  //const [socketHandler, setSocketHandler] = useState({ sendMsg: () => { } })
  useEffect(() => {
    //window.alert('Error Check!')
    //let websocket = new WebSocket('wss://socket.appzero.services:8808')
    console.log("socket create...");
    /*
        websocket.onopen = function () {
            console.log('socket open')
            websocket.send(JSON.stringify({ command: 'socket open' }))
            setSocketHandler({
                sendMsg: (obj) => {
                    try {
                        if (websocket && websocket.OPEN) {
                            websocket.send(JSON.stringify(obj))
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
            })
        }
        websocket.onmessage = function (e) {

        }*/
  }, []);
  return (
    <div className={Style["out-bg"]}>
        <TopMenu/>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={Style["sign-bg"]}
      >
        <div
          className={Style["sroll-none"]}
          style={{ width: "640px", height: "100%" }}
        >
          <div
            style={{
              width: "100%",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img src={require('./images/logo.png').default}  style={{width:'55px'}} alt=""/>
            <div style={{ fontSize: "46px" }}>ERUGO WORLD</div>
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundImage: "url(logo.png)",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "30px",
              flexDirection: "column",
            }}
          >
            <Input
              tag={"Email"}
              value={email}
              onChange={(email) => {
                setEmail(email);
              }}
            />
            <Input
              tag={"Password"}
              type="password"
              onChange={(password) => {
                setPassword(password);
              }}
            />
            <Input
              tag={"Password again"}
              type="password"
              style={{
                backgroundColor:
                  password === passwordConfirm
                    ? "white"
                    : "rgba(250,200,200, 0.4)",
              }}
              onChange={(passwordConfirm) => {
                setPasswordConfirm(passwordConfirm);
              }}
              customEle={
                <GiConfirmed
                  style={{ marginRight: "10px" }}
                  fontSize={"22px"}
                  color={
                    password === passwordConfirm && password !== ""
                      ? "rgba(0,150,0,1)"
                      : "rgba(250,0,0, 1)"
                  }
                />
              }
            />
            <Input
              tag={"Name"}
              value={name}
              onChange={(name) => {
                setName(name);
              }}
            />
            <Input
              tag={"Phone"}
              inputElement={
                <div
                  style={{
                    width: "100%",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <PhoneInput
                    containerStyle={{
                      boxSizing: "border-box",
                      borderRadius: "4px",
                      width: "calc(100% - 200px)",
                      height: "40px",
                      border: "0px solid white",
                    }}
                    buttonStyle={{
                      backgroundColor: "white",
                      borderTop: onFocus
                        ? "2px solid rgb(225, 122, 24)"
                        : "1px solid gray",
                      borderLeft: onFocus
                        ? "2px solid rgb(225, 122, 24)"
                        : "1px solid gray",
                      borderBottom: onFocus
                        ? "2px solid rgb(225, 122, 24)"
                        : "1px solid gray",
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "40px",
                      border: onFocus
                        ? "2px solid rgb(225, 122, 24)"
                        : "1px solid gray",
                      color: "rgb(225, 122, 24)",
                    }}
                    onFocus={(e) => {
                      setOnFocus(true);
                    }}
                    onBlur={(e) => {
                      setOnFocus(false);
                    }}
                    country={country}
                    value={phone}
                    onChange={(value, country, e, formattedValue) => {
                      setCountry(country.countryCode);
                      setCountryCode(country.dialCode);
                      setPhone(value);
                    }}
                  />
                  <div
                    className="pointer"
                    style={{
                      width: "180px",
                      height: "40px",
                      backgroundColor: "rgb(225, 122, 24)",
                      color: "white",
                      fontSize: "12px",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={(e) => {
                      let country_dial = countryCode;
                      let request_phone = phone.slice(
                        countryCode.length,
                        phone.length
                      );
                      reqSMSAuthCode({
                        country_dial,
                        phone: request_phone,
                        callback: (err, response) => {
                          if (err) {
                            console.log(err);
                          } else {
                            if (
                              response.result === "success" &&
                              response.message.result === true
                            ) {
                              console.log(response.message);
                              setAuthKey(`${response.message.authkey}`);
                              window.alert("Check your message!");
                            } else {
                              window.alert("Fail to send sms auth code!");
                              setPhone(countryCode);
                            }
                          }
                        },
                      });
                    }}
                  >
                    Send Auth Code
                  </div>
                </div>
              }
            />
            <Input
              tag={"Recom CODE"}
              value={recomCode}
              style={{
                backgroundColor:
                  recomCode === "" || authKey === "" || recomCode === authKey
                    ? "white"
                    : "rgba(250,200,200, 0.4)",
              }}
              onChange={(e) => {
                console.log(authKey);
                console.log(typeof authKey);
                setRecomCode(e);
              }}
              customEle={
                <GiConfirmed
                  style={{ marginRight: "10px" }}
                  fontSize={"22px"}
                  color={
                    recomCode !== "" && authKey !== "" && recomCode === authKey
                      ? "rgba(0,150,0,1)"
                      : "rgba(250,0,0, 1)"
                  }
                />
              }
            />
            <Input
              tag={"Pin number"}
              value={pinNumber}
              onChange={(pin) => {
                if (pin.length > 4) {
                  return;
                } else {
                  setPinNumber(pin);
                }
              }}
            />
            <div
              style={{
                width: "100%",
                height: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                fontSize: "12px",
              }}
            >
              <div
                className="pointer"
                style={{
                  width: "180px",
                  height: "40px",
                  backgroundColor: "rgb(225, 122, 24)",
                  color: "white",
                  fontSize: "12px",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  if (
                    !email.includes("@") ||
                    email.split("@")[0].length < 2 ||
                    email.split("@")[1].length < 3 ||
                    !email.split("@")[1].includes(".")
                  ) {
                    //socketHandler.sendMsg({command:'log', log : 'email not appropriate'})
                    window.alert("Not appropriate email!");
                    return;
                  } else if (password.length < 4) {
                    //socketHandler.sendMsg({command:'log', log : 'password is too short'})
                    window.alert("Password is too short!");
                    return;
                  } else if (name.length < 1) {
                    //socketHandler.sendMsg({command:'log', log : 'name is too short'})
                    window.alert("Name is too short!");
                    return;
                  } else if (
                    recomCode === "" ||
                    authKey === "" ||
                    recomCode !== authKey
                  ) {
                    //socketHandler.sendMsg({command:'log', log : 'sms auth code not match'})
                    window.alert("SMS auth code not match!");
                    return;
                  } else if (passwordConfirm !== password) {
                    //socketHandler.sendMsg({command:'log', log : 'password confirm not match not match'})
                    window.alert("Confirm your password again!");
                    return;
                  } else if (pinNumber.length !== 4) {
                    window.alert("Pin number must consist of 4 numbers!");
                    return;
                  }
                  setLoadingMsg("로그인 중입니다 잠시만 기다려주세요");
                  setLoading(true);

                  //socketHandler.sendMsg({command:'log', log : 'request join', name, password, phone:phone.slice(countryCode.length, phone.length), pin:pinNumber, email})
                  reqJoin({
                    email,
                    countryDial: countryCode,
                    name,
                    password,
                    phone: phone.slice(countryCode.length, phone.length),
                    pin: pinNumber,
                    callback: (err, response) => {
                      if (err) {
                        console.log(err);
                        //socketHandler.sendMsg({command:'log', log : err.toString()})
                      } else {
                        if (
                          response.result === "success" &&
                          response.message.result === true
                        ) {
                          setLoading(false);
                          console.log(response);
                          //socketHandler.sendMsg({command:'log', log : 'join success'})
                          setCurrentFrame("login");
                          setTimeout(() => {
                            history.push("/main-entrance");
                          }, 200);
                        } else {
                          setLoading(false);
                          window.alert(`Error : ${response.message.err}`);
                          //socketHandler.sendMsg({command:'log', log : response.message.err})
                        }
                      }
                    },
                  });
                }}
              >
                SIGN UP
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
