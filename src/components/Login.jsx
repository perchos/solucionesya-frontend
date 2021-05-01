import React, { Component } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import "../assets/styles/Login.css";

const cookies = new Cookies();

class Login extends Component {
  loginUser = (e) => {
    e.preventDefault();
    const data = {
      userName: this.userName,
      password: this.password,
    };

    // TODO: LA URL DEL AXIOS NO DEBE ESTAR QUEMADA
    Axios.post("http://localhost:5000/auth/login", data)
      .then((res) => {
        console.log(res.data.uid, "holi");
        cookies.set("userId", res.data.uid, { path: "/" });
        this.props.history.push('/')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="card border-0 shadow flex-row my-3">
              <div className="login-card-img-left rounded-left d-none d-md-flex"></div>
              <div className="card-body login-spacing-inner">
                <form onSubmit={this.loginUser}>
                  <h5 className="card-title text-center">Iniciar Sesión</h5>

                  <div className="mt-1">
                    <label className="mb-0" htmlFor="userName">
                      Usuario
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Nombre de Usuario"
                      autoFocus
                      onChange={(e) => (this.userName = e.target.value)}
                    />
                  </div>

                  <div className="mt-1">
                    <label className="mb-0" htmlFor="userPassword">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Escribe Tu Contraseña"
                      onChange={(e) => (this.password = e.target.value)}
                    />
                  </div>

                  <button className="btn btn-color btn-block mt-4">
                    Iniciar Sesión
                  </button>
                </form>

                <p className="d-block text-center mt-3 small" href="#">
                  ¿No tienes una cuenta?
                  <a className="d-block text-center mt-2" href="/register">
                    Registrarme
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
