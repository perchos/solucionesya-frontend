import React from 'react';
import { Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { LOGOUT_USER } from '../utils/constants';
import Swal from 'sweetalert2';

const cookies = new Cookies();
const IsLogin = ({ setUser }) => {
  const logOut = () => {
    const options = {
      withCredentials: true,
    };

    Axios.post(LOGOUT_USER, {}, options)
      .then((res) => {
        cookies.remove('userId', { path: '/' });
        setUser(null);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: "The session can't be closed",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const userId = cookies.get('userId');
  const toLink = `/user/${userId}`;

  return (
    <>
      <Image
        src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
        width={50}
        roundedCircle
      />
      <Link to={toLink}>
        <Button variant="outline-success mx-3">Mi perfil</Button>
      </Link>
      <Button variant="outline-danger" onClick={logOut}>
        Cerrar Sesión
      </Button>
    </>
  );
};

export default IsLogin;
