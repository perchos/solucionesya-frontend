import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

import IsLogin from './IsLogin';
import IsLogout from './IsLogout';

function Logged({ isLogged }) {
  if (isLogged) {
    return <IsLogin />;
  } else {
    return <IsLogout />;
  }
}

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <header>
      <Navbar className='bg-light justify-content-between'>
        <Nav className='mr-auto'>
          <NavDropdown title='Filtrar ...' id='filter'>
            <NavDropdown.Item href='#'>Menor Precio</NavDropdown.Item>
            <NavDropdown.Item href='#'>Mayor Precio</NavDropdown.Item>
            <NavDropdown.Item href='#'>mejor Calificación</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Ubicación ...' id='ubication'>
            <NavDropdown.Item href='#'>Ciudad</NavDropdown.Item>
            <NavDropdown.Item href='#'>Localidad</NavDropdown.Item>
            <NavDropdown.Item href='#'>Más CercaIsLogout</NavDropdown.Item>
          </NavDropdown>
          <Form inline>
            <FormControl
              type='text'
              placeholder='Buscar servicios'
              className='mr-sm-2'
            />
            <Button variant='outline-info'>Buscar</Button>
          </Form>
        </Nav>
        <Logged isLogged={isLogged} />
      </Navbar>
    </header>
  );
};

export default Header;
