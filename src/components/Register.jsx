import React from 'react';
// import { DOMAIN } from "../utils/constants"
import '../assets/styles/Register.css';
import Swal from 'sweetalert2';
import { REGISTER_USER } from '../utils/constants';

const Register = () => {
  function passValidator(pass, confirm) {
    return pass === confirm ? true : false;
  }

  function registerUser(e) {
    const samePass = passValidator(
      e.target.userPassword.value,
      e.target.userConfirmPassword.value,
    );

    if (samePass === true) {
      const url = REGISTER_USER;

      let data = {
        email: e.target.userEmail.value,
        userName: e.target.userName.value,
        password: e.target.userPassword.value,
      };

      fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => {
          console.log(res.status);
          console.log(res);
          if (res.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'El usuario ya existe',
              showConfirmButton: false,
              timer: 1500,
            });
          }

          if (res.status === 201) {
            Swal.fire({
              icon: 'success',
              title: 'Usuario Creado',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Error al crear',
            showConfirmButton: false,
            timer: 1500,
          });
        });
      e.preventDefault();
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        showConfirmButton: false,
        timer: 1500,
      });
      e.preventDefault();
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="card border-0 shadow flex-row my-3">
            <div className="card-su-img-left rounded-left d-none d-md-flex"></div>
            <div className="card-body spacing-su-inner">
              <h5 className="card-title text-center">Registrarme</h5>
              <form onSubmit={registerUser}>
                <div className="mt-1">
                  <label className="mb-0" htmlFor="userName">
                    Usuario
                  </label>
                  <input
                    type="text"
                    id="userName"
                    className="form-control form-control-sm"
                    placeholder="Nombre de Usuario"
                    required
                    autoFocus
                  />
                </div>

                <div className="mt-1">
                  <label className="mb-0" htmlFor="userEmail">
                    Correo Electronico
                  </label>
                  <input
                    type="email"
                    id="userEmail"
                    className="form-control form-control-sm"
                    placeholder="Dirección de Correo Electronico"
                    required
                  />
                </div>

                <div className="mt-1">
                  <label className="mb-0" htmlFor="userPassword">
                    Contraseña
                  </label>
                  <input
                    minlength="5"
                    type="password"
                    id="userPassword"
                    className="form-control form-control-sm"
                    placeholder="Escribe Tu Contraseña"
                    required
                  />
                </div>

                <div className="mt-1">
                  <label className="mb-0" htmlFor="userConfirmPassword">
                    Confirmar Contraseña
                  </label>
                  <input
                    minlength="5"
                    type="password"
                    id="userConfirmPassword"
                    className="form-control form-control-sm"
                    placeholder="Repite La Contraseña"
                    required
                  />
                </div>

                <button className="btn btn-color btn-block mt-4" type="submit">
                  Registrarme
                </button>
                <p className="d-block text-center mt-3 small">
                  ¿Ya tienes una cuenta?
                  <a className="d-block text-center mt-2" href="/login">
                    Iniciar Sesión
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*link para cancelar la prmesa (abort controller) */

export default Register;
