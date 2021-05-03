import React from 'react';
import '../assets/styles/Register.css';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { REGISTER_USER } from '../utils/constants';

const cookies = new Cookies();

const Register = (props) => {
  function passValidator(pass, confirm) {
    return pass === confirm ? true : false;
  }

  async function registerUser(e) {
    e.preventDefault();
    const samePass = passValidator(
      e.target.userPassword.value,
      e.target.userConfirmPassword.value,
    );

    if (samePass === true) {
      const options = {
        withCredentials: true,
      };

      let data = {
        email: e.target.userEmail.value,
        userName: e.target.userName.value,
        password: e.target.userPassword.value,
      };

      try {
        const response = await Axios.post(REGISTER_USER, data, options);

        if (response.status === 201) {
          cookies.set('userId', response.data.uid, { path: '/' });
          props.history.push('/');
          // cookies.set('userId', res.data.uid, { path: '/' });
          // props.history.push('/');
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Usuario Creado',
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
        }
      } catch (error) {
        // if (err.response && err.response.status === 400)
        let errorMessage = 'Error al crear usuario';
        if (
          error.response &&
          error.response.data &&
          error.response.data.msg === 'User already exists'
        ) {
          errorMessage = 'El usuario ya existe';
        }
        Swal.fire({
          icon: 'error',
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
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
                    minLength="5"
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
                    minLength="5"
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
