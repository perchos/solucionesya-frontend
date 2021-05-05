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
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { GET_USER_URL } from '../utils/constants';

const Header = ({ setCategory, setLocation, setSearch, getAll }) => {
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
    // eslint-disable-next-line
  }, []);

  return (
    <header>
      <Navbar className="bg-light justify-content-between">
        <Nav className="mr-2">
          <NavDropdown
            title="Categoría"
            id="category"
            key="category"
            onSelect={handleCategory}
            className="text-white"
          >
            <NavDropdown.Item eventKey="" active>
              Sin filtro
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="Informática">
              Informática
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="Electricidad">
              Electricidad
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="Hogar">Hogar</NavDropdown.Item>
            <NavDropdown.Item eventKey="Otro">Otro</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="mr-2">
          <NavDropdown
            title="Ubicación"
            id="location"
            key="location"
            onSelect={handleLocation}
          >
            <NavDropdown.Item eventKey="" active>
              Sin filtro
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="Bogotá">Bogotá</NavDropdown.Item>
            <NavDropdown.Item eventKey="Cali">Cali</NavDropdown.Item>
            <NavDropdown.Item eventKey="Medellín">Medellín</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="mr-auto">
          <Form inline>
            <FormControl
              type="text"
              placeholder="Buscar servicios"
              className="mr-sm-2"
              onChange={handleChange}
            />
            <Button variant="outline-info" onClick={() => getAll(true)}>
              Buscar
            </Button>
          </Form>
        </Nav>
        {user ? <IsLogin setUser={setUser} /> : <IsLogout />}
      </Navbar>
    </header>
  );
};

export default Header;
