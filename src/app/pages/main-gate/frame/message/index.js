import React from "react";
import MailBox from "../../../mail-box";
import Style from './style.module.css'


const Message = ({ menubar, footer, userUUID, isLogin }) => {
    
    return (
      <>
        <div style={{width:'100%', height:'90%', justifyItems:'center', isLogin}}>
          {
            isLogin ?
          <MailBox 
            menubar={menubar}
            footer={footer}
            userUUID={userUUID}
          />
          :
          undefined
          }
        </div>
      </>
    )
}

export default Message