import axios from 'axios';
import React, { useState } from 'react';
//import { Navigate } from 'react-router-dom';

//import './Login.css'; // Import file CSS để định rõ các kiểu CSS

function Login() {
  const [login, setLogin] = useState({});
 // const [password, setPassword] = useState('');

  //const [rememberPassword, setRememberPassword] = useState(false);

  //const nava=Navigate()
  const handleChange=(e)=>
  {
    let name= e.target.name;
    let value= e.target.value;


    setLogin( item =>({...login , [name]:value}));
    console.log(login);
  }




  const handleLogin = () => {
    try {
      axios.post("http://localhost:8000/api/auth/login", login)
      .then(res => {
         const authToken = res.data.token;
          console.log('mã token',authToken);
         axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
    
      
    } catch (error) {
      console.log(error.response.data);
      
    }
    // Add logic for handling login here

  };

  const handleRegister = () => {
    // Add logic for handling registration here
    console.log('Register clicked');
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong rounded">
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Đăng Nhập</h3>


                
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    name="email"
                    className="form-control form-control-lg"
                    value={login.email}   
                    onChange={(e) => handleChange(e)}
                    placeholder='Email'
                  />
                  
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    name="password"
                    className="form-control form-control-lg"
                    value={login.password}
                    onChange={e=>handleChange(e)}
                    placeholder='Password'
                  />
                  
                </div>

               

                <button className="btn btn-primary btn-lg btn-block" type="button" onClick={handleLogin}>
                  Đăng Nhập
                </button>
                  <h5 className="mt-3"><a style={{ textDecoration: "none" ,color:"red"}} href='a'>Quên mật khẩu</a></h5>

                <hr className="my-4"  />

               <div className="google-facebook">
                  <a href='a'
                    className="btn btn-lg btn-block btn-primary"
                    type="button"
                    onClick={handleLogin} // Assuming you want to use the same function for login and register
                  >
                    <i className="fab fa-google me-2"></i> Google
                  </a>
  
                  <a href='a'
                    className="btn btn-lg btn-block btn-primary mb-2"
                    type="button"
                    onClick={handleLogin} // Assuming you want to use the same function for login and register
                  >
                    <i className="fab fa-facebook-f me-2"></i> Facebook
                  </a>
               </div>

                <p className="mb-0 mt-3">
                 Bạn chưa có tài khoảng?{' '}
                  <span className="text-primary" onClick={handleRegister} style={{ cursor: 'pointer' }}>
                    Đăng kí ngay
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
