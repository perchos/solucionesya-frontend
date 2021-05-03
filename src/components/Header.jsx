import React, { useState, useEffect } from 'react';
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
import Cookies from 'universal-cookie'
import Axios from "axios";
import { GET_USER_URL } from "../utils/constants"

const url="http://localhost:5000/users"
const cookies = new Cookies()

const Header = ({ setCategory, setLocation, setSearch, getAll }) => {
  const [isLogged, setIsLogged] = useState(cookies.get ? true : false);
  const [user, setUser] = useState(null);
const url = GET_USER_URL;
const cookies = new Cookies();

  const handleCategory = (e) => setCategory(e);
  const handleLocation = (e) => setLocation(e);
  const handleChange = (e) => setSearch(e.target.value);

  function getUser() {
    const authValidate = cookies.get('userId');

    if (authValidate !== undefined) {
      Axios.get(`${url}/${authValidate}`)
        .then((res) => {
          setUser(true);
        })
        .catch((err) => {
          setUser(null);
        });
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header>
      <Navbar className='bg-light justify-content-between'>
        <Nav className='mr-auto'>
          <NavDropdown
            title='Categoría ...'
            id='category'
            onSelect={handleCategory}
          >
            <NavDropdown.Item eventKey=''>Sin filtro</NavDropdown.Item>
            <NavDropdown.Item eventKey='Informática'>
              Informática
            </NavDropdown.Item>
            <NavDropdown.Item eventKey='Electricidad'>
              Electricidad
            </NavDropdown.Item>
            <NavDropdown.Item eventKey='Hogar'>Hogar</NavDropdown.Item>
            <NavDropdown.Item eventKey='Otro'>Otro</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title='Ubicación ...'
            id='location'
            onSelect={handleLocation}
          >
            <NavDropdown.Item eventKey=''>Sin filtro</NavDropdown.Item>
            <NavDropdown.Item eventKey='Bogotá'>Bogotá</NavDropdown.Item>
            <NavDropdown.Item eventKey='Cali'>Cali</NavDropdown.Item>
            <NavDropdown.Item eventKey='Medellín'>Medellín</NavDropdown.Item>
          </NavDropdown>
          <Form inline>
            <FormControl
              type='text'
              placeholder='Buscar servicios'
              className='mr-sm-2'
              onChange={handleChange}
            />
            <Button variant='outline-info' onClick={getAll}>
              Buscar
            </Button>
          </Form>
        </Nav>
        {/* <Logged isLogged={isLogged} /> */}
        { user ? <IsLogin setUser={setUser}/> : <IsLogout/> }
      </Navbar>
    </header>
  );
};

export default Header;
