import React from "react";
import Style from "./style.module.css";
import { useHistory } from "react-router-dom";

const Market = ({language}) => {
  console.log(language)
  const history = useHistory();
  return (
    <div className={Style["ground"]}>
      <div style={{ width: "100%", height: "100%" }}>
        <div className={Style["bg-white"]}>
          <div className={Style["h1Text"]}> {language['market-header-1']} </div>
          <div className={Style["imgSide"]}>
            <img
              src={require("./images/market-bg.png").default}
              style={{ width: "80%", margin: "0 auto" }}
              alt=""
            />
          </div>
          <div className={Style["textSide"]}>
            <div>
              <p className={Style["market-content-text"]}>
              {language['market-mean-01']}
              </p>
              <p> {language['market-mean-02']}</p>
              <p> {language['market-mean-03']}</p>
              <p> {language['market-mean-04']}</p>
              <p>
              {language['market-mean-05']}
              </p>
              <p>
              {language['market-mean-06']}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
