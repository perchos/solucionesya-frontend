import React from "react";
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const IsLogin = () => {

  const userId = cookies.get('userId')
  const toLink = `/user/${userId}`

  return (
    <>
      <Image src="https://dummyimage.com/40x40/000/fff" roundedCircle />
      <Link to={toLink} >
        <Button variant="outline-success mx-3">Mi perfil</Button>
      </Link>
      <Button variant="outline-danger">Cerrar Sesión</Button>
    </>
  );
};

export default IsLogin;
