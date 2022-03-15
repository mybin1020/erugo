import React from "react";
import Style from "./style.module.css";
import { useHistory } from "react-router-dom";

const Market = () => {
  const history = useHistory();
  return (
    <div className={Style["ground"]}>
      <div style={{ width: "100%", height: "100%" }}>
        <div className={Style["bg-white"]}>
          <div className={Style["h1Text"]}> Market </div>
          <div className={Style["imgSide"]}>
            <img
              src={require("./images/market-icon.png").default}
              style={{ width: "70%", margin: "0 auto" }}
              alt=""
            />
          </div>
          <div className={Style["textSide"]}>
            <div>
              <p className={Style["market-content-text"]}>
                이곳은 Erugo World의 모든 물자의 교환이 이루어지는 장소입니다.
              </p>
              <p> 사람과 사람이 시공간의 제약을 넘어 연결되는 곳.</p>
              <p> 마음과 마음이 만나는 곳.</p>
              <p> 마켓입니다.</p>
              <p>
                여기에서는, Erugo World에서 필요한 모든 것이 거래될 것입니다.
              </p>
              <p>
                소통의 창이 열리는 그 시간까지 당신의 기다림에 감사하며 최선을
                다해 준비하겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
