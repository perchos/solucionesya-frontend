import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const IsLogout = () => {
  return (
    <ButtonGroup>
      <Button variant='success'>Registrarme</Button>
      <Button variant='outline-success' className='ml-1'>
        Iniciar Sesión
      </Button>
    </ButtonGroup>
  );
};

export default IsLogout;
