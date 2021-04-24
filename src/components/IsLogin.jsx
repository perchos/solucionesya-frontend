import React from 'react';
import { Image, Button } from 'react-bootstrap';

const IsLogin = () => {
  return (
    <>
      <Image src='https://dummyimage.com/40x40/000/fff' roundedCircle />
      <span className='mx-2'>🔔</span>
      <Button variant='outline-danger'>Cerrar Sesión</Button>
    </>
  );
};

export default IsLogin;
