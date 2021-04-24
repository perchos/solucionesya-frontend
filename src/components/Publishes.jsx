import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import '../assets/styles/Publishes.css';
import React from 'react';

const Publishes = () => {
  return (
    <Container className='publishes'>
      <h2>Publicar Mi Servicio</h2>
      <Row>
        <Col>
          <Form>
            <FormControl
              type='text'
              placeholder='Título del servicio a publicar'
              className=''
            />
            <FormControl
              type='number'
              placeholder='Precio del servicio'
              className='my-2'
            />
            <Form.Group controlId='hourly'>
              <Form.Check
                type='checkbox'
                label='Cobro por hora'
                name='hourly'
              />
            </Form.Group>
            <Form.Group controlId='location'>
              <Form.Control as='select' defaultValue='Ubicación...'>
                <option>Ubicación...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>
            <FormControl
              type='number'
              placeholder='Teléfono'
              className='mb-2'
            />
            <Form.Group controlId='description'>
              <Form.Control
                as='textarea'
                rows={4}
                name='description'
                placeholder='Descripción'
              />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.File
              id='custom-file'
              label='Añadir imágenes'
              custom
              className='custom-file'
            />
          </Form>
          <Button variant='primary' className='my-2'>
            Publicar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Publishes;
