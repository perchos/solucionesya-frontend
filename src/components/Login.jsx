import React from "react";
import { Card, Form, Button } from 'react-bootstrap';

const Login = () => {
  return (
    <Card>
      <Card body>
        <Card.Title>Iniciar Sesión</Card.Title>
      </Card>
      <Form>
        <Form.Group controlId="formGroupUser">
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Card.Link href="#">¿Has olvidado tu contraseña?</Card.Link>
        <Button variant="primary" type="submit">Iniciar Sesión</Button>
      </Form>
      <Card.Text>¿No tienes una cuenta? <Card.Link href="#">Registrate</Card.Link></Card.Text>
    </Card>
  );
};

export default Login;
