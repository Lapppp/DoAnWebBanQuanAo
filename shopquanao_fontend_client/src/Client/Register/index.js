import axios from "axios";
import React, { useState } from "react";
import googleLogo from "../../assets/images/ic_btn_google.svg"; // tên tự đặt
import { Link } from "react-router-dom";
//import '../../style/login.css'
function Register() {
  const [login, setLogin] = useState({});
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setLogin((item) => ({ ...login, [name]: value }));
    console.log(login);
  };

  const handleRegister = () => {
    try {
      axios
        .post("http://localhost:8000/api/auth/register", login)
        .then((res) => {
          const authToken = res.data.token;
          console.log("mã token", authToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${authToken}`;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } catch (error) {
      console.log(error.response.data);
    }
    // Add logic for handling login here
  };

 

  return (
    <section className="vh-100 ">
      <div className="container py-5 h-100 hanldeRegister">
        <div className="row mt-5 d-flex justify-content-center align-items-center h-200 ">
          <div className="col-12 col-md-8 col-lg-6 col-xl-4">
            <div className="card shadow-2-strong rounded">
              <div className="card-body p-5 text-center">
                <p style={{color:"#888",fontWeight: "100",fontSize: "20px"}}>Chào mừng bạn đến với HNL</p>

                <h1 className="m-5">
                  <b>
                    <span className="text-primary">ĐĂNG</span>{" "}
                    <span className="text-warning">KÝ</span>
                  </b>
                </h1>
                <div className="form-outline mb-4 ">
                  <input
                    type="text"
                    id="typeEmailX-2"
                    name="fullname"
                    className="form-control form-control-lg enlarge-input"
                    value={login.fullname}
                    onChange={(e) => handleChange(e)}
                    placeholder="Họ Và Tên"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="typeEmailX-2"
                    name="phone"
                    className="form-control form-control-lg enlarge-input"
                    value={login.phone}
                    onChange={(e) => handleChange(e)}
                    placeholder="Số Điện Thoại"
                  />
                </div>
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
                  className="btn btn-warning btn-lg btn-block "
                  type="button"
                  onClick={handleRegister}
                >
                  <b>
                  <span className="text-white">Đăng Ký</span>
                  </b>
                </button>
                <hr/>
                <h5 className="or-separator mb-5">
                  <span className="or-text">Hoặc đăng nhập bằng</span>
                </h5>

                <div className="google-facebook row justify-content-center align-items-center mb-5">
                  <div
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
                  Bạn đã có tài khoản?{" "}
                  <span
                    
                    onClick={handleRegister}
                    style={{ cursor: "pointer" }}
                  >
                   <Link className="text-warning" to={`/home/login`}> Đăng nhập ngay!</Link>
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

export default Register;
