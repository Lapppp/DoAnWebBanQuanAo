import { Button, Col, Row } from "react-bootstrap";
import '../../assets/style/Account/account.css'
import accountAvatar from "../../assets/images/account_ava.jpg";
import { Link } from "react-router-dom";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ResetPassword from "../ResetPassword";
const AccountManagement = () => {


  const [resetPassWord, setResetPassWord] = useState(false);

  const handleResetPassWord = ()=>
  {
    setResetPassWord(!resetPassWord)
  }
  return (

   <>
            <h2 className="h2">TÀI KHOẢN</h2>
        <Row className="layout">
          <Col  className="layoutLeft" style={{background:"white" , height:"800px", weight:"200px"}}>
          <div className="iconAccount">
              <div><img src={accountAvatar} alt=""></img></div>
              <p className="nameAccount">hậu phạm</p>
             <Button  className="Logout w-100" >Đăng Xuất</Button>
            </div>
            <div className="info-container">
 <div className="hover">
    <div className="info-item">
      <FontAwesomeIcon icon={faUser} className="icon" />
      <span>Tài Khoản của tôi</span>
    </div>
 </div>
  <div className="hover">
    <div className="info-item" onClick={handleResetPassWord}>
      <FontAwesomeIcon icon={faKey} className="icon" />
      <span>Đổi mật khẩu</span>
    </div>
  </div>
</div>
           
       


          </Col>
          <Col   className="layoutRight" style={{background:"white" , height:"800px"}}>
           
          {resetPassWord&& <ResetPassword/>}

            
          </Col>
        </Row>
   </>
  );
};

export default AccountManagement;
