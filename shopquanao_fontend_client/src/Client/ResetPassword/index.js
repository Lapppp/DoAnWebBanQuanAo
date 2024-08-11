import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Col } from "react-bootstrap";

function ResetPassword() {
  
  const navigate = useNavigate();
  const [resetPasswordData, setResetPasswordData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

 

  const handleResetPassword = async () => {
    // Lấy token từ localStorage
    const authToken = localStorage.getItem("authToken");

    // Kiểm tra xem token có tồn tại không
    if (authToken) {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/resetpassword", resetPasswordData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            console.log("Reset Password successful", res.data);
            
        } catch (error) {
            console.log("Error during password reset:", error.response.data);
        }
    } else {
        console.log("Token not found in localStorage. Please handle authentication.");
    }
};


  

  return (
    <Col> 
    <h2>Đổi mật khẩu(Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác)</h2>
    <hr></hr>
  

<div className="form-outline mb-4">
  <label htmlFor="typePasswordX-2">Mật khẩu hiện tại *</label>
  <input
    type="password"
    id="typePasswordX-2"
    name="currentPassword"
    className="form-control form-control-lg"
    value={resetPasswordData.currentPassword}
    onChange={handleChange}
  />
</div>

<div className="form-outline mb-4">
  <label htmlFor="typePasswordX-2">Mật khẩu mới *</label>
  <input
    type="password"
    id="typePasswordX-2"
    name="newPassword"
    className="form-control form-control-lg"
    value={resetPasswordData.newPassword}
    onChange={handleChange}
  />
</div>

<div className="form-outline mb-4">
  <label htmlFor="typePasswordX-2">Xác nhận mật khẩu mới *</label>
  <input
    type="password"
    id="typePasswordX-2"
    name="confirmPassword"
    className="form-control form-control-lg"
    value={resetPasswordData.confirmPassword}
    onChange={handleChange}
  />
</div>

<button onClick={handleResetPassword}>Đổi Mật Khẩu</button>

</Col>
  );
}

export default ResetPassword;
