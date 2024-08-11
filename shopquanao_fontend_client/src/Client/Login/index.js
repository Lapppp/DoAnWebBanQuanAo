import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../../assets/images/ic_btn_google.svg"; // tên tự đặt
import facebookLogo from "../../assets/images/ic_btn_facebook.svg"; // tên tự đặt

import '../../assets/style/Login/login.css'
function Login() {
  const navigate1=useNavigate();
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/login/google';
    navigate1('/home');
};
// mai làm tiếp
  const [login, setLogin] = useState({});
  
  const navigate = useNavigate();
  // const [password, setPassword] = useState('');
  
  //const [rememberPassword, setRememberPassword] = useState(false);
 

 
  //const nava=Navigate()
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setLogin((item) => ({ ...login, [name]: value }));
    console.log(login);
  };

  const handleLogin = () => {
    try {
      axios
        .post("http://localhost:8000/api/auth/login", login)
        .then((res) => {
          const authToken = res.data.access_token;  // Kiểm tra cách API trả về token
          localStorage.setItem("authToken", authToken);

          console.log("mã token", authToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${authToken}`;
          console.log(" Login successful", res.data);
          navigate("/home");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } catch (error) {
      console.log(error.response.data);
    }
    // Add logic for handling login here
};






  const handleRegister = () => {
    // Add logic for handling registration here
    console.log("Register clicked");
  };

  return (
    <section className="vh-100" >
      <div className="container py-5 h-100 hanldeRegister">
        <div className="row mt-5 d-flex justify-content-center align-items-center h-200">
          <div className="col-12 col-md-8 col-lg-6 col-xl-4">
            <div className="card shadow-2-strong rounded">
              <div className="card-body p-5 text-center" >
                <h1 className="mb-5">
                  <b>
                    <span className="text-primary">ĐĂNG</span>{" "}
                    <span className="text-warning">NHẬP</span>
                  </b>
                </h1>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    name="email"
                    className="form-control form-control-lg enlarge-input"
                    value={login.email}
                    onChange={(e) => handleChange(e)}
                    placeholder="Email"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    name="password"
                    className="form-control form-control-lg enlarge-input"
                    value={login.password}
                    onChange={(e) => handleChange(e)}
                    placeholder="Mật Khẩu"
                  />
                </div>

                <button
                  className="btn btn-warning btn-lg btn-block"
                  type="button"
                  onClick={handleLogin}
                >
                  <b>
                  <span className="text-white">Đăng Nhập</span>
                  </b>
                </button>
                <h5 className="m-4">
                  <a style={{ textDecoration: "none", color: "red" }} href="a">
                    Quên mật khẩu
                  </a>
                </h5>
                <hr/>
                <h5 className="or-separator mb-5">
                  <span className="or-text">Hoặc đăng nhập bằng</span>
                </h5>

                <div className="google-facebook row justify-content-center align-items-center mb-5">
                  <div
                  onClick={() => handleGoogleLogin()}
                    className="col-md-4 m-2"
                    style={{
                      weight: "129px",
                      height: "auto",
                      border: "1px solid rgb(240, 240, 240)",
                      borderRadius: "50px",
                    }}
                  >
                    <img
                      src={googleLogo}
                      alt="Google"
                      className="img-fluid mr-2"
                    />
                  </div>

                
                </div>

                <p className="mb-0 mt-3" style={{ fontSize: "14px" }}>
                  Bạn chưa có tài khoản?{" "}
                  <span
                    className="text-warning"
                    onClick={handleRegister}
                    style={{ cursor: "pointer" }}
                  >
                    <Link className="text-warning"  to={`/home/register`}>  Đăng kí ngay!</Link>
                   
                  </span>
                </p>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
