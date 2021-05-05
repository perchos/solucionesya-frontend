import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const IsLogout = () => {
  return (
    <ButtonGroup>
      <Button href="/register" variant='success'>Registrarme</Button>
      <Button href="/login" variant='outline-success' className='ml-1'>
        Iniciar Sesión
      </Button>
    </ButtonGroup>
  );
};

export default IsLogout;
