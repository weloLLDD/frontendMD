import React, { useEffect, useState } from "react"; 
import { login } from "../Redux/Action/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  window.scrollTo(0, 0);

  const navigate = useNavigate();
  const { search } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = search ? search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/HomeScreen");
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow-lg w-100" style={{ maxWidth: "900px", borderRadius: "10px", overflow: "hidden" }}>
        
        {/* Colonne gauche - formulaire */}
        <div className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <form onSubmit={submitHandler}>
            <h3 className="mb-4">Login</h3>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-success w-100">Login</button>
           
          </form>
        </div>

        {/* Colonne droite - logo ou image */}
        <div className="col-md-6 d-none d-md-flex bg-success align-items-center justify-content-center">
          <img
            src="/images/logofin.png"
            alt="Logo"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </div>

      </div>
    </div>
  );
};

export default Login;
