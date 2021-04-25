import React from 'react'
import '../assets/styles/Login.css'

const Login = () => {

    function loginUser(e){
      console.log(e.target.userName.value)
      console.log(e.target.userPassword.value)

      const url = 'http://localhost:5000/auth/login'

      let data = {
        userName: e.target.userName.value,
        password: e.target.userPassword.value
      }

      fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
      }).then( res => {
        console.log(res)
      }).catch(
        err => {
            console.log(err)
        }
      )
      e.preventDefault()
    }

    return <div className="container">
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="card border-0 shadow flex-row my-3">
          <div className="login-card-img-left rounded-left d-none d-md-flex">
          </div>
          <div className="card-body login-spacing-inner">
            <h5 className="card-title text-center">Iniciar Sesión</h5>
            <form onSubmit={loginUser}>
              <div className="mt-1">
                <label className="mb-0" htmlFor="userName">Usuario</label>
                <input type="text" id="userName" className="form-control form-control-sm" placeholder="Nombre de Usuario" autoFocus/>
              </div>

              <div className="mt-1">
                <label className="mb-0" htmlFor="userPassword">Contraseña</label>
                <input type="password" id="userPassword" className="form-control form-control-sm" placeholder="Escribe Tu Contraseña"/>
              </div>

              <button className="btn btn-color btn-block mt-4" type="submit">Iniciar Sesión</button>
              <p className="d-block text-center mt-3 small" href="">
                ¿No tienes una cuenta?
                <a className="d-block text-center mt-2" href="/register">Registrarme</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  };

export default Login;
